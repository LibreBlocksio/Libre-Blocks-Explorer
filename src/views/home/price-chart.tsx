'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import dayjs from 'dayjs';
import { currencyFormat, numberFormat } from '@/utils/number';
import { useCoinInfo } from '@/hooks/api';

const Chart = () => {
  const [data, setData] = useState<any[]>([]);
  const coinInfoQuery = useCoinInfo();

  const [sonFiyat, setSonFiyat] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/libre/market_chart?vs_currency=usd&days=7'
      );
      const formattedData = [];
      const priceData = response.data.prices;
      
      const today = new Date();
      today.setDate(today.getDate() - 5); // 5 days ..

      for (let i = 0; i < priceData.length; i++) {
        const date = new Date(priceData[i][0]).toLocaleDateString('en-US');

        if (
          date >=
          `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`
        ) {
          const price = priceData[i][1];
          formattedData.push({ date, price });
        }
      }
      setData(formattedData);
      const sonVeri = formattedData[formattedData.length - 1];
      const sonFiyat = sonVeri ? sonVeri.price.toFixed(8) : null;
      setSonFiyat(sonFiyat);
      

      
    };
    fetchData();
  }, []);

  if (coinInfoQuery.isError) {
    return <span>Error: {coinInfoQuery.error?.message}</span>;
  }

  const coinInfoQueryData = coinInfoQuery.data;
  let libreData, marketCap, staked;

  if (coinInfoQueryData) {
    libreData = coinInfoQueryData.find((item) => item.name === 'LIBRE')!;
    marketCap = currencyFormat(libreData.marketCap);
    staked = `${numberFormat(libreData.staked, 2)}%`;
  }

  return (
    <div className='w-full min-w-0'>
      <h4 className='mb-3 text-2xl font-semibold'>Price Graph</h4>
      <div className='rounded-xl border border-shade-200 bg-white p-5 text-base'>
        <ResponsiveContainer width='100%' height={185}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id='colorPrice' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='#D8D8F8' />
                <stop offset='100%' stopColor='#F5F5FD' />
              </linearGradient>
            </defs>
            {/* <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }}  /> */}
            <Area
              type='monotone'
              dataKey='price'
              stroke='#4F4FDE'
              strokeWidth={1}
              strokeDasharray='0 0'
              fillOpacity={1}
              fill='url(#colorPrice)'
              dot={false}
            />
            <CartesianGrid
              stroke='#D4D4D4'
              horizontal={false}
              strokeDasharray='3 3'
            />
            <Tooltip
              labelStyle={{ fontSize: 14, color: 'rgb(23, 23, 23)' }}
              itemStyle={{ fontSize: 14, color: 'rgb(23, 23, 23)' }}
              contentStyle={{
                borderRadius: 6,
                backgroundColor: '#fff',
                borderColor: 'rgb(229, 229, 229)',
              }}
              labelFormatter={(value, payload) => {
                if (!payload || !payload[0]) return;
                return dayjs(payload[0].payload.date).format('MMM DD, YYYY');
              }}
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className=''>
          <div className='flex items-center justify-between border-b border-shade-200 pb-2 pt-5'>
            <span className='font-medium text-shade-600'>Libre/USD</span>
            <span className='font-bold'>${sonFiyat}</span>
          </div>
          <div className='flex items-center justify-between border-shade-200 pb-1 pt-3'>
            <span className='font-medium text-shade-600'>Libre/SATS</span>
            <span className='font-bold text-primary'>-</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chart;
