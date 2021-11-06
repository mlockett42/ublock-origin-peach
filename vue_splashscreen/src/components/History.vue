<template>
  <v-card
    color="white"
    height="calc(100vh - 72px + 21px)"
    rounded="xl"
    class="pa-4"
    outlined
    elevation="2"
    style="border-color: #d98150 !important; border-width: 2px !important"
  >
    <v-container>
      <v-row>
        <v-col cols="auto" class="pa-0" align-self="center">
          <v-card-title class="pa-2"
            ><h2>
              <div
                style="
                  color: #d98150;
                  font-family: leaguespartan;
                  font-size: 1.8vw;
                  line-height: 1.8vw;
                "
              >
                recent
              </div>
            </h2></v-card-title
          >
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto" class="pa-0" align-self="center">
          <v-btn flat icon color="#d98150">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-virtual-scroll
      v-bind:items="salesData"
      height="574"
      item-height="48"
      v-bind:bench="3"
    >
      <template v-slot:default="{ item }">
        <v-row no-gutters align="center">
          <v-col
            cols="auto"
            class="pa-2"
            style="color: #d98150; font-family: glacial"
          >
            <h3>
              <span style="font-weight: 400">{{ item.data }}</span>
            </h3>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto" class="pa-2">
            <!-- <v-btn
              depressed
              icon
              dark
              class="ml-2"
              style="
                font-family: More Sugar;
                font-weight: 400;
                color: #d98150;
                text-transform: lowercase;
              "
              ><v-icon color="#f5b18e">mdi-dots-vertical</v-icon></v-btn
            > -->
            <v-btn
              v-if="item.mode == 0"
              v-on:click="item.mode = 0"
              depressed
              dark
              icon
              dense
              class="ml-2"
              color="#d98150"
              height="32px"
              width="32px"
              style="
                font-family: More Sugar;
                font-size: 14px;
                font-weight: 400;
                color: #d98150;
                text-transform: capitalize;
              "
              ><v-icon>mdi-shield</v-icon>
            </v-btn>
            <v-btn
              v-else
              v-on:click="item.mode = 0"
              depressed
              dark
              icon
              dense
              class="ml-2"
              color="#f5e1d5"
              height="32px"
              width="32px"
              style="
                font-family: More Sugar;
                font-size: 14px;
                font-weight: 400;
                color: #f5e1d5;
                text-transform: capitalize;
              "
              ><v-icon>mdi-shield</v-icon>
            </v-btn>
            <v-btn
              v-if="item.mode == 1"
              v-on:click="item.mode = 1"
              depressed
              dark
              icon
              dense
              class="ml-2"
              color="#d98150"
              height="32px"
              width="32px"
              style="
                font-family: More Sugar;
                font-size: 14px;
                font-weight: 400;
                color: #d98150;
                text-transform: capitalize;
              "
              ><v-icon>mdi-safe-square</v-icon>
            </v-btn>
            <v-btn
              v-else
              v-on:click="item.mode = 1"
              depressed
              dark
              icon
              dense
              class="ml-2"
              color="#f5e1d5"
              height="32px"
              width="32px"
              style="
                font-family: More Sugar;
                font-size: 14px;
                font-weight: 400;
                color: #f5e1d5;
                text-transform: capitalize;
              "
              ><v-icon>mdi-safe-square</v-icon>
            </v-btn>
            <v-btn
              v-if="item.mode == 2"
              v-on:click="item.mode = 2"
              depressed
              dark
              icon
              dense
              class="ml-2"
              color="#d98150"
              height="32px"
              width="32px"
              style="
                font-family: More Sugar;
                font-size: 14px;
                font-weight: 400;
                color: #d98150;
                text-transform: capitalize;
              "
              ><v-icon>mdi-currency-usd</v-icon>
            </v-btn>
            <v-btn
              v-else
              v-on:click="item.mode = 2"
              depressed
              dark
              icon
              dense
              class="ml-2"
              color="#f5e1d5"
              height="32px"
              width="32px"
              style="
                font-family: More Sugar;
                font-size: 14px;
                font-weight: 400;
                color: #f5e1d5;
                text-transform: capitalize;
              "
              ><v-icon>mdi-currency-usd</v-icon>
            </v-btn>
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
          data: "facebook.com",
          icon: require("../assets/images/facebook.png"),
          to: "CSIRO",
          value: "$53.21",
          mode: 0,
        },
        {
          id: 1,
          data: "youtube.com",
          icon: require("../assets/images/youtube.png"),
          to: "Vimeo",
          value: "$3.21",
          mode: 1,
        },
        {
          id: 2,
          data: "asos.com",
          icon: require("../assets/images/asos.png"),
          to: "Uniqlo",
          value: "$6.32",
          mode: 0,
        },
        {
          id: 3,
          data: "ebay.com.au",
          icon: require("../assets/images/ebay.png"),
          to: "Amazon",
          value: "$32.02",
          mode: 0,
        },
        {
          id: 4,
          data: "ebay.com.au",
          icon: require("../assets/images/ebay.png"),
          to: "Amazon",
          value: "$32.02",
          mode: 0,
        },
        {
          id: 5,
          data: "ebay.com.au",
          icon: require("../assets/images/ebay.png"),
          to: "Amazon",
          value: "$32.02",
          mode: 2,
        },
        {
          id: 6,
          data: "ebay.com.au",
          icon: require("../assets/images/ebay.png"),
          to: "Amazon",
          value: "$32.02",
          mode: 2,
        },
        {
          id: 7,
          data: "ebay.com.au",
          icon: require("../assets/images/ebay.png"),
          to: "Amazon",
          value: "$32.02",
          mode: 1,
        },
        {
          id: 8,
          data: "ebay.com.au",
          icon: require("../assets/images/ebay.png"),
          to: "Amazon",
          value: "$32.02",
          mode: 2,
        },
        {
          id: 9,
          data: "ebay.com.au",
          icon: require("../assets/images/ebay.png"),
          to: "Amazon",
          value: "$32.02",
          mode: 0,
        },
      ],
    };
  },
  methods: {},
};
</script>

<style>
.v-virtual-scroll::-webkit-scrollbar {
  width: 0.5em;
}

.v-virtual-scroll::-webkit-scrollbar-track {
}

.v-virtual-scroll::-webkit-scrollbar-thumb {
  background-color: #f5e1d5 !important;
  border-radius: 5px;
}
</style>