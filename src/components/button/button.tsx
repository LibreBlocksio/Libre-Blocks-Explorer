'use client';

import * as React from 'react';
import { Button as MaterialButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Slot } from '@radix-ui/react-slot';

import { tv, type VariantProps } from 'tailwind-variants';
import clsx from 'clsx';

const buttonVariants = tv({
  base: 'inline-flex items-center justify-center align-middle whitespace-nowrap font-semibold transition',
  variants: {
    variant: {
      primary: 'bg-primary text-white hover:bg-opacity-80',
    },
    size: {
      md: 'h-10 text-sm px-4 rounded-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={clsx(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Button;

export const StyledLinkButton = styled(MaterialButton)<ButtonProps>(() => ({
  color: '#fff',
  textTransform: 'none',
  fontFamily: 'var(--font-inter)',
  display: 'flex',
  borderRadius: '0',
  '&:hover': {
    backgroundColor: 'rgb(255 255 255 / .15)',
  },
}));
