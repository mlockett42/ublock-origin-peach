if (µBlock.peachConfig.runRegularUploads) {

    chrome.alarms.create("check_for_upload", {delayInMinutes: 5, periodInMinutes: 60} );

    chrome.alarms.onAlarm.addListener(
        async (alarm) => {
            if (alarm.name == "check_for_upload") {
                await µBlock.processHistoryForUpload();
                await µBlock.uploadBrowsingHistoryUpdates();
            }
        }
    )
}
