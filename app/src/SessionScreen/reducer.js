const generatePunches = (n) => {
  const punches = [];
  let lastTimestamp = 0;

  for (let i = 0; i < n; i += 1) {
    const strength = Math.random() * 10;
    const timestamp = Math.floor(lastTimestamp + Math.random() * 10);
    lastTimestamp = timestamp;
    punches.push({ timestamp, strength });
  }

  return punches;
};

export const initialState = {
  ended: false,
  // startTimestamp: Date.now(),
  punches: [],
};

export const SET_ENDED = 'SET_ENDED';
export const ADD_PUNCH = 'ADD_PUNCH';
export const SET_START_TIMESTAMP = 'SET_START_TIMESTAMP';

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_ENDED:
      return { ...state, ended: action.payload };
    case ADD_PUNCH:
      return { ...state, punches: [...state.punches, action.payload] };
    case SET_START_TIMESTAMP:
      return { ...state, startTimestamp: action.payload };
    default:
      return state;
  }
};
