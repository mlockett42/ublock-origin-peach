<template>
  <v-card flat class="rounded-0" color="#fbf2e4" height="478">
    <v-container align-content-space-between d-flex fill-height fluid>
      <v-row justify="center">
        <v-col cols="auto" class="pa-0">
          <v-img
            src="../assets/img/default_image.png"
            width="75px"
            height="auto"
            class="mb-3"
          ></v-img>
          <div
            style="
              font-family: More Sugar;
              color: #d98150;
              font-size: 28px;
              line-height: 28px;
              text-align: center;
            "
          >
            Sign up
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="pa-0">
          <v-card-text class="pa-0">
            <v-container class="mb-3" v-if="error.length > 0">
              <v-row>
                <v-col class="pa-0">
                  <div
                    style="
                      font-family: Glacial Indifference;
                      font-size: 13px;
                      color: red;
                      text-align: center;
                    "
                  >
                    {{ error }}
                  </div>
                </v-col>
              </v-row>
            </v-container>

            <v-text-field
              v-model="userName"
              class="mb-3"
              rounded
              filled
              dense
              name="name"
              id="id"
              placeholder="Email"
              background-color="white"
              hide-details
              style="font-family: Glacial Indifference"
            ></v-text-field>
            <v-text-field
              v-model="password1"
              v-bind:append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
              v-bind:type="showPassword1 ? 'text' : 'password'"
              rounded
              name="password1"
              id="password1"
              filled
              dense
              placeholder="Password"
              background-color="white"
              hide-details
              class="mb-3"
              style="font-family: Glacial Indifference"
              color="grey darken-1"
              @click:append="showPassword1 = !showPassword1"
            ></v-text-field>
            <v-text-field
              v-model="password2"
              v-bind:append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
              v-bind:type="showPassword2 ? 'text' : 'password'"
              rounded
              name="password2"
              id="password2"
              filled
              dense
              placeholder="Confirm Password"
              background-color="white"
              hide-details
              class="mb-6"
              style="font-family: Glacial Indifference"
              color="grey darken-1"
              @click:append="showPassword2 = !showPassword2"
            ></v-text-field>
          </v-card-text>
          <v-container class="mb-6">
            <v-row>
              <v-col cols="auto" class="pa-0">
                <v-checkbox
                  v-model="remember"
                  class="mt-0 pt-0"
                  color="rgb(217, 129, 80)"
                  hide-details
                >
                </v-checkbox>
              </v-col>
              <v-col class="pa-0">
                <div
                  style="
                    font-family: Glacial Indifference;
                    font-size: 13px;
                    color: rgba(0, 0, 0, 0.6);
                    padding-top: 3px;
                  "
                >
                  I have read and agree to the Peach
                  <a
                    href="https://gopeach.app/terms-of-service/"
                    target="_blank"
                    style="color: #d98150; text-decoration: none"
                    >Terms of Service</a
                  >
                  and
                  <a
                    href="https://gopeach.app/privacy-policy/"
                    target="_blank"
                    style="color: #d98150; text-decoration: none"
                    >Privacy Policy</a
                  >
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions class="pa-0 mb-6">
            <v-btn
              depressed
              rounded
              dark
              block
              class="px-4 py-5 pr-3 gradient-button"
              @click="createAccount()"
            >
              <v-progress-circular
                v-if="signingUp"
                size="16"
                width="2"
                color="white"
                indeterminate
              ></v-progress-circular>
              <span
                v-else
                style="
                  font-family: Glacial Indifference;
                  text-transform: none;
                  font-size: 16px;
                "
                >Sign up</span
              >
            </v-btn>
          </v-card-actions>
          <v-card-text class="pa-0">
            <div
              style="
                text-align: center;
                font-family: Glacial Indifference;
                font-size: 13px;
                color: rgba(0, 0, 0, 0.6);
              "
            >
              Already have an account?
              <span v-on:click="toLogin" style="color: #d98150; cursor: pointer"
                >Log in</span
              >
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import loginService from "../services/loginService";

export default {
  name: "Register",
  data() {
    return {
      signingUp: false,
      userName: "",
      password1: "",
      password2: "",
      showPassword1: false,
      showPassword2: false,
      error: "",
    };
  },
  methods: {
    async createAccount() {
      this.signingUp = true;
      if (this.password1 !== this.password2) {
        this.error = "The passwords must match.";
        return;
      }
      let pattern =
        /^.*@((.*.\.uwa\.edu\.au)|uwa\.edu\.au)$|^.*@deliveryengine.net$/;
      if (this.userName.match(pattern) == null) {
        this.error = "Invalid email address.";
        return;
      }
      await loginService.createUser(this.userName, this.password1);
      await loginService.login(this.$store, this.userName, this.password1);
      alert(
        "User was successfully created. You will receive an email to validate the account."
      );
      this.signingUp = false;
    },
    toLogin() {
      this.$emit("toLogin");
    },
    methods: {
        async createAccount() {
            if (this.password1 !== this.password2) {
                alert("Passwords must match");
                return;
            }
            await loginService.createUser(this.userName, this.password1);
            await loginService.login(this.$store, this.userName, this.password1);
            alert("User was successfully created. You will receive an email to validate the account.")
        }
    }
  },
};
</script>

<style></style>
