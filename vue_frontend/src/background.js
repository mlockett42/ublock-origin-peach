global.browser = require('webextension-polyfill')

// browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log("Hello from the background");

//   request; sender; sendResponse;

//   browser.tabs.executeScript({
//     file: "content-script.js",
//   });
// });

console.log("Hello from the background2");

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

let myUrl = "Default";
myUrl;
chrome.webRequest.onCompleted.addListener(
  function(details) {
      
      if (details.initiator && !details.initiator.startsWith("chrome-extension:")) {
        console.log("details.initiator=", details.initiator);
        myURL = details.initiator;
      }
      //return {cancel: details.url.indexOf("://www.evil.com/") != -1};
  },
  {urls: ["<all_urls>"]},
  []
);
