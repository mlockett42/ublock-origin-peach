'use strict';

// import axios from "axios";
//import browsingHistoryUploadService from '../services/browsingHistoryUploadService.js'

// jest.mock("axios");

const fs = require('fs')

import testCommon from './testCommon.js';
let dictEquals = testCommon.dictEquals;

describe("verify_we_can_build_daily_summaries", () => {

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
         
        eval(utcDateServiceData);
        eval(browsingHistoryUploadServiceData);

        // Return the µBlock object ready for the caller to use in it's tests
        return µBlock;
    };

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

        let task = µBlock.uploadBrowsingHistoryUpdates();
        expect(µBlock.uploadBrowsingHistoryLock).toBeTruthy();
        await task;
        expect(µBlock.uploadBrowsingHistoryLock).toBeFalsy();

        expect(µBlock.axios.post).toHaveBeenCalledTimes(2);
        
        let params = µBlock.axios.post.mock.calls;

        expect(params[0][0].toString()).toBe('https://server.gopeach.app/api/fileUpload');
        expect(params[1][0].toString()).toBe('https://server.gopeach.app/api/fileUpload');
        let content1 = params[0][1].content;
        content1 = JSON.parse(content1);
        expect(content1.length).toBe(mockLocalStorage["PEACHUPLOAD2021-06-08"].length);
        for(let i = 0; i < mockLocalStorage["PEACHUPLOAD2021-06-08"].length ; i++) {
            expect(dictEquals(content1[i], mockLocalStorage["PEACHUPLOAD2021-06-08"][i])).toBe(true);
        }

        let content2 = params[1][1].content;
        content2 = JSON.parse(content2);
        expect(content2.length).toBe(mockLocalStorage["PEACHUPLOAD2021-06-09"].length);
        for(let i = 0; i < mockLocalStorage["PEACHUPLOAD2021-06-09"].length ; i++) {
            expect(dictEquals(content2[i], mockLocalStorage["PEACHUPLOAD2021-06-09"][i])).toBe(true);
        }

        expect(mockLocalStorage['PEACHUPLOADSTARTDATE']).toBe(µBlock.getStartOfUtcDay(new Date(Date.now())).getTime())
    });

    it("test_if_there_is_an_error_we_will_retry", async() => {
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

        let callCount = 0;
        let wasThrown = false;
        let mockAxios = {
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
        let content1 = params[0][1].content;
        content1 = JSON.parse(content1);
        expect(content1.length).toBe(mockLocalStorage["PEACHUPLOAD2021-06-08"].length);
        for(let i = 0; i < mockLocalStorage["PEACHUPLOAD2021-06-08"].length ; i++) {
            expect(dictEquals(content1[i], mockLocalStorage["PEACHUPLOAD2021-06-08"][i])).toBe(true);
        }

        let content2 = params[1][1].content;
        content2 = JSON.parse(content2);
        expect(content2.length).toBe(mockLocalStorage["PEACHUPLOAD2021-06-09"].length);
        for(let i = 0; i < mockLocalStorage["PEACHUPLOAD2021-06-09"].length ; i++) {
            expect(dictEquals(content2[i], mockLocalStorage["PEACHUPLOAD2021-06-09"][i])).toBe(true);
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

