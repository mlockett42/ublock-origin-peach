<template>
  <v-container class="mb-6">
    <v-row>
      <v-col cols="auto" class="pa-0" align-self="center">
        <h2>
          <div
            style="
              color: #d98150;
              font-family: leaguespartan;
              font-size: 24px;
              line-height: 24px;
            "
          >
            collect data
          </div>
        </h2>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto" class="pa-0" align-self="center">
        <v-chip-group mandatory v-model="status" style="margin: 0px">
          <span
            v-for="option in options"
            v-bind:key="option"
            style="margin: 0px"
          >
            <v-chip
              v-bind:text-color="`${
                option === options[status] ? 'white' : '#944b15'
              }`"
              v-bind:style="{
                backgroundColor: `${
                  option === options[status] ? '#d98150' : '#f5e1d5'
                }`,
              }"
              style="
                align-self: right;
                font-family: More Sugar;
                font-weight: 400;
                background-color: #d98150;
                margin: 0px;
              "
            >
              {{ option }}
            </v-chip>
          </span>
        </v-chip-group>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      options: ["No", "Yes"],
    };
  },
  computed: {
    status: {
      get() {
        return this.$store.state.collecting.status;
      },
      set(value) {
        this.setStatus(value);
      },
    },
  },
  methods: {
    ...mapActions("collecting", ["setStatus"]),
  },
};
</script>

<style>
</style>