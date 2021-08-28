import React, { useEffect, useReducer } from 'react';
import StatDisplay from './StatDisplay';

import { initialState, reducer, HANDLE_PUNCH } from './reducer';

const Stats = ({ punches, sessionStoreRef }) => {
  const [statState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (sessionStoreRef.current) {
      sessionStoreRef.current.setItem('stats', statState);
    }
  }, [statState, sessionStoreRef]);

  useEffect(() => {
    if (!punches || !punches.length) return;
    const lastPunch = punches[punches.length - 1];
    dispatch({ type: HANDLE_PUNCH, payload: { timeElapsed: lastPunch.timestamp, strength: lastPunch.strength } });
  }, [punches]);
  return <StatDisplay stats={statState} />;
};

export default Stats;
