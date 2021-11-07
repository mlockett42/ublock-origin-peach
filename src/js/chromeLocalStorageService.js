'use strict';

µBlock.localStorageSet = function (key, value) {
    return new Promise(function(resolve/*, reject*/) {
        chrome.storage.local.set({[key]: value}, function() {
            resolve();
          });
        });    
}

µBlock.localStorageGet = function (key) {
    return new Promise(function(resolve/*, reject*/) {
        chrome.storage.local.get([key], function(result) {
            resolve(result[key]);
          });
        });    
}

µBlock.localStorageRemove = function (key) {
  let keys = null;
  if (Array.isArray(key)) {
    keys = key;
  } else {
    keys = [key];
  }
  return new Promise(function(resolve/*, reject*/) {
      chrome.storage.local.remove(keys, function(result) {
          resolve(keys);
        });
      });
}
