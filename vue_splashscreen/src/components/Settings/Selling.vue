<template>
  <v-container>
    <v-row>
      <v-col class="pa-0">
        <toggle />
        <allowed v-if="status" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Toggle from "./Selling/Toggle.vue";
import Allowed from "./Selling/Allowed.vue";

import { mapState } from "vuex";

export default {
  components: {
    Toggle,
    Allowed,
  },
  computed: {
    async status() {
      let bg = chrome.extension.getBackgroundPage();
      bg.console.log("status this.$store=", this.$store);
      return this.$store.state.selling.status
    }
    // ...mapState({
    //   status: (state) => state.selling.status,
    // }),
  },
};
</script>

<style>
</style>