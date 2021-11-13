'use strict';

const exp = require('constants');
const fs = require('fs')

describe("verify_we_can_build_daily_summaries", () => {
    it("test_building_a_daily_summaries_with_simulated_records_already_in_chrome_storage", async () => {
        const mockTime = require('jest-mock-now');
        mockTime(new Date('2021-06-10T01:00:00Z'));

        const storeUrlData = fs.readFileSync('../src/js/storeUrl.js', 'utf8')
        const historySummaryServiceData = fs.readFileSync('../src/js/historySummaryService.js', 'utf8')

        let mockLocalStorage = {
            PEACHHISTORYINDEXSTART: 0,
            PEACHHISTORY0: { url: "https://www.facebook.com", at: (new Date('2021-06-09T23:00:01Z')).getTime()},
            PEACHHISTORY1: { url: "https://www.google.com", at: (new Date('2021-06-09T23:00:02Z')).getTime()},
            PEACHHISTORY2: { url: "https://www.businessinsider.com", at: (new Date('2021-06-10T00:00:01Z')).getTime()},
            PEACHHISTORYINDEXEND: 3,
            PEACHHISTORYEARLIESTUPDATE: new Date('2021-06-09T23:00:01Z')
        };
        // Mock out the local storage
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

        // Simulate what the background does when it loads the file
        let µBlock = {
            localStorageSet,
            localStorageGet,
            localStorageRemove
         };
        eval(storeUrlData);
        eval(historySummaryServiceData);

        let task = µBlock.processHistoryForUpload();
        expect(µBlock.processHistoryForUploadLock).toBeTruthy();
        await task;
        expect(µBlock.processHistoryForUploadLock).toBeFalsy();

        // Test data moved out of the short term storage
        expect(mockLocalStorage['PEACHHISTORYINDEXSTART']).toBe(2);
        expect('PEACHHISTORY0' in mockLocalStorage).toBe(false);
        expect('PEACHHISTORY1' in mockLocalStorage).toBe(false);

        expect(mockLocalStorage['PEACHUPLOADSTARTDATE']).toBe((new Date('2021-06-09')).getTime());
        let upload = mockLocalStorage['PEACHUPLOAD2021-06-09'];
        expect(Array.isArray(upload)).toBe(true);
        expect(upload.length).toBe(2);
        expect(upload[0].url).toBe("https://www.facebook.com");
        expect(upload[0].at).toBe((new Date('2021-06-09T23:00:01Z')).getTime());
        expect(upload[1].url).toBe("https://www.google.com");
        expect(upload[1].at).toBe((new Date('2021-06-09T23:00:02Z')).getTime());
    });

    it("test_building_a_daily_summaries_does_not_update_the_start_date_if_it_is_already_set", async () => {
        const mockTime = require('jest-mock-now');
        mockTime(new Date('2021-06-10T01:00:00Z'));

        const storeUrlData = fs.readFileSync('../src/js/storeUrl.js', 'utf8')
        const historySummaryServiceData = fs.readFileSync('../src/js/historySummaryService.js', 'utf8')

        let mockLocalStorage = {
            PEACHHISTORYINDEXSTART: 0,
            PEACHHISTORY0: { url: "https://www.facebook.com", at: (new Date('2021-06-09T23:00:01Z')).getTime()},
            PEACHHISTORY1: { url: "https://www.google.com", at: (new Date('2021-06-09T23:00:02Z')).getTime()},
            PEACHHISTORY2: { url: "https://www.businessinsider.com", at: (new Date('2021-06-10T00:00:01Z')).getTime()},
            PEACHHISTORYINDEXEND: 3,
            PEACHHISTORYEARLIESTUPDATE: new Date('2021-06-09T23:00:01Z'),
            // Simulate that you have an old upload waiting to go
            PEACHUPLOADSTARTDATE: (new Date('2021-06-08')).getTime()
        };
        // Mock out the local storage
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

        // Simulate what the background does when it loads the file
        let µBlock = {
            localStorageSet,
            localStorageGet,
            localStorageRemove
         };
        eval(storeUrlData);
        eval(historySummaryServiceData);

        await µBlock.processHistoryForUpload();

        expect(mockLocalStorage['PEACHUPLOADSTARTDATE']).toBe((new Date('2021-06-08')).getTime());
    });
});
 