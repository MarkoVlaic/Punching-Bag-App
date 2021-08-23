import React from 'react';
import { Text, StyleSheet } from 'react-native';

import ButtonPrimary from '../shared/ButtonPrimary';
import { colorPrimary } from '../shared/constants';
import { wp, hp } from '../shared/responsiveLayout'; 

const EndButton = ({ onPress }) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: 'transparent',
      paddingHorizontal: wp(15),
      paddingVertical: hp(3),
      marginLeft: wp(10),
    },
    text: {
      color: colorPrimary,
      fontFamily: 'Lato-Regular',
      fontSize: wp(18),
    },
  });

  return (
    <ButtonPrimary style={styles.button} onPress={onPress}>
      <Text style={styles.text}>END</Text>
    </ButtonPrimary>
  );
};

export default EndButton;
