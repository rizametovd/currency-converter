import React, { useEffect, useState } from 'react';
import { Stack, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import CurrencyExchange from '../CurrencyExchange';
import { getLatestCurrencyRates } from '../../api/api';
import { convert } from '../../utils/utils';
import { useTranslation } from 'react-i18next';
import { Rates } from '../../types/common';

const INIT_CURRENCY = {
  from: 'RUB',
  to: 'USD',
};

const INIT_AMOUNT = {
  from: 1,
  to: 1,
};

const INIT_RATES = {};

const Main: React.FC = () => {
  const { t } = useTranslation();
  const [rates, setRates] = useState<Rates>(INIT_RATES);
  const [currency, setCurrency] = useState(INIT_CURRENCY);
  const [amount, setAmount] = useState(INIT_AMOUNT);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getRates = async () => {
      try {
        setIsLoading(true);
        const rates = await getLatestCurrencyRates();

        if (rates) {
          setRates(rates);

          setAmount((prev) => ({
            ...prev,
            to: convert(amount.from, rates[currency.from as keyof typeof rates], rates[currency.to as keyof typeof rates]),
          }));
        }
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    getRates();
  }, []);

  const handleCloseAlert = () => {
    setIsError(false);
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>, baseField: string, targetField: string) => {
    const value = Number(e.target.value);
    const baseCurrency = currency[baseField as keyof typeof currency];
    const targetCurrency = currency[targetField as keyof typeof currency];
    const baseRate = rates[baseCurrency as keyof typeof rates];
    const targetRate = rates[targetCurrency as keyof typeof rates];

    const convertedAmount = convert(value, baseRate, targetRate);

    setAmount((prev) => ({
      ...prev,
      [targetField]: convertedAmount,
      [baseField]: value,
    }));
  };

  const handleChangeCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const toField = 'to';
    const selectedCurrency = e.target.value;
    const amountToConvert = amount.from;
    const field = e.target.name;
    const isFromFieldChanged = field !== toField;
    const toCurrency = currency[toField];
    const targetRate = rates[toCurrency as keyof typeof rates];
    const currencyRate = rates[selectedCurrency as keyof typeof rates];
    const fromFieldRate = rates[currency.from as keyof typeof rates];
    let convertedAmount: number;

    setCurrency((prev) => ({
      ...prev,
      [field]: selectedCurrency,
    }));

    if (isFromFieldChanged) {
      convertedAmount = convert(amountToConvert, currencyRate, targetRate);
    } else {
      convertedAmount = convert(amountToConvert, fromFieldRate, currencyRate);
    }

    setAmount((prev) => ({
      ...prev,
      [toField]: convertedAmount,
    }));
  };

  return (
    <Stack
      gap={'20px'}
      alignItems={'center'}
      sx={{
        margin: 'auto 0',
        padding: '30px',
        borderRadius: '24px',
        border: '1px solid lightgray',
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
      }}
    >
      <Typography variant={'h4'} align={'center'} sx={{ fontWeight: '700' }}>
        {t('converter')}
      </Typography>

      {isLoading ? (
        <CircularProgress sx={{ margin: 'auto' }} />
      ) : (
        <Stack gap={'24px'}>
          <CurrencyExchange
            label={t('from')}
            currencyOptions={Object.keys(rates)}
            field={'from'}
            amount={amount.from}
            currency={currency.from}
            onChangeAmount={(e) => handleChangeAmount(e, 'from', 'to')}
            onChangeCurrency={(e) => handleChangeCurrency(e)}
          />

          <CurrencyExchange
            label={t('to')}
            currencyOptions={Object.keys(rates)}
            field={'to'}
            amount={amount.to}
            currency={currency.to}
            onChangeAmount={(e) => handleChangeAmount(e, 'to', 'from')}
            onChangeCurrency={(e) => handleChangeCurrency(e)}
          />
        </Stack>
      )}

      <Snackbar open={isError} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert
          severity="error"
          sx={{
            width: '100%',
            borderRadius: '24px',
            paddingRight: '21px',
          }}
        >
          {t('error_message')}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Main;
