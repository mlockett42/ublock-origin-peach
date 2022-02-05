<template>
  <v-card flat class="rounded-0" color="#fbf2e4" height="478">
    <v-container align-content-space-between d-flex fill-height fluid>
      <v-row>
        <v-col class="pa-0">
          <v-container>
            <v-row justify="center">
              <v-col cols="auto" class="pa-0 mb-1">
                <v-img
                  src="../../assets/img/default_image.png"
                  width="75px"
                  height="auto"
                  class="mb-3"
                ></v-img>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pa-0">
                <div
                  style="
                    font-family: More Sugar;
                    color: #d98150;
                    font-size: 28px;
                    line-height: 28px;
                    text-align: center;
                  "
                >
                  Verification
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="pa-0">
          <v-card-text class="pa-0">
            <v-container>
              <v-row>
                <v-col class="pa-0">
                  <div
                    style="
                      font-family: Glacial Indifference;
                      font-size: 16px;
                      line-height: 16px;
                      color: rgba(0, 0, 0, 0.6);
                      text-align: justify;
                    "
                  >
                    <p>
                      An email verification link has been sent to
                      <span style="color: #d98150">{{ email }}</span
                      >.
                    </p>
                    <p>
                      Please click and follow the link to complete the sign up
                      process.
                    </p>
                    <p>
                      If the email doesn't appear in your inbox, you may need to
                      check your junk or spam folder.
                    </p>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="pa-0">
          <v-card-actions class="pa-0 mb-6">
            <v-btn
              v-on:click="$emit('dismissVerification')"
              depressed
              rounded
              dark
              block
              class="px-4 py-5 pr-3 gradient-button"
            >
              <span
                style="
                  font-family: Glacial Indifference;
                  text-transform: none;
                  font-size: 16px;
                "
                >Dismiss</span
              >
            </v-btn>
          </v-card-actions>
          <!-- <v-card-text class="pa-0">
            <div
              style="
                text-align: center;
                font-family: Glacial Indifference;
                font-size: 13px;
                color: rgba(0, 0, 0, 0.6);
              "
            >
              Didn't receive the email?
              <span style="color: #d98150">Resend</span>
            </div>
          </v-card-text> -->
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "Register",
  props: {
    email: String,
  },
};
</script>

<style></style>
