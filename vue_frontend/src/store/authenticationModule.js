export const authentication = {
    namespaced: true,
    state: {
        status: {},
        user: null,
        bearerToken: null
    },
    actions: {
        loginRequest({ commit }) {
            commit('loginRequest');
        },
        loginFailure({ commit }) {
            commit('loginFailure');
        },
        loginSuccess({ commit }, user, bearerToken) {
            commit('loginSuccess', user, bearerToken);
        },
        logout({ commit }) {
            commit('logout');
        }
    },
    mutations: {
        loginRequest(state) {
            state.status = { loggingIn: true };
            state.user = null;
            state.bearerToken = null;
        },
        loginSuccess(state, user, bearerToken) {
            state.status = { loggedIn: true };
            state.user = user;
            state.bearerToken = bearerToken;
        },
        loginFailure(state) {
            state.status = { loggedIn: false };
            state.user = null;
            state.bearerToken = null;
        },
        logout(state) {
            state.status = { loggedIn: false };
            state.user = null;
            state.bearerToken = null;
        }
    }
}
