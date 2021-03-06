'use strict';

const fs = require('fs')

describe("verify_we_can_import_modules", () => {
  // In µBlock origin we need to do some gymnastics to import modules because it is not built with webpack
    it("test_import_the_scrypt_library_correctly_and_get_correct_results", async () => {
        const mockTime = require('jest-mock-now');
        mockTime(new Date('2021-06-10T01:00:00Z'));

        // Get the Nodejs scrypt function and generate a key
        const nodejsScryptPromise = require('../services/scryptPromise');
        let expectedResult = await nodejsScryptPromise.scrypt("password".normalize('NFKC'), "PEACH", 32);

        const scryptData = fs.readFileSync('../src/js/dist/scryptsy.js', 'utf8');
        eval(scryptData);
        // Browserify helpful puts our function on module.exports for us
        let scrypt = module.exports;
        module.exports = {};

        // Run the scryptPromise module and inject the browserfied scryptsy library
        const scryptPromiseData = fs.readFileSync('../src/js/scryptPromise.js', 'utf8')

        let µBlock = { };
        eval(scryptPromiseData);
        // Verify our files got attached to the µBlock object
        expect(µBlock.scrypt).not.toBeFalsy();

        let generatedResult = await µBlock.scrypt("password".normalize('NFKC'), "PEACH", 32);

        // expectedResult and generatedResult are different types, hence the need for this convoluted conparision. This may request further changes later on.

        expect(generatedResult.length).toBe(expectedResult.length);
        for (let i = 0; i < generatedResult.length; i++) {
            expect(generatedResult[i]).toBe(expectedResult[i]);
        }
    });

    it("test_import_the_session_keys_library_correctly_and_get_correct_results", async () => {
        const mockTime = require('jest-mock-now');
        mockTime(new Date('2021-06-10T01:00:00Z'));

        const nodejsPasswordKeyService = require('../services/passwordKeyService.js').default;
        let expectedResult = await nodejsPasswordKeyService.GenerateNaclKeysFromHashedPassword('user@example.com', 'my secret password');

        const sessionKeysData = fs.readFileSync('../src/js/dist/sessionKeys.js', 'utf8');
        eval(sessionKeysData);
        // Browserify helpful puts our function on module.exports for us
        let sessionKeys = module.exports;
        module.exports = {};

        // Run the scryptPromise module and inject the browserfied scryptsy library
        const sessionKeysHelperData = fs.readFileSync('../src/js/sessionKeysHelper.js', 'utf8')

        let µBlock = { };
        eval(sessionKeysHelperData);
        // Verify our files got attached to the µBlock object
        expect(µBlock.sessionKeys).not.toBeFalsy();

        // Inject the browserfied passwordKeyService.js helper library
        const passwordKeyServiceData = fs.readFileSync('../src/js/passwordKeyService.js', 'utf8')

        eval(passwordKeyServiceData);

        let generatedResult = await µBlock.passwordKeyService.GenerateNaclKeysFromHashedPassword('user@example.com', 'my secret password');

        expect(generatedResult).toEqual(expectedResult);
    });

    it("test_import_the_tweetnacl_library_correctly_and_get_correct_results", async () => {
        const mockTime = require('jest-mock-now');
        mockTime(new Date('2021-06-10T01:00:00Z'));

        // Get the Nodejs tweetnacl.hash function and generate a hash
        const nodejsTweetNacl = require('tweetnacl');
        let expectedResult = nodejsTweetNacl.hash(new Uint8Array([1,2,3,4]));

        const tweetNaclData = fs.readFileSync('../src/js/dist/nacl.min.js', 'utf8');
        eval(tweetNaclData);
        // Browserify helpfully puts our function on module.exports for us
        let nacl = module.exports;
        module.exports = {};

        // Inject the browserfied tweetnacl.js helper library
        const tweetNaclHelperData = fs.readFileSync('../src/js/tweetNaclHelper.js', 'utf8')

        let µBlock = { };
        eval(tweetNaclHelperData);
        // Verify our files got attached to the µBlock object
        expect(µBlock.nacl).not.toBeFalsy();

        // Test the two versions of the functino produce the same output
        let generatedResult = µBlock.nacl.hash(new Uint8Array([1,2,3,4]));

        expect(generatedResult).toEqual(expectedResult);
    });

    it("test_import_the_tweetnacl_util_library_correctly_and_get_correct_results", async () => {
      const mockTime = require('jest-mock-now');
      mockTime(new Date('2021-06-10T01:00:00Z'));

      // Get the Nodejs tweetnacl.hash function and generate a hash
      const nodejsTweetNacl = require('tweetnacl-util');
      let expectedResult = nodejsTweetNacl.encodeBase64(new Uint8Array([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]));

      //Set up nacl as per instructions in the tweetnacl-util.js readme
      const tweetNaclData = fs.readFileSync('../src/js/dist/nacl.min.js', 'utf8');
      eval(tweetNaclData);
      // Browserify helpfully puts our function on module.exports for us
      let nacl = module.exports;
      module.exports = {};

      // Inject the browserfied tweetnacl.js helper library
      const tweetNaclHelperData = fs.readFileSync('../src/js/tweetNaclHelper.js', 'utf8');
      let µBlock = { };
      eval(tweetNaclHelperData);

      const tweetNaclUtilData = fs.readFileSync('../src/js/dist/nacl-util.min.js', 'utf8');
      eval(tweetNaclUtilData);
      // Browserify helpful puts our function on module.exports for us
      nacl.util = module.exports;
      module.exports = {};

      // Inject the browserfied tweetnacl-util.js helper library
      const tweetNaclUtilHelperData = fs.readFileSync('../src/js/tweetNaclUtilHelper.js', 'utf8')

      eval(tweetNaclUtilHelperData);
      // Verify our files got attached to the µBlock object
      expect(µBlock.nacl.util).not.toBeFalsy();

      // Test the two versions of the functino produce the same output
      let generatedResult = µBlock.nacl.util.encodeBase64(new Uint8Array([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]));

      expect(generatedResult).toEqual(expectedResult);
  });

  it("test_import_the_axios_library_correctly_and_get_correct_results", async () => {
    const mockTime = require('jest-mock-now');
    mockTime(new Date('2021-06-10T01:00:00Z'));

    // Get the Nodejs tweetnacl.hash function and generate a hash
    const nodejsAxios = require('axios');

    const axiosData = fs.readFileSync('../src/js/dist/axios.min.js', 'utf8');
    eval(axiosData);
    // Browserify helpfully puts our function on module.exports for us
    let axios = module.exports;
    module.exports = {};

    // Inject the browserfied tweetnacl.js helper library
    const axiosHelperData = fs.readFileSync('../src/js/axiosHelper.js', 'utf8')

    let µBlock = { };
    eval(axiosHelperData);
    // Verify our files got attached to the µBlock object
    expect(µBlock.axios).not.toBeFalsy();

    let µBlockAxiosSet = new Set(Object.keys(µBlock.axios));
    µBlockAxiosSet.delete("VERSION");

    let nodejsAxiosSet = new Set(Object.keys(nodejsAxios));

    // Axios functions do IO, so just check they are their
    expect(µBlockAxiosSet).toEqual(nodejsAxiosSet);
  });

  it("test_import_the_password_key_server_library_correctly_and_get_correct_results", async () => {
    const nodejsPasswordKeyService = require('../services/passwordKeyService.js').default;

    const mockTime = require('jest-mock-now');
    mockTime(new Date('2021-06-10T01:00:00Z'));

    // Get the Nodejs tweetnacl.hash function and generate a hash
    const nodejsTweetNacl = require('tweetnacl-util');
    let expectedResult = nodejsTweetNacl.encodeBase64(new Uint8Array([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]));

    //Set up nacl as per instructions in the tweetnacl-util.js readme
    const tweetNaclData = fs.readFileSync('../src/js/dist/nacl.min.js', 'utf8');
    eval(tweetNaclData);
    // Browserify helpfully puts our function on module.exports for us
    let nacl = module.exports;
    module.exports = {};

    // Inject the browserfied tweetnacl.js helper library
    const tweetNaclHelperData = fs.readFileSync('../src/js/tweetNaclHelper.js', 'utf8');
    let µBlock = { };
    eval(tweetNaclHelperData);

    const tweetNaclUtilData = fs.readFileSync('../src/js/dist/nacl-util.min.js', 'utf8');
    eval(tweetNaclUtilData);
    // Browserify helpful puts our function on module.exports for us
    nacl.util = module.exports;
    module.exports = {};

    // Inject the browserfied tweetnacl-util.js helper library
    const tweetNaclUtilHelperData = fs.readFileSync('../src/js/tweetNaclUtilHelper.js', 'utf8')

    eval(tweetNaclUtilHelperData);
    // Verify our files got attached to the µBlock object
    expect(µBlock.nacl.util).not.toBeFalsy();

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
    // Verify our files got attached to the µBlock object
    expect(µBlock.passwordKeyService).not.toBeFalsy();
    expect(µBlock.passwordKeyService.SignString).not.toBeFalsy();
    expect(µBlock.passwordKeyService.GenerateNaclKeysFromHashedPassword).not.toBeFalsy();

    let userName = 'mark@deliveryengine.net';
    let password = "password";

    let hashedPassword = await nodejsPasswordKeyService.HashPassword(password);

    let keys = await µBlock.passwordKeyService.GenerateNaclKeysFromHashedPassword(userName, hashedPassword);
    let privateKey = keys.naclSigningKeyPairBase64.secretKey;
    let publicKey = keys.naclSigningKeyPairBase64.publicKey;

    let signature = µBlock.passwordKeyService.SignString("Hello world", privateKey);
    let signedData = nodejsPasswordKeyService.VerifySignatureString(signature, publicKey);

    signedData = signedData == null ? null : new TextDecoder("utf-8").decode(signedData);

    expect(signedData).toBe("Hello world");
  });
});
