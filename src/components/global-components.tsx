'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import * as React from 'react';
import ReactGA from 'react-ga4';

dayjs.extend(utc);
dayjs.extend(relativeTime);

export default function GlobalComponents() {
  React.useEffect(() => {
    ReactGA.initialize('G-NE6L1NPFCJ');
  }, []);

  return <div></div>;
}
