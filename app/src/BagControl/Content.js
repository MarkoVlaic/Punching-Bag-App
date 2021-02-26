import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { ADAPTER_ON, ADAPTER_OFF } from './reducer';
import DeviceList from './DeviceList';
import { colorGreyDark, colorPrimary } from '../shared/constants';

const styles = StyleSheet.create({
  infoText: {
    fontFamily: 'Lato-Light',
    fontSize: 18,
    color: colorGreyDark,
    textAlign: 'center',
    borderBottomColor: colorPrimary,
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
});

const Content = ({ state }) => {
  const { adapter, devices, permissionGranted } = state;

  if (!permissionGranted) return <Text style={styles.infoText}>Enable location permission in order to use bluetooth!</Text>;
  if (adapter === ADAPTER_OFF) return <Text style={styles.infoText}>Turn bluetooth on to connect to the bag!</Text>;
  return <DeviceList devices={devices} />;
};

Content.propTypes = {
  state: PropTypes.shape({
    adapter: PropTypes.oneOf([ADAPTER_ON, ADAPTER_OFF]),
    connected: PropTypes.bool,
    devices: PropTypes.arrayOf(PropTypes.object),
    permissionGranted: PropTypes.bool,
  }).isRequired,
};

export default Content;
