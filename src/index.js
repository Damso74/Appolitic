import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './AppRoutes'; // Import du nouveau fichier de routage
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AppRoutes />  {/* Utilisation de AppRoutes */}
  </React.StrictMode>
);
