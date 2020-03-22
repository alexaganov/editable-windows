const getters = {
  windows(state) {
    return state.windows;
  },
  listOfWindows(state, getters) {
    return getters.windows.map(window => ({
      name: window.name,
      id: window.id,
      isActive: window.isActive,
      isRemoved: window.isRemoved
    }))
  },
  lastUndo(state) {
    return state.undos[state.undos.length - 1];
  },
  lastRedo(state) {
    return state.redos[state.redos.length - 1];
  },
  lastAddedWindow(state, getters) {
    return state.windows.find(window => window.id === getters.lastCreatedWindowId) || {};
  },
  lastCreatedWindowId(state) {
    return state.lastCreatedWindowId;
  },
  activeWindowId(state, getters) {
    return getters.activeWindow.id;
  },
  activeWindow(state) {
    return state.windows.find(window => window.isActive) || {};
  },
  activeWindowIndex(state) {
    return state.windows.findIndex(window => window.isActive);
  },
  getWindowById(state) {
    return (id) => state.windows.find(window => window.id === id);
  },
  isUndosEmpty(state) {
    return !state.undos.length;
  },
  isRedosEmpty(state) {
    return !state.redos.length;
  },
  isActiveWindowSet(state) {
    return state.windows.findIndex(window => window.isActive) !== -1;
  }
}

export default getters;