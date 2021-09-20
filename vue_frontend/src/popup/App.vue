<template>
  <v-app id="app">
    <onboarding v-if="onboarding"/>
    <dashboard v-if="!onboarding"/>
  </v-app>
</template>

<script>
import Onboarding from "../components/Onboarding.vue";
import Dashboard from "../components/Dashboard.vue";

//import { isLoggedInCorrectly } from "../services/loginService"
import loginService from "../services/loginService"

//import store from "./store";

export default {
  name: "App",
  components: {
    Onboarding,
    Dashboard,
  },
  data() {
    return {
      onboarding: true,
    };
  },
  async mounted() {
    // console.log("1. mounted called");
    // this.onboarding = store.state.globalNavigation.onboarding;
    var bkg = chrome.extension.getBackgroundPage();
    // bkg.console.log("2. mounted called loginService=", loginService);
    let result = await loginService.isLoggedInCorrectly(bkg);
    // bkg.console.log("3. isLoggedInCorrectly was called result=", result);
    // chrome.storage.local.get(['PEACHKEY'], function(result) {
    //   bkg.console.log("Callback result=", result);
    //   });
    // bkg.console.log("4. chrome.storage.local.get was called");
    this.onboarding = !result;
  },
};
</script>

<style>
@font-face {
  font-family: glacial;
  src: url("../assets/fonts/GlacialIndifference.otf") format("opentype");
}
@font-face {
  font-family: leaguespartan;
  src: url("../assets/fonts/LeagueSpartan-Bold.otf") format("opentype");
}

@font-face {
  font-family: moresugar;
  src: url("../assets/fonts/MoreSugar-Thin.ttf") format("truetype");
}
html {
  width: 350px;
  height: 550px;
}
#app {
  position: relative;
  width: 350px;
  height: 550px;
}
#app .v-card__text {
  font-family: glacial !important;
  font-size: 15px !important;
}
#app .text-h6 {
  font-family: leaguespartan !important;
}
</style>
