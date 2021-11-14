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
});
