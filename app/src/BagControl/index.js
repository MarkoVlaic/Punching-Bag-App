import React, { useEffect, useReducer } from 'react';
import { Text, StyleSheet, PermissionsAndroid } from 'react-native';

import Card from '../shared/Card';
import DeviceList from './DeviceList';
import ButtonPrimary from '../shared/ButtonPrimary';
import { colorPrimary, colorGreyMedium } from '../shared/constants';
import { useBleManager } from '../shared/bleManager';

import {
  reducer,
  SET_PERMISSION,
  SET_ADAPTER,
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

  const initAdapterState = bleManager.state === 'PoweredOn' ? ADAPTER_ON : ADAPTER_OFF;
  const initialState = {
    adapter: initAdapterState,
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

  useEffect(() => {
    // Track the bluetooth adapter state
    const subscription = bleManager.onStateChange((adapterState) => {
      const payload = adapterState === 'PoweredOn' ? ADAPTER_ON : ADAPTER_OFF;
      dispatch({ type: SET_ADAPTER, payload });
    });

    return () => {
      subscription.remove();
    };
  });

  const devices = [
    { id: 1, name: 'Heavy Bag' },
    { id: 2, name: 'Speed Bag' },
    { id: 3, name: 'Regular Bag' },
    { id: 4, name: 'Supernatural bag' },
  ];

  const disabled = !state.permissionGranted || (state.adapter === ADAPTER_OFF);

  let connectTextStyle = styles.connectText;
  if (disabled) connectTextStyle = { ...connectTextStyle, ...styles.connectTextDisabled };

  return (
    <Card title="BAG" style={styles.card}>
      <DeviceList devices={devices} />
      <ButtonPrimary style={styles.connectButton} disabled={disabled}>
        <Text style={connectTextStyle}>CONNECT</Text>
      </ButtonPrimary>
    </Card>
  );
};

export default BagControl;
