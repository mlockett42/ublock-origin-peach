<template>
  <v-card color="#d98150" rounded="xl" class="pa-4 gradient-bg mt-4">
    <v-card-title class="pa-2"
      ><h2>
        <div
          style="
            color: white;
            font-family: leaguespartan;
            font-size: 1.8vw;
            line-height: 1.8vw;
          "
        >
          wallet
        </div>
      </h2></v-card-title
    >
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
      <v-col cols="auto" class="pa-2">
        <v-container>
          <v-row>
            <v-col class="pa-0">
              <h4>
                <v-icon color="white" size="18px" style="margin-top: -3px"
                  >mdi-arrow-up-bold</v-icon
                >
                <span style="font-weight: 400; color: white">$1,402.21 </span>
                <span
                  style="
                    font-weight: 400;
                    color: white;
                    font-size: 12px;
                    text-transform: lowercase;
                  "
                  >earned this {{ periods[periodSelected] }}</span
                >
              </h4>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pa-0">
              <h4>
                <v-icon color="white" size="18px" style="margin-top: -3px"
                  >mdi-cash</v-icon
                >
                <span style="font-weight: 400; color: white">$150.00 </span>
                <span
                  style="
                    font-weight: 400;
                    color: white;
                    font-size: 12px;
                    text-transform: lowercase;
                  "
                  >paid out this {{ periods[periodSelected] }}</span
                >
              </h4>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <!-- <graph /> -->
  </v-card>
</template>
<script>
// import Graph from "./Earnings/Graph.vue";

export default {
  components: {
    // Graph,
  },
  data() {
    return {
      periodSelected: 0,
      periods: ["Year", "Month", "Week", "Day"],
    };
  },
};
</script>

<style>
</style>