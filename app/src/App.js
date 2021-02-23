/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

import BagControl from './BagControl/index';
import { colorGreyLight } from './shared/constants';
import { BleManagerProvider } from './shared/bleManager';

const appStyle = {
  backgroundColor: colorGreyLight,
  width: '100%',
  height: '100%',
  alignItems: 'center',
};

const bleManager = new BleManager();

const App = () => (
  <View style={appStyle}>
    <BleManagerProvider value={bleManager}>
      <BagControl />
    </BleManagerProvider>
  </View>
);

export default App;
