if (µBlock.peachConfig.runRegularUploads) {

    chrome.alarms.create("check_for_upload", {delayInMinutes: 5, periodInMinutes: 60} );

    µBlock.checkAndUploadBrowserHistory = async function(alarm) {
        let sellingState = await µBlock.localStorageGet("PEACHSELLINGSTATE");
        if (alarm.name == "check_for_upload" && sellingState) {
            await µBlock.processHistoryForUpload();
            await µBlock.uploadBrowsingHistoryUpdates();
        }
    }

    chrome.alarms.onAlarm.addListener(µBlock.checkAndUploadBrowserHistory);
}
