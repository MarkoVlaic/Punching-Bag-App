import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

import SessionListItem from './SessionListItem';
import { colorPrimary } from '../../shared/constants';

const Footer = ({ loading, noMoreData }) => {
  if (loading && !noMoreData) {
    return <ActivityIndicator color={colorPrimary} size="large" />;
  }
  return <></>;
};

const emptyTextStyle = {
  fontFamily: 'Lato-Light',
  fontSize: 25,
  textAlign: 'center',
  borderBottomColor: colorPrimary,
  borderBottomWidth: 1,
  paddingBottom: 1,
}
const ListEmpty = () => (
  <Text style={emptyTextStyle}>No sessions recorded yet!</Text>
);

const SessionList = ({ data, loading, loadNextPage, noMoreData }) => {
  console.log(data.length);
  const renderItem = ({ item }) => {
    const { timestamp, duration, punches, maxStrength } = item;
    return <SessionListItem timestamp={timestamp} duration={duration} punches={punches} maxStrength={maxStrength} />;
  };

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.timestamp}`}
        style={{ width: '100%' }}
        onEndReached={loadNextPage}
        ListFooterComponent={<Footer loading={loading} noMoreData={noMoreData} />}
        ListEmptyComponent={<ListEmpty />}
      />
    </View>
  );
};

export default SessionList;
