export const ADAPTER_ON = 'ON';
export const ADAPTER_OFF = 'OFF';

export const SET_PERMISSION = 'SET_PERMISSION';
export const SET_ADAPTER = 'SET_ADAPTER';
export const ADD_DEVICE = 'ADD_DEVICE';

export const reducer = (state, action) => {
  //console.log(action);
  switch (action.type) {
    case SET_PERMISSION:
      return { ...state, permissionGranted: action.payload };
    case SET_ADAPTER:
      return { ...state, devices: [], adapter: action.payload };
    case ADD_DEVICE: {
      let { devices } = state;
      const payloadIncluded = devices.filter((device) => device.id === action.payload.id).length !== 0;
      console.log('Payload included', payloadIncluded);
      if (!payloadIncluded) devices = [...devices, action.payload];
      return { ...state, devices };
    }
    default:
      return state;
  }
};
