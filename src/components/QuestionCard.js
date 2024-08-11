import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

const QuestionCard = ({ question, answerLetter, onAnswerChange, darkMode }) => {
  if (!question || !question.numero) {
    console.log("QuestionCard: Invalid question data");
    return null; // Ne pas rendre le composant si la question est invalide
  }

  console.log(`Rendering QuestionCard for question ${question.numero}`);
  console.log(`Current answerLetter: ${answerLetter}`);

  const buttonColors = darkMode
    ? ['#9c92a1', '#aba0af', '#b8908f', '#c7a0a2', '#d6b2b4', '#e5c5c6']
    : ['#7f7786', '#8d8494', '#9c92a1', '#aba0af', '#b8908f', '#c7a0a2'];

  const selectedButtonColor = darkMode ? '#66bb6a' : '#388e3c';
  const buttonTextColor = '#FFFFFF';
  const selectedButtonTextColor = '#FFFFFF';

  const getAnswerLetter = (optKey) => {
    const optionLetters = {
      a: 'A',
      b: 'B',
      c: 'C',
      d: 'D',
      e: 'E',
      f: 'F',
    };
    return optionLetters[optKey] || optKey.toUpperCase();
  };

  const handleButtonClick = (questionNumero, optKey) => {
    const answerLetter = getAnswerLetter(optKey);
    console.log(`Question ${questionNumero} - Option Selected: ${optKey}, Answer Letter: ${answerLetter}`);
    onAnswerChange(questionNumero, optKey, answerLetter);
  };

  return (
    <Card variant="outlined" style={{ backgroundColor: darkMode ? '#424242' : '#F5F5F5', borderRadius: '8px', marginBottom: '24px' }}>
      <CardContent>
        <Typography variant="h5" style={{ color: '#7f7786', marginBottom: '16px', fontSize: '1.5rem', fontWeight: 'bold' }}>
          {question.numero}. {question.question}
        </Typography>
        <Box display="flex" alignItems="center" style={{ marginBottom: '24px', padding: '12px', backgroundColor: darkMode ? '#333333' : '#EDE7F6', borderRadius: '8px' }}>
          <FontAwesomeIcon icon={faLightbulb} style={{ color: '#b8908f', marginRight: '8px' }} />
          <Typography variant="body1" style={{ fontSize: '1rem', color: darkMode ? '#CCCCCC' : '#333333' }}>
            {question.contexte}
          </Typography>
        </Box>
        <Box>
          {Object.keys(question.options).map((optKey, index) => {
            const isSelected = answerLetter === getAnswerLetter(optKey);
            console.log(`Option ${optKey}: isSelected=${isSelected}`);
            return (
              <Button
                key={optKey}
                variant="contained"
                onClick={() => handleButtonClick(question.numero, optKey)}
                style={{
                  width: '100%',
                  marginBottom: '12px',
                  padding: '12px',
                  backgroundColor: isSelected ? selectedButtonColor : buttonColors[index % buttonColors.length],
                  color: isSelected ? selectedButtonTextColor : buttonTextColor,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontSize: '1rem',
                  textAlign: 'left',
                  justifyContent: 'flex-start',
                  boxShadow: isSelected ? `0 4px 6px rgba(56, 142, 60, 0.4)` : 'none',
                  transition: 'background 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                {question.options[optKey]}
              </Button>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
