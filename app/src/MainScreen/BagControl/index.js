import React, { useEffect, useReducer } from 'react';
import { StyleSheet, PermissionsAndroid } from 'react-native';
import { throttle } from 'throttle-debounce';

import Card from '../../shared/Card';
import Content from './Content';
import ActionButton from './ActionButton';
import { useBleManager } from '../../shared/bleManager';
import { PUNCHING_BAG_SERVICE } from '../../shared/uuids';
import { wp } from '../../shared/responsiveLayout';
import { initialState } from './state';

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
    padding: wp(15),
  },
});

const BagControl = () => {
  const bleManager = useBleManager();

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
      if (error) return console.warn(error);
      dispatch({ type: ADD_DEVICE, payload: device });
    };

    if (state.permissionGranted && state.adapter === ADAPTER_ON) {
      bleManager.startDeviceScan(
        [PUNCHING_BAG_SERVICE],
        { allowDuplicates: false },
        throttle(500, onDeviceScan), // Scans happen too often so we have to throttle them, 500ms is arbitrary we should maybe change that.
      );
    } else {
      bleManager.stopDeviceScan();
    }
  }, [state.adapter, state.permissionGranted, bleManager]);

  return (
    <Card title="BAG" style={styles.card}>
      <Content state={state} dispatch={dispatch} />
      <ActionButton state={state} dispatch={dispatch} />
    </Card>
  );
};

export default BagControl;
