// src/charts/ChartPie.js

import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';

function ChartPie({ events }) {

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(() => getSubjects(events));
  }, [events]);

  // const getData = (events) => {     // Note: CF method --> This works very nicely
  //   const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
  //   const data = genres.map((genre) => {
  //     const value = events.filter(({ summary }) =>
  //       summary.split(' ').includes(genre)
  //     ).length;
  //     return { name: genre, value };
  //   });
  //   return data;
  // };

  const getSubjects = (events) => {     // Note: My method
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
    const data = genres.map((genre) => {
      const value = events.filter((event) => event.summary.indexOf(genre) !== -1).length;
      return { name: genre, value }
    });
    return data;
  };

  const COLORS = ['#a6c8ff', '#80b0ff', '#619dff', '#3b85ff', '#146dff'];
  // const COLORS = ['red', 'orange', 'green', 'blue', 'yellow'];  // testing only
  return (
    <ResponsiveContainer height={400}>
      <PieChart >
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          // label={renderCustomizedLabel}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} name={entry.name} />)
          }
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default ChartPie;