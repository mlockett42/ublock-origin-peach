export default {
  namespaced: true,
	state: {
		selectedPeriod: 0,
    balance: "$1,402.21",
    earned: ["$1,552.21","$168.21","$41.21", "$3.89"],
    change: ["$143.29", "$19.88", "$3.45", "$0.85"],
    paid: ["$150.00","$50.00","$0.00", "$0.00"],
    blocked: [[{id: 0, network: "Google", count: 1321}, {id: 1, network: "Facebook", count: 1227}, {id: 2, network: "Other", count: 821}],
    [{id: 0, network: "Google", count: 123}, {id: 1, network: "Facebook", count: 112}, {id: 2, network: "Other", count: 87}],
    [{id: 0, network: "Google", count: 32}, {id: 1, network: "Facebook", count: 21}, {id: 2, network: "Other", count: 5}],
    [{id: 0, network: "Google", count: 6}, {id: 1, network: "Facebook", count: 6}, {id: 2, network: "Other", count: 3}]],
	},
  getters: {
    periodEarned: state => {
      return state.earned[state.selectedPeriod];
    },
    periodPaid: state => {
      return state.paid[state.selectedPeriod];
    },
    periodBlocked: state => {
      return state.blocked[state.selectedPeriod];
    },
    periodChange: state => {
      return state.change[state.selectedPeriod];
    },
  },
	mutations: {
		SET_SELECTED_PERIOD(state, value) {
			state.selectedPeriod = value;
		},
	},
	actions: {
		setSelectedPeriod(context, period) {
			context.commit('SET_SELECTED_PERIOD', period);
		},
	},
};
