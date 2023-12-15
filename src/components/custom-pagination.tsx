'use client';

import usePagination from '@mui/material/usePagination';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  onPageChange: (value: number | ((prevVar: number) => number)) => void;
  dataLength: number;
  rowsPerPage: number;
};

const PaginationItem = ({
  children,
  selected,
  dots = false,
  ...rest
}: {
  children: React.ReactNode;
  selected?: boolean;
  dots?: boolean;
}) => {
  return (
    <div className='p-1'>
      <button
        type='button'
        className={clsx(
          'flex h-9 min-w-[36px] items-center justify-center rounded px-3',
          {
            'bg-primary text-white hover:bg-primary/80': selected && !dots,
            'bg-shade-100 text-shade-500 hover:bg-shade-200':
              !selected && !dots,
            'cursor-default bg-shade-100': dots,
          }
        )}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
};

export default function CustomPagination({
  onPageChange,
  dataLength,
  rowsPerPage,
}: Props) {
  const { items: paginationItems } = usePagination({
    count: Math.ceil(dataLength / rowsPerPage),
    onChange(_event, page) {
      onPageChange(page - 1);
    },
  });

  return (
    <div className='mt-2 flex flex-wrap items-center justify-center py-4'>
      {paginationItems.map(({ page, type, selected, ...item }, index) => {
        let children = null;

        if (type === 'start-ellipsis' || type === 'end-ellipsis') {
          children = (
            <PaginationItem key={index} dots>
              …
            </PaginationItem>
          );
        } else if (type === 'page') {
          children = (
            <PaginationItem key={index} selected={selected} {...item}>
              {page}
            </PaginationItem>
          );
        } else if (type === 'previous') {
          children = (
            <div className='p-1' key={index}>
              <button
                type='button'
                className='flex h-9 items-center px-3 disabled:text-shade-400'
                {...item}
              >
                <ChevronLeft className='h-5 w-5' />
              </button>
            </div>
          );
        } else if (type === 'next') {
          children = (
            <div className='p-1' key={index}>
              <button
                type='button'
                className='flex h-9 items-center px-3 disabled:text-shade-400'
                {...item}
              >
                <ChevronRight className='h-5 w-5' />
              </button>
            </div>
          );
        }

        return children;
      })}
    </div>
  );
}
