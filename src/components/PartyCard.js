import React from 'react';
import { Box, Typography } from '@mui/material';

const PartyCard = ({ party, logo, seats, color }) => {
  return (
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      p={2} 
      style={{ 
        backgroundColor: color, 
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '250px',
        margin: '0 auto',
      }}
    >
      <img 
        src={logo} 
        alt={`${party} logo`} 
        style={{ 
          maxWidth: '50px', 
          maxHeight: '50px', 
          width: 'auto', 
          height: 'auto', 
          marginRight: '10px',
        }} 
      />
      <Typography variant="h6" style={{ color: '#FFFFFF' }}>
        {party}: {seats} sièges
      </Typography>
    </Box>
  );
};

export default PartyCard;
