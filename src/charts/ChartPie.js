// src/charts/ChartPie.js

import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

function ChartPie({ events }) {

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(() => getData(events));
  }, [events]);

  const getData = (events) => {     // Note: My method, not CF
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
    const data = genres.map((genre) => {
      const value = events.filter((event) => event.summary.indexOf(genre) !== -1).length;
      return { name: genre, value }
    });
    return data;
  };

  const renderLabel = ({ percent, name }) => {
    const label = (percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ``);
    return label;
  }

  const COLORS = ['#cfe0ff', '#8aace6', '#5885d1', '#2457ad', '#002e7d'];
  return (
    <ResponsiveContainer height={300}>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx='50%'
          cy={160}
          labelLine={false}
          label={renderLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} name={entry.name} />)
          }
        </Pie>
        <Tooltip />
        <Legend align="center" verticalAlign="top" layout="horizontal" height={20} />
      </PieChart>
    </ResponsiveContainer >
  );
}

export default ChartPie;