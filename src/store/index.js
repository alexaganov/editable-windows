import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import getters from './getters';
import state from './state';

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  getters,
  mutations
});

export default store;