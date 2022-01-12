<template>
  <v-card
    height="calc(100vh - 72px + 21px - 64px)"
    rounded="xl"
    class="pa-0"
    elevation="0"
    style="border-color: #d98150 !important"
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
                        font-size: 24px;
                        line-height: 24px;
                      "
                    >
                      disable protection on
                    </div>
                  </h2></v-card-title
                >
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="auto" class="py-0" align-self="center">
                <v-tooltip bottom color="#944b15" v-if="allowed.length > 0">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="#944b15" v-bind="attrs" v-on="on"
                      >mdi-shield-alert</v-icon
                    >
                  </template>
                  <span style="font-family: glacial"
                    >By allowing these websites to track you,<br />
                    you may be putting your security at risk.<br />
                    Some websites may even leak your personal<br />
                    information to malevolent third parties. We <br />
                    recommend limiting this list to only websites <br />
                    that you trust.</span
                  >
                </v-tooltip>
                <v-tooltip bottom color="#d98150" v-else>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="#d98150" v-bind="attrs" v-on="on"
                      >mdi-shield-check</v-icon
                    >
                  </template>
                  <span style="font-family: glacial"
                    >Great work, you're completly private!</span
                  >
                </v-tooltip>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-1">
                <v-chip-group column>
                  <v-chip
                    v-for="item in allowed"
                    v-bind:key="item.id"
                    v-on:click:close="clickRemoveFromAllowed(item.id)"
                    close
                    v-bind:color="`${chipBackgroundColor(item)}`"
                    style="
                      align-self: right;
                      font-family: More Sugar;
                      font-weight: 400;
                      color: white;
                    "
                  >
                    {{ item.url }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-0">
          <v-container>
            <v-row>
              <v-col
                class="pa-6"
                style="background-color: #f5b18e; border-radius: 0 0 24px 24px"
              >
                <v-text-field
                  v-model="url"
                  v-on:keyup.enter="clickAddToAllowed"
                  rounded
                  filled
                  dense
                  name="name"
                  id="id"
                  placeholder="Add a website or page"
                  background-color="white"
                  hide-details
                  style="font-family: glacial; color: #944b15"
                >
                  <template v-slot:append-outer class="plus">
                    <v-container>
                      <v-row>
                        <v-col class="pa-0">
                          <v-btn
                            v-on:click="clickAddToAllowed"
                            depressed
                            icon
                            color="white"
                          >
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
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
      allowed: (state) => state.blocking.allowed,
    }),
  },
  methods: {
    ...mapActions("blocking", ["addToAllowed", "removeFromAllowed"]),
    clickAddToAllowed() {
      this.addToAllowed(this.url);
      this.url = "";
    },
    clickRemoveFromAllowed(id) {
      this.removeFromAllowed(id);
    },
    chipBackgroundColor(item) {
      if (item.type == "website") return "#d98150";
      else return "#f5b18e";
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