'use strict';

const nacl = require('tweetnacl');
const nacl_util = require('tweetnacl-util');
const sessionKeys = require('session-keys');

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
function SignString(stringToSign, privateKey) {
    let signingKeyPair = nacl.sign.keyPair.fromSecretKey(nacl_util.decodeBase64(privateKey));
    let expectedHash = GetSigningHash(stringToSign);
    return nacl_util.encodeBase64(nacl.sign(expectedHash, signingKeyPair.secretKey));
}

function VerifySignatureString(signature, publicKey) {
    let decodedSignature = nacl_util.decodeBase64(signature);
    let decodedPublicKey = nacl_util.decodeBase64(publicKey);
    return nacl.sign.open(decodedSignature, decodedPublicKey);
}

function GenerateNaclKeys(userName, password) 
{
  let promise = new Promise(function(resolve, reject) {
    sessionKeys.generate(userName, password, function(err, keys) {
      if (err) {
        reject(err);
        return;
      }
      let result = {/*naclSigningKeyPair: keys.naclSigningKeyPairs[0],*/ naclSigningKeyPairBase64: keys.naclSigningKeyPairsBase64[0]};
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

export default {
    SignString,
    VerifySignatureString,
    GenerateNaclKeys
}
