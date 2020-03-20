import { 
  SET_SIZE, 
  SET_POSITION, 
  SET_ACTIVE 
} from './mutations-type';

const mutations = {
  [SET_SIZE](state, payload) {
    const currentWindow = state.windows.find(window => window.id === payload.id);

    if (typeof payload.w === 'number' && payload.w !== currentWindow.w) {
      currentWindow.w = payload.w;
    }
    
    if (typeof payload.h === 'number' && payload.h !== currentWindow.h) {
      currentWindow.h = payload.h;
    }
  },

  [SET_POSITION](state, payload) {
    const currentWindow = state.windows.find(window => window.id === payload.id);

    if (currentWindow) {
      if (typeof payload.x === 'number' && currentWindow.x !== payload.x) {
        currentWindow.x = payload.x;
      } 

      if (typeof payload.y === 'number' && currentWindow.y !== payload.y) {
        currentWindow.y = payload.y;
      }
    }
  },

  [SET_ACTIVE](state, payload) {
    const currentWindow = state.windows.find(window => window.id === payload.id);
    const activeWindow =  state.windows.find(window => window.isActive);

    if (currentWindow !== activeWindow) {
      if (activeWindow) {
        activeWindow.isActive = false;
      }

      currentWindow.isActive = true;
    }
  }
}

export default mutations;