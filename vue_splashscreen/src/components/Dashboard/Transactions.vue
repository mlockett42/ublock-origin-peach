<template>
  <v-card
    color="white"
    height="calc(100vh - 72px + 21px)"
    rounded="xl"
    class="pa-4"
    outlined
    elevation="0"
    style="border-color: #d98150 !important; border-width: 2px !important"
  >
    <v-container>
      <v-row>
        <v-col cols="auto" class="pa-0" align-self="center">
          <v-card-title class="pa-2"
            ><h2>
              <div
                v-if="transactionDetail"
                style="
                  color: #d98150;
                  font-family: leaguespartan;
                  font-size: 24px;
                  line-height: 24px;
                "
              >
                transaction detail
              </div>
              <div
                v-else
                style="
                  color: #d98150;
                  font-family: leaguespartan;
                  font-size: 24px;
                  line-height: 24px;
                "
              >
                transactions
              </div>
            </h2></v-card-title
          >
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto" class="pa-0" align-self="center">
          <v-btn
            v-if="transactionDetail"
            v-on:click="clickClose"
            depressed
            icon
            color="#d98150"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="transactionDetail" class="pa-0">
      <v-row
        v-for="detail in transactionDetails"
        v-bind:key="detail.key"
        no-gutters
        align="center"
      >
        <v-col
          cols="auto"
          class="pa-2"
          style="color: #d98150; font-family: glacial"
        >
          <h3>
            <span style="font-weight: 400">{{ detail.key }}</span>
          </h3>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto" class="pa-2"
          ><v-chip
            color="#f5e1d5"
            style="
              align-self: right;
              font-family: More Sugar;
              font-weight: 400;
              color: #d98150;
            "
            >{{ detail.value }}</v-chip
          >
          <v-tooltip v-if="detail.key == 'Data'" bottom color="#d98150">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                dark
                icon
                dense
                class="ml-2"
                height="32px"
                width="32px"
                style="
                  font-family: More Sugar;
                  font-size: 14px;
                  font-weight: 400;
                  color: #f5b18e;
                  text-transform: capitalize;
                "
                v-bind="attrs"
                v-on="on"
                ><v-icon>mdi-cancel</v-icon>
              </v-btn>
            </template>
            <span style="font-family: glacial"
              >Don't sell my {{ detail.value }}</span
            >
          </v-tooltip>
          <v-tooltip v-else-if="detail.key == 'Buyer'" bottom color="#d98150">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                dark
                icon
                dense
                class="ml-2"
                height="32px"
                width="32px"
                style="
                  font-family: More Sugar;
                  font-size: 14px;
                  font-weight: 400;
                  color: #f5b18e;
                  text-transform: capitalize;
                "
                v-bind="attrs"
                v-on="on"
                ><v-icon>mdi-cancel</v-icon>
              </v-btn>
            </template>
            <span style="font-family: glacial"
              >Don't sell my data to {{ detail.value }}</span
            >
          </v-tooltip>
        </v-col>
      </v-row>
    </v-container>

    <v-virtual-scroll
      v-else
      v-bind:items="transactions"
      height="calc(100vh - 72px + 21px - 60px)"
      item-height="64"
      v-bind:bench="3"
    >
      <template v-slot:default="{ item }">
        <v-row no-gutters align="center">
          <v-col
            cols="auto"
            class="pa-2"
            style="color: #d98150; font-family: glacial"
          >
            <h3>
              <span style="font-weight: 400">{{ item.data }}</span>
            </h3>
            <h5>
              <v-icon color="#d98150" size="14px" style="margin-top: -3px"
                >mdi-arrow-right-bold</v-icon
              >
              <span style="font-weight: 400">{{ item.to }}</span>
            </h5>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto" class="pa-2">
            <v-chip
              color="#f5e1d5"
              style="
                align-self: right;
                font-family: More Sugar;
                font-weight: 400;
                color: #d98150;
              "
              >{{ item.value }}</v-chip
            >
            <v-tooltip bottom color="#d98150">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-on:click="clickInformation(item.id)"
                  depressed
                  dark
                  icon
                  dense
                  class="ml-2"
                  style="
                    font-family: More Sugar;
                    font-size: 14px;
                    font-weight: 400;
                    color: #f5b18e;
                    text-transform: capitalize;
                  "
                  v-bind="attrs"
                  v-on="on"
                  ><v-icon>mdi-information</v-icon>
                </v-btn>
              </template>
              <span style="font-family: glacial">View details</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </template>
    </v-virtual-scroll>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      transactionDetail: false,
    };
  },
  computed: {
    ...mapState({
      transactions: (state) => state.transactions.transactions,
      transaction: (state) => state.transactions.selectedTransaction,
    }),
    ...mapGetters("transactions", {
      transactionDetails: "transactionDetails",
    }),
  },
  methods: {
    ...mapActions("transactions", ["setSelectedTransaction"]),
    clickInformation(id) {
      this.setSelectedTransaction(id);
      this.transactionDetail = true;
    },
    clickClose() {
      this.transactionDetail = false;
    },
  },
};
</script>

<style>
.v-virtual-scroll::-webkit-scrollbar {
  width: 0.5em;
}

.v-virtual-scroll::-webkit-scrollbar-thumb {
  background-color: #f5e1d5 !important;
  border-radius: 5px;
}
</style>