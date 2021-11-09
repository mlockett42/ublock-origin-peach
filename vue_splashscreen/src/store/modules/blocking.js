export default {
  namespaced: true,
	state: {
    status: 1,
    allowed: [
      {
        id: 0,
        url: 'facebook.com',
        type: 'website'
      },
      {
        id: 1,
        url: 'instagram.com',
        type: 'website'
      },
      {
        id: 2,
        url: 'google.com',
        type: 'website'
      },
      {
        id: 3,
        url: 'linkedin.com',
        type: 'website'
      },
      {
        id: 4,
        url: 'bbc.com/world',
        type: 'page'
      },
      {
        id: 5,
        url: 'yahoo.com/news',
        type: 'page'
      },
      {
        id: 5,
        url: 'ebay.com',
        type: 'website'
      },
      {
        id: 6,
        url: 'asos.com',
        type: 'website'
      },
      {
        id: 7,
        url: 'jamesaudcent.com',
        type: 'website'
      },
      {
        id: 8,
        url: 'gopeach.app',
        type: 'website'
      },
      {
        id: 9,
        url: 'uwa.edu.au',
        type: 'website'
      },
    ],
	},
	mutations: {
    SET_STATUS(state, value) {
      state.status = value;
    },
    APPEND_TO_ALLOWED(state, value) {
      state.allowed.push(value);
    },
    REMOVE_FROM_ALLOWED(state, value) {
      state.allowed = state.allowed.filter((item) => {return item.id != value});
    },
    // REMOVE_FROM_RECOMMENDATIONS(state, value) {
    //   state.recommendations = state.recommendations.filter((item) => {return item.id != value});
    // },
	},
	actions: {
    setStatus(context, status) {
      context.commit('SET_STATUS', status);
    },
    addToAllowed(context, url) {
      let type = "website";
      if (url.indexOf("/") != -1 && url.indexOf("/") < url.length - 1) type = "page";
      const item = {
        id:
          context.state.allowed.length > 0
            ? context.state.allowed[context.state.allowed.length - 1].id + 1
            : 0,
        url,
        type,
      };
      context.commit('APPEND_TO_ALLOWED', item);
    },
    removeFromAllowed(context, id) {
      context.commit('REMOVE_FROM_ALLOWED', id);
    },
    // addFromRecommendations(context, id) {
    //   const recommendation = context.state.recommendations.find((item) => item.id==id);
    //   const item = {...recommendation, id: context.state.allowed.length > 0
    //     ? context.state.allowed[context.state.allowed.length - 1].id + 1
    //     : 0,}
    //   context.commit('REMOVE_FROM_RECOMMENDATIONS', id);
    //   context.commit('APPEND_TO_ALLOWED', item);
    // },
	},
	modules: {},
};