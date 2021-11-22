import React, { useReducer, useEffect,} from 'react';
import { initialState, reducer, ADD_PUNCH } from './reducer';

const DataAccumulator = ({ dataPoints, updateStorageValues, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const recognizePunch = (previousPoints, point) => {
    const { x, y, z } = point;
    const strength = Math.sqrt(x * x + y * y + z * z);
    if (strength < 1 || strength > 10) return { isPunch: false };
    return { isPunch: true, strength };
  };

  useEffect(() => {
    if (!dataPoints.length) return;
    const lastDataPoint = dataPoints[dataPoints.length - 1];
    const { isPunch, strength } = recognizePunch(dataPoints, lastDataPoint);
    if (!isPunch) return;

    const payload = { strength, timestamp: lastDataPoint.timestamp };
    dispatch({ type: ADD_PUNCH, payload });
  }, [dataPoints]);

  useEffect(() => {
    updateStorageValues(state.punches, state.stats);
  }, [state, updateStorageValues]);

  const proppedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { punches: state.punches, stats: state.stats });
    }

    return child;
  });

  return (
    <>{ proppedChildren }</>
  );
};

export default DataAccumulator;
