// src/utils/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6A0DAD', // Mauve Principal
    },
    secondary: {
      main: '#B19CD9', // Mauve Clair
    },
    background: {
      default: '#E0E0E0', // Gris Clair Principal
      paper: '#F5F5F5', // Fond des cartes
    },
  },
  typography: {
    fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 700,
      color: '#6A0DAD', // Mauve pour les titres
      marginBottom: '20px',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#A9A9A9', // Texte en gris moyen
    },
    button: {
      fontWeight: 600,
      color: '#FFFFFF',
    },
  },
});

export default theme;
