import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import {
  VictoryLine,
  VictoryScatter,
  VictoryChart,
  VictoryAxis,
  VictoryZoomContainer,
} from 'victory-native';

import { colorPrimary, colorGreyMedium, colorWhite } from '../shared/constants';
import { wp } from '../shared/responsiveLayout';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const axisStyle = {
  axisLabel: { fontFamily: 'Lato-Regular', fontSize: wp(14), padding: wp(30) },
  axis: { stroke: colorGreyMedium },
  tickLabels: { fontSize: wp(12) },
  ticks: { stroke: colorPrimary, size: 5 },
};

const Chart = ({ punches, timeDomainRange }) => {
  const getEntireDomain = () => {
    let x;
    if (punches.length === 0) x = [0, 10];
    else x = [punches[0].timestamp, punches[punches.length - 1].timestamp];
    return { x, y: [0, 10] };
  };

  const calculateTimeDomain = useCallback(() => {
    if (punches.length === 0) return getEntireDomain().x;
    const lastTimestamp = punches[punches.length - 1].timestamp + 5;

    let firstTimestampIndex = punches.length - 1;
    while (firstTimestampIndex > 0 && lastTimestamp - punches[firstTimestampIndex].timestamp < timeDomainRange) firstTimestampIndex -= 1;

    return [punches[firstTimestampIndex].timestamp, lastTimestamp];
  }, [punches, timeDomainRange]);

  const [timeDomain, setTimeDomain] = useState(calculateTimeDomain);

  useEffect(() => {
    setTimeDomain(calculateTimeDomain());
  }, [punches, calculateTimeDomain]);

  const getData = () => punches.filter((punch) => punch.timestamp >= timeDomain[0] && punch.timestamp <= timeDomain[1]);

  return (
    <View style={{margin: widthPercentageToDP('5%')}}>
      <VictoryChart
        domain={getEntireDomain()}
        // animate={{ dutaion: 200 }}
        // minDomain={{ x: 0 }}
        containerComponent={(
          <VictoryZoomContainer
            zoomDimension="x"
            allowPan={false}
            allowZoom={false}
            zoomDomain={{ x: timeDomain }}
          />
        )}
      >
        <VictoryAxis
          label="Time (s)"
          style={axisStyle}
        />

        <VictoryAxis
          dependentAxis
          label="Strength (gs)"
          style={axisStyle}
        />
        <VictoryLine
          data={getData()}
          style={{ data: { stroke: colorGreyMedium } }}
          x="timestamp"
          y="strength"
          // animate={{
          //   onEnter: {
          //     duration: 100,
          //   },
          // }}
        />
        <VictoryScatter
          data={getData()}
          style={{ data: { fill: colorPrimary } }}
          x="timestamp"
          y="strength"
          bubbleProperty="strength"
          minBubbleSize={3}
          maxBubbleSize={7}
          // animate={{
          //   onEnter: {
          //     duration: 100,
          //   },
          // }}
        />
      </VictoryChart>
    </View>
  );
};

export default Chart;
