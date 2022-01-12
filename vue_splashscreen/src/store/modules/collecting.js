export default {
  namespaced: true,
	state: {
    status: 1,
    allowed: [
      {
        id: 0,
        name: 'Shopping',
        type: 'category'
      },
      {
        id: 1,
        name: 'Social Media',
        type: 'category'
      },
      {
        id: 2,
        name: 'google.com',
        type: 'website'
      },
      {
        id: 3,
        name: 'linkedin.com',
        type: 'website'
      },
      {
        id: 5,
        name: 'ebay.com',
        type: 'website'
      },
      {
        id: 6,
        name: 'asos.com',
        type: 'website'
      },
      {
        id: 7,
        name: 'jamesaudcent.com',
        type: 'website'
      },
      {
        id: 8,
        name: 'gopeach.app',
        type: 'website'
      },
      {
        id: 9,
        name: 'uwa.edu.au',
        type: 'website'
      },
      {
        id: 10,
        name: 'facebook.com',
        type: 'website'
      },
      {
        id: 11,
        name: 'instagram.com',
        type: 'website'
      },
      {
        id: 12,
        name: 'bbc.com/world',
        type: 'page'
      },
      {
        id: 13,
        name: 'yahoo.com/news',
        type: 'page'
      },
    ],
    recommendations: [
      {
        id: 0,
        name: 'Blogging',
        type: 'category'
      },
      {
        id: 1,
        name: 'Travel',
        type: 'category'
      },
      {
        id: 2,
        name: 'yahoo.com',
        type: 'website'
      },
      {
        id: 3,
        name: 'pinterest.com',
        type: 'website'
      },
      {
        id: 4,
        name: 'lms.uwa.edu.au/home',
        type: 'page'
      }
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
    REMOVE_FROM_ALLOWED_BY_NAME(state, name) {
      state.allowed = state.allowed.filter((item) => {return item.name != name});
    },
    REMOVE_FROM_RECOMMENDATIONS(state, value) {
      state.recommendations = state.recommendations.filter((item) => {return item.id != value});
    },
	},
	actions: {
    setStatus(context, status) {
      context.commit('SET_STATUS', status);
    },
    addToAllowed(context, name) {
      if(name.length == 0 || context.state.allowed.filter((item) => {return item.name == name}).length > 0) return;
      let type = "category";
      if (name.indexOf(".") != -1) type = "website";
      if (name.indexOf("/") != -1 && name.indexOf("/") < name.length - 1) type = "page";
      const item = {
        id:
          context.state.allowed.length > 0
            ? context.state.allowed[context.state.allowed.length - 1].id + 1
            : 0,
        name,
        type,
      };
      console.log(item);
      context.commit('APPEND_TO_ALLOWED', item);
    },
    removeFromAllowed(context, id) {
      context.commit('REMOVE_FROM_ALLOWED', id);
    },
    removeFromAllowedByName(context, name) {
      context.commit('REMOVE_FROM_ALLOWED_BY_NAME', name);
    },
    addFromRecommendations(context, id) {
      const recommendation = context.state.recommendations.find((item) => item.id==id);
      const item = {...recommendation, id: context.state.allowed.length > 0
        ? context.state.allowed[context.state.allowed.length - 1].id + 1
        : 0,}
      context.commit('REMOVE_FROM_RECOMMENDATIONS', id);
      context.commit('APPEND_TO_ALLOWED', item);
    },
	},
	modules: {},
};