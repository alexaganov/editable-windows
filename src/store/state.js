import { TEXT } from './content-types';

const state = {
  lastCreatedWindowId: -1,

  windows: [],
  undos: [],
  redos: [],

  windowsInitialX: 30,
  windowsInitialY: 30,
  windowsInitialWidth: 200,
  windowsInitialHeight: 200,
  windowsMinWidth: 100,
  windowsMinHeight: 100,
  windowsInitialContent: {
    type: TEXT,
    content: ''
  }
};

export default state;