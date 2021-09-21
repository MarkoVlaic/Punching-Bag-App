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
  stats: {
    punches: {
      thrown: 0,
      perMinute: 0,
    },
    power: {
      min: 0,
      average: 0,
      max: 0,
    },
  },
};

export const SET_ENDED = 'SET_ENDED';
export const ADD_PUNCH = 'ADD_PUNCH';
export const SET_START_TIMESTAMP = 'SET_START_TIMESTAMP';

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_ENDED:
      return { ...state, ended: action.payload };
    case ADD_PUNCH: {
      const { stats } = state;

      const thrown = stats.punches.thrown + 1;
      const perMinute = thrown / (action.payload.timestamp / 60);
      const min = (action.payload.strength < stats.power.min || stats.power.min === 0) ? action.payload.strength : stats.power.min;
      const average = (stats.power.average * stats.punches.thrown + action.payload.strength) / thrown;
      const max = action.payload.strength > stats.power.max ? action.payload.strength : stats.power.max;

      const newStats = {
        punches: {
          thrown,
          perMinute,
        },
        power: {
          min,
          average,
          max,
        },
      };

      return { ...state, punches: [...state.punches, action.payload], stats: newStats };
    }
    case SET_START_TIMESTAMP:
      return { ...state, startTimestamp: action.payload };
    default:
      return state;
  }
};
