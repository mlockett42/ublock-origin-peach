'use strict';

function GenerateNaclKeysFromHashedPassword(userName, password)
{
    const sessionKeys = µBlock.sessionKeys;
    let promise = new Promise(function(resolve, reject) {
        sessionKeys.generate(userName, password, function(err, keys) {
        if (err) {
            reject(err);
            return;
        }
        let result = {
            naclSigningKeyPairBase64: keys.naclSigningKeyPairsBase64[0],
            naclEncryptionKeyPairBase64: keys.naclEncryptionKeyPairsBase64[0]
        };
        resolve(result);
    })
});
return promise;
}

if (µBlock.peachConfig.allowDebugFunctions) {
    µBlock.debugUploadBrowsingHistoryUpdates = async function() {
        if (µBlock.uploadBrowsingHistoryLock) {
            return;
        }
        µBlock.uploadBrowsingHistoryLock = true;
    
        let resp = await µBlock.axios.get(new URL('/api/peachPublicKey', µBlock.peachConfig.serverUrl));
        let peachPublicKey = µBlock.nacl.util.decodeBase64(resp.data);
    
        let peachUserName = await µBlock.localStorageGet('PEACHUSERNAME');
        let peachHashKey = await µBlock.localStorageGet('PEACHKEY');
        let keys = await GenerateNaclKeysFromHashedPassword(peachUserName, peachHashKey);
        let userSecretKey = µBlock.nacl.util.decodeBase64(keys.naclEncryptionKeyPairBase64.secretKey);
    
        let now = Date.now();
    
        try {
            let data = [
                { url: "https://www.facebook.com", at: (new Date('2021-06-08T23:00:01Z')).getTime()},
                { url: "https://www.google.com", at: (new Date('2021-06-08T23:00:02Z')).getTime()}
            ]

            resp = await µBlock.axios.get(new URL('/api/challengecode', µBlock.peachConfig.serverUrl));
            let challengeCode = resp.data;

            let nonce = µBlock.nacl.randomBytes(24);
            data = JSON.stringify(data);
            let binaryData = µBlock.nacl.util.decodeUTF8(data);
            let encryptedContent = µBlock.nacl.util.encodeBase64(µBlock.nacl.box(
                binaryData,
                nonce,
                peachPublicKey,
                userSecretKey
            ));

            let userName = await µBlock.localStorageGet("PEACHUSERNAME");
            let hashedPassword = await µBlock.localStorageGet("PEACHKEY");
            let keys = await µBlock.passwordKeyService.GenerateNaclKeysFromHashedPassword(userName, hashedPassword);
            let senderPublicKey = keys.naclEncryptionKeyPairBase64.publicKey;
            let privateKey = keys.naclSigningKeyPairBase64.secretKey;

            let fileUploadCommand = {
                name: peachUserName,
                challengeCode: challengeCode,
                senderPublicKey: senderPublicKey,
                nonce: µBlock.nacl.util.encodeBase64(nonce),
                encryptedContent: encryptedContent
            };
            let jsonCommand = JSON.stringify(fileUploadCommand);

            let signature = µBlock.passwordKeyService.SignString(jsonCommand, privateKey);

            jsonCommand = (new TextEncoder()).encode(jsonCommand);

            let payload = {
                fileUploadCommand: µBlock.nacl.util.encodeBase64(jsonCommand),
                signature
            }

            await µBlock.axios.post(new URL('/api/fileUpload', µBlock.peachConfig.serverUrl), payload);
        }
        catch (err) {

        }
        finally {
            µBlock.uploadBrowsingHistoryLock = false;
        }
    };
}

µBlock.uploadBrowsingHistoryUpdates = async function() {
    if (µBlock.uploadBrowsingHistoryLock) {
        return;
    }
    µBlock.uploadBrowsingHistoryLock = true;

    let resp = await µBlock.axios.get(new URL('/api/peachPublicKey', µBlock.peachConfig.serverUrl));
    let peachPublicKey = µBlock.nacl.util.decodeBase64(resp.data);

    let peachUserName = await µBlock.localStorageGet('PEACHUSERNAME');
    let peachHashKey = await µBlock.localStorageGet('PEACHKEY');
    let keys = await GenerateNaclKeysFromHashedPassword(peachUserName, peachHashKey);
    let userSecretKey = µBlock.nacl.util.decodeBase64(keys.naclEncryptionKeyPairBase64.secretKey);

    let now = Date.now();
    let today = µBlock.getStartOfUtcDay(new Date(now)).getTime();

    let peachStartDate = await µBlock.localStorageGet('PEACHUPLOADSTARTDATE');
    let currentUploadDate = peachStartDate;

    try {
        while (currentUploadDate < today) {
            let data = await µBlock.localStorageGet(`PEACHUPLOAD${µBlock.formatUTCDate(new Date(currentUploadDate))}`);

            resp = await µBlock.axios.get(new URL('/api/challengecode', µBlock.peachConfig.serverUrl));
            let challengeCode = resp.data;

            let nonce = µBlock.nacl.randomBytes(24);
            let binaryData = µBlock.nacl.util.decodeUTF8(JSON.stringify(data));
            let encryptedContent = µBlock.nacl.util.encodeBase64(µBlock.nacl.box(
                binaryData,
                nonce,
                peachPublicKey,
                userSecretKey
            ));

            let userName = await µBlock.localStorageGet("PEACHUSERNAME");
            let hashedPassword = await µBlock.localStorageGet("PEACHKEY");
            let keys = await µBlock.passwordKeyService.GenerateNaclKeysFromHashedPassword(userName, hashedPassword);
            let senderPublicKey = keys.naclEncryptionKeyPairBase64.publicKey;
            let privateKey = keys.naclSigningKeyPairBase64.secretKey;

            let fileUploadCommand = {
                name: userName,
                challengeCode: challengeCode,
                senderPublicKey: senderPublicKey,
                nonce: µBlock.nacl.util.encodeBase64(nonce),
                encryptedContent: encryptedContent
            };
            let jsonCommand = JSON.stringify(fileUploadCommand);

            let signature = µBlock.passwordKeyService.SignString(jsonCommand, privateKey);

            jsonCommand = (new TextEncoder()).encode(jsonCommand);

            let payload = {
                fileUploadCommand: µBlock.nacl.util.encodeBase64(jsonCommand),
                signature
            }

            await µBlock.axios.post(new URL('/api/fileUpload', µBlock.peachConfig.serverUrl), payload);
            currentUploadDate += 24 * 60 * 60 * 1000; // Number of milliseconds in a day
            await µBlock.localStorageSet('PEACHUPLOADSTARTDATE', currentUploadDate);
        }
    }
    catch {
        // Just swallow the exception
    }
    finally {
        µBlock.uploadBrowsingHistoryLock = false;
    }
}
