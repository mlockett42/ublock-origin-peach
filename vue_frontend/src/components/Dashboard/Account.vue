<template>
  <v-card flat height="calc(100vh - 72px)" class="rounded-0" color="#f5e1d5">
    <v-container fill-height d-flex align-content-start class="pa-6">
      <v-row>
        <v-col>
          <v-container class="mb-3">
            <v-row>
              <v-col class="pa-0">
                <div
                  style="
                    color: #d98150;
                    font-family: league spartan;
                    font-size: 24px;
                    line-height: 24px;
                  "
                >
                  account
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col class="pa-0">
                <div
                  class="mb-1 ml-2"
                  style="
                    font-family: More Sugar;
                    color: #d98150;
                    font-size: 16px;
                  "
                >
                  settings
                </div>
                <v-card
                  flat
                  class="rounded-lg pa-0 mb-3"
                  color="primary--text"
                  style="box-shadow: 0px 0px 8px 0px #cccccc"
                >
                  <v-container>
                    <v-row>
                      <v-col class="pa-0">
                        <v-card
                          flat
                          class="pa-3 py-2 rounded-lg"
                          href="https://accounts.gopeach.app/"
                          target="_blank"
                        >
                          <v-container>
                            <v-row>
                              <v-col
                                cols="auto"
                                class="pa-1"
                                align-self="center"
                              >
                                <div
                                  style="
                                    font-family: Glacial Indifference;
                                    font-size: 16px;
                                    color: #d98150;
                                  "
                                >
                                  Manage your account
                                </div>
                              </v-col>
                              <v-spacer></v-spacer>
                              <v-col
                                cols="auto"
                                class="pa-0"
                                align-self="center"
                              >
                                <v-icon color="#d98150"
                                  >mdi-chevron-right</v-icon
                                >
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card>
                        <v-divider
                          style="background-color: rgb(217, 129, 80, 0.3)"
                        ></v-divider>
                        <v-card
                          v-on:click="logout"
                          flat
                          class="pa-3 py-2 rounded-lg"
                        >
                          <v-container>
                            <v-row>
                              <v-col
                                cols="auto"
                                class="pa-1"
                                align-self="center"
                              >
                                <div
                                  style="
                                    font-family: Glacial Indifference;
                                    font-size: 16px;
                                    color: #d98150;
                                  "
                                >
                                  Log out
                                </div>
                              </v-col>
                              <v-spacer></v-spacer>
                              <v-col
                                cols="auto"
                                class="pa-0"
                                align-self="center"
                              >
                                <v-icon color="#d98150"
                                  >mdi-chevron-right</v-icon
                                >
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card>
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
import loginService from "../../services/loginService";

export default {
  name: "Account",
  methods: {
    async logout() {
      console.log("logout clicked");
      await loginService.logout(this.$store);
    },
  },
};
</script>
