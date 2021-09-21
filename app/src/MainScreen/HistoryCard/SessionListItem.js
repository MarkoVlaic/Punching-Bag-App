import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LabeledStat from '../../shared/LabeledStat';
import { colorGreyDark, colorPrimary, colorWhite } from '../../shared/constants';
import { wp, hp } from '../../shared/responsiveLayout';

const styles = StyleSheet.create({
  container: {
    borderWidth: wp(2),
    borderColor: colorGreyDark,
    borderRadius: wp(7),
    paddingVertical: hp(8),
    marginBottom: hp(10),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  dateContainer: {
    width: wp(55),
    height: wp(55),
    borderRadius: 1000,
    backgroundColor: colorPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    fontFamily: 'Lato-Regular',
    fontSize: wp(16),
    color: colorWhite,
    textTransform: 'capitalize',
  },
  dayText: {
    fontFamily: 'Lato-Regular',
    fontSize: wp(14),
    color: colorWhite,
    textTransform: 'capitalize',
  },
});

const DateDisplay = ({ timestamp }) => {
  const monthLabels = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const date = new Date(timestamp);

  return (
    <View style={styles.dateContainer}>
      <Text style={styles.monthText}>{monthLabels[date.getMonth()]}</Text>
      <Text style={styles.dayText}>{date.getDate()}</Text>
    </View>
  );
};

const SessionListItem = ({ timestamp, duration, punches, maxStrength, fullSessionData }) => {
  const navigation = useNavigation();
  const formattedDuration = `${Math.round(duration / (1000 * 60))} min`;

  const onPress = () => {
    navigation.navigate('HistoryEntry', fullSessionData);
  };

  return (
    <TouchableOpacity activeOpacity={0.4} style={styles.container} onPress={onPress}>
      <DateDisplay timestamp={timestamp} />
      <LabeledStat name="Duration" value={formattedDuration} style={{ marginHorizontal: 1 }} />
      <LabeledStat name="Punches" value={punches} style={{ marginHorizontal: 1 }} />
      <LabeledStat name="Max. Strength" value={`${Math.round(maxStrength)} N`} style={{ marginHorizontal: 1 }} />
    </TouchableOpacity>
  );
};

export default SessionListItem;
