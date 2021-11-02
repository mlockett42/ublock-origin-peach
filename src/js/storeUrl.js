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
    await µBlock.localStorageSet(`PEACHHISTORYINDEXEND`, endAt + 1);
    await µBlock.localStorageSet(`PEACHHISTORY${endAt}`, { url, at: Date.now()})
  }
  catch(err)
  {
    return 0;
  }
}

µBlock.storeUrl = async function (url) {
    let endAt = await getEndPeachHistoryIndex();
    console.log(`storeUrl ${endAt}`);

    //let nextAt = endAt + 1;

    await storePeachHistoryIndex(endAt, url);

    console.log(`storeUrl done endAt=${endAt} url=${url}`)
}

