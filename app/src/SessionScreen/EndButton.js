import React from 'react';
import { Text, StyleSheet } from 'react-native';

import ButtonPrimary from '../shared/ButtonPrimary';
import { colorPrimary } from '../shared/constants';

const EndButton = ({ onPress }) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: 'transparent',
      paddingHorizontal: 15,
      paddingVertical: 3,
      marginLeft: 10,
    },
    text: {
      color: colorPrimary,
      fontFamily: 'Lato-Regular',
      fontSize: 18,
    },
  });

  return (
    <ButtonPrimary style={styles.button} onPress={onPress}>
      <Text style={styles.text}>END</Text>
    </ButtonPrimary>
  );
};

export default EndButton;
