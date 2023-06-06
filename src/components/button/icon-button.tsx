import { IconButton, IconButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledIconButton = styled(IconButton)<IconButtonProps>(() => ({
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgb(255 255 255 / .15)',
  },
}));
