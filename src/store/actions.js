import {
  CREATE_NEW_WINDOW,
  REMOVE_ACTIVE_WINDOW,

  SET_WINDOW_SIZE,
  SET_WINDOW_POSITION,
  SET_WINDOW_POSITION_SIZE,
  SET_ACTIVE_WINDOW,
  EDIT_WINDOW,
  SET_WINDOW_CONTENT,
  
  UNDO,
  REDO,
  SAVE,
  PROCESS_UNDO_OR_REDO
} from './actions-types';

import mutations from './mutations-types';

const actions = {
  [CREATE_NEW_WINDOW]({commit, getters}, { nameOfNewWindow }) {   
    const { activeWindow } = getters;
    const undos = [];

    if (activeWindow) {
      commit(mutations.UNSET_ACTIVE_WINDOW, { id: activeWindow.id });
      undos.push({
        mutation: mutations.UNSET_ACTIVE_WINDOW,
        payload: { id: activeWindow.id }
      });
    }

    commit(mutations.CREATE_NEW_WINDOW, { nameOfNewWindow });

    const newWindowId = getters.lastCreatedWindowId;
    commit(mutations.SET_ACTIVE_WINDOW, { id: newWindowId });

    undos.push( 
      { 
        mutation: mutations.CREATE_NEW_WINDOW, 
        payload: { id: newWindowId },
      },
      { 
        mutation: mutations.SET_ACTIVE_WINDOW, 
        payload: { id: newWindowId }
      }
    )
    
    commit(mutations.PUSH_UNDO, { undo: undos });

    if (!getters.isRedosEmpty) {
      commit(mutations.CLEAR_REDOS);
    }
  },
  
  [REMOVE_ACTIVE_WINDOW]({commit, getters}) {
    const { activeWindow } = getters;

    if (activeWindow) {
      commit(mutations.UNSET_ACTIVE_WINDOW, { id: activeWindow.id  });
      commit(mutations.REMOVE_WINDOW, { id: activeWindow.id }); 
      
      commit(mutations.PUSH_UNDO, { 
        undo: [
          { 
            mutation: mutations.UNSET_ACTIVE_WINDOW, 
            payload: { id: activeWindow.id },
          },
          { 
            mutation: mutations.REMOVE_WINDOW, 
            payload: { id: activeWindow.id }
          },
        ] 
      });
    }
  },

  [EDIT_WINDOW]({ commit }, { id }) {
    commit(mutations.SHOW_EDIT_MODAL, { id });
  },

  async [SET_WINDOW_POSITION]({ commit }, { window, x, y }) {
    return new Promise((resolve) => {
      if (window && (window.x !== x || window.y !== y) ) {
        const undo = {
          mutation: mutations.SET_WINDOW_POSITION,
          payload: { 
            id: window.id, 
            type: UNDO,
            old: { x: window.x, y: window.y },
            new: { x, y }
          }
        }
        
        commit(mutations.SET_WINDOW_POSITION, { 
          id: window.id, 
          x, 
          y 
        });

        resolve(undo);
      } else {
        resolve(null);
      }
    })
  },

  async [SET_WINDOW_SIZE]({ commit }, { window, width, height }) {
    return new Promise((resolve) => {
      if (window.width !== width || window.height !== height) {
        const undo = {
          mutation: mutations.SET_WINDOW_SIZE,
          payload: { 
            id: window.id, 
            type: UNDO,
            old: { 
              width: window.width, 
              height: window.height 
            },
            new: { 
              width,
              height 
            }
          }
        };
        
        commit(mutations.SET_WINDOW_SIZE, { 
          id: window.id, 
          width, 
          height 
        });

        resolve(undo);
      } else {
        resolve(null);
      }
    })
  },

  async [SET_WINDOW_POSITION_SIZE]({ commit, dispatch, getters }, { id, x, y, width, height }) {
    const window = getters.getWindowById(id);

    if (window) {
      const undos = [];

      if (typeof x === 'number' && typeof y === 'number') {
        const undo = await dispatch(SET_WINDOW_POSITION, { window, x, y });
        if (undo) undos.push(undo);
      }

      if (typeof width === 'number' && typeof height === 'number') {
        const undo = await dispatch(SET_WINDOW_SIZE, { window, width, height });
        if (undo) undos.push(undo);
      }
      
      if (undos.length) {
        commit(mutations.PUSH_UNDO, { undo: undos });
      }
    }
  },
  
  [SET_ACTIVE_WINDOW]({commit, getters}, { id }) {
    const { activeWindow } = getters;
    const undo = [];

    if (activeWindow) {
      if (activeWindow.id === id) {
        return;
      } 

      commit(mutations.UNSET_ACTIVE_WINDOW, { id: activeWindow.id });
      undo.push({ 
        mutation: mutations.UNSET_ACTIVE_WINDOW, 
        payload: { id: activeWindow.id }
      });
    } 

    commit(mutations.SET_ACTIVE_WINDOW, { id });
    undo.push({ 
      mutation: mutations.SET_ACTIVE_WINDOW, 
      payload: { id } 
    });

    commit(mutations.PUSH_UNDO, { undo });
  },

  [SET_WINDOW_CONTENT]({ commit }, { window, content }) {
    commit(mutations.PUSH_UNDO, { 
      undo: { 
        mutation: mutations.SET_WINDOW_CONTENT, 
        payload: { 
          type: UNDO,
          id: window.id,
          old: {...window.content},
          new: {...content}
        },
      },
    });
    
    commit(mutations.SET_WINDOW_CONTENT, { id: window.id, content });
    commit(mutations.HIDE_EDIT_MODAL);
  },

  [PROCESS_UNDO_OR_REDO]({ commit }, { undoOrRedo }) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(undoOrRedo) || typeof undoOrRedo === 'object') {
        const undosOrRedos = Array.isArray(undoOrRedo) ? [...undoOrRedo] : [undoOrRedo];
        const result = [];
        
        while (undosOrRedos.length) {
          const { mutation, payload } = undosOrRedos.pop();

          switch(mutation) {
            case mutations.CREATE_NEW_WINDOW: {
              commit(mutations.REMOVE_WINDOW, payload);
              result.push({ mutation: mutations.REMOVE_WINDOW, payload });
              
              break;
            }
            
            case mutations.UNSET_ACTIVE_WINDOW: {
              commit(mutations.SET_ACTIVE_WINDOW, payload);
              result.push({ mutation: mutations.SET_ACTIVE_WINDOW, payload });
  
              break;
            }
            
            case mutations.SET_ACTIVE_WINDOW: {
              commit(mutations.UNSET_ACTIVE_WINDOW, payload);
              result.push({ mutation: mutations.UNSET_ACTIVE_WINDOW, payload });
          
              break;
            }
          
            case mutations.REMOVE_WINDOW: {
              commit(mutations.RESTORE_WINDOW, payload);
              result.push({ mutation: mutations.RESTORE_WINDOW, payload });
          
              break;
            }
            
            case mutations.RESTORE_WINDOW: {
              commit(mutations.REMOVE_WINDOW, payload);
              result.push({ mutation: mutations.REMOVE_WINDOW, payload });
  
              break;
            }

            case mutations.SET_WINDOW_POSITION: {
              const { type, id, old: oldPos, new: newPos } = payload;

              commit(mutations.SET_WINDOW_POSITION, {
                id, 
                x: type === UNDO ? oldPos.x : newPos.x, 
                y: type === UNDO ? oldPos.y : newPos.y, 
              });


              result.push({ 
                mutation: mutations.SET_WINDOW_POSITION, 
                payload: {
                  ...payload,
                  type: type === UNDO ? REDO : UNDO
                }
              })

              break;
            }

            case mutations.SET_WINDOW_SIZE: {
              const { type, id, old: oldSize, new: newSize } = payload;

              commit(mutations.SET_WINDOW_SIZE, {
                id, 
                width: type === UNDO ? oldSize.width : newSize.width, 
                height: type === UNDO ? oldSize.height : newSize.height, 
              });

              result.push({ 
                mutation: mutations.SET_WINDOW_SIZE, 
                payload: {
                  ...payload,
                  type: type === UNDO ? REDO : UNDO
                }
              })

              break;
            }

            case mutations.SET_WINDOW_CONTENT: {
              const { type, id, old: oldContent, new: newContent } = payload;

              commit(mutations.SET_WINDOW_CONTENT, {
                id, 
                content: type === UNDO ? oldContent : newContent, 
              });

              result.push({ 
                mutation: mutations.SET_WINDOW_CONTENT, 
                payload: {
                  ...payload,
                  type: type === UNDO ? REDO : UNDO
                }
              })

              break;
            }
          }
        }
  
        resolve(result);
      }
  
      reject(new Error("Type error"));
    });
  },

  async [UNDO]({commit, getters, dispatch }) {
    const redo = await dispatch(PROCESS_UNDO_OR_REDO, { 
      undoOrRedo: getters.lastUndo 
    });

    commit(mutations.POP_UNDO);
    commit(mutations.PUSH_REDO, { redo } );

  },
  
  async [REDO]({commit, getters, dispatch}) {
    const undo = await dispatch(PROCESS_UNDO_OR_REDO, { 
      undoOrRedo: getters.lastRedo 
    });

    commit(mutations.POP_REDO);
    commit(mutations.PUSH_UNDO, { undo } );
  },

  [SAVE]({ commit, state, getters }) {
    if (state.undos.length) {
      commit(mutations.CLEAR_UNDOS);  
    }

    if (state.redos.length) {
      commit(mutations.CLEAR_REDOS);
    }

    if (getters.numOfRemovedWindows) {
      commit(mutations.DELETE_REMOVED_WINDOWS);
    }
  }
}

export default actions;