import React from 'react';
import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import ButtonPrimary from '../../shared/ButtonPrimary';
import {
  ADAPTER_OFF,
  ADAPTER_ON,
  SET_CONNECTION,
  CONNECTED,
  CONNECTING,
  DISCONNECTED,
} from './reducer';
import { colorPrimary, colorGreyMedium } from '../../shared/constants';
import { useBleManager } from '../../shared/bleManager';
import { useCurrentBag } from '../../shared/currentBag';
import { wp, hp } from '../../shared/responsiveLayout'; 

import { initialState, StatePropTypes } from './state';

const styles = StyleSheet.create({
  button: {
    width: '70%',
    height: hp(35),
    marginTop: hp(15),
  },
  text: {
    fontFamily: 'Lato-Regular',
    fontSize: wp(18),
    letterSpacing: wp(2),
    color: colorPrimary,
  },
  textDisabled: {
    color: colorGreyMedium,
  },
});

const ButtonContent = ({ state, disabled }) => {
  const {
    permissionGranted,
    adapter,
    devices,
    connection,
  } = state;

  if (permissionGranted && adapter === ADAPTER_ON && devices.length === 0) return <ActivityIndicator color={colorGreyMedium} />;

  let textStyle = styles.text;
  if (disabled) textStyle = { ...textStyle, ...styles.textDisabled };

  if (connection === CONNECTING) return <ActivityIndicator color={colorPrimary} />;
  if (connection === CONNECTED) return <Text style={textStyle}>DISCONNECT</Text>;
  return <Text style={textStyle}>CONNECT</Text>;
};

ButtonContent.propTypes = {
  state: StatePropTypes,
  disabled: PropTypes.bool,
};

ButtonContent.defaultProps = {
  state: initialState,
  disabled: false,
};

const ActionButton = ({ state, dispatch }) => {
  const bleManager = useBleManager();
  const [_, setCurrentBag] = useCurrentBag();

  const {
    permissionGranted,
    adapter,
    devices,
    selected,
    connection,
  } = state;
  const disabled = !permissionGranted || (adapter === ADAPTER_OFF) || (devices.length === 0) || !selected;

  const connect = async () => {
    dispatch({ type: SET_CONNECTION, payload: CONNECTING });

    try {
      const device = await bleManager.connectToDevice(selected);
      await device.discoverAllServicesAndCharacteristics();

      setCurrentBag(device);
      dispatch({ type: SET_CONNECTION, payload: CONNECTED });
    } catch (e) {
      // Handle this better
      dispatch({ type: SET_CONNECTION, payload: DISCONNECTED });
    }
  };

  const disconnect = async () => {
    // Payload is CONNECTING even though we are disconnecting because it is currently used only to display
    // the activity indicator. This might change.
    dispatch({ type: SET_CONNECTION, payload: CONNECTING });
    await bleManager.cancelDeviceConnection(selected);
    setCurrentBag(null);
    dispatch({ type: SET_CONNECTION, payload: DISCONNECTED });
  };

  const action = connection === DISCONNECTED ? connect : disconnect;

  return (
    <ButtonPrimary style={styles.button} disabled={disabled} onPress={() => action()}>
      <ButtonContent state={state} disabled={disabled} />
    </ButtonPrimary>
  );
};

ActionButton.propTypes = {
  state: StatePropTypes,
  dispatch: PropTypes.func.isRequired,
};

ActionButton.defaultProps = {
  state: initialState,
};

export default ActionButton;
