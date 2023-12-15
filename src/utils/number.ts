export const currencyFormat = (
  number: number,
  maximumFractionDigits: number = 0
) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits,
  }).format(number);
};

export const numberFormat = (
  number: number,
  maximumFractionDigits: number = 0
) => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits,
  }).format(number);
};
