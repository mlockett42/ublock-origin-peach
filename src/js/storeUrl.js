'use strict';

async function getEndPeachHistoryIndex()
{
  try
  {
    return await µBlock.localStorageGet(`PEACHHISTORYINDEXEND`) ?? 0;
  }
  catch(err)
  {
    return 0;
  }
}

async function storePeachHistoryIndex(endAt, url)
{
  try
  {
    let now = Date.now();
    await µBlock.localStorageSet(`PEACHHISTORYINDEXEND`, endAt + 1);
    await µBlock.localStorageSet(`PEACHHISTORY${endAt}`, { url, at: now});

    if (!await µBlock.localStorageGet("PEACHHISTORYEARLIESTUPDATE")) {
      µBlock.localStorageSet("PEACHHISTORYEARLIESTUPDATE", now);
    }
  }
  catch(err)
  {
    return 0;
  }
}

µBlock.storeUrl = async function (url) {
    let pattern = /^about:/;
    if (pattern.test(url)) {
        return;
    }
    let endAt = await getEndPeachHistoryIndex();

    await storePeachHistoryIndex(endAt, url);
}

µBlock.getEarliestRecordedat = async function() {
  return await µBlock.localStorageGet("PEACHHISTORYEARLIESTUPDATE");
}