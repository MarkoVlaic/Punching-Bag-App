import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';

import { colorWhite } from '../shared/constants';
import { wp } from '../shared/responsiveLayout';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Lato-Regular',
    fontSize: wp(22),
    color: colorWhite,
    marginRight: wp(10),
  },
});

const TimeDisplay = ({ startTimestamp, ended }) => {
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

  const seconds = time % 60;
  const minutes = Math.floor(time / 60);

  const padLeft = (t) => {
    const res = t < 10 ? `0${t}` : `${t}`;
    return res;
  };

  const display = `${padLeft(minutes)}:${padLeft(seconds)}`;

  return (
    <Text style={styles.text}>
      {display}
    </Text>
  );
};

export default TimeDisplay;
