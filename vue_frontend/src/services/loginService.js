'use strict';

import chromeLocalStorageService from '../services/chromeLocalStorageService';
import config from '../config/config.js'
import passwordKeyService from '../services/passwordKeyService';
import axios from 'axios';
import nacl_util from 'tweetnacl-util';

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

async function isLoggedInCorrectly(store)
{
    try
    {
      return await attemptLogin(store, chromeLocalStorageService.localStorageGet("PEACHUSERNAME"), !await chromeLocalStorageService.localStorageGet("PEACHKEY"));
    }
    catch(err)
    {
      return false;
    }
}

async function attemptLogin(store, userName, hashedPassword) {
    let keys = await passwordKeyService.GenerateNaclKeys(userName, hashedPassword);
    let privateKey = keys.naclSigningKeyPairBase64.secretKey;
    let publicKey = keys.naclSigningKeyPairBase64.publicKey;

    let resp = await axios.get(new URL('/api/challengecode', config.serverUrl));
    let challengeCode = resp.data;

    let logInCommand = {
        name: userName,
        challengeCode: challengeCode,
        publicKey: publicKey
      };
    let jsonCommand = JSON.stringify(logInCommand);

    let signature = passwordKeyService.SignString(jsonCommand, privateKey);

    let encodedJsonComannd1 = (new TextEncoder()).encode(jsonCommand);

    let encodedJsonComannd2 = nacl_util.encodeBase64(encodedJsonComannd1);

    let payload = {
        loginCommand: encodedJsonComannd2,
        signature
    }
    return await axios.post(new URL('/api/login', config.serverUrl), payload);
}

function login(store, username, password) {
  return attemptLogin(store, username, password);
}

export default {
    isLoggedInCorrectly,
    hasEverLoggedIn,
    login
}
