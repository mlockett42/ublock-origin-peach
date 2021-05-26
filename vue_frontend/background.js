chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log('The color is green.');
    });
    // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    //   chrome.declarativeContent.onPageChanged.addRules([{
    //     conditions: [new chrome.declarativeContent.PageStateMatcher({
    //       pageUrl: {hostEquals: 'developer.chrome.com'},
    //     })
    //     ],
    //         actions: [new chrome.declarativeContent.ShowPageAction()]
    //   }]);
    // });
  });

  var myUrl = "Default";
chrome.webRequest.onCompleted.addListener(
    function(details) {
        console.log("details.initiator=", details.initiator);
        if (details.initiator) {
          myURL = details.initiator;
        }
        //return {cancel: details.url.indexOf("://www.evil.com/") != -1};
    },
    {urls: ["<all_urls>"]},
    []
);
