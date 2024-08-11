import React from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';

const ProgressBar = ({ progress, label }) => {
  return (
    <Box display="flex" alignItems="center" mb={4}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          flexGrow: 1,
          height: 10,
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#b8908f', // Couleur spécifique de la barre de progression
          },
          backgroundColor: '#E0E0E0', // Couleur d'arrière-plan de la barre
        }}
      />
      {label && (
        <Box ml={2}>
          <Typography variant="body2" color="textSecondary">
            {`${Math.round(progress)}%`}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProgressBar;
