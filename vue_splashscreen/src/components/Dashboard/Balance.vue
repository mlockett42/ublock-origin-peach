<template>
  <v-card color="#d98150" rounded="xl" class="pa-4 pb-2 gradient-bg mb-6" flat>
    <v-card-title class="pa-2"
      ><h2>
        <div
          style="
            color: white;
            font-family: leaguespartan;
            font-size: 24px;
            line-height: 24px;
          "
        >
          balance
        </div>
      </h2></v-card-title
    >
    <v-row no-gutters align="center">
      <v-col
        cols="auto"
        class="pa-2"
        style="color: white; font-family: glacial"
      >
        <h2>
          <span style="color: white; font-family: glacial">{{ balance }}</span>
        </h2>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto" class="pa-2">
        <v-container>
          <v-row>
            <v-col class="pa-0">
              <h4>
                <v-icon color="white" size="18px" style="margin-top: -3px"
                  >mdi-arrow-up-bold</v-icon
                >
                <span style="font-weight: 400; color: white"
                  >{{ earned }}
                </span>
                <span
                  style="
                    font-weight: 400;
                    color: white;
                    font-size: 12px;
                    text-transform: lowercase;
                  "
                  >earned {{ periodText }}</span
                >
              </h4>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pa-0">
              <h4>
                <v-icon color="white" size="18px" style="margin-top: -3px"
                  >mdi-cash</v-icon
                >
                <span style="font-weight: 400; color: white">{{ paid }} </span>
                <span
                  style="
                    font-weight: 400;
                    color: white;
                    font-size: 12px;
                    text-transform: lowercase;
                  "
                  >paid out {{ periodText }}</span
                >
              </h4>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState({
      period: (state) => state.overview.selectedPeriod,
      balance: (state) => state.overview.balance,
    }),
    ...mapGetters("overview", {
      earned: "periodEarned",
      paid: "periodPaid",
    }),
    periodText() {
      const options = ["this year", "this month", "this week", "today"];
      return options[this.period];
    },
  },
};
</script>

<style>
</style>