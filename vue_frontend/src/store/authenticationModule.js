export const authentication = {
    namespaced: true,
    state: {
        status: {},
        user: null
    },
    actions: {
        loginRequest({ commit }) {
            commit('loginRequest');
        },
        loginFailure({ commit }) {
            commit('loginFailure');
        },
        loginSuccess({ commit }, user) {
            commit('loginSuccess', user);
        },
        logout({ commit }) {
            commit('logout');
        }
    },
    mutations: {
        loginRequest(state) {
            state.status = { loggingIn: true };
            state.user = null;
        },
        loginSuccess(state, responseData) {
            state.status = { loggedIn: true };
            state.user = responseData.user;
        },
        loginFailure(state) {
            state.status = { loggedIn: false };
            state.user = null;
        },
        logout(state) {
            state.status = { loggedIn: false };
            state.user = null;
        }
    }
}
