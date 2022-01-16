<template>
  <v-container
    id="dashboard"
    d-flex
    align-content-space-between
    fill-height
    fluid
  >
    <v-row>
      <v-col class="pa-0">
        <blocking
          v-bind:pageState="pageState"
          v-bind:pageHostname="pageHostname"
          v-bind:blockedOnThisPage="blockedOnThisPage"
          v-bind:blockedRequestCount="blockedRequestCount"
          v-on:on="turnOnBlocking"
          v-on:off="turnOffBlocking"
          v-if="tab == 0"
        />
        <selling
          v-bind:sellingState="sellingState"
          v-on:on="turnOnSelling"
          v-on:off="turnOffSelling"
          v-else-if="tab == 1"
        />
        <account v-else-if="tab == 2" />
        <help v-else-if="tab == 3" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0">
        <v-bottom-navigation v-model="tab" grow color="#d98150" height="72px">
          <v-btn>
            <span style="font-family: Glacial Indifference; size: 13px"
              >Blocking</span
            >
            <v-icon class="mb-1">mdi-shield</v-icon>
          </v-btn>
          <v-btn>
            <span style="font-family: Glacial Indifference; size: 13px"
              >Selling</span
            >
            <v-icon class="mb-1">mdi-currency-usd</v-icon>
          </v-btn>
          <v-btn>
            <span style="font-family: Glacial Indifference; size: 13px"
              >Account</span
            >
            <v-icon class="mb-1">mdi-account-circle</v-icon>
          </v-btn>
          <v-btn>
            <span style="font-family: Glacial Indifference; size: 13px"
              >Help</span
            >
            <v-icon class="mb-1">mdi-help-circle</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
let statsStr = "{{count}} ({{percent}}%)";

const formatNumber = function (count) {
  if (typeof count !== "number") {
    return "";
  }
  if (count < 1e6) {
    return count.toLocaleString();
  }

  if (intlNumberFormat === undefined && Intl.NumberFormat instanceof Function) {
    const intl = new Intl.NumberFormat(undefined, {
      notation: "compact",
      maximumSignificantDigits: 4,
    });
    if (
      intl.resolvedOptions instanceof Function &&
      !!intl.resolvedOptions().getOwnPropertyDescriptor("notation")
    ) {
      intlNumberFormat = intl;
    }
  }

  if (intlNumberFormat) {
    return intlNumberFormat.format(count);
  }

  // https://github.com/uBlockOrigin/uBlock-issues/issues/1027#issuecomment-629696676
  //   For platforms which do not support proper number formatting, use
  //   a poor's man compact form, which unfortunately is not i18n-friendly.
  count /= 1000000;
  if (count >= 100) {
    count = Math.floor(count * 10) / 10;
  } else if (count > 10) {
    count = Math.floor(count * 100) / 100;
  } else {
    count = Math.floor(count * 1000) / 1000;
  }
  return count.toLocaleString(undefined) + "\u2009M";
};

let intlNumberFormat;

/******************************************************************************/

// greater-than-zero test

const gtz = (n) => typeof n === "number" && n > 0;

/******************************************************************************/

function formatBlocked(blocked, total) {
  let text;
  if (total === 0) {
    text = formatNumber(0);
  } else {
    text = statsStr
      .replace("{{count}}", formatNumber(blocked))
      .replace(
        "{{percent}}",
        formatNumber(Math.floor((blocked * 100) / total))
      );
  }
  return text;
}

import Blocking from "./Dashboard/Blocking.vue";
import Selling from "./Dashboard/Selling.vue";
import Account from "./Dashboard/Account.vue";
import Help from "./Dashboard/Help.vue";

export default {
  name: "Dashboard",
  components: {
    Blocking,
    Selling,
    Account,
    Help,
  },
  async mounted() {
    this.port = chrome.extension.connect({
      name: "Peach Fruitful Browsing",
    });
    this.port.postMessage({ from: "Peach", function: "getData" });
    let self = this;
    this.port.onMessage.addListener(function (msg) {
      self.blockedRequestCount = formatBlocked(
        msg.uBlock.localSettings.blockedRequestCount,
        msg.uBlock.localSettings.allowedRequestCount +
          msg.uBlock.localSettings.blockedRequestCount
      );
      self.pageHostname = msg.info.pageHostname;

      // Calculate "blocked on this page"
      let blocked, total;
      if (msg.info.pageCounts !== undefined) {
        const counts = msg.info.pageCounts;
        blocked = counts.blocked.any;
        total = blocked + counts.allowed.any;
      } else {
        blocked = 0;
        total = 0;
      }
      self.blockedOnThisPage = formatBlocked(blocked, total);
      self.pageState = msg.info.netFilteringSwitch;
      self.pageURL = msg.info.pageURL;
    });
  },
  data() {
    return {
      tab: 0,
      isActive: true,
      myURL: "",
      blockedRequestCount: "Loading",
      pageHostname: "Loading",
      blockedOnThisPage: "Loading",
      port: null,
      touchedDomainCount: "Loading",
      allDomainCount: "Loading",
      pageState: true,
      sellingState: false,
      pageURL: null,
      netFilterEverToggled: false,
      peachKey: "LOADING",
    };
  },
  computed: {
    pageStateColor: function () {
      return this.pageState ? "blue" : "gray";
    },
  },
  methods: {
    toggleOnOff() {
      let newPageState = !this.pageState;
      this.pageState = newPageState;
      this.port.postMessage({
        from: "Peach",
        function: "toggleNetFiltering",
        params: {
          url: this.pageURL,
          scope: "",
          state: newPageState,
        },
      });
      this.netFilterEverToggled = true;
    },
    turnOnBlocking() {
      this.pageState = true;
      this.port.postMessage({
        from: "Peach",
        function: "toggleNetFiltering",
        params: {
          url: this.pageURL,
          scope: "",
          state: true,
        },
      });
      this.netFilterEverToggled = true;
    },
    turnOffBlocking() {
      this.pageState = false;
      this.port.postMessage({
        from: "Peach",
        function: "toggleNetFiltering",
        params: {
          url: this.pageURL,
          scope: "",
          state: false,
        },
      });
      this.netFilterEverToggled = true;
    },
    turnOnSelling() {
      this.sellingState = true;
    },
    turnOffSelling() {
      this.sellingState = false;
    },
    calculatePrivacyExposure(hostnameDict) {
      let bg = chrome.extension.getBackgroundPage();
      bg.console.log(
        "Hello from calculatePrivacyExposure hostnameDict=",
        hostnameDict
      );
      if (!hostnameDict) {
        return { count: "", total: "" };
      }

      // From renderPrivacyExposure in ublock-origin
      const allDomains = {};
      let allDomainCount = 0;
      let touchedDomainCount = 0;

      let allHostnameRows = [];

      // Sort hostnames. First-party hostnames must always appear at the top
      // of the list.
      const desHostnameDone = {};
      const keys = Object.keys(hostnameDict); /*
                        .sort(hostnameCompare)*/
      for (const des of keys) {
        // Specific-type rules -- these are built-in
        if (des === "*" || !!desHostnameDone.getOwnPropertyDescriptor(des)) {
          continue;
        }
        const hnDetails = hostnameDict[des];
        const { domain, counts } = hnDetails;
        alert(`1 calculatePrivacyExposure domain=${domain}`);
        if (!allDomains.getOwnPropertyDescriptor(domain)) {
          allDomains[domain] = false;
          allDomainCount += 1;
        }
        if (gtz(counts.allowed.any)) {
          if (allDomains[domain] === false) {
            allDomains[domain] = true;
            touchedDomainCount += 1;
          }
        }
        allHostnameRows.push(des);
        desHostnameDone[des] = true;
      }

      return {
        touchedDomainCount: touchedDomainCount.toLocaleString(),
        allDomainCount: allDomainCount.toLocaleString(),
      };
    },
    refreshPage() {
      this.port.postMessage({
        from: "Peach",
        function: "refreshPage",
      });
    },
  },
};
</script>

<style></style>
