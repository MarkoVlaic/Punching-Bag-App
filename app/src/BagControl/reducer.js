export const ADAPTER_ON = 'ON';
export const ADAPTER_OFF = 'OFF';

export const SET_PERMISSION = 'SET_PERMISSION';
export const SET_ADAPTER = 'SET_ADAPTER';

export const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case SET_PERMISSION:
      return { ...state, permissionGranted: action.payload };
    case SET_ADAPTER:
      return { ...state, adapter: action.payload };
    default:
      return state;
  }
};
