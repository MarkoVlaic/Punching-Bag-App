export const initialState = {
  ended: false,
};

export const SET_ENDED = 'SET_ENDED';

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_ENDED:
      return { ...state, ended: action.payload };
    default:
      return state;
  }
};
