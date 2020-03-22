import {
  CREATE_NEW_WINDOW,
  ADD_WINDOW,

  ADD_UNDO,
  ADD_REDO,

  REMOVE_WINDOW,
  RETURN_REMOVED_WINDOW,
  SET_ACTIVE_WINDOW,
  UNSET_ACTIVE_WINDOW,

  DELETE_LAST_UNDO,
  DELETE_LAST_REDO
} from './mutations-types';

const mutations = {
  [CREATE_NEW_WINDOW](state, { nameOfNewWindow }) {
    const newWindow = {
      id: ++state.lastCreatedWindowId,
      name: nameOfNewWindow ? nameOfNewWindow : '',
      x: 30,
      y: 30,
      width: 200,
      height: 200,
      isActive: false,
      isRemoved: false,
      content: `Window content`,
    };

    state.windows.push(newWindow);
  },
  [SET_ACTIVE_WINDOW](state, { id }) {
    if (typeof id === 'number') {
      const window = state.windows.find(window => window.id === id);
  
      if (window) {
        window.isActive = true;
      }
    }
  },
  [UNSET_ACTIVE_WINDOW](state, { id }) {
    if (typeof id === 'number') {
      const window = state.windows.find(window => window.id === id);
      
      if (window) {
        window.isActive = false;
      }
    }
  }, 
  [ADD_WINDOW](state, window) {
    state.windows.push(window);
  },
  [ADD_UNDO](state, { undo }) {
    state.undos.push(undo);
  },
  [ADD_REDO](state, { redo }) {
    state.redos.push(redo);
  },
  [DELETE_LAST_UNDO](state) {
    state.undos.pop();
  },
  [DELETE_LAST_REDO](state) {
    state.redos.pop();
  },
  [REMOVE_WINDOW](state, { id }) {
    if (typeof id === 'number'){
      const removedWindow = state.windows.find(window => window.id === id);
  
      if (removedWindow) {
        removedWindow.isRemoved = true;
      }
    }
  },
  [RETURN_REMOVED_WINDOW](state, { id }) {
    if (typeof id === 'number'){
      const removedWindow = state.windows.find(window => window.id === id);
  
      if (removedWindow) {
        removedWindow.isRemoved = false;
      }
    }
  }
  /* [SET_ACTIVE](state, inactiveWindow) {
    if (inactiveWindow) {
      inactiveWindow.isActive = true
    } 
  },
  [REMOVE_WINDOW_BY_ID](state, id){
    const windowIndex = state.windows.findIndex(window => window.id === id);

    if (windowIndex !== -1) {
      state.windows.splice(windowIndex, 1);
    }
  },
  [DELETE_BY_INDEX](state, windowIndex) {
    if (typeof windowIndex === 'number' && windowIndex > -1) {
      state.windows.splice(windowIndex, 1);
    }
  } */
}

export default mutations;