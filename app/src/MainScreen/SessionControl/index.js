import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Card from '../../shared/Card';
import ButtonPrimary from '../../shared/ButtonPrimary';
import { colorPrimary, colorGreyMedium } from '../../shared/constants';
import { useCurrentBag } from '../../shared/currentBag';
import { hp, wp } from '../../shared/responsiveLayout';

const styles = StyleSheet.create({
  button: {
    width: '70%',
    height: hp(35),
  },
  text: {
    fontFamily: 'Lato-Regular',
    fontSize: wp(18),
    letterSpacing: wp(2),
    color: colorPrimary,
  },
  textDisabled: {
    color: colorGreyMedium,
  },
});

const SessionControl = () => {
  const navigation = useNavigation();
  const [currentBag] = useCurrentBag();
  const disabled = !currentBag;

  let textStyle = styles.text;
  if (disabled) textStyle = { ...textStyle, ...styles.textDisabled };

  const startSession = () => {
    navigation.navigate('Session');
  };

  return (
    <Card title="SESSION" style={{ padding: wp(15) }}>
      <ButtonPrimary style={styles.button} disabled={disabled} onPress={startSession}>
        <Text style={textStyle}>NEW SESSION</Text>
      </ButtonPrimary>
    </Card>
  );
};

export default SessionControl;
