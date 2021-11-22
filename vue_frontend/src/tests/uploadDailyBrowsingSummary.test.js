'use strict';

// import axios from "axios";
//import browsingHistoryUploadService from '../services/browsingHistoryUploadService.js'

// jest.mock("axios");

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
        throw `Unknown pathname = ${url}`;
    }

    function initiseUploadEnvironment(mockLocalStorage, mockAxios) {
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
            axios: mockAxios
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

    it("test_we_upload_previous_file_which_are_waiting", async () => {
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

        expect(µBlock.axios.get).toHaveBeenCalledTimes(1);
        let params = µBlock.axios.get.mock.calls;
        expect(params[0][0].toString()).toBe('https://server.gopeach.app/api/peachPublicKey');
        
        expect(µBlock.axios.post).toHaveBeenCalledTimes(2);
        params = µBlock.axios.post.mock.calls;

        expect(params[0][0].toString()).toBe('https://server.gopeach.app/api/fileUpload');
        expect(params[1][0].toString()).toBe('https://server.gopeach.app/api/fileUpload');
        let uploaded = params[0][1];
        expect('signature' in uploaded).toBe(true);
        expect('encryptedContent' in uploaded).toBe(true);
        expect(uploaded.senderPublicKey).toBe(senderPublicKeyBase64);
        let decryptedContent = nodejsTweetNacl.box.open(
            nodejsTweetNacl.util.decodeBase64(uploaded.encryptedContent),
            nodejsTweetNacl.util.decodeBase64(uploaded.nonce),
            nodejsTweetNacl.util.decodeBase64(uploaded.senderPublicKey),
            peachKeys.secretKey
        )
        let content1 = JSON.parse(nodejsTweetNacl.util.encodeUTF8(decryptedContent));

        expect(content1.length).toBe(mockLocalStorage["PEACHUPLOAD2021-06-08"].length);
        for(let i = 0; i < mockLocalStorage["PEACHUPLOAD2021-06-08"].length ; i++) {
            let content = content1[i];
            expect(dictEquals(content, mockLocalStorage["PEACHUPLOAD2021-06-08"][i])).toBe(true);
        }

        uploaded = params[1][1];
        expect(uploaded.senderPublicKey).toBe(senderPublicKeyBase64);
        decryptedContent = nodejsTweetNacl.box.open(
            nodejsTweetNacl.util.decodeBase64(uploaded.encryptedContent),
            nodejsTweetNacl.util.decodeBase64(uploaded.nonce),
            nodejsTweetNacl.util.decodeBase64(uploaded.senderPublicKey),
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

        expect(params[0][0].toString()).toBe('https://server.gopeach.app/api/fileUpload');
        expect(params[1][0].toString()).toBe('https://server.gopeach.app/api/fileUpload');

        let uploaded = params[0][1];
        expect(uploaded.senderPublicKey).toBe(senderPublicKeyBase64);
        let decryptedContent = nodejsTweetNacl.box.open(
            nodejsTweetNacl.util.decodeBase64(uploaded.encryptedContent),
            nodejsTweetNacl.util.decodeBase64(uploaded.nonce),
            nodejsTweetNacl.util.decodeBase64(uploaded.senderPublicKey),
            peachKeys.secretKey
        )
        let content1 = JSON.parse(nodejsTweetNacl.util.encodeUTF8(decryptedContent));
        expect(content1.length).toBe(mockLocalStorage["PEACHUPLOAD2021-06-08"].length);
        for(let i = 0; i < mockLocalStorage["PEACHUPLOAD2021-06-08"].length ; i++) {
            let content = content1[i];
            expect(dictEquals(content, mockLocalStorage["PEACHUPLOAD2021-06-08"][i])).toBe(true);
        }

        uploaded = params[1][1];
        expect(uploaded.senderPublicKey).toBe(senderPublicKeyBase64);
        decryptedContent = nodejsTweetNacl.box.open(
            nodejsTweetNacl.util.decodeBase64(uploaded.encryptedContent),
            nodejsTweetNacl.util.decodeBase64(uploaded.nonce),
            nodejsTweetNacl.util.decodeBase64(uploaded.senderPublicKey),
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
});

