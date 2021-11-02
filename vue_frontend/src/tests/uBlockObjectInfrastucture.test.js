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
});
