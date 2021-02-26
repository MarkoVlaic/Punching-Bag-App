import React, { useEffect, useReducer } from 'react';
import { Text, StyleSheet, PermissionsAndroid } from 'react-native';
import { throttle } from 'throttle-debounce';

import Card from '../shared/Card';
import Content from './Content';
import ButtonPrimary from '../shared/ButtonPrimary';
import { colorPrimary, colorGreyMedium } from '../shared/constants';
import { useBleManager } from '../shared/bleManager';
import { PUNCHING_BAG_SERVICE } from '../shared/uuids';

import {
  reducer,
  SET_PERMISSION,
  SET_ADAPTER,
  ADD_DEVICE,
  ADAPTER_ON,
  ADAPTER_OFF,
} from './reducer';

const styles = StyleSheet.create({
  card: {
    padding: 15,
  },
  connectButton: {
    width: '70%',
    height: 35,
    marginTop: 15,
  },
  connectText: {
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    letterSpacing: 2,
    color: colorPrimary,
  },
  connectTextDisabled: {
    color: colorGreyMedium,
  },
});

const BagControl = () => {
  const bleManager = useBleManager();

  const initialState = {
    adapter: ADAPTER_OFF,
    connected: false,
    devices: [],
    permissionGranted: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Request bluetooth permissions
    const requestPermissions = async () => {
      const requestResults = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ], {
        Title: 'Location Permissions',
        message: 'Please turn on the location permissions for the bluetooth services',
        buttonNeutral: 'Ask Me Later!',
        buttonNegative: 'No',
        buttonPositive: 'Yes',
      });

      // reduce the result object to a true value if all permissions are granted and false otherwise
      const granted = Object.values(requestResults).map((val) => val === 'granted').reduce((val, acc) => val && acc, true);

      dispatch({ type: SET_PERMISSION, payload: granted });
      console.log('granted', granted);
    };

    requestPermissions();
  }, []);

  const interpretAdapterState = (adapterState) => (adapterState === 'PoweredOn' ? ADAPTER_ON : ADAPTER_OFF);

  useEffect(() => {
    // Initialize the bluetooth adapter state
    const init = async () => {
      const adapterState = await bleManager.state();
      const payload = interpretAdapterState(adapterState);
      dispatch({ type: SET_ADAPTER, payload });
    };
    init();
  }, [bleManager]);

  useEffect(() => {
    // Track the bluetooth adapter state
    const subscription = bleManager.onStateChange((adapterState) => {
      const payload = interpretAdapterState(adapterState);
      dispatch({ type: SET_ADAPTER, payload });
    });

    return () => {
      subscription.remove();
    };
  });

  useEffect(() => {
    // Scan devices
    const onDeviceScan = (error, device) => {
      // TODO: Handle this better
      if (error) console.error(error);
      dispatch({ type: ADD_DEVICE, payload: device });
    };

    if (state.permissionGranted && state.adapter === ADAPTER_ON) {
      bleManager.startDeviceScan(
        [PUNCHING_BAG_SERVICE],
        { allowDuplicates: false },
        throttle(500, onDeviceScan),
      );
    } else {
      bleManager.stopDeviceScan();
    }
  }, [state.adapter, state.permissionGranted, bleManager]);

  const disabled = !state.permissionGranted || (state.adapter === ADAPTER_OFF) || (state.devices.length === 0);

  let connectTextStyle = styles.connectText;
  if (disabled) connectTextStyle = { ...connectTextStyle, ...styles.connectTextDisabled };

  return (
    <Card title="BAG" style={styles.card}>
      <Content state={state} />
      <ButtonPrimary style={styles.connectButton} disabled={disabled}>
        <Text style={connectTextStyle}>CONNECT</Text>
      </ButtonPrimary>
    </Card>
  );
};

export default BagControl;
