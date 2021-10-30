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
          >recent sales</span
        >
      </h2></v-card-title
    >
    <v-virtual-scroll
      v-bind:items="salesData"
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
              <v-icon color="white" size="14px" style="margin-top: -3px"
                >mdi-arrow-right-bold</v-icon
              >
              <span style="font-weight: 400">{{ item.to }}</span>
            </h5>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto" class="pa-2">
            <v-chip
              color="white"
              style="
                align-self: right;
                font-family: More Sugar;
                font-weight: 400;
                color: #d98150;
              "
              >{{ item.value }}</v-chip
            >
          </v-col>
        </v-row>
      </template>
    </v-virtual-scroll>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      salesData: [
        {
          id: 0,
          data: "Facebook",
          icon: require("../assets/images/facebook.png"),
          to: "CSIRO",
          value: "$53.21",
        },
        {
          id: 1,
          data: "YouTube",
          icon: require("../assets/images/youtube.png"),
          to: "Vimeo",
          value: "$3.21",
        },
        {
          id: 2,
          data: "ASOS",
          icon: require("../assets/images/asos.png"),
          to: "Uniqlo",
          value: "$6.32",
        },
        {
          id: 3,
          data: "eBay",
          icon: require("../assets/images/ebay.png"),
          to: "Amazon",
          value: "$32.02",
        },
        {
          id: 4,
          data: "eBay",
          icon: require("../assets/images/ebay.png"),
          to: "Amazon",
          value: "$32.02",
        },
        {
          id: 5,
          data: "eBay",
          icon: require("../assets/images/ebay.png"),
          to: "Amazon",
          value: "$32.02",
        },
      ],
    };
  },
};
</script>

<style>
.v-virtual-scroll::-webkit-scrollbar {
  width: 0.5em;
}

.v-virtual-scroll::-webkit-scrollbar-track {
}

.v-virtual-scroll::-webkit-scrollbar-thumb {
  background-color: white;
  border-radius: 5px;
}
</style>