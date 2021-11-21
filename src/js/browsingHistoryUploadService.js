'use strict';

µBlock.uploadBrowsingHistoryUpdates = async function() {
    if (µBlock.uploadBrowsingHistoryLock) {
        return;
    }
    µBlock.uploadBrowsingHistoryLock = true;
    let now = Date.now();
    let today = µBlock.getStartOfUtcDay(new Date(now)).getTime();

    let peachStartDate = await µBlock.localStorageGet('PEACHUPLOADSTARTDATE');
    let currentUploadDate = peachStartDate;

    try {
        while (currentUploadDate < today) {
            let data = await µBlock.localStorageGet(`PEACHUPLOAD${µBlock.formatUTCDate(new Date(currentUploadDate))}`);
            await µBlock.axios.post(new URL('/api/fileUpload', 'https://server.gopeach.app'), {"content": JSON.stringify(data)});
            currentUploadDate += 24 * 60 * 60 * 1000; // Number of milliseconds in a day
            await µBlock.localStorageSet('PEACHUPLOADSTARTDATE', currentUploadDate);
        }
    }
    catch {
        // Just swallow the exception
    }
    finally {
        µBlock.uploadBrowsingHistoryLock = false;
    }
}
