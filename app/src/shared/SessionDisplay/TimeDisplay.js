import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';

import { colorWhite } from '../constants';
import { wp } from '../responsiveLayout';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Lato-Regular',
    fontSize: wp(22),
    color: colorWhite,
    marginRight: wp(10),
  },
});

const TimeDisplay = ({ time }) => {
  const seconds = Math.round(time % 60);
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
