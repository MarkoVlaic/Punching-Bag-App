import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import Card from '../../shared/Card';
import SessionList from './SessionList';

const styles = StyleSheet.create({
  card: {
    
  },
});

const generateMockHistoryData = (N) => {
  const sessions = [];
  const sessionData = [];
  let timestamp = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;
  const ONE_MINUTE = 60 * 1000;

  for (let i = 0; i < N; i += 1) {
    const duration = Math.floor(Math.random() * 60 * ONE_MINUTE);
    const punches = Math.floor(Math.random() * 1000);
    const maxStrength = Math.floor(Math.random() * 500);

    sessions.push(timestamp);
    sessionData.push({ timestamp, duration, punches, maxStrength });

    timestamp -= Math.round(Math.random() * 10 * ONE_DAY);
  }

  return [sessions, sessionData];
};

const [mockSessionTimestamps, mockSessionData] = generateMockHistoryData(15);

const HistoryCard = () => {
  const ITEMS_PER_PAGE = 15;
  const [sessionTimestamps, setSessionTimestamps] = useState([]);
  const [loadedData, setLoadedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);
  const [refreshData, setRefreshData] = useState(false); // Used for refreshing the data when the screen comes back into focus

  const loadSessionsInRange = async (start, end) => {
    const sessionPromises = sessionTimestamps.slice(start, end).map((timestamp) => AsyncStorage.getItem(`${timestamp}`));
    const sessions = await Promise.all(sessionPromises);
    //console.log('more sessions', sessions);

    return sessions.map((session) => JSON.parse(session));
  };

  useFocusEffect(useCallback(() => {
    setRefreshData(true);
  }, []));

  // Load all session timestamps and the first page of data
  useEffect(() => {
    const loadSessionTimestamps = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        // console.log('keys', keys);
        const sessionTimestampsString = await AsyncStorage.getItem('@sessions');
        let parsedSessionTimestamps = JSON.parse(sessionTimestampsString);
        if (parsedSessionTimestamps === null) parsedSessionTimestamps = [];
        parsedSessionTimestamps.reverse(); // We have to reverse the array so the latest sessions get to the top
        setSessionTimestamps(parsedSessionTimestamps);

        // console.log('tmsptm', parsedSessionTimestamps);

        const initialData = await loadSessionsInRange(0, ITEMS_PER_PAGE);
        // console.log('initial', initialData);
        setLoadedData(initialData);
        setRefreshData(false);
      } catch (e) {
        // Handle this better
        console.error(e);
      }
    };

    loadSessionTimestamps();
  }, [refreshData]);

  // const loadNextPage = () => {
  //   if (noMoreData) return;
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoadedData([...loadedData, ...mockSessionData.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)]);

  //     if ((currentPage + 1) * ITEMS_PER_PAGE >= mockSessionData.length) {
  //       setNoMoreData(true);
  //     }

  //     setCurrentPage(currentPage + 1);
  //     setLoading(false);
  //   }, 1000);
  // };

  const loadNextPage = async () => {
    if (noMoreData) return;
    setLoading(true);
    const newData = await loadSessionsInRange(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);
    setLoadedData([...loadedData, ...newData]);

    if ((currentPage + 1) * ITEMS_PER_PAGE >= sessionTimestamps.length) {
      setNoMoreData(true);
    }

    setCurrentPage(currentPage + 1);
    setLoading(false);
  };

  // console.log('ldd', loadedData);
  const displayData = loadedData.map((session, index) => ({
    timestamp: +sessionTimestamps[index], // The + here serves to convert the timestamp from string to int
    duration: session.duration,
    punches: session.stats.punches.thrown,
    maxStrength: session.stats.power.max,
    fullSessionData: session, // also pass all of the session data to make it available to the HistoryEntryScreen on touch
  }));

  // console.log('display', displayData);

  return (
    <Card title="SESSION HISTORY" style={styles.card} containerStyle={{ height: '50%' }}>
      <SessionList data={displayData} loading={loading} loadNextPage={loadNextPage} noMoreData={noMoreData} />
    </Card>
  );
};

export default HistoryCard;
