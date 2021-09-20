'use strict';

import chromeLocalStorageService from '../services/chromeLocalStorageService';
import config from '../config/config.js'

async function hasEverLoggedIn()
{
  try
  {
    config;
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
