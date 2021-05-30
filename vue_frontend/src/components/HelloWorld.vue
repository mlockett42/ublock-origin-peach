<template>
  <div>
    <button v-bind:style="{fontSize: '80px', color: pageStateColor}" v-on:click=testme>P</button>
    <p>Current domain: {{pageHostname}}</p>
    <p>Blocked on this page: {{blockedOnThisPage}}</p>
    <!-- I couldn't get this Domains Connected thing to work so disabling for now
    It always reported 0 out of 0
    <p>Domains connected</p>
    <p>{{touchedDomainCount}} out of {{allDomainCount}}</p>
    -->
    <p>Blocked since install {{ blockedRequestCount }}</p>
  </div>
</template>

<script>

let statsStr = "{{count}} ({{percent}}%)";

const formatNumber = function(count) {
    if ( typeof count !== 'number' ) { return ''; }
    if ( count < 1e6 ) { return count.toLocaleString(); }

    if (
        intlNumberFormat === undefined &&
        Intl.NumberFormat instanceof Function
    ) {
        const intl = new Intl.NumberFormat(undefined, {
            notation: 'compact',
            maximumSignificantDigits: 4
        });
        if (
            intl.resolvedOptions instanceof Function &&
            !!intl.resolvedOptions().getOwnPropertyDescriptor('notation')
        ) {
            intlNumberFormat = intl;
        }
    }

    if ( intlNumberFormat ) {
        return intlNumberFormat.format(count);
    }

    // https://github.com/uBlockOrigin/uBlock-issues/issues/1027#issuecomment-629696676
    //   For platforms which do not support proper number formatting, use
    //   a poor's man compact form, which unfortunately is not i18n-friendly.
    count /= 1000000;
    if ( count >= 100 ) {
      count = Math.floor(count * 10) / 10;
    } else if ( count > 10 ) {
      count = Math.floor(count * 100) / 100;
    } else {
      count = Math.floor(count * 1000) / 1000;
    }
    return (count).toLocaleString(undefined) + '\u2009M';
};

let intlNumberFormat;

/******************************************************************************/

// greater-than-zero test

const gtz = n => typeof n === 'number' && n > 0;

/******************************************************************************/

function formatBlocked(blocked, total) {
  let text;
  if ( total === 0 ) {
    text = formatNumber(0);
  } else {
    text = statsStr.replace('{{count}}', formatNumber(blocked))
                    .replace('{{percent}}', formatNumber(Math.floor(blocked * 100 / total)));
  }
  return text;
}

export default {
  name: "HelloWorld",
  mounted() {
    this.port = chrome.extension.connect({
      name: "Peach Fruitful Browsing"
    });
    this.port.postMessage({from: "Peach", function: "getData"});
    let self = this;
    this.port.onMessage.addListener(function(msg) {
      self.blockedRequestCount = formatBlocked(
        msg.uBlock.localSettings.blockedRequestCount,
        msg.uBlock.localSettings.allowedRequestCount + msg.uBlock.localSettings.blockedRequestCount
      );
      self.pageHostname = msg.info.pageHostname;

      // Calculate "blocked on this page"
      let blocked, total;
      if ( msg.info.pageCounts !== undefined ) {
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

  /*
      alert("1 mounted info=", );
      let {touchedDomainCount, allDomainCount} = self.calculatePrivacyExposure(msg.info.hostnameDetails);
      self.touchedDomainCount = touchedDomainCount;
      self.allDomainCount = allDomainCount;
      alert("2 mounted");
      */
    });
  },
  data() {
    return {
      myURL: "",
      blockedRequestCount: "Loading",
      pageHostname: "Loading",
      blockedOnThisPage: "Loading",
      port: null,
      touchedDomainCount: "Loading",
      allDomainCount: "Loading",
      pageState: true,
      pageURL: null
    }
  },
  computed: {
    pageStateColor: function () {
      return this.pageState ? "blue" : "gray";
    }
  },
  methods: {
    testme() {
      this.pageState = !this.pageState;
      this.port.postMessage({from: "Peach", function: "getData"});
      /*
      let self = this;
      this.port.onMessage.addListener(function(msg) {
        console.log("msg.info.hostnameDetails=",msg.info.hostnameDetails);
        //let {touchedDomainCount, allDomainCount} = self.calculatePrivacyExposure(msg.info.hostnameDetails);
        self.touchedDomainCount = msg.info.touchedDomainCount;
        self.allDomainCount = msg.info.allDomainCount;
        //self.pageState = msg.info.netFilteringSwitch;
      });
      */
    },
    calculatePrivacyExposure(hostnameDict) {
      let bg = chrome.extension.getBackgroundPage();
        bg.console.log("Hello from calculatePrivacyExposure hostnameDict=", hostnameDict);
      if (!hostnameDict) {
        return {count: "", total: ""};
      }

      // From renderPrivacyExposure in ublock-origin
      const allDomains = {};
      let allDomainCount = 0;
      let touchedDomainCount = 0;

      let allHostnameRows = [];

      // Sort hostnames. First-party hostnames must always appear at the top
      // of the list.
      const desHostnameDone = {};
      const keys = Object.keys(hostnameDict)/*
                        .sort(hostnameCompare)*/;
      for ( const des of keys ) {
          // Specific-type rules -- these are built-in
          if ( des === '*' || !!desHostnameDone.getOwnPropertyDescriptor(des) ) { continue; }
          const hnDetails = hostnameDict[des];
          const { domain, counts } = hnDetails;
          alert(`1 calculatePrivacyExposure domain=${domain}`);
          if ( !allDomains.getOwnPropertyDescriptor(domain)) {
              allDomains[domain] = false;
              allDomainCount += 1;
          }
          if ( gtz(counts.allowed.any) ) {
              if ( allDomains[domain] === false ) {
                  allDomains[domain] = true;
                  touchedDomainCount += 1;
              }
          }
          allHostnameRows.push(des);
          desHostnameDone[des] = true;
      }

      return {touchedDomainCount: touchedDomainCount.toLocaleString(), allDomainCount: allDomainCount.toLocaleString()};

      //const summary = domainsHitStr
      //    .replace('{{count}}', touchedDomainCount.toLocaleString())
      //    .replace('{{total}}', allDomainCount.toLocaleString());
      //uDom.nodeFromSelector(
      //    '[data-i18n^="popupDomainsConnected"] + span'
      //).textContent = summary;
    }

  }
};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
