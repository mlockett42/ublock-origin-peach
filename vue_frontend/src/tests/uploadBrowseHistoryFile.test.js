'use strict';

const fs = require('fs')

describe("verify_we_can_build_daily_summaries", () => {
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
        function GenerateNaclKeysForExample(sessionKeysLibrary, userName, password) 
        {
          let promise = new Promise(function(resolve, reject) {
            sessionKeysLibrary.generate(userName, password, function(err, keys) {
              if (err) {
                reject(err);
                return;
              }
              resolve(keys);
            })
          });
          return promise;     
        }

        const mockTime = require('jest-mock-now');
        mockTime(new Date('2021-06-10T01:00:00Z'));

        // Get the Nodejs scrypt function and generate a key
        const nodejsSessionKeys = require('session-keys');
        let expectedResult = await GenerateNaclKeysForExample(nodejsSessionKeys, 'user@example.com', 'my secret password');

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

        let generatedResult = await GenerateNaclKeysForExample(µBlock.sessionKeys, 'user@example.com', 'my secret password');

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
        // Browserify helpful puts our function on module.exports for us
        let tweetNacl = module.exports;
        module.exports = {};

        // Inject the browserfied tweetnacl.js helper library
        const tweetNaclHelperData = fs.readFileSync('../src/js/tweetNaclHelper.js', 'utf8')

        let µBlock = { };
        eval(tweetNaclHelperData);
        // Verify our files got attached to the µBlock object
        expect(µBlock.tweetNacl).not.toBeFalsy();

        // Test the two versions of the functino produce the same output
        let generatedResult = µBlock.tweetNacl.hash(new Uint8Array([1,2,3,4]));

        expect(generatedResult).toEqual(expectedResult);
    });


    it("test_import_the_tweetnacl_util_library_correctly_and_get_correct_results", async () => {
      const mockTime = require('jest-mock-now');
      mockTime(new Date('2021-06-10T01:00:00Z'));

      // Get the Nodejs tweetnacl.hash function and generate a hash
      const nodejsTweetNacl = require('tweetnacl-util');
      let expectedResult = nodejsTweetNacl.encodeUTF8(new Uint8Array([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]));

      const tweetNaclUtilData = fs.readFileSync('../src/js/dist/nacl-util.min.js', 'utf8');
      eval(tweetNaclUtilData);
      // Browserify helpful puts our function on module.exports for us
      let tweetNaclUtil = module.exports;
      module.exports = {};

      // Inject the browserfied tweetnacl-util.js helper library
      const tweetNaclUtilHelperData = fs.readFileSync('../src/js/tweetNaclUtilHelper.js', 'utf8')

      let µBlock = { };
      eval(tweetNaclUtilHelperData);
      // Verify our files got attached to the µBlock object
      expect(µBlock.tweetNaclUtil).not.toBeFalsy();

      // Test the two versions of the functino produce the same output
      let generatedResult = µBlock.tweetNaclUtil.encodeUTF8(new Uint8Array([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]));

      expect(generatedResult).toEqual(expectedResult);
  });
});
