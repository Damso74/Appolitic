// CategorySummary.js
import React from 'react';
import { Card, Typography, Box, LinearProgress } from '@mui/material';

const CategorySummary = ({ category, data, totalQuestions }) => {
  const topParty = Object.keys(data).reduce((a, b) => data[a] > data[b] ? a : b);
  const answeredQuestions = totalQuestions ? Object.values(data).reduce((acc, score) => acc + (score > 0 ? 1 : 0), 0) : 0;

  return (
    <Card variant="outlined" sx={{ marginBottom: 2, padding: 2 }}>
      <Typography variant="h6" gutterBottom>{category}</Typography>
      <Typography variant="body1">Leading Party: {topParty}</Typography>
      <Typography variant="body2">Total Points: {data[topParty].toFixed(2)}</Typography>
      <Box sx={{ marginTop: 1 }}>
        <LinearProgress variant="determinate" value={(answeredQuestions / totalQuestions) * 100} />
        <Typography variant="caption" color="textSecondary">
          {answeredQuestions}/{totalQuestions} questions answered
        </Typography>
      </Box>
    </Card>
  );
};

export default CategorySummary;
