const getters = {
  windows: (state) => state.windows,
  unremovedWindows: (state) => state.windows.filter(window => !window.isRemoved),
  listOfUnremovedWindows: (state, getters) => {
    return getters.unremovedWindows.map(window => {
      return {
        name: window.name,
        id: window.id,
        isActive: window.isActive,
        isRemoved: window.isRemoved
      }
    });
  },
  windowsMinWidth: (state) => state.windowsMinWidth,
  windowsMinHeight: (state) => state.windowsMinHeight,
  lastUndo: (state) => state.undos[state.undos.length - 1],
  lastRedo: (state) => state.redos[state.redos.length - 1],
  lastAddedWindow: (state, getters) => state.windows.find(window => window.id === getters.lastCreatedWindowId) || {},
  lastCreatedWindowId: (state) => state.lastCreatedWindowId,
  activeWindow: (state) => state.windows.find(window => window.isActive),
  activeWindowIndex: (state) => state.windows.findIndex(window => window.isActive),
  getWindowById: (state) => (id) => state.windows.find(window => window.id === id),
  isUndosEmpty: (state) => !state.undos.length,
  isRedosEmpty: (state) => !state.redos.length,
  isActiveWindowSet: (state, getters) => !!getters.activeWindow,
  numOfRemovedWindows: (state) => state.windows.filter(window => window.isRemoved).length,
  editModalInfo: (state) => state.editModal,
}

export default getters;