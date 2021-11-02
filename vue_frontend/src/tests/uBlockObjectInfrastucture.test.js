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
    });

    it("test_store_url_calls_localStorage_correctly", async () => {
        const mockTime = require('jest-mock-now');
        mockTime(new Date('2021-06-10T00:00:00Z'));

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

        expect(localStorageGet.mock.calls.length).toBe(1);
        expect(localStorageSet.mock.calls.length).toBe(2);
        expect(localStorageSet.mock.calls[0][0]).toBe("PEACHHISTORYINDEXEND");
        expect(localStorageSet.mock.calls[0][1]).toBe(1);
        expect(localStorageSet.mock.calls[1][0]).toBe("PEACHHISTORY0");
        var dataParam = localStorageSet.mock.calls[1][1];
        expect(dataParam.url).toBe("https://www.google.com");
        expect(dataParam.at).toBe((new Date('2021-06-10T00:00:00Z')).getTime());
    });

    it("test_store_url_ignores_about_urls", async () => {
        const mockTime = require('jest-mock-now');
        mockTime(new Date('2021-06-10T00:00:00Z'));

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
});
