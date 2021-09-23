<template>
  <v-card
    color="#d98150"
    height="calc(100vh - 20.83vw - 72px + 25px)"
    rounded="xl"
    class="pa-4 gradient-bg"
  >
    <v-card-title class="pa-2"
      ><h3>
        <span
          style="
            color: white;
            font-family: leaguespartan;
            font-size: 1.8vw;
            line-height: 1.8vw;
          "
          >trackers blocked</span
        >
      </h3></v-card-title
    >
    <v-row no-gutters align="center">
      <v-col cols="12">
        <v-chip-group mandatory>
          <v-chip
            v-for="tag in tags"
            :key="tag"
            style="align-self: right; font-family: moresugar; font-weight: 400"
            text-color="#d98150"
          >
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    <!-- <v-virtual-scroll
      v-if="files.length > 0"
      v-bind:items="files"
      height="144"
      item-height="36"
    >
      <template v-slot:default="{ item }">
        <v-container>
          <v-row align="center">
            <v-col cols="auto" class="pa-0">
              <v-card-text class="pa-0">
                <span
                  style="
                    font-family: Quicksand;
                    font-weight: 400;
                    color: dimgrey;
                  "
                  >{{ item.name }}
                </span>
              </v-card-text>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto" class="pa-0">
              <v-btn
                depressed
                icon
                color="dimgrey"
                class="ml-4 rounded-lg darken-3--text no-active-btn"
                v-on:click.stop="removeFile(item.name)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-virtual-scroll> -->
    <v-virtual-scroll
      v-bind:items="trackerData"
      height="267"
      item-height="48"
      v-bind:bench="3"
    >
      <template v-slot:default="{ item }">
        <v-row no-gutters align="center">
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
                font-family: moresugar;
                font-weight: 400;
                color: #d98150;
              "
              >{{ item.count }}</v-chip
            ></v-col
          >
        </v-row>
      </template>
    </v-virtual-scroll>
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
        { id: 2, company: "Yahoo", count: 821 },
        { id: 3, company: "YouTube", count: 432 },
        { id: 4, company: "Microsoft", count: 301 },
        { id: 5, company: "HubSpot", count: 122 },
        { id: 6, company: "HubSpot", count: 122 },
        { id: 7, company: "HubSpot", count: 122 },
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