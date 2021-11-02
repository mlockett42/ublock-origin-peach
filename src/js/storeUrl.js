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

async function storePeachHistoryIndex(newEndAt, url)
{
  try
  {
    await µBlock.localStorageSet(`PEACHHISTORYINDEXEND`, newEndAt);
    await µBlock.localStorageSet(`PEACHHISTORY${newEndAt}`, { url, at: Date.now()})
  }
  catch(err)
  {
    return 0;
  }
}

µBlock.storeUrl = async function (url) {
    let endAt = await getEndPeachHistoryIndex();
    console.log(`storeUrl ${endAt}`);

    let nextAt = endAt + 1;

    await storePeachHistoryIndex(nextAt, url);

    console.log(`storeUrl done nextAt=${nextAt} url=${url}`)
}

