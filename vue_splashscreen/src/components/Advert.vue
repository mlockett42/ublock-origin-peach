<template>
  <v-card rounded="xl" color="">
    <v-img v-bind:src="{ image }" height="calc(20.83vw - 25px)" cover></v-img>
  </v-card>
</template>

<script>
export default {
  props: ["image"],
  data() {
    return {};
  },
};
</script>

<style>
</style>