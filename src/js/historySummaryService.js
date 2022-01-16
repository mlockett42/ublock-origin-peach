'use strict';

function getStartOfDayByDate(epoch) {
    return epoch - (epoch % (86400 * 1000));
}

function getStartOfDay() {
    return getStartOfDayByDate(Date.now());
}

async function getStartPeachHistoryIndex()
{
  try
  {
    return await µBlock.localStorageGet(`PEACHHISTORYINDEXSTART`) ?? 0;
  }
  catch(err)
  {
    return 0;
  }
}

async function setStartPeachHistoryIndex(index)
{
    await µBlock.localStorageSet("PEACHHISTORYINDEXSTART", index);
}

async function setUploadStartDate(d) {
    // Only update the start date if it has never been updated previously. Otherwise this value is updated by the actually uploader
    if (!(await µBlock.localStorageGet("PEACHUPLOADSTARTDATE"))) {
        await µBlock.localStorageSet("PEACHUPLOADSTARTDATE", d);
    }
}

µBlock.processHistoryForUpload = async function() {
    µBlock.processHistoryForUploadLock = true;
    try {
        let startAt = await getStartPeachHistoryIndex();
        if (startAt == 0) {
            startAt = 1;
        }
        let endAt = await µBlock.getEndPeachHistoryIndex();
        let records = [];
        let recordsByDay = [];
        let recordInPast = true;
        let startOfDay = getStartOfDay();
        let lastDay = null;
        let i = null;
        let newStartAt = null;
        let historyToDelete = [];
        // Loop over every record and load it into a daily batch
        for (i = startAt; i < endAt && recordInPast ; i++) {
            let record = await µBlock.localStorageGet(`PEACHHISTORY${i}`);
            if (record.at !== lastDay && lastDay !== null) {
                recordsByDay.push(records);
                records = [];
                lastDay = record.at;
            }
            if (record.at >= startOfDay) {
                recordInPast = false;
            }
            else {
                records.push(record);
                newStartAt = i + 1;
                historyToDelete.push(`PEACHHISTORY${i}`);
            }
        }
        if (records.length > 0) {
            recordsByDay.push(records);
        }
        if (recordsByDay.length > 0) {
            await setUploadStartDate(getStartOfDayByDate(recordsByDay[0][0].at))
        }
        for (let i = 0; i < recordsByDay.length; i++) {
            records = recordsByDay[i];
            let recordDate = new Date(getStartOfDayByDate(records[0].at));
            let recordDateKey = `PEACHUPLOAD${recordDate.getUTCFullYear()}-${(recordDate.getUTCMonth() + 1).toString().padStart(2, "0")}-${recordDate.getUTCDate().toString().padStart(2, "0")}`;
            await µBlock.localStorageSet(recordDateKey, records);
        }
        if (newStartAt !== null) {
            await setStartPeachHistoryIndex(newStartAt);
        }
        await µBlock.localStorageRemove(historyToDelete);
    }
    finally {
        µBlock.processHistoryForUploadLock = false;
    }
}