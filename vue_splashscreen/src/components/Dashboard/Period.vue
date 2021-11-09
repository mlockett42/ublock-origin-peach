<template>
  <v-chip-group
    mandatory
    v-model="selectedPeriod"
    style="margin: 0px"
    class="mb-4"
  >
    <span v-for="period in periods" v-bind:key="period" style="margin: 0px">
      <v-chip
        v-if="period == periods[selectedPeriod]"
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
import { mapActions } from "vuex";

export default {
  data() {
    return {
      periods: ["Year", "Month", "Week", "Day"],
    };
  },
  computed: {
    selectedPeriod: {
      get() {
        return this.$store.state.overview.selectedPeriod;
      },
      set(value) {
        this.setSelectedPeriod(value);
      },
    },
  },
  methods: {
    ...mapActions("overview", ["setSelectedPeriod"]),
  },
};
</script>

<style>
</style>