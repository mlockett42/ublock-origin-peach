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
    //console.log("mounted called");
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
      // `this` inside methods points to the Vue instance
      var bg = chrome.extension.getBackgroundPage();
      this.myURL = bg.myURL;
      //alert(bg.myURL);
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
