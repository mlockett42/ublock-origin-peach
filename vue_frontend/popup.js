let changeColor = document.getElementById('changeColor');
let lastPage = document.getElementById('lastPage');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

document.addEventListener('DOMContentLoaded', function () {
    var bg = chrome.extension.getBackgroundPage();
    var myURL = bg.myURL;
    lastPage.innerHTML = myURL;
   //alert(myURL)
 
 });

changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
  };