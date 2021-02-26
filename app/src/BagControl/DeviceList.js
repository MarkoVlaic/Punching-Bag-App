/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { colorGreyDark, colorPrimary } from '../shared/constants';

const styles = StyleSheet.create({
  item: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    textTransform: 'capitalize',
    color: colorGreyDark,
    marginLeft: 5,
    marginRight: 5,
  },
  itemSelected: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    borderBottomWidth: 2,
    borderBottomColor: colorPrimary,
  },
  listStyle: {
    padding: 5,
  },
  emptyText: {
    fontFamily: 'Lato-Light',
    fontSize: 18,
    textTransform: 'capitalize',
    borderBottomWidth: 1,
    borderBottomColor: colorPrimary,
  },
});

const Item = ({ selected, name, onPress }) => {
  let style = styles.item;
  if (selected) style = { ...style, ...styles.itemSelected };

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style}>{name}</Text>
    </TouchableOpacity>
  );
};

Item.propTypes = {
  selected: PropTypes.bool,
  name: PropTypes.string,
};

Item.defaultProps = {
  selected: false,
  name: '',
};

const EmptyList = () => (
  <Text style={styles.emptyText}>Searching for bags</Text>
);

const DeviceList = ({ devices }) => {
  const firstDeviceId = devices[0] ? devices[0].id : null;
  const [selected, setSelected] = useState(firstDeviceId);
  const listRef = useRef();

  const selectDevice = (item) => {
    setSelected(item.id);
    listRef.current.scrollToItem({ item, viewPosition: 0.5 });
  };

  const renderItem = ({ item }) => (
    <Item selected={item.id === selected} name={item.localName} onPress={() => selectDevice(item)} />
  );

  return (
    <FlatList
      data={devices}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      extraData={selected}
      ListEmptyComponent={EmptyList}
      horizontal
      ref={listRef}
      style={styles.listStyle}
    />
  );
};

DeviceList.propTypes = {
  devices: PropTypes.array,
};

DeviceList.defaultProps = {
  devices: [],
};

export default DeviceList;
