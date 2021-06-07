<template>
  <v-app id="app">
    <dashboard />
  </v-app>
</template>

<script>
// import Dashboard from '../components/Dashboard.vue';
// import Onboarding from "./components/Onboarding.vue";
import Dashboard from "../components/Dashboard.vue";

//import store from "./store";

export default {
  name: "App",
  components: {
    // Onboarding,
    Dashboard,
  },
  data() {
    return {
      onboarding: true,
    };
  },
  created() {
    // this.onboarding = store.state.globalNavigation.onboarding;
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
</style>
