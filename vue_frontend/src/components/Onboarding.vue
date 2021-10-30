<template>
  <v-container
    id="onboarding"
    d-flex
    align-content-space-between
    fill-height
    fluid
  >
    <v-row>
      <v-col class="pa-0">
        <v-card flat class="rounded-0" color="#e6e0da">  
          <v-container fill-height d-flex align-content-start class="pa-6">
            <v-row>
              <v-col cols="9" align-self="center">
                  <span style="font-family: moresugar">Onboarding</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9" align-self="center">
                  <span style="color:red; font-family: moresugar;">No valid creds found please login or create account</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9" align-self="center">
              </v-col>
            </v-row>
          </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    depressed
                    rounded
                    :color="loginButtonColor"
                    light
                    class="pa-4 pr-3"
                    @click="login()"
                >
                    <span
                    :style="loginButtonTextStyle"
                    >Login Existing</span
                    >
                </v-btn>
                <v-btn
                    depressed
                    rounded
                    :color="registerButtonColor"
                    dark
                    class="pa-4 pr-3"
                    @click="createAccount()"
                >
                    <span
                    :style="registerButtonTextStyle"
                    >Create Account</span
                    >
                </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
        <register v-if="registerSelected" />
        <login v-if="loginSelected" />
      </v-col>
    </v-row>    
  </v-container>
</template>

<script>
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import loginService from "../services/loginService";

export default {
    name: "Onboarding",
    components: {
      Register,
      Login
    },
    data() {
      return {
        selectedOption: 0
      }
    },
    computed: {
      registerSelected: function () {
        return this.selectedOption == 1;
      },
      loginSelected: function () {
        return this.selectedOption == 0;
      },
      registerButtonColor: function() {
        return this.registerSelected ? "#d98150": "white";
      },
      registerButtonTextStyle: function() {
        return this.registerSelected ? `
                        font-family: Glacial Indifference;
                        text-transform: none;
                    `: `
                        color: #d98150;
                        font-family: Glacial Indifference;
                        text-transform: none;
                    "`;
      },
      loginButtonColor: function() {
        return this.loginSelected ? "#d98150": "white";
      },
      loginButtonTextStyle: function() {
        return this.loginSelected ? `
                        color: white;
                        font-family: Glacial Indifference;
                        text-transform: none;
                    `: `
                        color: #d98150;
                        font-family: Glacial Indifference;
                        text-transform: none;
                    "`;
      }
    },
    async mounted() {
      this.selectedOption = await loginService.hasEverLoggedIn() ? 0 : 1;
    },
    methods: {
      login() {
        this.selectedOption = 0;
      },
      createAccount() {
        this.selectedOption = 1;
      }
    }
};
</script>

<style></style>
