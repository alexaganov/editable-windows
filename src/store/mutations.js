import {
  CREATE_NEW_WINDOW,
  REMOVE_WINDOW,
  RESTORE_WINDOW,
  DELETE_REMOVED_WINDOWS,
  
  SET_WINDOW_POSITION,
  SET_WINDOW_SIZE,
  SET_ACTIVE_WINDOW,
  UNSET_ACTIVE_WINDOW,
  SET_WINDOW_CONTENT,
  
  PUSH_UNDO,
  PUSH_REDO,
  POP_UNDO,
  POP_REDO,
  CLEAR_UNDOS,
  CLEAR_REDOS,

  SHOW_EDIT_MODAL,
  HIDE_EDIT_MODAL,
} from './mutations-types';

const findWindowById = (state, id) => {
  return state.windows.find(window => window.id === id); 
};

const byUnremovedWindow = (window) => !window.isRemoved;

const mutations = {
  [CREATE_NEW_WINDOW](state, { nameOfNewWindow }) {
    const newWindowId = ++state.lastCreatedWindowId;
    const newWindow = {
      ...state.initialWindow,
      id: newWindowId,
      name: nameOfNewWindow ? nameOfNewWindow : `Window ${newWindowId}`,
    };

    state.windows.push(newWindow);
  },
  [REMOVE_WINDOW](state, { id }) {
    const window = findWindowById(state, id);

    if (window) {
      window.isRemoved = true;
    }
  },
  [RESTORE_WINDOW](state, { id }) {
    const window = findWindowById(state, id);

    if (window) {
      window.isRemoved = false;
    }
  },
  [DELETE_REMOVED_WINDOWS](state) {
    state.windows = state.windows.filter(byUnremovedWindow);
  },

  [SET_WINDOW_POSITION](state, { id, x, y }) {
    const window = findWindowById(state, id);
    
    if (window) {
      window.x = x;
      window.y = y;
    }
  },

  [SET_WINDOW_SIZE](state, { id, width, height }) {
    const window = findWindowById(state, id);
    
    if (window) {
      window.width = width;
      window.height = height;
    }
  },

  [SET_ACTIVE_WINDOW](state, { id }) {
    const window = findWindowById(state, id);

    if (window) {
      window.isActive = true;
    }
  
  },
  [UNSET_ACTIVE_WINDOW](state, { id }) {
    const window = findWindowById(state, id);
    
    if (window) {
      window.isActive = false;
    }
  }, 

  [SET_WINDOW_CONTENT](state, { id, content }) {
    const window = findWindowById(state, id);

    if (window) {
      window.content = { ...content };
    }
  },

  [PUSH_UNDO](state, { undo }) { state.undos.push(undo); },
  [PUSH_REDO](state, { redo }) { state.redos.push(redo); },
  [POP_UNDO](state) { state.undos.pop(); },
  [POP_REDO](state) { state.redos.pop(); },
  [CLEAR_UNDOS](state) { state.undos = []; },
  [CLEAR_REDOS](state) { state.redos = []; },

  [HIDE_EDIT_MODAL](state) { state.editModal.isShown = false},
  [SHOW_EDIT_MODAL](state, { id }) { 
    const window = findWindowById(state, id);

    if (window) {
      state.editModal.window = window;
      state.editModal.isShown = true
    }
  }
}

export default mutations;