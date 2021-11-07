'use strict';

const fs = require('fs')

describe("verify_we_can_load_files_intended_for_background_page", () => {
    it("test_using_eval_to_do_an_import", () => {
        const data = fs.readFileSync('../src/js/chromeLocalStorageService.js', 'utf8')

        // Simulate what the background does when it loads the file
        let µBlock = { };
        eval(data);

        // Verify our files got attached to the µBlock object
        expect(µBlock.localStorageSet).not.toBeFalsy();
        expect(µBlock.localStorageGet).not.toBeFalsy();
        expect(µBlock.localStorageRemove).not.toBeFalsy();
    });

    it("test_store_url_calls_localStorage_correctly", async () => {
        const mockTime = require('jest-mock-now');
        mockTime(new Date('2021-06-10T00:00:01Z'));

        const data = fs.readFileSync('../src/js/storeUrl.js', 'utf8')

        // Mock out the local storage
        const localStorageSet = jest.fn(x => null);
        const localStorageGet = jest.fn(x => 0);

        // Simulate what the background does when it loads the file
        let µBlock = {
            localStorageSet,
            localStorageGet
         };
        eval(data);

        // Verify our files got attached to the µBlock object
        expect(µBlock.storeUrl).not.toBeFalsy();

        await µBlock.storeUrl("https://www.google.com");

        expect(localStorageGet.mock.calls.length).toBe(2);
        expect(localStorageGet.mock.calls[0][0]).toBe("PEACHHISTORYINDEXEND");
        expect(localStorageGet.mock.calls[1][0]).toBe("PEACHHISTORYEARLIESTUPDATE");
        expect(localStorageSet.mock.calls.length).toBe(3);
        expect(localStorageSet.mock.calls[0][0]).toBe("PEACHHISTORYINDEXEND");
        expect(localStorageSet.mock.calls[0][1]).toBe(1);
        expect(localStorageSet.mock.calls[1][0]).toBe("PEACHHISTORY0");
        expect(localStorageSet.mock.calls[2][0]).toBe("PEACHHISTORYEARLIESTUPDATE");
        var dataParam = localStorageSet.mock.calls[1][1];
        expect(dataParam.url).toBe("https://www.google.com");
        expect(dataParam.at).toBe((new Date('2021-06-10T00:00:01Z')).getTime());
    });

    it("test_store_url_ignores_about_urls", async () => {
        const data = fs.readFileSync('../src/js/storeUrl.js', 'utf8')

        // Mock out the local storage
        const localStorageSet = jest.fn(x => null);
        const localStorageGet = jest.fn(x => 0);

        // Simulate what the background does when it loads the file
        let µBlock = {
            localStorageSet,
            localStorageGet
         };
        eval(data);

        // Verify our files got attached to the µBlock object
        expect(µBlock.storeUrl).not.toBeFalsy();

        await µBlock.storeUrl("about:blank");

        expect(localStorageGet.mock.calls.length).toBe(0);
        expect(localStorageSet.mock.calls.length).toBe(0);
    });

    it("test_store_url_stores_the_earliest_recorded_at_correctly", async () => {
        const mockTime = require('jest-mock-now');
        mockTime(new Date('2021-06-10T00:00:01Z'));

        const data = fs.readFileSync('../src/js/storeUrl.js', 'utf8')

        let mockLocalStorage = {};
        // Mock out the local storage
        const localStorageSet = jest.fn((key, value) => mockLocalStorage[key] = value);
        const localStorageGet = jest.fn(key => mockLocalStorage[key]);

        // Simulate what the background does when it loads the file
        let µBlock = {
            localStorageSet,
            localStorageGet
         };
        eval(data);

        // Verify our files got attached to the µBlock object
        expect(µBlock.storeUrl).not.toBeFalsy();
        expect(µBlock.getEarliestRecordedat).not.toBeFalsy();

        // Nothing has been recorded yet
        expect(await µBlock.getEarliestRecordedat()).toBeFalsy();

        expect(localStorageGet.mock.calls.length).toBe(1);
        expect(localStorageGet.mock.calls[0][0]).toBe("PEACHHISTORYEARLIESTUPDATE");

        await µBlock.storeUrl("https://www.google.com");

        expect(localStorageGet.mock.calls.length).toBe(3);
        expect(localStorageGet.mock.calls[0][0]).toBe("PEACHHISTORYEARLIESTUPDATE");
        expect(localStorageGet.mock.calls[1][0]).toBe("PEACHHISTORYINDEXEND");
        expect(localStorageGet.mock.calls[2][0]).toBe("PEACHHISTORYEARLIESTUPDATE");
        expect(localStorageSet.mock.calls.length).toBe(3);
        expect(localStorageSet.mock.calls[0][0]).toBe("PEACHHISTORYINDEXEND");
        expect(localStorageSet.mock.calls[0][1]).toBe(1);
        expect(localStorageSet.mock.calls[1][0]).toBe("PEACHHISTORY0");
        expect(localStorageSet.mock.calls[2][0]).toBe("PEACHHISTORYEARLIESTUPDATE");
        expect(localStorageSet.mock.calls[2][1]).toBe((new Date('2021-06-10T00:00:01Z')).getTime());
        var dataParam = localStorageSet.mock.calls[1][1];
        expect(dataParam.url).toBe("https://www.google.com");
        expect(dataParam.at).toBe((new Date('2021-06-10T00:00:01Z')).getTime());

        // We expect the record we just stored to be the earliest one
        expect(await µBlock.getEarliestRecordedat()).toBe((new Date('2021-06-10T00:00:01Z')).getTime());
    });
});
