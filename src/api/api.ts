import { Rates } from '../types/common';

const BASE_URL = 'https://openexchangerates.org/api/latest.json?app_id=79da6566ee604a7e8de5cb9574ffd21c&base=USD&symbols=USD,CAD,RUB,EUR,JPY';


export const getLatestCurrencyRates = async (): Promise<Rates> => {
  const response = await fetch(BASE_URL);
  const { rates } = await response.json();
  return rates;
};
