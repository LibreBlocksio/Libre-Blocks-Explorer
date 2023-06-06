import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { Anchor } from 'lucide-react';

const Chart = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/libre/market_chart?vs_currency=usd&days=7'
      );
      const formattedData = [];
      const priceData = response.data.prices;
      for (let i = 0; i < priceData.length; i++) {
        const date = new Date(priceData[i][0]).toLocaleDateString('en-US');
        if (
          date === '5/30/2023' ||
          date === '5/31/2023' ||
          date === '6/1/2023' ||
          date === '6/2/2023' ||
          date === '6/3/2023' ||
          date === '6/4/2023'
        ) {
          const price = priceData[i][1];
          formattedData.push({ date, price });
        }
      }
      setData(formattedData);
    };
    fetchData();
  }, []);
  const renderVerticalLines = () => {
    const dateArray = data.map((item) => item.date);
    const lineComponents = [];
    for (let i = 0; i < dateArray.length; i++) {
      lineComponents.push(<Line key={i} x={dateArray[i]} stroke='#262626' strokeWidth={1} />);
    }
    return lineComponents;
  };

  return (
    <div className='w-full min-w-0'>
      <h4 className='mb-4 text-xl font-semibold text-white'>Price Graph</h4>
      <div className='divide-y divide-shade-800 rounded-xl border border-shade-800 bg-black text-base text-white'>
        <div className='p-5'>
          <div className='mb-5 font-semibold'>Price</div>
          <ResponsiveContainer width='100%' height={185}>
            <LineChart data={data}>
              <XAxis dataKey='date' tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <CartesianGrid stroke='#262626' vertical={false} />

              <Tooltip
                labelStyle={{ fontSize: 14, color: '#fff' }}
                itemStyle={{ fontSize: 14, color: '#fff' }}
                contentStyle={{ backgroundColor: '#000', borderColor: '#262626' }}
              />
              <Line
                type='monotone'
                dataKey='price'
                stroke='#ff6101'
                strokeWidth={1}
                strokeDasharray='0 0'
                dot={false}
              />

              {renderVerticalLines()}
            </LineChart>
          </ResponsiveContainer>
          <div className='flex items-center justify-between '>
            <div className='flex flex-1 items-center space-x-2'>
              <span></span>
              <span></span>
            </div>
            <div className='flex items-center text-xs text-shade-500'>data from CoinGecko API</div>
          </div>
        </div>

        <div className='flex items-center justify-between py-4 px-5'>
          <div className='flex flex-1 items-center space-x-3'>
            <span>24h Low / 24h High:</span>
            <span></span>
          </div>
          <div className='flex items-center'>
            {' '}
            {data.length > 0
              ? `$${data[0].price.toFixed(7)} / $${data[data.length - 1].price.toFixed(7)}`
              : '-'}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chart;
