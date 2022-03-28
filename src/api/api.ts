import { Rates } from '../types/common';

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=0a16b10448eca82c5e322e8973013bd4&symbols=USD,CAD,RUB,EUR,JPY';

export const getLatestCurrencyRates = async (): Promise<Rates> => {
  const response = await fetch(BASE_URL);
  const { rates } = await response.json();
  return rates;
};
