'use strict';

const fs = require('fs')

import testCommon from './testCommon.js';
let dictEquals = testCommon.dictEquals;

const passwordKeyService = require('../services/passwordKeyService');

describe("verify_we_can_build_daily_summaries", () => {

    let nodejsTweetNacl = require('tweetnacl');
    nodejsTweetNacl.util = require('tweetnacl-util');
    let peachKeys = nodejsTweetNacl.box.keyPair();
    let peachPublicKey = nodejsTweetNacl.util.encodeBase64(peachKeys.publicKey);

    function mockAxiosGet(url) {
        if (url.pathname === '/api/peachPublicKey') {
            return {data: peachPublicKey};
        }
        if (url.pathname === '/api/challengecode') {
            return {data: "8071a477-ee1b-4dba-8549-52c19bda46d0"};
        }
        throw `Unknown pathname = ${url}`;
    }

    function initiseUploadEnvironment(mockLocalStorage, mockAxios, mockPeachConfig) {
        const browsingHistoryUploadServiceData = fs.readFileSync('../src/js/browsingHistoryUploadService.js', 'utf8')
        const utcDateServiceData = fs.readFileSync('../src/js/utcDateService.js', 'utf8');

        // Mock out the local storage library using the passed in initial state
        const localStorageSet = jest.fn((key, value) => mockLocalStorage[key] = value);
        const localStorageGet = jest.fn(key => mockLocalStorage[key]);
        const localStorageRemove = jest.fn(keys => {
            if (!Array.isArray(keys)) {
                keys = [keys];
            }
            keys.forEach(key => {
                delete mockLocalStorage[key]
            });
        });

        if (!mockAxios) {
            mockAxios = {
                get: jest.fn(mockAxiosGet),
                post: jest.fn()
            }
        }

        // Simulate what the background does when it loads the file
        let µBlock = {
            localStorageSet,
            localStorageGet,
            localStorageRemove,
            axios: mockAxios,
            peachConfig: mockPeachConfig
         };
         
         const tweetNaclData = fs.readFileSync('../src/js/dist/nacl.min.js', 'utf8');
         eval(tweetNaclData);
         // Browserify helpfully puts our function on module.exports for us
         let nacl = module.exports;
         module.exports = {};
 
         // Inject the browserfied tweetnacl.js helper library
         const tweetNaclHelperData = fs.readFileSync('../src/js/tweetNaclHelper.js', 'utf8')
 
         eval(tweetNaclHelperData);

         const tweetNaclUtilData = fs.readFileSync('../src/js/dist/nacl-util.min.js', 'utf8');
         eval(tweetNaclUtilData);
         // Browserify helpful puts our function on module.exports for us
         nacl.util = module.exports;
         module.exports = {};
   
        // Inject the config helper
        const configHelperData = fs.readFileSync('../src/js/configHelper.js', 'utf8')

        eval(configHelperData);

         // Inject the browserfied tweetnacl-util.js helper library
         const tweetNaclUtilHelperData = fs.readFileSync('../src/js/tweetNaclUtilHelper.js', 'utf8')
   
         eval(tweetNaclUtilHelperData);
         eval(utcDateServiceData);
         eval(browsingHistoryUploadServiceData);

         const sessionKeysData = fs.readFileSync('../src/js/dist/sessionKeys.js', 'utf8');
         eval(sessionKeysData);
         // Browserify helpful puts our function on module.exports for us
         let sessionKeys = module.exports;
         module.exports = {};
 
         // Run the scryptPromise module and inject the browserfied scryptsy library
         const sessionKeysHelperData = fs.readFileSync('../src/js/sessionKeysHelper.js', 'utf8')
 
         eval(sessionKeysHelperData);

        // Inject the browserfied tweetnacl-util.js helper library
        const passwordKeyServiceData = fs.readFileSync('../src/js/passwordKeyService.js', 'utf8')

        eval(passwordKeyServiceData);

        // Mock out chrome alarms
        let chrome = {
                alarms:
                    {
                        create: jest.fn(),
                        onAlarm: {
                            addListener: jest.fn()
                        }
                    },
            }

        // Load the schedule
        const scheduleBrowserUploadsData = fs.readFileSync('../src/js/scheduleBrowserUploads.js', 'utf8')

        eval(scheduleBrowserUploadsData);

        // Return the µBlock object ready for the caller to use in it's tests
        return µBlock;
    };

    function GenerateNaclKeysFromHashedPassword(userName, password) 
    {
        const sessionKeys = require('session-keys');
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
            //return result;
            // {
            //   id: "0123456789abcdef",
            //   byteKeys: [...],
            //   hexKeys: [...],
            //   naclEncryptionKeyPairs: [...],
            //   naclEncryptionKeyPairsBase64: [...],
            //   naclSigningKeyPairs: [...],
            //   naclSigningKeyPairsBase64: [...],
            // }
        })
    });
    return promise;
    }

    async function GetSenderPublicKey() {
        const { scrypt } = require('../services/scryptPromise');
        let peachHashedKey = nodejsTweetNacl.util.encodeBase64(await scrypt("password".normalize('NFKC'), "PEACH", 32));
        let senderKeys = await GenerateNaclKeysFromHashedPassword('mark@deliveryengine.net', peachHashedKey);
        return { peachHashedKey, senderPublicKeyBase64: senderKeys.naclEncryptionKeyPairBase64.publicKey};
    }

    it("test_if_no_browser_history_nothing_is_uploaded", async () => {
        let µBlock = initiseUploadEnvironment({});

        await µBlock.uploadBrowsingHistoryUpdates();

        expect(µBlock.axios.post).not.toHaveBeenCalled();
    });

    it("test_if_the_start_date_is_today_upload_nothing", async () => {
        const mockTime = require('jest-mock-now');
        mockTime(new Date('2021-06-10T01:00:00Z'));

        let µBlock = initiseUploadEnvironment({PEACHUPLOADSTARTDATE: new Date('2021-06-10')});

        await µBlock.uploadBrowsingHistoryUpdates();

        expect(µBlock.axios.post).not.toHaveBeenCalled();
    });

    it("test_we_upload_previous_files_which_are_waiting", async () => {
        const mockTime = require('jest-mock-now');
        mockTime(new Date('2021-06-10T01:00:00Z'));

        let { peachHashedKey, senderPublicKeyBase64 } = await GetSenderPublicKey();

        let mockLocalStorage = {
            PEACHUPLOADSTARTDATE: (new Date('2021-06-08')).getTime(),
            ["PEACHUPLOAD2021-06-08"]: [
                { url: "https://www.facebook.com", at: (new Date('2021-06-08T23:00:01Z')).getTime()},
                { url: "https://www.google.com", at: (new Date('2021-06-08T23:00:02Z')).getTime()}
            ],
            ["PEACHUPLOAD2021-06-09"]: [
                { url: "https://www.businessinsider.com", at: (new Date('2021-06-09T23:00:01Z')).getTime()},
                { url: "https://www.yahoo.com", at: (new Date('2021-06-09T23:00:02Z')).getTime()}
            ],
            PEACHUSERNAME: 'mark@deliveryengine.net',
            PEACHKEY: peachHashedKey
        };

        let mockAxios = {
            get: jest.fn(mockAxiosGet),
            post: jest.fn()
        }

        let µBlock = initiseUploadEnvironment(mockLocalStorage, mockAxios);

        let task = µBlock.uploadBrowsingHistoryUpdates();
        expect(µBlock.uploadBrowsingHistoryLock).toBeTruthy();
        await task;
        expect(µBlock.uploadBrowsingHistoryLock).toBeFalsy();

        expect(µBlock.axios.get).toHaveBeenCalledTimes(3);
        let params = µBlock.axios.get.mock.calls;
        expect(params[0][0].toString()).toBe('https://accounts.gopeach.app/api/peachPublicKey');
        expect(params[1][0].toString()).toBe('https://accounts.gopeach.app/api/challengecode');
        expect(params[2][0].toString()).toBe('https://accounts.gopeach.app/api/challengecode');
        
        expect(µBlock.axios.post).toHaveBeenCalledTimes(2);
        params = µBlock.axios.post.mock.calls;

        expect(params[0][0].toString()).toBe('https://accounts.gopeach.app/api/fileUpload');
        expect(params[1][0].toString()).toBe('https://accounts.gopeach.app/api/fileUpload');
        let uploaded = params[0][1];
        expect('signature' in uploaded).toBe(true);
        expect('fileUploadCommand' in uploaded).toBe(true);
        let fileUploadCommand = JSON.parse(new TextDecoder().decode(µBlock.nacl.util.decodeBase64(uploaded.fileUploadCommand)));
        expect(fileUploadCommand.senderPublicKey).toBe(senderPublicKeyBase64);
        let decryptedContent = nodejsTweetNacl.box.open(
            nodejsTweetNacl.util.decodeBase64(fileUploadCommand.encryptedContent),
            nodejsTweetNacl.util.decodeBase64(fileUploadCommand.nonce),
            nodejsTweetNacl.util.decodeBase64(fileUploadCommand.senderPublicKey),
            peachKeys.secretKey
        )
        let content1 = JSON.parse(nodejsTweetNacl.util.encodeUTF8(decryptedContent));

        expect(content1.length).toBe(mockLocalStorage["PEACHUPLOAD2021-06-08"].length);
        for(let i = 0; i < mockLocalStorage["PEACHUPLOAD2021-06-08"].length ; i++) {
            let content = content1[i];
            expect(dictEquals(content, mockLocalStorage["PEACHUPLOAD2021-06-08"][i])).toBe(true);
        }

        uploaded = params[1][1];
        expect('signature' in uploaded).toBe(true);
        expect('fileUploadCommand' in uploaded).toBe(true);
        fileUploadCommand = JSON.parse(new TextDecoder().decode(µBlock.nacl.util.decodeBase64(uploaded.fileUploadCommand)));
        expect(fileUploadCommand.senderPublicKey).toBe(senderPublicKeyBase64);
        decryptedContent = nodejsTweetNacl.box.open(
            nodejsTweetNacl.util.decodeBase64(fileUploadCommand.encryptedContent),
            nodejsTweetNacl.util.decodeBase64(fileUploadCommand.nonce),
            nodejsTweetNacl.util.decodeBase64(fileUploadCommand.senderPublicKey),
            peachKeys.secretKey
        )
        let content2 = JSON.parse(nodejsTweetNacl.util.encodeUTF8(decryptedContent));
        expect(content1.length).toBe(mockLocalStorage["PEACHUPLOAD2021-06-09"].length);
        for(let i = 0; i < mockLocalStorage["PEACHUPLOAD2021-06-09"].length ; i++) {
            let content = content2[i];
            expect(dictEquals(content, mockLocalStorage["PEACHUPLOAD2021-06-09"][i])).toBe(true);
        }

        expect(mockLocalStorage['PEACHUPLOADSTARTDATE']).toBe(µBlock.getStartOfUtcDay(new Date(Date.now())).getTime())
    });

    it("test_if_there_is_an_error_we_will_retry", async() => {
        const mockTime = require('jest-mock-now');
        mockTime(new Date('2021-06-10T01:00:00Z'));

        let { peachHashedKey, senderPublicKeyBase64 } = await GetSenderPublicKey();

        let mockLocalStorage = {
            PEACHUPLOADSTARTDATE: (new Date('2021-06-08')).getTime(),
            ["PEACHUPLOAD2021-06-08"]: [
                { url: "https://www.facebook.com", at: (new Date('2021-06-08T23:00:01Z')).getTime()},
                { url: "https://www.google.com", at: (new Date('2021-06-08T23:00:02Z')).getTime()}
            ],
            ["PEACHUPLOAD2021-06-09"]: [
                { url: "https://www.businessinsider.com", at: (new Date('2021-06-09T23:00:01Z')).getTime()},
                { url: "https://www.yahoo.com", at: (new Date('2021-06-09T23:00:02Z')).getTime()}
            ],
            PEACHUSERNAME: 'mark@deliveryengine.net',
            PEACHKEY: peachHashedKey
        };

        let callCount = 0;
        let wasThrown = false;
        let mockAxios = {
            get: jest.fn(mockAxiosGet),
            post: jest.fn(() => {
                if (callCount > 0) {
                    wasThrown = true;
                    throw "There was an error";
                }
                callCount++;
            })
        }

        let µBlock = initiseUploadEnvironment(mockLocalStorage, mockAxios);

        let task = µBlock.uploadBrowsingHistoryUpdates();
        expect(µBlock.uploadBrowsingHistoryLock).toBeTruthy();
        await task;
        expect(µBlock.uploadBrowsingHistoryLock).toBeFalsy();

        expect(µBlock.axios.post).toHaveBeenCalledTimes(2);
        
        let params = µBlock.axios.post.mock.calls;

        expect(params[0][0].toString()).toBe('https://accounts.gopeach.app/api/fileUpload');
        expect(params[1][0].toString()).toBe('https://accounts.gopeach.app/api/fileUpload');

        let uploaded = params[0][1];
        expect('signature' in uploaded).toBe(true);
        expect('fileUploadCommand' in uploaded).toBe(true);
        let fileUploadCommand = JSON.parse(new TextDecoder().decode(µBlock.nacl.util.decodeBase64(uploaded.fileUploadCommand)));
        expect(fileUploadCommand.senderPublicKey).toBe(senderPublicKeyBase64);
        let decryptedContent = nodejsTweetNacl.box.open(
            nodejsTweetNacl.util.decodeBase64(fileUploadCommand.encryptedContent),
            nodejsTweetNacl.util.decodeBase64(fileUploadCommand.nonce),
            nodejsTweetNacl.util.decodeBase64(fileUploadCommand.senderPublicKey),
            peachKeys.secretKey
        )
        let content1 = JSON.parse(nodejsTweetNacl.util.encodeUTF8(decryptedContent));
        expect(content1.length).toBe(mockLocalStorage["PEACHUPLOAD2021-06-08"].length);
        for(let i = 0; i < mockLocalStorage["PEACHUPLOAD2021-06-08"].length ; i++) {
            let content = content1[i];
            expect(dictEquals(content, mockLocalStorage["PEACHUPLOAD2021-06-08"][i])).toBe(true);
        }

        uploaded = params[1][1];
        expect('signature' in uploaded).toBe(true);
        expect('fileUploadCommand' in uploaded).toBe(true);
        fileUploadCommand = JSON.parse(new TextDecoder().decode(µBlock.nacl.util.decodeBase64(uploaded.fileUploadCommand)));
        expect(fileUploadCommand.senderPublicKey).toBe(senderPublicKeyBase64);
        decryptedContent = nodejsTweetNacl.box.open(
            nodejsTweetNacl.util.decodeBase64(fileUploadCommand.encryptedContent),
            nodejsTweetNacl.util.decodeBase64(fileUploadCommand.nonce),
            nodejsTweetNacl.util.decodeBase64(fileUploadCommand.senderPublicKey),
            peachKeys.secretKey
        )
        let content2 = JSON.parse(nodejsTweetNacl.util.encodeUTF8(decryptedContent));
        expect(content1.length).toBe(mockLocalStorage["PEACHUPLOAD2021-06-09"].length);
        for(let i = 0; i < mockLocalStorage["PEACHUPLOAD2021-06-09"].length ; i++) {
            let content = content2[i];
            expect(dictEquals(content, mockLocalStorage["PEACHUPLOAD2021-06-09"][i])).toBe(true);
        }

        expect(wasThrown).toBe(true);
        expect(mockLocalStorage['PEACHUPLOADSTARTDATE']).toBe(µBlock.getStartOfUtcDay(new Date('2021-06-09T00:00:00Z')).getTime())
    });

    it("test_if_locked_upload_does_not_proceed", async () => {
        const mockTime = require('jest-mock-now');
        mockTime(new Date('2021-06-10T01:00:00Z'));

        let mockLocalStorage = {
            PEACHUPLOADSTARTDATE: (new Date('2021-06-08')).getTime(),
            ["PEACHUPLOAD2021-06-08"]: [
                { url: "https://www.facebook.com", at: (new Date('2021-06-08T23:00:01Z')).getTime()},
                { url: "https://www.google.com", at: (new Date('2021-06-08T23:00:02Z')).getTime()}
            ],
            ["PEACHUPLOAD2021-06-09"]: [
                { url: "https://www.businessinsider.com", at: (new Date('2021-06-09T23:00:01Z')).getTime()},
                { url: "https://www.yahoo.com", at: (new Date('2021-06-09T23:00:02Z')).getTime()}
            ]
        };

        let µBlock = initiseUploadEnvironment(mockLocalStorage);

        µBlock.uploadBrowsingHistoryLock = true;
        await µBlock.uploadBrowsingHistoryUpdates();

        expect(µBlock.axios.post).not.toHaveBeenCalled();

        expect(mockLocalStorage['PEACHUPLOADSTARTDATE']).toBe(µBlock.getStartOfUtcDay(new Date('2021-06-08')).getTime())
    });

    it("test_if_sell_my_data_is_off_we_do_not_proceed", async () => {
        let µBlock = initiseUploadEnvironment({PEACHSELLINGSTATE: false}, null, {runRegularUploads: true});

        µBlock.processHistoryForUpload = jest.fn();
        µBlock.uploadBrowsingHistoryUpdates = jest.fn();

        expect(µBlock.checkAndUploadBrowserHistory).toBeTruthy();

        await µBlock.checkAndUploadBrowserHistory({name: "check_for_upload"});

        expect(µBlock.processHistoryForUpload).not.toHaveBeenCalled();
        expect(µBlock.uploadBrowsingHistoryUpdates).not.toHaveBeenCalled();
    });

    it("test_if_sell_my_data_is_on_we_do_proceed", async () => {
        let µBlock = initiseUploadEnvironment({PEACHSELLINGSTATE: true}, null, {runRegularUploads: true});

        µBlock.processHistoryForUpload = jest.fn();
        µBlock.uploadBrowsingHistoryUpdates = jest.fn();

        expect(µBlock.checkAndUploadBrowserHistory).toBeTruthy();

        await µBlock.checkAndUploadBrowserHistory({name: "check_for_upload"});

        expect(µBlock.processHistoryForUpload).toHaveBeenCalled();
        expect(µBlock.uploadBrowsingHistoryUpdates).toHaveBeenCalled();
    });

});

