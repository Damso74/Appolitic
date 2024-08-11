import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Container, Typography, Box, Button, Grid, Divider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faRedo } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AssemblyChart from './AssemblyChart';
import PartyCard from './PartyCard';
import Papa from 'papaparse';
import './Results.css';

const Results = () => {
  const [categoryScores, setCategoryScores] = useState({});
  const [scores, setScores] = useState({
    LFI: 0,
    PS: 0,
    EELV: 0,
    LREM: 0,
    LR: 0,
    RN: 0,
  });
  const [explanations, setExplanations] = useState({});

  const totalSeats = 577;

  const coefficients = useMemo(() => ({
    LFI: 0.17522340984,
    PS: 0.15396458814,
    EELV: 0.16972165648,
    LREM: 0.14688601645,
    LR: 0.18439977872,
    RN: 0.21843599825,
  }), []);

  const partyColors = {
    LFI: '#FF0000',
    PS: '#FF3366',
    EELV: '#00FF00',
    LREM: '#FFD700',
    LR: '#0000FF',
    RN: '#003366',
  };

  const partyLogos = {
    LFI: '/LFI.png',
    PS: '/PS.png',
    EELV: '/EELV.png',
    LREM: '/LREM.png',
    LR: '/LR.png',
    RN: '/RN.png',
  };

  const normalizeText = (text) => {
    return text ? text.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : text;
  };

  const calculateScores = useCallback((answers) => {
    const categories = {};
    const parties = ['LFI', 'PS', 'EELV', 'LREM', 'LR', 'RN'];

    parties.forEach((party) => {
      fetch(`/${party}.csv`)
        .then((response) => response.text())
        .then((csvText) => {
          Papa.parse(csvText, {
            delimiter: ";",
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
              let partyScore = 0;
              results.data.forEach((row) => {
                const category = normalizeText(row['Catégorie']); 
                const questionNumero = row['Numéro de Question'];
                const answerLetter = answers[questionNumero];

                if (answerLetter) {
                  const score = parseInt(row[`Score ${answerLetter}`], 10) || 0;
                  partyScore += score * coefficients[party];

                  if (!categories[category]) {
                    categories[category] = {
                      LFI: 0,
                      PS: 0,
                      EELV: 0,
                      LREM: 0,
                      LR: 0,
                      RN: 0,
                    };
                  }

                  categories[category][party] += score * coefficients[party];
                }
              });

              setScores((prevScores) => ({
                ...prevScores,
                [party]: partyScore,
              }));

              setCategoryScores((prevCategoryScores) => ({
                ...prevCategoryScores,
                ...categories
              }));

              console.log('Category Scores:', categories); 
              console.log('Categories:', Object.keys(categories)); 
            },
          });
        })
        .catch((error) => console.error(`Error fetching ${party}.csv:`, error));
    });
  }, [coefficients]);

  useEffect(() => {
    const savedLetterAnswers = JSON.parse(localStorage.getItem('letterAnswers'));
    if (savedLetterAnswers) {
      const upperCaseLetterAnswers = Object.fromEntries(
        Object.entries(savedLetterAnswers).map(([questionNumero, answerLetter]) => [questionNumero, answerLetter.toUpperCase()])
      );
      calculateScores(upperCaseLetterAnswers);
    }

    fetch('/explanations.csv')
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          delimiter: ";",
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            const parsedExplanations = {};
            results.data.forEach((row) => {
              const key = `${normalizeText(row['Catégorie'])}-${row['Party']}`;
              parsedExplanations[key] = row['Explanation'];
            });
            setExplanations(parsedExplanations);
          }
        });
      })
      .catch((error) => console.error("Error fetching explanations:", error));

  }, [calculateScores]);

  const normalizedSeats = Object.keys(scores).reduce((acc, party) => {
    const seatCount = Math.round((scores[party] / Object.values(scores).reduce((a, b) => a + b, 0)) * totalSeats);
    acc[party] = Math.max(0, seatCount);
    return acc;
  }, {});

  const handleReset = () => {
    if (window.confirm("Êtes-vous sûr de vouloir réinitialiser vos réponses ? Cette action est irréversible.")) {
      localStorage.removeItem('answers');
      localStorage.removeItem('letterAnswers');
      setCategoryScores({});
      setScores({
        LFI: 0,
        PS: 0,
        EELV: 0,
        LREM: 0,
        LR: 0,
        RN: 0,
      });
    }
  };

  const getTopParty = (data) => {
    let topParty = { party: '', score: -Infinity };

    for (const [party, score] of Object.entries(data)) {
      if (score > topParty.score) {
        topParty = { party, score };
      }
    }

    if (topParty.score === -Infinity) {
      return null;
    }

    return topParty.party ? { ...topParty, logo: partyLogos[topParty.party] } : null;
  };

  const allCategories = Object.keys(categoryScores).map(category => normalizeText(category));
  const missingCategories = ['ecologie', 'sante', 'securite', 'economie', 'societe', 'immigration'].filter(cat => !allCategories.includes(cat));
  const categoriesToShow = [...allCategories, ...missingCategories];

  return (
    <Container className="results-container">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <img src="/logo.png" alt="Appolitic Logo" className="logo" />
        <Box>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="contained" className="custom-button" startIcon={<FontAwesomeIcon icon={faHome} />}>
              Retour à l'accueil
            </Button>
          </Link>
          <Button
            variant="contained"
            className="custom-button secondary-button"
            startIcon={<FontAwesomeIcon icon={faRedo} />}
            onClick={handleReset}
            style={{ marginLeft: '10px' }}
          >
            Réinitialiser
          </Button>
        </Box>
      </Box>

      <Box mt={0} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Votre Assemblée Nationale
        </Typography>
        <Typography variant="body1" gutterBottom className="chart-description">
          Voici une représentation de votre Assemblée Nationale basée sur les réponses que vous avez fournies. Les sièges ont été répartis proportionnellement selon les résultats obtenus pour chaque parti.
        </Typography>
      </Box>

      <Box className="assembly-chart-container" display="flex" justifyContent="center">
        <AssemblyChart scores={normalizedSeats} partyColors={partyColors} />
      </Box>
      <Box mt={2}>
        <Grid container spacing={2}>
          {Object.entries(normalizedSeats).map(([party, seats]) => (
            <Grid item xs={12} md={4} key={party}>
              <PartyCard 
                party={party}
                logo={partyLogos[party]}
                seats={seats}
                color={partyColors[party]}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider style={{ margin: '30px 0' }} />

      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          Détails par Catégorie
        </Typography>
      </Box>

      {categoriesToShow.map((category) => {
        const data = categoryScores[category] || {
          LFI: 0,
          PS: 0,
          EELV: 0,
          LREM: 0,
          LR: 0,
          RN: 0,
        };
        const topParty = getTopParty(data);

        // Ne pas afficher de parti si aucune réponse n'a été donnée pour cette catégorie
        if (Object.values(data).every(score => score === 0)) {
          return (
            <Box key={category} mt={2} className="category-summary">
              <Typography variant="h6" component="h3">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Typography>
              <Typography variant="body1">
                Vous n'avez pas encore répondu aux questions de la catégorie {category.charAt(0).toUpperCase() + category.slice(1)}. Répondez aux questions et revenez ici pour voir les résultats.
              </Typography>
            </Box>
          );
        }

        const explanationKey = `${category}-${topParty?.party}`;
        const explanationText = explanations[explanationKey];

        return (
          <Box key={category} mt={2} className="category-summary">
            <Grid container spacing={2}>
              <Grid item xs={12} md={2}>
                <Typography variant="h6" component="h3">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Typography>
                <Typography variant="body1">
                  Parti en tête : {topParty?.party}
                </Typography>
                {topParty && (
                  <Box display="flex" justifyContent="center" mt={2}>
                    <img 
                      src={topParty.logo} 
                      alt={`${topParty.party} logo`} 
                      style={{ height: '80px', verticalAlign: 'middle' }} 
                    />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} md={10}>
                <Box mt={2}>
                  <Typography variant="body2" style={{ textAlign: 'justify' }}>
                    {explanationText ? explanationText : "Aucune explication disponible pour cette catégorie et ce parti."}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </Container>
  );
};

export default Results;
