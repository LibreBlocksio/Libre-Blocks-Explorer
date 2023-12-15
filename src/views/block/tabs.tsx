'use client';

import * as React from 'react';
import * as S from '@/styles/tabs';
import type { TabsProps, TabPanelProps, MessageCardProps } from './types';
import BlockMessageCard from './message-card';

function extractMessageFields(transactions: TabsProps['transactions']) {
  const results: MessageCardProps[] = [];

  transactions.forEach((transaction) => {
    transaction.trx.transaction.actions.forEach((action) => {
      results.push({
        name: action.name,
        data: action.data,
      });
    });
  });

  return results;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role='tabpanel' hidden={value !== index} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

export default function BlockTabs({ transactions }: TabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  let logCardOrder = 0;
  // const totalLogCardsLength = transactions.reduce((acc, action) => acc + action.receipts.length, 0);
  const allMessages = extractMessageFields(transactions);

  return (
    <>
      <div className='rounded-xl border border-shade-200 bg-white'>
        <div className='border-b border-shade-200 px-5'>
          <S.StyledTabs value={value} onChange={handleChange} aria-label='tabs'>
            <S.StyledTab label={`Transactions (${allMessages.length})`} />
          </S.StyledTabs>
        </div>
        <TabPanel value={value} index={0}>
          <div className='space-y-5 p-5'>
            {allMessages.map((message, i) => (
              <BlockMessageCard key={i} {...message} />
            ))}
          </div>
        </TabPanel>
      </div>
    </>
  );
}
