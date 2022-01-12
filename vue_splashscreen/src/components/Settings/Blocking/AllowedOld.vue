<template>
  <v-card
    color="white"
    height="calc(100vh - 72px + 21px - 64px)"
    rounded="xl"
    class="pa-0"
    outlined
    elevation="0"
    style="border-color: #d98150 !important; border-width: 2px !important"
  >
    <v-container align-content-space-between d-flex fill-height fluid>
      <v-row>
        <v-col class="pa-4 pb-0">
          <v-container>
            <v-row>
              <v-col cols="auto" class="pa-0" align-self="center">
                <v-card-title class="pa-2"
                  ><h2>
                    <div
                      style="
                        color: #d98150;
                        font-family: leaguespartan;
                        font-size: 1.8vw;
                        line-height: 1.8vw;
                      "
                    >
                      disable blocking on
                    </div>
                  </h2></v-card-title
                >
              </v-col>
            </v-row>
            <v-virtual-scroll
              v-bind:items="whitelist"
              height="432"
              item-height="48"
              v-bind:bench="3"
              class="mt-6"
            >
              <template v-slot:default="{ item }">
                <v-row no-gutters align="center">
                  <v-col
                    cols="auto"
                    class="pa-0"
                    style="color: #d98150; font-family: glacial"
                  >
                    <h3>
                      <span style="font-weight: 400">{{ item.url }}</span>
                    </h3>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="auto" class="pa-0">
                    <!-- <v-tooltip bottom color="#d98150">
                      <template v-slot:activator="{ on, attrs }"> -->
                    <!-- <v-chip label outlined color="#d98150" style="font-family: glacial">
                      Website
                    </v-chip> -->
                    <v-chip
                      color="#f5e1d5"
                      style="
                        align-self: right;
                        font-family: More Sugar;
                        font-weight: 400;
                        color: #d98150;
                        text-transform: capitalize;
                      "
                      >{{ item.type }}</v-chip
                    >
                    <v-tooltip bottom color="#d98150">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-on:click="clickRemoveFromWhitelist(item.id)"
                          depressed
                          dark
                          icon
                          dense
                          class="mx-2"
                          style="
                            font-family: More Sugar;
                            font-size: 14px;
                            font-weight: 400;
                            color: #f5b18e;
                            text-transform: capitalize;
                          "
                          v-bind="attrs"
                          v-on="on"
                          ><v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                      </template>
                      <span style="font-family: glacial"
                        >Remove from whitelist</span
                      >
                    </v-tooltip>
                    <!-- </template>
          <span style="font-family: glacial">Collect and sell this data</span>
        </v-tooltip> -->
                  </v-col>
                </v-row>
              </template></v-virtual-scroll
            >
          </v-container>
        </v-col>
      </v-row>
      <v-row>
        <v-col style="background-color: #f5e1d5; border-radius: 0 0 22px 22px">
          <v-text-field
            v-model="url"
            v-on:keyup.enter="clickAddToWhitelist"
            rounded
            filled
            dense
            name="name"
            id="id"
            placeholder="facebook.com"
            background-color="white"
            hide-details
            style="font-family: glacial; color: #944b15"
          >
            <template v-slot:append-outer class="plus">
              <v-container>
                <v-row>
                  <v-col class="pa-0">
                    <v-btn
                      v-on:click="clickAddToWhitelist"
                      depressed
                      icon
                      color="#d98150"
                    >
                      <v-icon>mdi-plus-circle</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      url: "",
    };
  },
  computed: {
    ...mapState({
      whitelist: (state) => state.blockingWhitelist,
    }),
  },
  methods: {
    ...mapActions(["addToBlockingWhitelist", "removeFromBlockingWhitelist"]),
    clickAddToWhitelist() {
      let type = "website";
      if (
        this.url.indexOf("/") != -1 &&
        this.url.indexOf("/") < this.url.length - 1
      )
        type = "page";
      const item = {
        id:
          this.whitelist.length > 0
            ? this.whitelist[this.whitelist.length - 1].id + 1
            : 0,
        url: this.url,
        type,
      };
      this.addToBlockingWhitelist(item);
      this.url = "";
    },
    clickRemoveFromWhitelist(value) {
      this.removeFromBlockingWhitelist(value);
    },
  },
};
</script>

<style>
.v-input__append-outer {
  margin: 0 !important;
  margin-top: 2px !important;
  margin-left: 8px !important;
}
input[type="text"] {
  color: #944b15 !important;
}
</style>