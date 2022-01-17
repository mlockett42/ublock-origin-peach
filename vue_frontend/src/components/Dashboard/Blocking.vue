<template>
  <v-card flat height="calc(100vh - 72px)" class="rounded-0" color="#f5e1d5">
    <v-container fill-height d-flex align-content-start class="pa-6">
      <v-row>
        <v-col>
          <v-container class="mb-6">
            <v-row>
              <v-col cols="auto" class="pa-0" align-self="center">
                <div
                  style="
                    color: #d98150;
                    font-family: league spartan;
                    font-size: 24px;
                    line-height: 24px;
                  "
                >
                  block trackers
                </div>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="auto" class="pa-0" align-self="center">
                <v-chip-group
                  mandatory
                  v-bind:value="pageState"
                  style="margin: 0px"
                >
                  <v-chip
                    v-on:click="$emit('off')"
                    v-bind:text-color="`${!pageState ? 'white' : '#944b15'}`"
                    v-bind:style="{
                      backgroundColor: `${
                        !pageState ? '#d98150' : 'rgb(245, 225, 213)'
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
                    Off
                  </v-chip>
                  <v-chip
                    v-on:click="$emit('on')"
                    v-bind:text-color="`${pageState ? 'white' : '#944b15'}`"
                    v-bind:style="{
                      backgroundColor: `${
                        pageState ? '#d98150' : 'transparent'
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
                    On
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
          </v-container>
          <v-container v-if="pageState" class="mb-6">
            <v-row>
              <v-col class="pa-0">
                <v-card
                  flat
                  class="rounded-lg pa-3"
                  color="primary--text"
                  style="box-shadow: 0px 0px 8px 0px #cccccc"
                >
                  <v-container>
                    <v-row>
                      <v-col class="py-0">
                        <span
                          style="
                            font-family: More Sugar;
                            color: #d98150;
                            font-size: 24px;
                          "
                        >
                          trackers blocked
                        </span>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-container>
                    <v-row>
                      <v-col cols="auto" class="pa-3 pb-1" align-self="center">
                        <div
                          style="
                            font-family: Glacial Indifference;
                            font-size: 16px;
                            color: #d98150;
                          "
                        >
                          Current page
                        </div>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col cols="auto" class="pa-3 pb-1" align-self="center">
                        <v-chip
                          color="#f5e1d5"
                          style="
                            align-self: right;
                            font-family: More Sugar;
                            font-weight: 400;
                            color: #d98150;
                          "
                          >{{ pageHostname }}</v-chip
                        >
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="auto" class="pa-3 py-1" align-self="center">
                        <div
                          style="
                            font-family: Glacial Indifference;
                            font-size: 16px;
                            color: #d98150;
                          "
                        >
                          Blocked on this page
                        </div>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col cols="auto" class="pa-3 py-1" align-self="center">
                        <v-chip
                          color="#f5e1d5"
                          style="
                            align-self: right;
                            font-family: More Sugar;
                            font-weight: 400;
                            color: #d98150;
                          "
                          >{{ blockedOnThisPage }}</v-chip
                        >
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="auto" class="pa-3 pt-1" align-self="center">
                        <div
                          style="
                            font-family: Glacial Indifference;
                            font-size: 16px;
                            color: #d98150;
                          "
                        >
                          Total blocked
                        </div>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col cols="auto" class="pa-3 pt-1" align-self="center">
                        <v-chip
                          color="#f5e1d5"
                          style="
                            align-self: right;
                            font-family: More Sugar;
                            font-weight: 400;
                            color: #d98150;
                          "
                          >{{ blockedRequestCount }}</v-chip
                        >
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    pageState: Boolean,
    pageHostname: String,
    blockedOnThisPage: Number,
    blockedRequestCount: Number,
  },
};
</script>

<style>
.v-chip:before {
  background-color: transparent;
}
</style>