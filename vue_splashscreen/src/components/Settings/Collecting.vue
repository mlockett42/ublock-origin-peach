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
import Toggle from "./Collecting/Toggle.vue";
import Allowed from "./Collecting/Allowed.vue";

import { mapState } from "vuex";

export default {
  components: {
    Toggle,
    Allowed,
  },
  computed: {
    ...mapState({
      status: (state) => state.collecting.status,
    }),
  },
};
</script>

<style>
</style>