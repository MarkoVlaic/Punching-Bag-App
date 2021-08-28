import React, { useLayoutEffect, useReducer, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';

import TimeDisplay from './TimeDisplay';
import EndButton from './EndButton';
import Chart from './Chart';
import Stats from './Stats';
import {
  reducer,
  initialState,
  SET_ENDED,
  ADD_PUNCH,
  SET_START_TIMESTAMP,
} from './reducer';

import SessionStore from './SessionStore';
import { colorWhite } from '../shared/constants';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: '100%',
    height: '100%',
    backgroundColor: colorWhite,
  },
});

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
        <TimeDisplay startTimestamp={startTimestamp} ended={ended} />
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

  const { ended, punches, startTimestamp } = sessionState;

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
  }, [punches]);

  return (
    <View style={styles.container}>
      <Chart punches={punches} timeDomainRange={30} />
      <Stats punches={punches} sessionStoreRef={sessionStoreRef} />
    </View>
  );
};

export default SessionScreen;
