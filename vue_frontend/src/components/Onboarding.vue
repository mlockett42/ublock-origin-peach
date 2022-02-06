<template>
  <v-container
    id="onboarding"
    d-flex
    align-content-space-between
    fill-height
    fluid
    style="background-color: #fbf2e4"
    class="pa-12 pb-6"
  >
    <v-row>
      <v-col>
        <register
          v-on:toLogin="selectedOption = 0"
          v-on:setVerificationNext="$emit('setVerificationNext')"
          v-on:toVerification="selectVerification"
          v-if="registerSelected"
        />
        <login v-on:toRegister="selectedOption = 1" v-else-if="loginSelected" />
        <verification
          v-else-if="verificationSelected"
          v-bind:email="email"
          v-on:dismissVerification="$emit('dismissVerification')"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Register from "./Onboarding/Register.vue";
import Login from "./Onboarding/Login.vue";
import Verification from "./Onboarding/Verification.vue";

import loginService from "../services/loginService";

export default {
  name: "Onboarding",
  components: {
    Register,
    Login,
    Verification,
  },
  data() {
    return {
      selectedOption: 2, //1
      email: "you@example.com",
    };
  },
  computed: {
    verificationSelected: function () {
      return this.selectedOption == 2;
    },
    registerSelected: function () {
      return this.selectedOption == 1;
    },
    loginSelected: function () {
      return this.selectedOption == 0;
    },
  },
  async mounted() {
    this.selectedOption = (await loginService.hasEverLoggedIn()) ? 0 : 1;
  },
  methods: {
    login() {
      this.selectedOption = 0;
    },
    createAccount() {
      this.selectedOption = 1;
    },
    selectVerification(email) {
      this.email = email;
      this.selectedOption = 2;
    },
  },
};
</script>

<style></style>
