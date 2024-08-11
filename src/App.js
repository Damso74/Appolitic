import React, { useEffect, useState, useCallback } from 'react';
import { ThemeProvider, CssBaseline, Container, Typography, Box, Button, CircularProgress } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from './components/ProgressBar';
import ThemeSwitch from './components/ThemeSwitch';
import CategoryTabs from './components/CategoryTabs';
import SubCategoryTabs from './components/SubCategoryTabs';
import QuestionCard from './components/QuestionCard';
import Header from './components/Header';
import './App.css';

const App = () => {
  const [data, setData] = useState({});
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentSubCategory, setCurrentSubCategory] = useState('');
  const [progress, setProgress] = useState({});
  const [globalProgress, setGlobalProgress] = useState(0);
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem('answers');
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });
  const [letterAnswers, setLetterAnswers] = useState(() => {
    const savedLetterAnswers = localStorage.getItem('letterAnswers');
    return savedLetterAnswers ? JSON.parse(savedLetterAnswers) : {};
  });
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch('/questions.csv')
      .then(response => response.text())
      .then(data => {
        Papa.parse(data, {
          delimiter: ";",
          header: true,
          skipEmptyLines: true,
          complete: function(results) {
            const organizedData = organizeData(results.data);
            setData(organizedData);
            if (Object.keys(organizedData).length > 0) {
              setCurrentCategory(Object.keys(organizedData)[0]);
              setCurrentSubCategory(Object.keys(organizedData[Object.keys(organizedData)[0]])[0]);
            }
            setLoading(false);
          }
        });
      })
      .catch(error => {
        console.error("Error fetching CSV data:", error);
        setLoading(false);
      });
  }, []);  

  const organizeData = (data) => {
    const organizedData = {};
    
    data.forEach(row => {
      const category = row['Catégorie']?.trim(); // Vérifie que la catégorie est bien récupérée et nettoyée
      const subCategory = row['Sous-thèmes']?.trim(); // Vérifie que la sous-catégorie est bien récupérée et nettoyée
  
      if (!category) {
        console.error('Catégorie manquante pour la ligne:', row);
        return; // Si la catégorie est manquante, ignorer cette ligne
      }
  
      if (!organizedData[category]) {
        organizedData[category] = {};
      }
  
      if (!organizedData[category][subCategory]) {
        organizedData[category][subCategory] = [];
      }
  
      organizedData[category][subCategory].push({
        numero: row['Numéro de Question'],
        question: row['Question'],
        contexte: row['Contexte en France'],
        options: {
          a: row['Option A'],
          b: row['Option B'],
          c: row['Option C'],
          d: row['Option D'],
          e: row['Option E'],
          f: row['Option F']
        }
      });
    });
  
    console.log('Données organisées:', organizedData); // Ajoute un log pour vérifier que les données sont bien organisées
    return organizedData;
  };
  

  const handleCategoryChange = (event, newCategory) => {
    setCurrentCategory(newCategory);
    setCurrentSubCategory(Object.keys(data[newCategory])[0]);
    setCurrentQuestionIndex(0);
  };

  const handleSubCategoryChange = (event, newSubCategory) => {
    setCurrentSubCategory(newSubCategory);
    setCurrentQuestionIndex(0);
  };

  const handleAnswerChange = (questionNumero, optKey, answerLetter) => {
    const letterUpperCase = answerLetter.toUpperCase();

    const updatedAnswers = {
        ...answers,
        [questionNumero]: optKey
    };

    const updatedLetterAnswers = {
        ...letterAnswers,
        [questionNumero]: letterUpperCase
    };

    setAnswers(updatedAnswers);
    setLetterAnswers(updatedLetterAnswers);
    localStorage.setItem('answers', JSON.stringify(updatedAnswers));
    localStorage.setItem('letterAnswers', JSON.stringify(updatedLetterAnswers));

    console.log(`Question ${questionNumero} - OptKey: ${optKey}, Letter: ${letterUpperCase}`);

    const totalQuestions = data[currentCategory][currentSubCategory].length;
    if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
        const subCategories = Object.keys(data[currentCategory]);
        const currentSubCategoryIndex = subCategories.indexOf(currentSubCategory);
        if (currentSubCategoryIndex < subCategories.length - 1) {
            setCurrentSubCategory(subCategories[currentSubCategoryIndex + 1]);
            setCurrentQuestionIndex(0);
        } else {
            const categories = Object.keys(data);
            const currentCategoryIndex = categories.indexOf(currentCategory);
            if (currentCategoryIndex < categories.length - 1) {
                const nextCategory = categories[currentCategoryIndex + 1];
                setCurrentCategory(nextCategory);
                setCurrentSubCategory(Object.keys(data[nextCategory])[0]);
                setCurrentQuestionIndex(0);
            }
        }
    }
};

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      const subCategories = Object.keys(data[currentCategory]);
      const currentSubCategoryIndex = subCategories.indexOf(currentSubCategory);
      if (currentSubCategoryIndex > 0) {
        const previousSubCategory = subCategories[currentSubCategoryIndex - 1];
        setCurrentSubCategory(previousSubCategory);
        setCurrentQuestionIndex(data[currentCategory][previousSubCategory].length - 1);
      } else {
        const categories = Object.keys(data);
        const currentCategoryIndex = categories.indexOf(currentCategory);
        if (currentCategoryIndex > 0) {
          const previousCategory = categories[currentCategoryIndex - 1];
          setCurrentCategory(previousCategory);
          const subCategoriesInPreviousCategory = Object.keys(data[previousCategory]);
          const lastSubCategoryInPreviousCategory = subCategoriesInPreviousCategory[subCategoriesInPreviousCategory.length - 1];
          setCurrentSubCategory(lastSubCategoryInPreviousCategory);
          setCurrentQuestionIndex(data[previousCategory][lastSubCategoryInPreviousCategory].length - 1);
        }
      }
    }
  };

  const handleNextQuestion = () => {
    const totalQuestions = data[currentCategory][currentSubCategory].length;
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const subCategories = Object.keys(data[currentCategory]);
      const currentSubCategoryIndex = subCategories.indexOf(currentSubCategory);
      if (currentSubCategoryIndex < subCategories.length - 1) {
        setCurrentSubCategory(subCategories[currentSubCategoryIndex + 1]);
        setCurrentQuestionIndex(0);
      } else {
        const categories = Object.keys(data);
        const currentCategoryIndex = categories.indexOf(currentCategory);
        if (currentCategoryIndex < categories.length - 1) {
          const nextCategory = categories[currentCategoryIndex + 1];
          setCurrentCategory(nextCategory);
          setCurrentSubCategory(Object.keys(data[nextCategory])[0]);
          setCurrentQuestionIndex(0);
        }
      }
    }
  };

  const calculateProgress = useCallback(() => {
    const newProgress = {};
    let totalQuestions = 0;
    let answeredQuestions = 0;

    Object.entries(data).forEach(([category, subCategories]) => {
      Object.entries(subCategories).forEach(([subCategory, questions]) => {
        const subCategoryTotalQuestions = questions.length;
        const subCategoryAnsweredQuestions = questions.filter(q => answers[q.numero]).length;
        const progressPercent = (subCategoryAnsweredQuestions / subCategoryTotalQuestions) * 100;

        newProgress[`${category}-${subCategory}`] = progressPercent;

        totalQuestions += subCategoryTotalQuestions;
        answeredQuestions += subCategoryAnsweredQuestions;
      });
    });

    setProgress(newProgress);
    setGlobalProgress((answeredQuestions / totalQuestions) * 100);
  }, [data, answers]);

  useEffect(() => {
    calculateProgress();
  }, [answers, calculateProgress]);

  const downloadResponses = () => {
    const rows = Object.entries(data).flatMap(([category, subCategories]) =>
      Object.entries(subCategories).flatMap(([subCategory, questions]) =>
        questions.map(question => ({
          question: `${question.numero}. ${question.question}`,
          answer: answers[question.numero] || 'Non répondu',
          answerLetter: letterAnswers[question.numero] || 'Non répondu'
        }))
      )
    );

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Réponses');
    XLSX.writeFile(workbook, 'réponses.xlsx');
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#7f7786',
      },
      secondary: {
        main: '#b8908f',
      },
      background: {
        default: darkMode ? '#303030' : '#E0E0E0',
        paper: darkMode ? '#424242' : '#F5F5F5',
      },
    },
    typography: {
      fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
      h4: {
        fontWeight: 700,
        color: '#7f7786',
        marginBottom: '20px',
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
        color: '#7f7786',
      },
      button: {
        fontWeight: 600,
        color: '#FFFFFF',
      },
    },
  });

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress />
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  if (!currentCategory || !currentSubCategory) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Typography variant="h4" component="h1" gutterBottom>
            Explore Political Opinions
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Chargement des données...
          </Typography>
        </Container>
      </ThemeProvider>
    );
  }

  const currentQuestions = data[currentCategory]?.[currentSubCategory] || [];
  const currentProgress = progress[`${currentCategory}-${currentSubCategory}`] || 0;
  const currentQuestion = currentQuestions[currentQuestionIndex];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Header />
        <Typography variant="h4" component="h1" gutterBottom>
          Explore Political Opinions
        </Typography>
        <ProgressBar progress={globalProgress} />
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <CategoryTabs data={data} currentCategory={currentCategory} progress={progress} onChange={handleCategoryChange} />
          <ThemeSwitch darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
        </Box>
        <SubCategoryTabs data={data} currentCategory={currentCategory} currentSubCategory={currentSubCategory} progress={progress} onChange={handleSubCategoryChange} />
        <ProgressBar progress={currentProgress} />
        <Box className="card-container">
          <TransitionGroup>
            {currentQuestion && (
              <CSSTransition
                key={currentQuestion.numero}
                timeout={300}
                classNames="fade"
              >
                <QuestionCard
                  question={currentQuestion}
                  answer={answers[currentQuestion.numero] || ''}
                  answerLetter={letterAnswers[currentQuestion.numero] || ''}
                  onAnswerChange={(option, answerLetter) => handleAnswerChange(currentQuestion.numero, option, answerLetter)}
                />
              </CSSTransition>
            )}
          </TransitionGroup>
        </Box>
        <Box className="button-container" display="flex" justifyContent="space-between" mt={4}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0 && currentSubCategory === Object.keys(data[currentCategory])[0] && currentCategory === Object.keys(data)[0]}
          >
            Précédent
          </Button>
          <Button
            variant="contained"
            color="primary"
            endIcon={<FontAwesomeIcon icon={faArrowRight} />}
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === currentQuestions.length - 1 && currentSubCategory === Object.keys(data[currentCategory])[Object.keys(data[currentCategory]).length - 1] && currentCategory === Object.keys(data)[Object.keys(data).length - 1]}
          >
            Suivant
          </Button>
        </Box>
        <Box display="flex" justifyContent="center" mt={4}>
          <Button variant="contained" color="primary" onClick={downloadResponses}>
            Télécharger les réponses
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;

