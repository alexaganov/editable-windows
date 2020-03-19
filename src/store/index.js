import Vue from 'vue';
import Vuex from 'vuex';
import { SET_SIZE, SET_POSITION, SET_ACTIVE } from './mutations-type';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    history: [],

    windows: [
      {
        id: 1,
        name: 'Window 1',
        w: 200,
        h: 200,
        x: 30,
        y: 30,
        isActive: false,
        content: 'window 1'
      },
      {
        id: 2,
        name: 'Window 2',
        w: 200,
        h: 200,
        x: 30,
        y: 30,
        isActive: false,
        content: 'window 2'
      },
    ],
  },
  getters: {
    getWindows(state) {
      return state.windows;
    }
  },
  mutations: {
    [SET_SIZE](state, payload) {
      state.windows.forEach(window => {
        if (window.id === payload.id) {
          if (typeof payload.w === 'number') {
            window.w = payload.w;
          }
          
          if (typeof payload.h === 'number') {
            window.h = payload.h;
          }
        }


      });
    },

    [SET_POSITION](state, payload) {
      const currentWindow = state.windows.find(window => window.id === payload.id);

      if (currentWindow) {
        if (typeof payload.x === 'number') {
          currentWindow.x = payload.x;
        } 

        if (typeof payload.y === 'number') {
          currentWindow.y = payload.y;
        }
      }
    },

    [SET_ACTIVE](state, payload) {
      const currentWindow = state.windows.find(window => window.id === payload.id);
      const activeWindow =  state.windows.find(window => window.isActive);

      if (activeWindow) {
        activeWindow.isActive = false;
      }

      if (currentWindow) {
        currentWindow.isActive = true;
      }
    },

  }
  
});

export default store;