import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';

const ThemeSwitch = ({ darkMode, onToggle }) => (
  <FormControlLabel
    control={<Switch checked={darkMode} onChange={onToggle} />}
    label="Mode Sombre"
  />
);

export default ThemeSwitch;
