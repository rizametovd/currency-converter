import { Box, MenuItem, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

interface ICurrencyExchangeProps {
  label: string;
  field: string;
  currencyOptions: string[];
  currency: string;
  amount: number;
  onChangeCurrency: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CurrencyExchange: React.FC<ICurrencyExchangeProps> = ({ currencyOptions, currency, onChangeCurrency, label, onChangeAmount, amount, field }) => {
  return (
    <Box>
      <Typography gutterBottom sx={{ fontWeight: '700' }} variant={'h6'}>
        {label}
      </Typography>

      <Stack direction={'row'} gap={'20px'}>
        <TextField
          size={'small'}
          value={amount || ''}
          onChange={onChangeAmount}
          type={'number'}
          InputProps={{
            style: {
              fontSize: '18px',
            },
          }}
        />

        <TextField
          size={'small'}
          value={currency}
          onChange={onChangeCurrency}
          name={field}
          sx={{
            flexShrink: '0',
          }}
          select
        >
          {currencyOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
    </Box>
  );
};

export default CurrencyExchange;
