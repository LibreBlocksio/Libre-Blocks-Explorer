import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledButton = styled(Button)<ButtonProps>(() => ({
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgb(255 255 255 / .15)',
  },
}));

export const StyledLinkButton = styled(Button)<ButtonProps>(() => ({
  color: '#fff',
  textTransform: 'none',
  fontFamily: 'var(--font-inter)',
  display: 'flex',
  borderRadius: '0',
  '&:hover': {
    backgroundColor: 'rgb(255 255 255 / .15)',
  },
}));

export default StyledButton;
