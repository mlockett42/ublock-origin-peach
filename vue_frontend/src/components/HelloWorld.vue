<template>
  <div>
    <p>Blocked request count {{ blockedRequestCount }}</p>
    <p>Allowed request count {{ allowedRequestCount }}</p>
    <button v-on:click="greet">Reload</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  mounted() {
    console.log("mounted called");
    //var bg = chrome.extension.getBackgroundPage();
    //this.myURL = bg.myURL;
      this.port = chrome.extension.connect({
          name: "Sample Communication"
      });
      this.port.postMessage("Hi BackGround");
      let self = this;
      this.port.onMessage.addListener(function(msg) {
          self.blockedRequestCount = msg.uBlock.localSettings.blockedRequestCount;
          self.allowedRequestCount = msg.uBlock.localSettings.allowedRequestCount;
      });

    //browser.runtime.sendMessage({});
  },
  data() {
    return {
      myURL: "",
      blockedRequestCount: "Loading",
      allowedRequestCount: "Loading",
      defaultText: "Hello World",
      port: null
    }
  },
  methods: {
    greet: function (event) {
      this.port.postMessage("Hi BackGround");
      let self = this;
      port.onMessage.addListener(function(msg) {
          self.blockedRequestCount = msg.uBlock.localSettings.blockedRequestCount;
          self.allowedRequestCount = msg.uBlock.localSettings.allowedRequestCount;
          alert(`self.blockedRequestCount=${self.blockedRequestCount}`);
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
