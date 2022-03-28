import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import i18n from '../../i18n/i18n';

const LanguageSwitcher: React.FC = () => {
  const [language, setLanguage] = React.useState('ru');

  const handleLanguage = (event: React.MouseEvent<HTMLElement>, newLanguage: string | null) => {
    if (newLanguage !== null) {
      setLanguage(newLanguage);
      i18n.changeLanguage(newLanguage);
    }
  };

  return (
    <ToggleButtonGroup value={language} exclusive onChange={handleLanguage}>
      <ToggleButton disabled={language === 'ru'} value="ru">
        RU
      </ToggleButton>
      <ToggleButton disabled={language === 'en'} value="en">
        EN
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LanguageSwitcher;
