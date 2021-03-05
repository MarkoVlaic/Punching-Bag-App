import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';

import { colorGreyDark, colorWhite } from './constants';

const styles = StyleSheet.create({
  container: {
    width: '80%',
    borderRadius: 7,
    marginTop: 10,
  },
  header: {
    width: '100%',
    height: 35,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    backgroundColor: colorGreyDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Lato-Regular',
    fontSize: 22,
    letterSpacing: 2,
    color: colorWhite,
  },
  content: {
    alignItems: 'center',
    backgroundColor: colorWhite,
    padding: 10,
  },
});

const Card = ({ title, style, children }) => {
  const contentStyle = { ...styles.content, ...style };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={contentStyle}>
        {children}
      </View>
    </View>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  style: ViewPropTypes.style,
};

Card.defaultProps = {
  title: '',
  children: (<></>),
  style: {},
};

export default Card;
