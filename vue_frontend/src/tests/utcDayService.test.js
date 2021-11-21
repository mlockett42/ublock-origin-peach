'use strict';

const fs = require('fs')

describe("verify_we_can_get_utc_dates_from_date_timed", () => {
    it("test_getting_start_of_day", () => {
        const utcDateServiceData = fs.readFileSync('../src/js/utcDateService.js', 'utf8');

        // Simulate what the background page does when it loads the file
        let µBlock = {};

        eval(utcDateServiceData);

        let startOfUtcDay = µBlock.getStartOfUtcDay(new Date('2021-06-10T01:00:00Z'));

        expect(startOfUtcDay.getTime()).toBe((new Date('2021-06-10T00:00:00Z')).getTime());
    });

    it("test_getting_formatted_utc_data", () => {
        const utcDateServiceData = fs.readFileSync('../src/js/utcDateService.js', 'utf8');

        // Simulate what the background page does when it loads the file
        let µBlock = {};

        eval(utcDateServiceData);

        let startOfUtcDay = µBlock.formatUTCDate(new Date('2021-06-10T01:00:00Z'));

        expect(startOfUtcDay).toBe('2021-06-10');
    });
});

