<template>
  <v-col class>
    <v-card
        class="rounded-lg"
        color="primary--text"
        style="box-shadow: 0px 0px 8px 0px #cccccc"
    >
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                depressed
                rounded
                color="#d98150"
                dark
                class="pa-4 pr-3"
                @click="logout()"
            >
                <span
                style="
                    font-family: Glacial Indifference;
                    text-transform: none;
                "
                >Logout</span
                >
                <v-icon right class="mr-0"> mdi-chevron-right </v-icon>
            </v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
  </v-col>

</template>

<script>

import loginService from '../services/loginService';

export default {
    name: "Settings",
    methods: {
        async logout() {
            await loginService.logout(this.$store);
        }
    }
}

</script>
