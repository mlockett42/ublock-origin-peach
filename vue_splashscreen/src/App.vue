<template>
  <v-app>
    <v-main style="background-color: #f5e1d5"
      ><v-container class="pa-6" fluid>
        <v-row>
          <v-col sm="6" md="4" lg="3">
            <earnings />
          </v-col>
          <v-col sm="6" md="4" lg="3">
            <sales />
          </v-col>
          <v-col sm="6" md="4" lg="3">
            <wallet />
          </v-col>
          <v-col sm="6" md="4" lg="3">
            <blocked-ads />
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="6" md="4" lg="3">
            <v-card rounded="xl" color="">
              <v-img
                src="./assets/images/advertisements/ad1.png"
                height="calc(20.83vw - 25px - 6px)"
                cover
                style="border: solid 3px #d98150"
              ></v-img>
            </v-card>
          </v-col>
          <v-col sm="6" md="4" lg="3">
            <v-card rounded="xl" color="">
              <v-img
                src="./assets/images/advertisements/ad2.png"
                height="calc(20.83vw - 25px - 6px)"
                cover
                style="border: solid 3px #d98150"
              ></v-img>
            </v-card>
          </v-col>
          <v-col sm="6" md="4" lg="3">
            <v-card rounded="xl" color="">
              <v-img
                src="./assets/images/advertisements/ad3.png"
                height="calc(20.83vw - 25px - 6px)"
                cover
                style="border: solid 3px #d98150"
              ></v-img>
            </v-card>
          </v-col>
          <v-col sm="6" md="4" lg="3">
            <v-card rounded="xl" color="">
              <v-img
                src="./assets/images/advertisements/ad4.png"
                height="calc(20.83vw - 25px)"
                cover
                style="border: solid 3px #d98150"
              ></v-img>
            </v-card>
          </v-col>
        </v-row> </v-container
    ></v-main>
  </v-app>
</template>

<script>
import Earnings from "./components/Earnings.vue";
import Wallet from "./components/Wallet.vue";
import Sales from "./components/Sales.vue";
import BlockedAds from "./components/BlockedAds.vue";
// import Advert from "./components/Advert.vue";

export default {
  name: "App",

  components: {
    Earnings,
    Wallet,
    Sales,
    BlockedAds,
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
  font-family: moresugar;
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