import { DELETE } from './actions-types';

const actions = {
  [DELETE]({state}) {
    const activeWindowIndex = state.windows.findIndex(window => window.isActive);

    if (activeWindowIndex !== -1) {
      state.windows.splice(activeWindowIndex, 1);
    }
  }
}

export default actions;