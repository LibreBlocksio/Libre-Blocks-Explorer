import { Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  '.MuiTabs-indicator': {
    backgroundColor: 'rgb(255 98 0)',
    height: 4,
  },
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  fontFamily: 'var(--font-inter)',
  color: '#fff',
  display: 'inline-flex',
  WebkitBoxAlign: 'center',
  alignItems: 'center',
  WebkitBoxPack: 'center',
  justifyContent: 'center',
  WebkitTapHighlightColor: 'transparent',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  verticalAlign: 'middle',
  fontWeight: 500,
  fontSize: '0.875rem',
  lineHeight: '1.25',
  letterSpacing: '0.02857em',
  textTransform: 'uppercase',
  maxWidth: '360px',
  minWidth: '90px',
  position: 'relative',
  minHeight: '48px',
  flexShrink: '0',
  padding: '12px 16px',
  overflow: 'hidden',
  whiteSpace: 'normal',
  textAlign: 'center',
  flexDirection: 'column',
  '&.Mui-selected': {
    color: 'rgb(255 98 0)',
  },
}));
