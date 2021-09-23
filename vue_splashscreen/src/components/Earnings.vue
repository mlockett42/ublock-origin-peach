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
          >earnings</span
        >
      </h2></v-card-title
    >
    <v-row no-gutters align="center">
      <v-col cols="12">
        <v-chip-group mandatory>
          <v-chip
            v-for="period in periods"
            :key="period"
            style="align-self: right; font-family: moresugar; font-weight: 400"
            text-color="#d98150"
          >
            {{ period }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    <v-row no-gutters align="center">
      <v-col
        cols="auto"
        class="pa-2"
        style="color: white; font-family: glacial"
      >
        <h2>
          <span style="color: white; font-family: glacial">$1,402.21</span>
        </h2>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto" class="pa-2"
        ><h4>
          <v-icon color="white" size="18px" style="margin-top: -3px"
            >mdi-arrow-up-bold</v-icon
          >
          <span style="font-weight: 400; color: white">$1,402.21 </span>
        </h4></v-col
      >
    </v-row>
    <graph />
  </v-card>
</template>
<script>
import Graph from "./Earnings/Graph.vue";

export default {
  components: {
    Graph,
  },
  data() {
    return {
      periods: ["Year", "Month", "Week", "Day"],
    };
  },
};
</script>

<style>
</style>