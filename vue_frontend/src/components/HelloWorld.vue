<template>
  <div>
    <p>{{ myURL }}</p>
    <button v-on:click="greet">Reload</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  mounted() {
    console.log("mounted called");
    var bg = chrome.extension.getBackgroundPage();
    this.myURL = bg.myURL;

    //browser.runtime.sendMessage({});
  },
  data() {
    return {
      myURL: "",
      defaultText: "Hello World"
    }
  },
  methods: {
    greet: function (event) {
      var port = chrome.extension.connect({
          name: "Sample Communication"
      });
      port.postMessage("Hi BackGround");
      port.onMessage.addListener(function(msg) {
          console.log("message recieved", msg);
          alert("message recieved" + msg.text);
          alert(`"Blocked content count=${msg.uBlock.localSettings.blockedRequestCount}`);
      });
      // `this` inside methods points to the Vue instance
      // chrome.runtime.onMessage.addListener(function (answer) { alert(`answer=${answer}`) });
      // chrome.runtime.sendMessage({cmd: "shutdown"});
      // var otherWindows = chrome.extension.getBackgroundPage();
      // console.log(otherWindows.backgroundFunction()); 
      // alert("Hello from greet");
      // var bg = chrome.extension.getBackgroundPage();
      // alert(`bg= ${bg}`)
      // console.log("bg=", bg);
      //alert(`bg.µBlock= ${bg.µBlock}`)
      //var bg = chrome.extension.getBackgroundPage();
      // this.myURL = bg.myURL;
      // alert(bg.myURL);
      // console.log("bg=", bg);
      event;
      // `event` is the native DOM event
      //if (event) {
      //  alert(event.target.tagName)
      //}
    }
  }
  /*computed: {
    defaultText() {
      return "Helloworld"; //browser.i18n.getMessage("extName");
    },
  },*/
};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
