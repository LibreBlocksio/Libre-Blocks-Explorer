import * as React from 'react';
import * as S from '@/styles/tabs';
import TxMessageCard from './message-card';
import TxLogCard from './log-card';
import type { TabsProps, TabPanelProps } from './types';

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role='tabpanel' hidden={value !== index} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

export default function TxTabs({ actions }: TabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  let logCardOrder = 0;
  const totalLogCardsLength = actions.reduce((acc, action) => acc + action.receipts.length, 0);

  return (
    <>
      <div className='rounded-xl border border-shade-800 bg-black text-white'>
        <div className='border-b border-shade-800 px-5'>
          <S.StyledTabs value={value} onChange={handleChange} aria-label='tabs'>
            <S.StyledTab label={`Actions (${actions.length})`} />
            <S.StyledTab label={`logs (${totalLogCardsLength})`} />
          </S.StyledTabs>
        </div>
        <TabPanel value={value} index={0}>
          <div className='space-y-5 p-5'>
            {actions.map((action, i) => (
              <TxMessageCard key={i} name={action.act.name} message={action.act.data} />
            ))}
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className='space-y-5 p-5'>
            {actions.map((action, i) =>
              action.receipts.map((receipt, j) => (
                <TxLogCard key={`${i}-${j}`} index={++logCardOrder} {...receipt} />
              ))
            )}
          </div>
        </TabPanel>
      </div>
    </>
  );
}
