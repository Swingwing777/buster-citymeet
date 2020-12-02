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

  const COLORS = ['#a6c8ff', '#80b0ff', '#619dff', '#3b85ff', '#146dff'];
  return (
    <ResponsiveContainer height={400}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} name={entry.name} />)
          }
        </Pie>
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default ChartPie;