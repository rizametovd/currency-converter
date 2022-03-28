import { Stack } from '@mui/material';
import React from 'react';
import LanguageSwitcher from '../LanguageSwitcher';
import Main from '../Main';

const App: React.FC = () => {
  return (
    <Stack
      gap={'40px'}
      alignItems={'flex-end'}
      sx={{
        padding: '100px 0 0',
        margin: '0 auto',
        maxWidth: '420px',
        height: '412px',
      }}
    >
      <LanguageSwitcher />
      <Main />
    </Stack>
  );
};

export default App;
