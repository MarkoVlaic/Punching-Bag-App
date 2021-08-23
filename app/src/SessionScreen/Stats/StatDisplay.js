import React from 'react';

import { View, StyleSheet } from 'react-native';

import Card from '../../shared/Card';
import LabeledStat from '../LabeledStat';

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    marginLeft: 20,
    justifyContent: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
  },
});

const StatDisplay = ({ stats }) => (
  <View style={styles.container}>
    <Card title="Punches" style={styles.cardContent} containerStyle={{ width: null }}>
      <LabeledStat name="Thrown" value={stats.punches.thrown} />
      <LabeledStat name="Per Minute" value={stats.punches.perMinute.toFixed(1)} />
    </Card>

    <Card title="Power" style={styles.cardContent} containerStyle={{ width: null }}>
      <LabeledStat name="Min" value={stats.power.min.toFixed(1)} />
      <LabeledStat name="Average" value={stats.power.average.toFixed(1)} />
      <LabeledStat name="Max" value={stats.power.max.toFixed(1)} />
    </Card>
  </View>
);

export default StatDisplay;
