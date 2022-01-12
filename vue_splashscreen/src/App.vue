<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      class="pa-4"
      color="white"
      mini-variant
      mini-variant-width="72"
      mobile-breakpoint="768"
    >
      <v-btn
        v-on:click="page = 0"
        v-bind:color="`${page === 0 ? 'white' : '#d98150'}`"
        v-bind:style="{
          backgroundColor: `${page === 0 ? '#d98150' : 'white'}`,
        }"
        depressed
        icon
        class="mb-4"
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn
        v-on:click="page = 1"
        v-bind:color="`${page === 1 ? 'white' : '#d98150'}`"
        v-bind:style="{
          backgroundColor: `${page === 1 ? '#d98150' : 'white'}`,
        }"
        depressed
        icon
        class="mb-4"
      >
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-navigation-drawer>

    <v-main style="background-color: #f5e1d5">
      <dashboard v-if="page == 0" />
      <settings v-else />
    </v-main>
  </v-app>
</template>

<script>
import Dashboard from "./components/Dashboard.vue";
import Settings from "./components/Settings.vue";

export default {
  name: "App",
  data() {
    return {
      drawer: true,
      page: 0,
    };
  },
  components: {
    Dashboard,
    Settings,
  },
};
</script>

<style>
@font-face {
  font-family: glacial;
  src: url("./assets/fonts/GlacialIndifference.otf") format("opentype");
}
@font-face {
  font-family: leaguespartan;
  src: url("./assets/fonts/LeagueSpartan-Bold.otf") format("opentype");
}

@font-face {
  font-family: More Sugar;
  src: url("./assets/fonts/MoreSugar-Thin.ttf") format("truetype");
}
.gradient-bg {
  background: rgb(217, 129, 80);
  background: linear-gradient(
    155deg,
    rgba(217, 129, 80, 1) 0%,
    rgba(245, 177, 142, 1) 100%
  );
}
</style>