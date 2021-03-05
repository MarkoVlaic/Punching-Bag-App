import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { ADAPTER_OFF, CONNECTED } from './reducer';
import DeviceList from './DeviceList';
import { colorGreyDark, colorPrimary } from '../shared/constants';
import { useCurrentBag } from '../shared/currentBag';

import { initialState, StatePropTypes } from './state';

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
  connectedText: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    borderBottomWidth: 2,
    borderBottomColor: colorPrimary,
  },
});

const Content = ({ state, dispatch }) => {
  const {
    adapter,
    devices,
    permissionGranted,
    connection,
  } = state;
  const [currentBag] = useCurrentBag();

  if (!permissionGranted) return <Text style={styles.infoText}>Enable location permission in order to use bluetooth!</Text>;
  if (adapter === ADAPTER_OFF) return <Text style={styles.infoText}>Turn bluetooth on to connect to the bag!</Text>;
  if (connection === CONNECTED) return <Text style={styles.connectedText}>{currentBag.name}</Text>;
  return <DeviceList devices={devices} dispatch={dispatch} />;
};

Content.propTypes = {
  state: StatePropTypes,
  dispatch: PropTypes.func.isRequired,
};

Content.defaultProps = {
  state: initialState,
};

export default Content;
