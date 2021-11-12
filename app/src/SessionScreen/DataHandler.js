import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import SessionStore from './SessionStore';

// Recieves BLE data and saves session data to storage
const DataHandler = ({ startTimestamp, ended, children }) => {
  console.log('Got children', children);
  const [dataPoints, setDataPoints] = useState([]);

  // Init the session store
  const sessionStoreRef = useRef();
  useLayoutEffect(() => {
    sessionStoreRef.current = new SessionStore(Date.now());
  }, []);

  useEffect(() => {
    if (ended) {
      const duration = Date.now() - startTimestamp;
      sessionStoreRef.current.setItem('duration', duration);
      sessionStoreRef.current.write();
    }
  }, [ended, startTimestamp]);

  // Mock BLE data reciever
  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = Math.floor((Date.now() - startTimestamp) / 1000);

      const x = Math.random() * 2;
      const y = Math.random() * 2;
      const z = Math.random() * 2;

      const dataPoint = {
        timestamp,
        x,
        y,
        z,
      };

      setDataPoints([...dataPoints, dataPoint]);
    }, 1000);

    if (ended) clearInterval(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [ended, dataPoints, startTimestamp]);

  const updateStorageValues = (punches, stats) => {
    sessionStoreRef.current.setItem('punches', punches);
    sessionStoreRef.current.setItem('stats', stats);
  };

  const proppedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { dataPoints, updateStorageValues });
    }

    return child;
  });

  return (
    <>{ proppedChildren }</>
  );
};

export default DataHandler;
