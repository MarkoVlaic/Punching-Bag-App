import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';

import { colorGreyDark, colorWhite } from './constants';
import { wp, hp } from './responsiveLayout';

const styles = StyleSheet.create({
  container: {
    width: '80%',
    borderRadius: wp(7),
    marginTop: wp(10),
    elevation: wp(2),
  },
  header: {
    width: '100%',
    height: hp(35),
    borderTopLeftRadius: wp(7),
    borderTopRightRadius: wp(7),
    backgroundColor: colorGreyDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Lato-Regular',
    fontSize: wp(22),
    letterSpacing: wp(2),
    color: colorWhite,
  },
  content: {
    alignItems: 'center',
    backgroundColor: colorWhite,
    padding: wp(10),
  },
});

const Card = ({ title, style, children, containerStyle }) => {
  const contentStyle = { ...styles.content, ...style };
  const appliedContainerStyle = { ...styles.container, ...containerStyle };

  return (
    <View style={appliedContainerStyle}>
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
  containerStyle: ViewPropTypes.style,
};

Card.defaultProps = {
  title: '',
  children: (<></>),
  style: {},
  containerStyle: {},
};

export default Card;
