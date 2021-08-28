import React from 'react';
import { View } from 'react-native';

import BagControl from './BagControl';
import SessionControl from './SessionControl';
import HistoryCard from './HistoryCard';
import { colorGreyLight } from '../shared/constants';

const style = {
  backgroundColor: colorGreyLight,
  width: '100%',
  height: '100%',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

const MainScreen = () => (
  <View style={style}>
    <BagControl />
    <SessionControl />
    <HistoryCard />
  </View>
);

export default MainScreen;
