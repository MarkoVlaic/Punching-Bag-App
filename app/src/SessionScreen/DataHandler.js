import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { Buffer } from 'buffer';

import { useCurrentBag } from '../shared/currentBag';
import SessionStore from './SessionStore';
import { PUNCHING_BAG_SERVICE, ACCELERATION_MEASURMENT_CHARACTERISTIC } from '../shared/uuids';

// Recieves BLE data and saves session data to storage
const DataHandler = ({ startTimestamp, ended, children }) => {
  const [dataPoints, setDataPoints] = useState([]);
  const [currentBag] = useCurrentBag();

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

  // // Mock BLE data reciever
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const timestamp = Math.floor((Date.now() - startTimestamp) / 1000);

  //     const x = Math.random() * 2;
  //     const y = Math.random() * 2;
  //     const z = Math.random() * 2;

  //     const dataPoint = {
  //       timestamp,
  //       x,
  //       y,
  //       z,
  //     };

  //     setDataPoints([...dataPoints, dataPoint]);
  //   }, 1000);

  //   if (ended) clearInterval(interval);

  //   return () => {
  //     if (interval) clearInterval(interval);
  //   };
  // }, [ended, dataPoints, startTimestamp]);

  const bleSubscriptionRef = useRef(null);
  useEffect(() => {
    if (ended && bleSubscriptionRef.current) {
      bleSubscriptionRef.current.remove();
      bleSubscriptionRef.current = null;
      return () => {};
    }

    const subscription = currentBag.monitorCharacteristicForService(
      PUNCHING_BAG_SERVICE,
      ACCELERATION_MEASURMENT_CHARACTERISTIC,
      (error, characteristic) => {
        if (error) {
          console.warn('subscription error', error);
          return;
        }
        const buffer = Buffer.from(characteristic.value, 'base64');
        const x = buffer.readFloatLE(0);
        const y = buffer.readFloatLE(4);
        const z = buffer.readFloatLE(8);

        const timestamp = Math.floor((Date.now() - startTimestamp) / 1000);

        const dataPoint = {
          timestamp,
          x,
          y,
          z,
        };

        setDataPoints([...dataPoints, dataPoint]);
      },
    );
    bleSubscriptionRef.current = subscription;

    return () => {
      if (!ended) subscription.remove();
    };
  }, [currentBag, ended]);

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
