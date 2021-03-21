import React from 'react';
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export default function Chart({ data }) {
  // const data = [
  //   {
  //     name: 'Page A',
  //     uv: 4000,
  //   },
  //   {
  //     name: 'Page B',
  //     uv: 3000,
  //   },
  //   {
  //     name: 'Page C',
  //     uv: 2000,
  //   },
  //   {
  //     name: 'Page D',
  //     uv: 2780,
  //   },
  //   {
  //     name: 'Page E',
  //     uv: 1890,
  //   },
  //   {
  //     name: 'Page F',
  //     uv: 2390,
  //   },
  //   {
  //     name: 'Page G',
  //     uv: 3490,
  //   },
  // ];

  return (
    <ResponsiveContainer width='90%' height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='count' fill='#82ca9d' />
      </BarChart>
    </ResponsiveContainer>
  );
}
