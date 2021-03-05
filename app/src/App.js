import React, { useState } from 'react';
import { View } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

import BagControl from './BagControl/index';
import { colorGreyLight } from './shared/constants';
import { BleManagerProvider } from './shared/bleManager';
import { CurrentBagProvider } from './shared/currentBag';

const appStyle = {
  backgroundColor: colorGreyLight,
  width: '100%',
  height: '100%',
  alignItems: 'center',
};

const bleManager = new BleManager();

const App = () => {
  const [currentBag, setCurrentBag] = useState(null);

  return (
    <View style={appStyle}>
      <BleManagerProvider value={bleManager}>
        <CurrentBagProvider value={[currentBag, setCurrentBag]}>
          <BagControl />
        </CurrentBagProvider>
      </BleManagerProvider>
    </View>
  );
};

export default App;
