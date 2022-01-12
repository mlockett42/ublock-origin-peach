<template>
        <v-card flat class="rounded-0" color="#e6e0da" style="padding-top:5px">
            <v-card-text class="pa-0 px-3">
                <v-text-field
                    v-model="userName"
                    class="mb-4 mt-2"
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
                    class="mb-4"
                    style="font-family: Glacial Indifference"
                    color="grey darken-1"
                    @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-text-field
                    v-model="password2"
                    v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    v-bind:type="showPassword ? 'text' : 'password'"
                    rounded
                    name="password"
                    id="password"
                    filled
                    dense
                    placeholder="Confirm Password"
                    background-color="white"
                    hide-details
                    class="mb-2"
                    style="font-family: Glacial Indifference"
                    color="grey darken-1"
                    @click:append="showPassword = !showPassword"
                ></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    depressed
                    rounded
                    color="#d98150"
                    dark
                    class="pa-4 pr-3"
                    @click="createAccount()"
                >
                    <span
                    style="
                        font-family: Glacial Indifference;
                        text-transform: none;
                    "
                    >Create Account</span
                    >
                    <v-icon right class="mr-0"> mdi-chevron-right </v-icon>
                </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
</template>

<script>
import loginService from '../services/loginService';
export default {
    name: "Register",
    data() {
        return {
            userName: "",
            password1: "",
            password2: "",
            showPassword: false
        }
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
};
</script>

<style></style>
