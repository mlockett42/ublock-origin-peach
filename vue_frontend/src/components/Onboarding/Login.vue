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
                  Log in
                </div>
              </v-col>
            </v-row>
          </v-container>
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
              v-model="password"
              v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              v-bind:type="showPassword ? 'text' : 'password'"
              rounded
              name="password"
              id="password"
              filled
              dense
              placeholder="Password"
              background-color="white"
              hide-details
              class="mb-6"
              style="font-family: Glacial Indifference"
              color="grey darken-1"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-card-text>
          <v-container class="mb-6">
            <v-row>
              <v-col cols="auto" class="pa-0" align-self="center">
                <v-checkbox
                  v-model="remember"
                  class="mt-0 pt-0"
                  color="rgb(217, 129, 80)"
                  hide-details
                >
                  <template v-slot:label>
                    <div
                      style="font-family: Glacial Indifference; font-size: 13px"
                    >
                      Remember me
                    </div>
                  </template>
                </v-checkbox>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="auto" class="pa-0" align-self="center">
                <a
                  href="https://accounts.gopeach.app"
                  target="_blank"
                  style="
                    text-align: right;
                    font-family: Glacial Indifference;
                    font-size: 13px;
                    color: #d98150;
                    text-decoration: none;
                  "
                >
                  Forgot password?
                </a>
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
              @click="login()"
            >
              <v-progress-circular
                v-if="loggingIn"
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
                >Log in</span
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
              Don't have an account?
              <a
                v-on:click="toRegister"
                style="color: #d98150; text-decoration: none"
              >
                Sign up
              </a>
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import loginService from "../../services/loginService";

export default {
  name: "Login",
  data() {
    return {
      loggingIn: false,
      userName: "",
      password: "",
      showPassword: false,
      remember: false,
      error: "",
    };
  },
  methods: {
    async login() {
      this.loggingIn = true;
      try {
        let emailAddress = this.userName.toLowerCase();
        await loginService.login(this.$store, emailAddress, this.password);
      } catch (err) {
        if (err.name === "LoginException") {
          this.error = "Incorrect username or password.";
        } else {
          throw err;
        }
      } finally {
        this.loggingIn = false;
      }
    },
    toRegister() {
      this.$emit("toRegister");
    },
  },
};
</script>

<style>
.gradient-button {
  background: #d98150;
  background: linear-gradient(
    90deg,
    rgba(217, 129, 80, 1) 20%,
    rgba(217, 110, 80, 1) 100%
  );
}
</style>
