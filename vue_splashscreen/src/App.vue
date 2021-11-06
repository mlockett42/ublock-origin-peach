<template>
  <v-app>
    <v-main style="background-color: #f5e1d5"
      ><v-container class="pa-6" fluid>
        <v-row>
          <v-col cols="4">
            <period />
            <wallet />
            <earnings />
            <blocked-ads />
          </v-col>
          <v-col cols="4">
            <sales />
          </v-col>
          <v-col cols="4">
            <history />
          </v-col>
        </v-row> </v-container
    ></v-main>
  </v-app>
</template>

<script>
// import Wallet from "./components/Wallet.vue";
import Period from "./components/Period.vue";
import Wallet from "./components/Wallet.vue";
import Earnings from "./components/Earnings.vue";
import BlockedAds from "./components/BlockedAds.vue";
import Sales from "./components/Sales.vue";
import History from "./components/History.vue";
// import Advert from "./components/Advert.vue";

export default {
  name: "App",

  components: {
    // Income,
    Period,
    Wallet,
    Sales,
    BlockedAds,
    Earnings,
    History,
    // Advert,
  },

  data: () => ({
    //
  }),
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