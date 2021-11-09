import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import overview from './modules/overview';
import transactions from './modules/transactions';
import recent from './modules/recent';
import blocking from './modules/blocking';
import collecting from './modules/collecting';
import selling from './modules/selling';

export default new Vuex.Store({
	state: {},
  getters: {},
	mutations: {},
	actions: {},
	modules: {
    overview,
    transactions,
    recent,
    blocking,
    collecting,
    selling
  },
});
