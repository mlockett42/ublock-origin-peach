<template>
  <v-container>
    <v-row>
      <v-col class="pa-0">
        <toggle />
        <allowed v-if="blockingStatus" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Toggle from "./Blocking/Toggle.vue";
import Allowed from "./Blocking/Allowed.vue";

import { mapState } from "vuex";

export default {
  components: {
    Toggle,
    Allowed,
  },
  computed: {
    ...mapState({
      blockingStatus: (state) => state.blocking.status,
    }),
  },
};
</script>

<style>
</style>