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
                      sell data to
                    </div>
                  </h2></v-card-title
                >
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
                    {{ item.name }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-0">
          <v-container v-if="recommendations.length > 0">
            <v-row>
              <v-col class="pa-6 py-3 px-6">
                <div
                  style="
                    font-family: More Sugar;
                    font-weight: 400;
                    color: #d98150;
                    margin-bottom: 4px;
                  "
                >
                  Recommended for you
                </div>
                <v-chip-group column>
                  <v-chip
                    v-for="recommendation in recommendations"
                    v-bind:key="recommendation.id"
                    v-on:click="clickAddFromRecommendations(recommendation.id)"
                    v-bind:color="`${chipBackgroundColor(recommendation)}`"
                    outlined
                    style="
                      align-self: right;
                      font-family: More Sugar;
                      font-weight: 400;
                    "
                  >
                    {{ recommendation.name }}
                    <v-icon size="18" right> mdi-plus-circle </v-icon>
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col
                class="pa-6"
                style="background-color: #f5b18e; border-radius: 0 0 24px 24px"
              >
                <v-text-field
                  v-model="name"
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
      name: "",
    };
  },
  computed: {
    ...mapState({
      allowed: (state) => state.selling.allowed,
      recommendations: (state) => state.selling.recommendations,
    }),
  },
  methods: {
    ...mapActions("selling", [
      "addToAllowed",
      "removeFromAllowed",
      "addFromRecommendations",
      "removeFromRecommendations",
    ]),
    clickAddToAllowed() {
      this.addToAllowed(this.name);
      this.name = "";
    },
    clickRemoveFromAllowed(id) {
      this.removeFromAllowed(id);
    },
    clickAddFromRecommendations(id) {
      this.addFromRecommendations(id);
    },
    chipBackgroundColor(item) {
      if (item.type == "category") return "#d98150";
      else if (item.type == "website") return "#f5b18e";
      else return "#f8ceb5";
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