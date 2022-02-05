<template>
  <v-app id="app">
    <loading v-if="loading" />
    <dashboard v-else-if="dashboardSelected" />
    <onboarding
      v-else-if="onboardingSelected"
      v-on:setVerificationNext="verifying = true"
      v-on:dismissVerification="verifying = false"
    />
  </v-app>
</template>

<script>
import Onboarding from "../components/Onboarding.vue";
import Dashboard from "../components/Dashboard.vue";
import Loading from "../components/Loading.vue";

import loginService from "../services/loginService";

require("setimmediate"); // (somewhere early in your app; it attaches to the global scope.)

export default {
  name: "App",
  components: {
    Onboarding,
    Dashboard,
    Loading,
  },
  data: () => ({
    loading: true,
    verifying: false,
  }),
  computed: {
    isLoggedInCorrectly: function () {
      return this.$store.state.authentication.status.loggedIn;
    },
    onboardingSelected() {
      return (
        !this.isLoggedInCorrectly ||
        (this.isLoggedInCorrectly && this.verifying)
      );
    },
    dashboardSelected() {
      return this.isLoggedInCorrectly && !this.verifying;
    },
  },
  async mounted() {
    await loginService.isLoggedInCorrectly(this.$store);
    this.loading = false;
  },
};
</script>

<style>
@font-face {
  font-family: "Glacial Indifference";
  src: url("../assets/fonts/GlacialIndifference.otf") format("opentype");
}
@font-face {
  font-family: "League Spartan";
  src: url("../assets/fonts/LeagueSpartan-Bold.otf") format("opentype");
}

@font-face {
  font-family: "More Sugar";
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
</style>
