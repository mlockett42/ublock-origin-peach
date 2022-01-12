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
        <register v-on:toLogin="selectedOption = 0" v-if="registerSelected" />
        <login v-on:toRegister="selectedOption = 1" v-else-if="loginSelected" />
        <loading v-else />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import Loading from "../components/Loading.vue";
import loginService from "../services/loginService";

export default {
  name: "Onboarding",
  components: {
    Register,
    Login,
    Loading,
  },
  data() {
    return {
      selectedOption: null,
    };
  },
  computed: {
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
  },
};
</script>

<style></style>
