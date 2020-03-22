import {
  CREATE_NEW_WINDOW,
  SET_ACTIVE_WINDOW,
  REMOVE_ACTIVE_WINDOW,
  UNDO,
  REDO
} from './actions-types';

const UNDO_CREATE_NEW_WINDOW = 'UNDO_CREATE_NEW_WINDOW';
const UNDO_SET_ACTIVE_WINDOW = 'UNDO_SET_ACTIVE_WINDOW';
const UNDO_UNSET_ACTIVE_WINDOW = 'UNDO_UNSET_ACTIVE_WINDOW';
const UNDO_REMOVE_WINDOW = 'UNDO_REMOVE_WINDOW';

const REDO_CREATE_NEW_WINDOW = 'REDO_CREATE_NEW_WINDOW';
const REDO_SET_ACTIVE_WINDOW = 'REDO_SET_ACTIVE_WINDOW';
const REDO_UNSET_ACTIVE_WINDOW = 'REDO_UNSET_ACTIVE_WINDOW';
const REDO_REMOVE_WINDOW = 'REDO_REMOVE_WINDOW';

// const UNOD_ADD

import mutations from './mutations-types';

const actions = {
  [CREATE_NEW_WINDOW]({commit, getters}, { nameOfNewWindow }) {   
    const activeWindowId = getters.activeWindowId;

    commit(mutations.UNSET_ACTIVE_WINDOW, { id: activeWindowId });
    commit(mutations.CREATE_NEW_WINDOW, { nameOfNewWindow });
    commit(mutations.SET_ACTIVE_WINDOW, { id: getters.lastCreatedWindowId });

    commit(mutations.ADD_UNDO, { 
      undo: [
        { type: UNDO_UNSET_ACTIVE_WINDOW, id: activeWindowId },
        { type: UNDO_CREATE_NEW_WINDOW, id: getters.lastCreatedWindowId },
        { type: UNDO_SET_ACTIVE_WINDOW, id: getters.lastCreatedWindowId }
      ]
    });
  },
  [SET_ACTIVE_WINDOW]({commit, getters}, { id }) {
    const activeWindow = getters.activeWindow;
    const undo = [];

    if (activeWindow) {
      if (activeWindow.id === id) {
        return;
      } 

      commit(mutations.UNSET_ACTIVE_WINDOW, { id: activeWindow.id });
      undo.push({ type: UNDO_UNSET_ACTIVE_WINDOW, id: activeWindow.id })
    } 

    commit(mutations.SET_ACTIVE_WINDOW, { id });
    undo.push({ type: UNDO_SET_ACTIVE_WINDOW, id });

    commit(mutations.ADD_UNDO, { undo });
  },

  [REMOVE_ACTIVE_WINDOW]({commit, getters}) {
    const { activeWindow } = getters;

    if (activeWindow) {
      commit(mutations.UNSET_ACTIVE_WINDOW, { id: activeWindow.id  });
      commit(mutations.REMOVE_WINDOW, { id: activeWindow.id }); 
      commit(mutations.ADD_UNDO, { 
        undo: [
          { type: UNDO_UNSET_ACTIVE_WINDOW, id: activeWindow.id },
          { type: UNDO_REMOVE_WINDOW, id: activeWindow.id },
        ] 
      });
    }
  },

  [UNDO]({commit, state, getters }) {
    const undos = [...(getters.lastUndo || [])];

    if (Array.isArray(undos) && undos.length) {
      let redos = [];

      while (undos.length) {
        const undo = undos.pop();

        switch(undo.type) {
          case UNDO_CREATE_NEW_WINDOW: {
            commit(mutations.REMOVE_WINDOW, { id: undo.id });

            redos.push({ type: REDO_REMOVE_WINDOW, id: undo.id });
            
            break;
          }
          case UNDO_UNSET_ACTIVE_WINDOW: {
            commit(mutations.SET_ACTIVE_WINDOW, { id: undo.id });

            redos.push({ type: REDO_UNSET_ACTIVE_WINDOW, id: undo.id });
        
            break;
          }
          case UNDO_SET_ACTIVE_WINDOW: {
            commit(mutations.UNSET_ACTIVE_WINDOW, { id: undo.id });

            redos.push({ type: REDO_SET_ACTIVE_WINDOW, id: undo.id });
        
            break;
          }
          case UNDO_REMOVE_WINDOW: {
            commit(mutations.RETURN_REMOVED_WINDOW, { id: undo.id });

            redos.push({ type: REDO_REMOVE_WINDOW, id: undo.id });
        
            break;
          }

        }
      }

      commit(mutations.DELETE_LAST_UNDO);
      commit(mutations.ADD_REDO, redos);
    }
  },
  [REDO]({commit, state, getters}) {
    const redos = [...(getters.lastRedo || [])];

    if (Array.isArray(redos) && redos.length) {
      let undos = [];

      while (redos.length) {
        const redo = redos.pop();

        switch(redo.type) {
          case REDO_CREATE_NEW_WINDOW: {
            commit(mutations.RETURN_REMOVED_WINDOW, { id: redo.id });

            undos.push({ type: UNDO_REMOVE_WINDOW, id: redo.id });
            
            break;
          }
          case REDO_UNSET_ACTIVE_WINDOW: {
            commit(mutations.SET_ACTIVE_WINDOW, { id: redo.id });

            undos.push({ type: REDO_UNSET_ACTIVE_WINDOW, id: redo.id });
        
            break;
          }
          case REDO_SET_ACTIVE_WINDOW: {
            commit(mutations.UNSET_ACTIVE_WINDOW, { id: redo.id });

            undos.push({ type: REDO_SET_ACTIVE_WINDOW, id: redo.id });
        
            break;
          }
        }
      }

      commit(mutations.DELETE_LAST_REDO);
      commit(mutations.ADD_UNDO, undos);
    }
  }
}

export default actions;