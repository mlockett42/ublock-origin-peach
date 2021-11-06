<template>
  <v-chip-group mandatory v-model="periodSelected" style="margin: 0px">
    <span v-for="period in periods" v-bind:key="period" style="margin: 0px">
      <v-chip
        v-if="period == periods[periodSelected]"
        style="
          align-self: right;
          font-family: More Sugar;
          font-weight: 400;
          background-color: #d98150;
          margin: 0px;
        "
        text-color="white"
      >
        {{ period }}
      </v-chip>
      <v-chip
        v-else
        style="
          align-self: right;
          font-family: More Sugar;
          font-weight: 400;
          background-color: #f5e1d5;
          margin: 0px;
        "
        text-color="#944b15"
      >
        {{ period }}
      </v-chip>
    </span>
  </v-chip-group>
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