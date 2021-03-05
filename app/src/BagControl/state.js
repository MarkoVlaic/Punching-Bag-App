import PropTypes from 'prop-types';
import { Device } from 'react-native-ble-plx';

import {
  ADAPTER_ON,
  ADAPTER_OFF,
  DISCONNECTED,
  CONNECTING,
  CONNECTED,
} from './reducer';

export const initialState = {
  adapter: ADAPTER_OFF,
  devices: [],
  permissionGranted: false,
  selected: null,
  connection: DISCONNECTED,
};

export const StatePropTypes = PropTypes.shape({
  adapter: PropTypes.oneOf(ADAPTER_ON, ADAPTER_OFF),
  devices: PropTypes.arrayOf(PropTypes.object),
  permissionGranted: PropTypes.bool,
  selected: PropTypes.instanceOf(Device),
  connection: PropTypes.oneOf(DISCONNECTED, CONNECTING, CONNECTED),
}).isRequired;
