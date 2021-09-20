'use strict';

function localStorageSet(key, value) {
    return new Promise(function(resolve/*, reject*/) {
        chrome.storage.local.set({[key]: value}, function() {
            resolve();
          });
        });    
}

function localStorageGet(key) {
    return new Promise(function(resolve/*, reject*/) {
        chrome.storage.local.get([key], function(result) {
            resolve(result[key]);
          });
        });    
}

export default {
    localStorageSet,
    localStorageGet
}