import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    userAddress: ''
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.userAddress = user ? user.get("ethAddress") : '';
    }
  },
  actions: {
  },
  modules: {
  }
})
