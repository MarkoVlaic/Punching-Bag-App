import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLayoutEffect } from 'react';
import SessionStore from '../../SessionScreen/SessionStore';

const useMockSessionsInMemory = (N) => {
  useLayoutEffect(() => {
    const generateSessions = async () => {
      AsyncStorage.clear();
      let timestamp = Date.now();
      const ONE_DAY = 24 * 60 * 60 * 1000;
      const ONE_MINUTE = 60 * 1000;

      for (let i = 0; i < N; i += 1) {
        const ss = new SessionStore(`${timestamp}`);
        const duration = Math.floor(Math.random() * 60 * ONE_MINUTE);
        const thrown = Math.round(Math.random() * 1000);
        const perMinute = Math.round(Math.random() * 100);
        const min = Math.round(Math.random() * 50);
        const average = Math.round(Math.random() * 200);
        const max = Math.round(Math.random() * 500);
        const punches = new Array(Math.round(Math.random() * 500));

        ss.setItem('duration', duration);
        ss.setItem('stats', {
          punches: {
            thrown,
            perMinute,
          },
          power: {
            min, average, max,
          },
        });
        ss.setItem('punches', punches);

        await ss.write();
        timestamp -= Math.round(Math.random() * 10 * ONE_DAY);
      }
    };

    generateSessions();
  }, []);
};

export default useMockSessionsInMemory;
