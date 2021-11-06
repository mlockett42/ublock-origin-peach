<template>
  <v-card color="#d98150" rounded="xl" class="pa-4 gradient-bg mt-6">
    <v-container>
      <v-row>
        <v-col cols="auto" class="pa-0" align-self="center">
          <v-card-title class="pa-2"
            ><h2>
              <div
                style="
                  color: white;
                  font-family: leaguespartan;
                  font-size: 1.8vw;
                  line-height: 1.8vw;
                "
              >
                trackers blocked
              </div>
            </h2></v-card-title
          >
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto" class="pa-0" align-self="center">
          <v-btn flat icon color="white">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-row
      v-for="item in trackerData"
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
          <span style="font-weight: 400">{{ item.company }}</span>
        </h3>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto" class="pa-2"
        ><v-chip
          color="white"
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
export default {
  data() {
    return {
      tags: ["Year", "Month", "Week", "Day"],
      trackerData: [
        { id: 0, company: "Facebook", count: 1321 },
        { id: 1, company: "Google", count: 1227 },
        { id: 2, company: "Other", count: 821 },
      ],
    };
  },
};
</script>

<style>
.v-slide-item--active {
  color: white;
  background-color: hsla(0, 0, 0, 0) !important;
}
.v-slide-item--active span {
  color: white;
}
.v-virtual-scroll::-webkit-scrollbar {
  width: 0.5em;
}

.v-virtual-scroll::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
}

.v-virtual-scroll::-webkit-scrollbar-thumb {
  background-color: white;
  border-radius: 5px;
  /* outline: 1px solid slategrey; */
}
</style>