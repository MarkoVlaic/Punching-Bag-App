import React from 'react';
import { View, StyleSheet } from 'react-native';

import Chart from './Chart';
import Stats from './Stats';

import { colorWhite } from '../constants';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: '100%',
    height: '100%',
    backgroundColor: colorWhite,
  },
});

const SessionDisplay = ({ punches, stats }) => (
  <View style={styles.container}>
    <Chart punches={punches} timeDomainRange={30} />
    <Stats stats={stats} />
  </View>
);

export default SessionDisplay;
