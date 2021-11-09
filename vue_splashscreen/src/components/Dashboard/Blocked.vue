<template>
  <v-card color="#d98150" rounded="xl" class="pa-4 pb-3 gradient-bg mt-6" flat>
    <v-container>
      <v-row>
        <v-col cols="auto" class="pa-0" align-self="center">
          <v-card-title class="pa-2"
            ><h2>
              <div
                style="
                  color: white;
                  font-family: leaguespartan;
                  font-size: 24px;
                  line-height: 24px;
                "
              >
                trackers blocked
              </div>
            </h2></v-card-title
          >
        </v-col>
      </v-row>
    </v-container>
    <v-row
      v-for="item in blocked"
      v-bind:key="item.id"
      no-gutters
      align="center"
    >
      <v-col
        cols="auto"
        class="pa-2"
        style="color: white; font-family: glacial"
      >
        <h3>
          <span style="font-weight: 400">{{ item.network }}</span>
        </h3>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto" class="pa-2"
        ><v-chip
          color="#ffffff"
          style="
            align-self: right;
            font-family: More Sugar;
            font-weight: 400;
            color: #d98150;
          "
          >{{ item.count }}</v-chip
        ></v-col
      >
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("overview", {
      blocked: "periodBlocked",
    }),
  },
};
</script>

<style>
</style>