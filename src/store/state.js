import { TEXT } from './content-types';

const state = {
  lastCreatedWindowId: -1,

  windows: [],
  undos: [],
  redos: [],

  initialWindow: {
    x: 30,
    y: 30, 
    name: '',
    width: 200, 
    height: 200,
    minWidth: 100,
    minHeight: 100,
    isActive: false,
    isRemoved: false,
    content:  {
      type: TEXT,
      data: ''
    },
  },
  
  editModal: {
    isShown: false,
    window: null
  }
};

export default state;