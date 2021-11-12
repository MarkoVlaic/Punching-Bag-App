import React, { useLayoutEffect, useEffect, useState } from 'react';
import { HeaderBackButton } from '@react-navigation/stack';

import TimeDisplay from '../shared/SessionDisplay/TimeDisplay';
import EndButton from './EndButton';
import SessionDisplay from '../shared/SessionDisplay';
import DataHandler from './DataHandler';
import DataAccumulator from './DataAccumulator';

const TickingTimeDisplay = ({ startTimestamp, ended }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const curTime = Math.round((Date.now() - startTimestamp) / 1000);
      setTime(curTime);
    }, 1000);

    if (ended) clearInterval(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [ended, startTimestamp]);

  return <TimeDisplay time={time} />;
};

const SessionScreen = ({ navigation }) => {
  const [ended, setEnded] = useState(false);
  const [startTimestamp] = useState(Date.now());

  useLayoutEffect(() => {
    const onEndPress = () => {
      setEnded(true);
    };

    navigation.setOptions({
      headerRight: () => (
        <TickingTimeDisplay startTimestamp={startTimestamp} ended={ended} />
      ),
      headerLeft: (props) => {
        // Documentation suggests we spread the props this way so it is ok to disable the lint
        // https://reactnavigation.org/docs/stack-navigator#headerleft
        // eslint-disable-next-line react/jsx-props-no-spreading
        if (ended) return <HeaderBackButton {...props} onPress={() => navigation.goBack()} />;
        return <EndButton onPress={onEndPress} />;
      },
      headerTitle: '',
    });
  }, [navigation, ended, startTimestamp]);

  return (
    <DataHandler startTimestamp={startTimestamp} ended={ended}>
      <DataAccumulator>
        <SessionDisplay />
      </DataAccumulator>
    </DataHandler>

  );
};

export default SessionScreen;
