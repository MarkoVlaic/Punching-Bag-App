export const initialState = {
  punches: {
    thrown: 0,
    perMinute: 0,
  },
  power: {
    min: 0,
    average: 0,
    max: 0,
  },
};

export const HANDLE_PUNCH = 'HANDLE_PUNCH';

export const reducer = (state, action) => {
  console.log(action.payload);
  switch (action.type) {
    case HANDLE_PUNCH: {
      const thrown = state.punches.thrown + 1;
      const perMinute = thrown / (action.payload.timeElapsed / 60);
      const min = (action.payload.strength < state.power.min || state.power.min === 0) ? action.payload.strength : state.power.min;
      const average = (state.power.average * state.punches.thrown + action.payload.strength) / thrown;
      const max = action.payload.strength > state.power.max ? action.payload.strength : state.power.max;

      return {
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
    }
    default:
      return state;
  }
};
