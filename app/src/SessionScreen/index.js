import React, { useLayoutEffect, useReducer } from 'react';
import { Text } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';

import TimeDisplay from './TimeDisplay';
import EndButton from './EndButton';
import { reducer, initialState, SET_ENDED } from './reducer';

const SessionScreen = ({ navigation }) => {
  const [sessionState, dispatch] = useReducer(reducer, initialState);

  useLayoutEffect(() => {
    const onEndPress = () => {
      dispatch({ type: SET_ENDED, payload: true });
    };

    const { ended } = sessionState;

    navigation.setOptions({
      headerRight: () => (
        <TimeDisplay ended={ended} />
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
  }, [navigation, sessionState]);

  return (
    <>
      <Text>This is the session screen</Text>
    </>
  );
};

export default SessionScreen;
