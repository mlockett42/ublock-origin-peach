<template>
  <v-container class="pa-6" fluid style="background-color: #f5e1d5">
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <period />
        <balance />
        <income />
        <blocked />
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <transactions />
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <recent />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Period from "./Dashboard/Period.vue";
import Balance from "./Dashboard/Balance.vue";
import Income from "./Dashboard/Income.vue";
import Blocked from "./Dashboard/Blocked.vue";
import Transactions from "./Dashboard/Transactions.vue";
import Recent from "./Dashboard/Recent.vue";

export default {
  components: {
    Period,
    Balance,
    Income,
    Transactions,
    Blocked,
    Recent,
  },
};
</script>

<style>
</style>