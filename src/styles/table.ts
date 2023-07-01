import { TableBody, TableCell, TablePagination, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  color: 'inherit',
  display: 'table-row',
  verticalAlign: 'middle',
  outline: '0px',
}));

export const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  lineHeight: '1.5rem',
  letterSpacing: '0.01071em',
  display: 'table-cell',
  verticalAlign: 'inherit',
  borderBottom: '1px solid rgb(49, 48, 48)',
  textAlign: 'left',
  color: 'rgb(255, 255, 255)',
  fontFamily: 'inherit',
  padding: '12px 10px 10px 0px',
  borderTopColor: 'rgb(49, 48, 48)',
  borderRightColor: 'rgb(49, 48, 48)',
  borderLeftColor: 'rgb(49, 48, 48)',
  fontWeight: '600',
  fontSize: '0.75rem',
  '&:first-of-type': {
    paddingLeft: 20,
  },
}));

export const StyledTableBody = styled(TableBody)(({ theme }) => ({
  backgroundColor: '#000',
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: '350',
  fontSize: '0.875rem',
  letterSpacing: '0.01071em',
  display: 'table-cell',
  verticalAlign: 'inherit',
  borderBottom: '1px solid rgb(49, 48, 48)',
  textAlign: 'left',
  color: 'rgb(255, 255, 255)',
  fontFamily: 'inherit',
  padding: '12px 20px 12px 0px',
  borderTopColor: 'rgb(49, 48, 48)',
  borderRightColor: 'rgb(49, 48, 48)',
  borderLeftColor: 'rgb(49, 48, 48)',
  lineHeight: '22px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '&:first-of-type': {
    paddingLeft: 20,
  },
}));

export const StyledTablePagination = styled(TablePagination)<{ component?: string }>(
  ({ theme }) => ({
    color: 'rgb(255, 255, 255)',
    borderBottomWidth: 0,
    overflow: 'visible',
    '.MuiIconButton-root': {
      '&.Mui-disabled': {
        color: 'rgba(255, 255, 255, .5)',
      },
    },
    '.MuiInputBase-root': {
      '.MuiSvgIcon-root': {
        color: 'rgb(255, 255, 255)',
      },
    },
  })
);
