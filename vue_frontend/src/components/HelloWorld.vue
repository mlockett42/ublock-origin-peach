<template>
  <div>
    <p>Blocked request count {{ blockedRequestCount }}</p>
    <p>Allowed request count {{ allowedRequestCount }}</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  mounted() {
    this.port = chrome.extension.connect({
      name: "Sample Communication"
    });
    this.port.postMessage("Hi BackGround");
    let self = this;
    this.port.onMessage.addListener(function(msg) {
      self.blockedRequestCount = msg.uBlock.localSettings.blockedRequestCount;
      self.allowedRequestCount = msg.uBlock.localSettings.allowedRequestCount;
    });
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
};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
