'use strict';

import chromeLocalStorageService from '../services/chromeLocalStorageService';

async function hasEverLoggedIn()
{
  try
  {
    return !(!await chromeLocalStorageService.localStorageGet("PEACHUSERNAME") && !await chromeLocalStorageService.localStorageGet("PEACHKEY"));
  }
  catch(err)
  {
    return false;
  }
}

async function isLoggedInCorrectly()
{
    let peachKey = null;
    try
    {
     peachKey = await chromeLocalStorageService.localStorageGet("PEACHKEY");
    }
    catch(err)
    {
      peachKey = "Was error";
    }
    return !!peachKey;
}

export default {
    isLoggedInCorrectly,
    hasEverLoggedIn
}
