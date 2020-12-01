// src/charts/ChartScatter.js

import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// function component called with props from App.js

function ChartScatter({ getData }) {

  return (
    <div>
      <ResponsiveContainer height={400}>
        <ScatterChart
          margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis
            type="category"
            dataKey="city"
            name="city" />
          <YAxis
            type="number"
            dataKey="number"
            name="number of events"
            allowDecimals={false} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter
            name="Events by Location"
            data={getData()}
            fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartScatter;