import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colorPrimary } from '../../shared/constants';
import { wp } from '../../shared/responsiveLayout';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Lato-Regular',
    fontSize: wp(14),
  },
  value: {
    fontFamily: 'Lato-Bold',
    fontSize: wp(16),
    color: colorPrimary,
  },
});

const LabeledStat = ({ name, value }) => (
  <View style={styles.container}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default LabeledStat;
