'use strict';

µBlock.passwordKeyService = {};

function GetSigningHash(stringToSign) {
    let expectedHash=new Uint8Array(stringToSign.length);
        for(var i=0,j=stringToSign.length;i<j;++i){
            expectedHash[i]=stringToSign.charCodeAt(i);
    }
    return expectedHash;
}

/**
 * Sign the given string with the given key (only works with ascii for now?)
 * @param {string} stringToSign 
 * @param {string} privateKey base64 encoded private key
 * @returns {string} signature encoded with base64
 */
µBlock.passwordKeyService.SignString = function(stringToSign, privateKey) {
    let signingKeyPair = µBlock.nacl.sign.keyPair.fromSecretKey(µBlock.nacl.util.decodeBase64(privateKey));
    let expectedHash = GetSigningHash(stringToSign);
    return µBlock.nacl.util.encodeBase64(µBlock.nacl.sign(expectedHash, signingKeyPair.secretKey));
}

µBlock.passwordKeyService.GenerateNaclKeysFromHashedPassword = function(userName, password) 
{
  let promise = new Promise(function(resolve, reject) {
    µBlock.sessionKeys.generate(userName, password, function(err, keys) {
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
