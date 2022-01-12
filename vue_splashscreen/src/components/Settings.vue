<template>
  <v-container class="pa-6" fluid>
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <blocking />
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <collecting />
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <selling />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Blocking from "./Settings/Blocking.vue";
import Collecting from "./Settings/Collecting.vue";
import Selling from "./Settings/Selling.vue";

export default {
  components: {
    Blocking,
    Collecting,
    Selling,
  },
};
</script>

<style>
</style>