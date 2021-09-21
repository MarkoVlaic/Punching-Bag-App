import React, { useLayoutEffect } from 'react';

import TimeDisplay from './shared/SessionDisplay/TimeDisplay';
import SessionDisplay from './shared/SessionDisplay';

const HistoryEntryScreen = ({ navigation, route }) => {
  useLayoutEffect(() => {
    const { duration } = route.params;

    navigation.setOptions({
      headerRight: () => (<TimeDisplay time={duration / 1000} />),
    });
  });

  console.log('session given', route.params);
  const { punches, stats } = route.params;

  return <SessionDisplay punches={punches} stats={stats} />;
};

export default HistoryEntryScreen;
