import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, StyleSheet } from 'react-native';

import { colorWhite } from '../shared/constants';

const styles = StyleSheet.create({
  timeText: {
    fontFamily: 'Lato-Regular',
    fontSize: 22,
    color: colorWhite,
    marginRight: 10,
  },
});

const TimeDisplay = ({ time }) => {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60);

  const padLeft = (t) => {
    const res = t < 10 ? `0${t}` : `${t}`;
    return res;
  };

  const display = `${padLeft(minutes)}:${padLeft(seconds)}`;

  return (
    <Text style={styles.timeText}>
      {display}
    </Text>
  );
};

const SessionScreen = ({ navigation }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TimeDisplay time={elapsedTime} />
      ),
      headerTitle: '',
    });
  }, [navigation, elapsedTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <>
      <Text>This is the session screen</Text>
    </>
  );
};

export default SessionScreen;
