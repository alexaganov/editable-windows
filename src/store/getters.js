const getters = {
  getWindows(state) {
    return state.windows;
  },
  getListOfWindows(state) {
    return state.windows.filter(window => ({
      name: window.name,
      id: window.id,
      isActive: window.isActive
    }))
  }
}

export default getters;