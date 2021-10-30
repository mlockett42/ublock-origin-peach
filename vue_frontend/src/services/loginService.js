'use strict';

import chromeLocalStorageService from '../services/chromeLocalStorageService';
import config from '../config/config.js'
import passwordKeyService from '../services/passwordKeyService';
import axios from 'axios';
import nacl_util from 'tweetnacl-util';
import loginExceptions from '../exceptions/LoginException.js'

async function hasEverLoggedIn()
{
  try
  {
    return await chromeLocalStorageService.localStorageGet("PEACHHASEVERLOGGEDIN");
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
    if (!await hasEverLoggedIn())
    {
      return;
    }
    
    await attemptLogin(store, 
                        await chromeLocalStorageService.localStorageGet("PEACHUSERNAME"), 
                        await chromeLocalStorageService.localStorageGet("PEACHKEY")
    );
    return true;
  }
  catch(err)
  {
    return false;
  }
}

async function attemptLogin(store, userName, hashedPassword) {
    let keys = await passwordKeyService.GenerateNaclKeysFromHashedPassword(userName, hashedPassword);
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

    let encodedJsonCommand1 = (new TextEncoder()).encode(jsonCommand);

    let encodedJsonCommand2 = nacl_util.encodeBase64(encodedJsonCommand1);

    let payload = {
        loginCommand: encodedJsonCommand2,
        signature
    }
    let result = null;
    try
    {
      result = await axios.post(new URL('/api/login', config.serverUrl), payload);
    }
    catch (err)
    {
      if (err.response && err.response.status == 400) {
        throw new loginExceptions.LoginException(err.response.data.message);
      }
      throw err;
    }
    store.dispatch('authentication/loginSuccess', result.data.user,  result.data.bearerToken);
    await chromeLocalStorageService.localStorageSet("PEACHUSERNAME", userName);
    await chromeLocalStorageService.localStorageSet("PEACHKEY", hashedPassword);
    await chromeLocalStorageService.localStorageSet("PEACHHASEVERLOGGEDIN", true);
    return result;
}

async function login(store, username, password) {
  return await attemptLogin(store, username, await passwordKeyService.HashPassword(password));
}

async function logout(store) {
  await chromeLocalStorageService.localStorageSet("PEACHUSERNAME", null);
  await chromeLocalStorageService.localStorageSet("PEACHKEY", null);
  store.dispatch('authentication/logout');
}

async function createUser(userName, password)
{
  let resp = await axios.get(new URL('/api/challengecode', config.serverUrl));
  let challengeCode = resp.data;

  let keys = await passwordKeyService.GenerateNaclKeysFromHashedPassword(userName, await passwordKeyService.HashPassword(password));
  let privateKey = keys.naclSigningKeyPairBase64.secretKey;
  let publicKey = keys.naclSigningKeyPairBase64.publicKey;

  let createUserCommand = {
      name: userName,
      challengeCode: challengeCode,
      publicKey: publicKey
    };
  let jsonCommand = JSON.stringify(createUserCommand);
  let signature = passwordKeyService.SignString(jsonCommand, privateKey);
  jsonCommand = (new TextEncoder()).encode(jsonCommand);
  
  let payload = {
      createUserCommand: nacl_util.encodeBase64(jsonCommand),
      signature
  }
  try {
      resp = await axios.post(new URL('/api/createLogin', config.serverUrl), payload);
  }
  catch (err) {
      alert("There was an error err.data.message=", err.response.data.message);
      return false;
  }
  return true;
}


export default {
    isLoggedInCorrectly,
    hasEverLoggedIn,
    login,
    logout,
    createUser
}
