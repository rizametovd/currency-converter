export const convert = (
  amount: number,
  baseCurrency: number,
  targetCurrency: number
) => {
  const result = amount * (targetCurrency / baseCurrency);
  return toFixedNumber(result);
};


const toFixedNumber = (value: number) => {
    return Number(value.toFixed(2))
}