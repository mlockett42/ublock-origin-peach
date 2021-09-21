import Vue from "vue";
import Vuex from "vuex";

import { authentication } from './authenticationModule';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
  }
});
