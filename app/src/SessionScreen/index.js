import React, { useLayoutEffect, useReducer, useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';

import TimeDisplay from '../shared/SessionDisplay/TimeDisplay';
import EndButton from './EndButton';
import SessionDisplay from '../shared/SessionDisplay';

import {
  reducer,
  initialState,
  SET_ENDED,
  ADD_PUNCH,
  SET_START_TIMESTAMP,
} from './reducer';

import SessionStore from './SessionStore';

const TickingTimeDisplay = ({ startTimestamp, ended }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const curTime = Math.round((Date.now() - startTimestamp) / 1000);
      setTime(curTime);
    }, 1000);

    if (ended) clearInterval(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [ended, startTimestamp]);

  return <TimeDisplay time={time} />;
};

const SessionScreen = ({ navigation }) => {
  const [sessionState, dispatch] = useReducer(reducer, initialState);

  useLayoutEffect(() => {
    dispatch({ type: SET_START_TIMESTAMP, payload: Date.now() });
  }, []);

  // Init the session store
  const sessionStoreRef = useRef();
  useLayoutEffect(() => {
    sessionStoreRef.current = new SessionStore(Date.now());
  }, []);

  useLayoutEffect(() => {
    const { ended, startTimestamp } = sessionState;

    const onEndPress = () => {
      dispatch({ type: SET_ENDED, payload: true });

      const duration = Date.now() - startTimestamp;
      sessionStoreRef.current.setItem('duration', duration);
      sessionStoreRef.current.write();
    };

    navigation.setOptions({
      headerRight: () => (
        <TickingTimeDisplay startTimestamp={startTimestamp} ended={ended} />
      ),
      headerLeft: (props) => {
        // Documentation suggests we spread the props this way so it is ok to disable the lint
        // https://reactnavigation.org/docs/stack-navigator#headerleft
        // eslint-disable-next-line react/jsx-props-no-spreading
        if (ended) return <HeaderBackButton {...props} onPress={() => navigation.goBack()} />;
        return <EndButton onPress={onEndPress} />;
      },
      headerTitle: '',
    });
  }, [navigation, sessionState]);

  const { ended, punches, startTimestamp, stats } = sessionState;

  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = Math.floor((Date.now() - startTimestamp) / 1000);
      const strength = Math.random() * 10;
      const payload = { timestamp, strength };
      dispatch({ type: ADD_PUNCH, payload });
    }, 1000);

    if (ended) clearInterval(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
  });

  useEffect(() => {
    sessionStoreRef.current.setItem('punches', punches);
    sessionStoreRef.current.setItem('stats', stats);
  }, [punches, stats]);

  return <SessionDisplay punches={punches} stats={stats} />;
};

export default SessionScreen;
