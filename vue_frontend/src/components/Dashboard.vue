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
        <v-card flat height="494px" class="rounded-0" color="#e6e0da">
          <v-container fill-height d-flex align-content-start class="pa-6">
            <v-row>
              <v-col cols="9" align-self="center">
                <v-card-title v-if="pageState" class="primary--text pa-0"
                  ><span style="font-family: moresugar"
                    >peachblock is active</span
                  >
                </v-card-title>
                <v-card-title v-if="!pageState" class="secondary--text pa-0">
                  <span style="font-family: moresugar"
                    >peachblock is disabled</span
                  >
                </v-card-title>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="auto" align-self="center">
                <v-btn
                  fab
                  small
                  v-on:click="toggleOnOff()"
                  style="box-shadow: 0px 0px 8px 0px #cccccc"
                >
                  <v-icon v-if="pageState" color="primary">mdi-pause</v-icon>
                  <v-icon v-if="!pageState" color="secondary">mdi-play</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-if="tab == 0">
              <v-col class>
                <v-card
                  class="rounded-lg"
                  color="primary--text"
                  style="box-shadow: 0px 0px 8px 0px #cccccc"
                >
                  <v-card-title class="text-h6"> current page </v-card-title>
                  <v-card-text
                    >domain: {{ pageHostname }}<br />trackers blocked:
                    {{ blockedOnThisPage }}</v-card-text
                  >
                </v-card>
              </v-col>
            </v-row>
            <v-row v-if="tab == 0">
              <v-col class>
                <v-card
                  class="rounded-lg"
                  color="primary--text"
                  style="box-shadow: 0px 0px 8px 0px #cccccc"
                >
                  <v-card-title class="text-h6"> all-time </v-card-title>
                  <v-card-text
                    >trackers blocked: {{ blockedRequestCount }}</v-card-text
                  >
                </v-card>
              </v-col>
            </v-row>
            <v-row v-if="tab == 1">
              <v-col class>
                <v-card
                  class="rounded-lg"
                  color="primary--text"
                  style="box-shadow: 0px 0px 8px 0px #cccccc"
                >
                  <!-- <v-card-text class="pb-0 primary--text"
                    ><span style="font-family: moresugar"
                      >June 6th</span
                    ></v-card-text
                  >
                  <v-card-title class="text-h6 pt-0">
                    Are we logged in?
                  </v-card-title>
                  <v-card-text
                    >Peach key = {{ peachKey }}</v-card-text
                  > -->
                </v-card>
              </v-col>
            </v-row>
            <v-row v-if="tab == 2">
              <settings/>
            </v-row>
            <v-row v-if="tab == 3">
              <v-col class>
                <v-card
                  class="rounded-lg"
                  color="primary--text"
                  style="box-shadow: 0px 0px 8px 0px #cccccc"
                >
                  <v-card-text class="pb-0 primary--text"
                    ><span style="font-family: moresugar"
                      >about us</span
                    ></v-card-text
                  >
                  <v-card-title class="text-h6 pt-0"> peach </v-card-title>
                  <v-card-text>
                    Peach is a company aiming to create a world in which
                    internet users are given complete control over their own
                    data.
                  </v-card-text>
                  <v-card-text>
                    We're currently building a platform that allows users to
                    earn passive income by selling their internet usage data.
                    You'll be able to choose what data to sell, who you'd like
                    to sell to, and at what price.
                  </v-card-text>
                  <!-- <v-card-actions class="pr-3 pb-3">
										<v-spacer></v-spacer>
										<v-btn depressed color="primary lighten-1 pl-5">
											<span
												style="font-family: glacial; font-size: 18px; text-transform: lowercase; margin-top: -5px;"
												>more</span
											>
											<v-icon>mdi-chevron-right</v-icon>
										</v-btn>
									</v-card-actions> -->
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0">
        <v-bottom-navigation v-model="tab" color="primary">
          <v-btn>
            <v-icon>mdi-home</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-bell</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-cog</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-information</v-icon>
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

import Settings from "../components/Settings.vue";

export default {
  name: "Dashboard",
  components: {
    Settings,
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
      pageURL: null,
      netFilterEverToggled: false,
      peachKey: "LOADING"
    };
  },
  computed: {
    pageStateColor: function () {
      return this.pageState ? "blue" : "gray";
    }
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
