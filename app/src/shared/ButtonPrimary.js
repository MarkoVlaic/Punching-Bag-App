/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { TouchableOpacity, StyleSheet, ViewPropTypes } from 'react-native';

import { colorPrimary, colorWhite, colorGreyMedium } from './constants';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colorPrimary,
    borderRadius: 7,
    backgroundColor: colorWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    borderColor: colorGreyMedium,
  },
});

const ButtonPrimary = (props) => {
  const { children, style, disabled } = props;
  let appliedStyle = { ...styles.container, ...style };

  if (disabled) appliedStyle = { ...appliedStyle, ...styles.disabled };

  return (
    <TouchableOpacity activeOpacity={0.4} {...props} style={appliedStyle}>
      {children}
    </TouchableOpacity>
  );
};

ButtonPrimary.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style,
  disabled: PropTypes.bool,
};

ButtonPrimary.defaultProps = {
  children: (<></>),
  style: {},
  disabled: false,
};

export default ButtonPrimary;
