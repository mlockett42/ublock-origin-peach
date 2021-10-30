<template>
  <v-card
    color="#d98150"
    height="calc(100vh - 20.83vw - 72px + 25px)"
    rounded="xl"
    class="pa-4 gradient-bg"
  >
    <v-card-title class="pa-2"
      ><h2>
        <span
          style="
            color: white;
            font-family: leaguespartan;
            font-size: 1.8vw;
            line-height: 1.8vw;
          "
          >my wallet</span
        >
      </h2></v-card-title
    >
    <v-virtual-scroll
      v-bind:items="walletData"
      height="315"
      item-height="64"
      v-bind:bench="3"
    >
      <template v-slot:default="{ item }">
        <v-row no-gutters align="center">
          <v-col cols="auto" class="pa-2">
            <v-img
              height="48px"
              width="48px"
              max-height="48px"
              max-width="48px"
              contain
              v-bind:src="item.icon"
            ></v-img>
          </v-col>
          <v-col
            cols="auto"
            class="pa-2"
            style="color: white; font-family: glacial"
          >
            <h3>
              <span style="font-weight: 400">{{ item.data }}</span>
            </h3>
            <h5>
              <v-icon
                v-if="item.up"
                color="white"
                size="14px"
                style="margin-top: -3px"
                >mdi-arrow-up-bold</v-icon
              >
              <v-icon v-else color="white" size="14px" style="margin-top: -3px"
                >mdi-arrow-down-bold</v-icon
              >
              <span style="font-weight: 400">{{ item.change }}</span>
            </h5>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto" class="pa-2"
            ><v-chip
              color="white"
              style="
                align-self: right;
                font-family: More Sugar;
                font-weight: 400;
                color: #d98150;
              "
              v-on:mouseover="sellText"
              v-on:mouseout="oldText"
              >{{ item.value }}</v-chip
            ></v-col
          >
        </v-row>
      </template>
    </v-virtual-scroll>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      walletData: [
        {
          id: 0,
          data: "YouTube",
          icon: require("../assets/images/youtube.png"),
          value: "$32.98",
          change: "4.65%",
          up: true,
        },
        {
          id: 1,
          data: "ASOS",
          icon: require("../assets/images/asos.png"),
          value: "$17.55",
          change: "6.6%",
          up: true,
        },
        {
          id: 2,
          data: "eBay",
          icon: require("../assets/images/ebay.png"),
          value: "$16.80",
          change: "0.3%",
          up: false,
        },
        {
          id: 3,
          data: "Twitter",
          icon: require("../assets/images/twitter.png"),
          value: "$5.41",
          change: "1.4%",
          up: true,
        },
        {
          id: 4,
          data: "Twitter",
          icon: require("../assets/images/twitter.png"),
          value: "$5.41",
          change: "1.4%",
          up: true,
        },
        {
          id: 5,
          data: "Twitter",
          icon: require("../assets/images/twitter.png"),
          value: "$5.41",
          change: "1.4%",
          up: true,
        },
      ],
    };
  },
  methods: {
    sellText(event) {
      event.target.innerHTML = "SELL";
    },
    oldText(event) {
      event.target.innerHTML = "$32.98";
    },
  },
};
</script>

<style>
</style>