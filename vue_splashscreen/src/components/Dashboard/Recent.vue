<template>
  <v-card
    color="white"
    height="calc(100vh - 72px + 21px)"
    rounded="xl"
    class="pa-4"
    outlined
    elevation="0"
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
                  font-size: 24px;
                  line-height: 24px;
                "
              >
                recent
              </div>
            </h2></v-card-title
          >
        </v-col>
      </v-row>
    </v-container>

    <v-virtual-scroll
      v-bind:items="history"
      height="calc(100vh - 72px + 21px - 60px)"
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
              <span style="font-weight: 400">{{ item.name }}</span>
            </h3>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto" class="pa-2">
            <v-tooltip bottom color="#d98150">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-on:click="clickShield(item)"
                  v-bind:color="`${item.mode === 0 ? '#d98150' : '#f5e1d5'}`"
                  v-bind:style="{
                    color: `${item.mode === 0 ? '#d98150' : '#f5e1d5'}`,
                  }"
                  depressed
                  dark
                  icon
                  dense
                  class="ml-2"
                  height="32px"
                  width="32px"
                  style="
                    font-family: More Sugar;
                    font-size: 14px;
                    font-weight: 400;
                    text-transform: capitalize;
                  "
                  v-bind="attrs"
                  v-on="on"
                  ><v-icon>mdi-shield</v-icon>
                </v-btn>
              </template>
              <span style="font-family: glacial"
                >Don't collect or sell this data</span
              >
            </v-tooltip>
            <!-- <v-tooltip bottom color="#d98150">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-on:click="item.mode = 1"
                  v-bind:color="`${item.mode === 1 ? '#d98150' : '#f5e1d5'}`"
                  v-bind:style="{
                    color: `${item.mode === 1 ? '#d98150' : '#f5e1d5'}`,
                  }"
                  depressed
                  dark
                  icon
                  dense
                  class="ml-2"
                  height="32px"
                  width="32px"
                  style="
                    font-family: More Sugar;
                    font-size: 14px;
                    font-weight: 400;
                    text-transform: capitalize;
                  "
                  v-bind="attrs"
                  v-on="on"
                  ><v-icon>mdi-safe-square</v-icon>
                </v-btn>
              </template>
              <span style="font-family: glacial"
                >Collect but don't sell this data</span
              >
            </v-tooltip> -->
            <v-tooltip bottom color="#d98150">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-on:click="clickDollar(item)"
                  v-bind:color="`${item.mode === 1 ? '#d98150' : '#f5e1d5'}`"
                  v-bind:style="{
                    color: `${item.mode === 1 ? '#d98150' : '#f5e1d5'}`,
                  }"
                  depressed
                  dark
                  icon
                  dense
                  class="ml-2"
                  height="32px"
                  width="32px"
                  style="
                    font-family: More Sugar;
                    font-size: 14px;
                    font-weight: 400;
                    text-transform: capitalize;
                  "
                  v-bind="attrs"
                  v-on="on"
                  ><v-icon>mdi-currency-usd</v-icon>
                </v-btn>
              </template>
              <span style="font-family: glacial"
                >Collect and sell this data</span
              >
            </v-tooltip>
          </v-col>
        </v-row>
      </template>
    </v-virtual-scroll>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      history: (state) => state.recent.history,
    }),
  },
  methods: {
    ...mapActions("recent", ["setMode"]),
    ...mapActions("collecting", ["addToAllowed", "removeFromAllowedByName"]),
    clickShield(item) {
      this.setMode({ id: item.id, mode: 0 });
      this.removeFromAllowedByName(item.name);
    },
    clickDollar(item) {
      this.setMode({ id: item.id, mode: 1 });
      this.addToAllowed(item.name);
    },
  },
};
</script>

<style>
.v-virtual-scroll::-webkit-scrollbar {
  width: 0.5em;
}

.v-virtual-scroll::-webkit-scrollbar-thumb {
  background-color: #f5e1d5 !important;
  border-radius: 5px;
}
</style>