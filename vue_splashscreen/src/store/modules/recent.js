export default {
  namespaced: true,
	state: {
    history: [
      {
        id: 0,
        name: "facebook.com",
        mode: 0,
      },
      {
        id: 1,
        name: "youtube.com",
        mode: 0,
      },
      {
        id: 2,
        name: "asos.com",
        mode: 0,
      },
      {
        id: 3,
        name: "ebay.com.au",
        mode: 0,
      },
    ],
	},
	mutations: {
    SET_MODE(state, {id, mode}) {
      state.history = state.history.map((item) => {
        if (item.id == id) {
          return {...item, mode: mode};
        } else {
          return item
        }
      });
    },
	},
	actions: {
    setMode(context, {id, mode}) {
      context.commit('SET_MODE', {id, mode});
    },
	},
	modules: {},
};