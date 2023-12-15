'use client';

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
  display: 'table-cell',
  verticalAlign: 'inherit',
  borderBottom: '1px solid rgb(229, 229, 229)',
  textAlign: 'left',
  color: 'rgb(23, 23, 23)',
  fontFamily: 'inherit',
  padding: '16px 10px 10px 0px',
  borderTopColor: 'rgb(229, 229, 229)',
  borderRightColor: 'rgb(229, 229, 229)',
  borderLeftColor: 'rgb(229, 229, 229)',
  fontWeight: '700',
  fontSize: '15px',
  '&:first-of-type': {
    paddingLeft: 20,
  },
}));

export const StyledTableBody = styled(TableBody)(({ theme }) => ({
  backgroundColor: '#fff',
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: '500',
  fontSize: '13.75px',
  letterSpacing: '0.01071em',
  display: 'table-cell',
  verticalAlign: 'inherit',
  borderBottom: '1px solid rgb(229, 229, 229)',
  textAlign: 'left',
  color: 'rgb(23, 23, 23)',
  fontFamily: 'inherit',
  padding: '12px 12px 12px 0px',
  borderTopColor: 'rgb(229, 229, 229)',
  borderRightColor: 'rgb(229, 229, 229)',
  borderLeftColor: 'rgb(229, 229, 229)',
  lineHeight: '22px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '&:first-of-type': {
    paddingLeft: 20,
  },
}));

export const StyledTablePagination = styled(TablePagination)<{
  component?: string;
}>(({ theme }) => ({
  color: 'rgb(23, 23, 23)',
  borderBottomWidth: 0,
  overflow: 'visible',
  '.MuiIconButton-root': {
    '&.Mui-disabled': {
      color: 'rgba(23,23,23, .5)',
    },
  },
  '.MuiInputBase-root': {
    '.MuiSvgIcon-root': {
      color: 'rgb(23, 23, 23)',
    },
  },
}));
