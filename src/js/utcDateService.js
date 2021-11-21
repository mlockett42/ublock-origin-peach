'use strict';

µBlock.getStartOfUtcDay = function(d) {
    let result = new Date();
    result.setUTCFullYear(d.getUTCFullYear());
    result.setUTCMonth(d.getUTCMonth());
    result.setUTCDate(d.getUTCDate());
    result.setUTCHours(0);
    result.setUTCMinutes(0);
    result.setUTCSeconds(0);
    result.setUTCMilliseconds(0);

    return result;
}

µBlock.formatUTCDate = function(d) {
    return `${d.getUTCFullYear()}-${(d.getUTCMonth() + 1).toString().padStart(2, "0")}-${d.getUTCDate().toString().padStart(2, "0")}`;
}
