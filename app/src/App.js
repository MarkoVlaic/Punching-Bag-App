import 'react-native-gesture-handler';
import React, { useState} from 'react';
import { BleManager } from 'react-native-ble-plx';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './MainScreen';
import SessionScreen from './SessionScreen';
import HistoryEntryScreen from './HistoryEntryScreen';
import { BleManagerProvider } from './shared/bleManager';
import { CurrentBagProvider } from './shared/currentBag';
import { colorGreyDark, colorWhite } from './shared/constants';
import { hp } from './shared/responsiveLayout';
import useMockSessionsInMemory from './shared/mocks/mockSessionsInMemory';
import HistoryCard from './MainScreen/HistoryCard';

const bleManager = new BleManager();

const App = () => {
  // Stores the current bag device
  const [currentBag, setCurrentBag] = useState(null);
  const Stack = createStackNavigator();

  //useMockSessionsInMemory(0);

  return (
    <BleManagerProvider value={bleManager}>
      <CurrentBagProvider value={[currentBag, setCurrentBag]}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Session"
              component={SessionScreen}
              options={{
                headerStyle: {
                  backgroundColor: colorGreyDark,
                  height: hp(35),
                },
                headerTintColor: colorWhite,
              }}
            />
            <Stack.Screen
              name="HistoryEntry"
              component={HistoryEntryScreen}
              options={{
                headerStyle: {
                  backgroundColor: colorGreyDark,
                  height: hp(35),
                },
                headerTintColor: colorWhite,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CurrentBagProvider>
    </BleManagerProvider>
  );
};

export default App;
