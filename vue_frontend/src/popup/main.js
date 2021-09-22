import Vue from "vue";
import vuetify from '../plugins/vuetify';
import App from "./App.vue";
import store from '../store/index'

/* eslint-disable no-new */
new Vue({
  vuetify,
  store,
  el: "#app",
  render: (h) => h(App),
});