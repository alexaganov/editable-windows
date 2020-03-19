import Vue from 'vue';
import Vuex from 'vuex';
import { SET_SIZE, SET_POSITION, SET_ACTIVE } from './mutations-type';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    history: [],
    elements: [
      {
        id: 1,
        width: 200,
        height: 200,
        x: 0,
        y: 0,
        isActive: false,
        content: []
      },
      {
        id: 2,
        width: 200,
        height: 200,
        x: 0,
        y: 0,
        isActive: false,
        content: []
      }
    ],
  },
  getters: {
    getElements(state) {
      return state.elements;
    }
  },
  mutations: {
    [SET_SIZE](state, payload) {
      state.elements.forEach(item => {
        if (item.id === payload.id) {
          if (typeof payload.width === 'number') {
            item.width = payload.width;
          } 

          if (typeof payload.height === 'number') {
            item.height = payload.height;
          }
        }
      });
    },

    [SET_POSITION](state, payload) {
      state.elements.forEach(item => {
        if (item.id === payload.id) {
          if (typeof payload.x === 'number') {
            item.x = payload.x;
          } 

          if (typeof payload.y === 'number') {
            item.y = payload.y;
          }
        }
      });
    },

    [SET_ACTIVE](state, payload) {
      state.elements.forEach(item => {
        if (item.isActive && item.id !== payload.id) {
          item.isActive = false;
        }

        if (!item.isActive && item.id === payload.id) {
          item.isActive = true;
        }
      });
    },

  }
  
});

export default store;