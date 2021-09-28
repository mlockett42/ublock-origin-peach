<template>
  <v-app id="app">
    <onboarding v-if="!isLoggedInCorrectly"/>
    <dashboard v-if="isLoggedInCorrectly"/>
  </v-app>
</template>

<script>
import Onboarding from "../components/Onboarding.vue";
import Dashboard from "../components/Dashboard.vue";

import loginService from "../services/loginService";

require("setimmediate");  // (somewhere early in your app; it attaches to the global scope.)


export default {
  name: "App",
  components: {
    Onboarding,
    Dashboard,
  },
  computed: {
    isLoggedInCorrectly: function() {
      return this.$store.state.authentication.status.loggedIn;
    }
  },
  async mounted() {
    await loginService.isLoggedInCorrectly(this.$store);
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
