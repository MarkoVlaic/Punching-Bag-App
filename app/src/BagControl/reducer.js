export const ADAPTER_ON = 'ON';
export const ADAPTER_OFF = 'OFF';

export const DISCONNECTED = 'DISCONNECTED';
export const CONNECTED = 'CONNECTED';
export const CONNECTING = 'CONNECTING';

export const SET_PERMISSION = 'SET_PERMISSION';
export const SET_ADAPTER = 'SET_ADAPTER';
export const ADD_DEVICE = 'ADD_DEVICE';
export const SET_SELECTED = 'SET_SELECTED';
export const SET_CONNECTION = 'SET_CONNECTION';

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_PERMISSION:
      return { ...state, permissionGranted: action.payload };
    case SET_ADAPTER:
      return { ...state, devices: [], adapter: action.payload };
    case ADD_DEVICE: {
      let { devices } = state;
      const payloadIncluded = devices.filter((device) => device.id === action.payload.id).length !== 0;
      if (!payloadIncluded) devices = [...devices, action.payload];
      return { ...state, devices };
    }
    case SET_SELECTED:
      return { ...state, selected: action.payload };
    case SET_CONNECTION:
      return { ...state, connection: action.payload };
    default:
      return state;
  }
};
