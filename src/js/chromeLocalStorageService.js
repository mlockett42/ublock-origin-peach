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

// export default {
//     localStorageSet,
//     localStorageGet
// }