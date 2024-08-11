import React, { useState } from 'react';
import { Box, Typography, Button, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share';

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleIconClick = () => {
    navigate('/results');
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const shareUrl = window.location.href;
  const title = "Découvrez vos affinités politiques avec Appolitic ! 🗳️ Venez comparer vos résultats avec les miens et participez au débat ! #Appolitic #Politique";

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={4} py={2} borderBottom="1px solid #ccc">
      <Box display="flex" alignItems="center">
        <img src="/logo.png" alt="Appolitic Logo" style={{ height: '60px', marginRight: '16px' }} />
        <Typography 
          variant="h4" 
          style={{ 
            color: '#7f7786', 
            lineHeight: '60px',
            marginTop: '10px',
          }}
        >
          Appolitic
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          startIcon={<FontAwesomeIcon icon={faChartPie} />}
          onClick={handleIconClick}
          style={{ marginRight: '8px' }}
        >
          Voir les résultats
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<FontAwesomeIcon icon={faShareAlt} />}
          onClick={handleOpen}
        >
          Partager
        </Button>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center"
          position="absolute" 
          top="50%" 
          left="50%" 
          style={{ transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}
        >
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Partager sur :
          </Typography>
          <Box display="flex" justifyContent="center">
            <FacebookShareButton url={shareUrl} quote={title}>
              <FacebookIcon size={48} round />
            </FacebookShareButton>
            <Button
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', margin: '0 8px' }}
              onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`, '_blank')}
            >
              <img 
                src="/icone-twitter-x.png" 
                alt="Share on X" 
                style={{ height: '48px', width: '48px' }} 
              />
            </Button>
            <LinkedinShareButton url={shareUrl} title={title}>
              <LinkedinIcon size={48} round />
            </LinkedinShareButton>
            <WhatsappShareButton url={shareUrl} title={title}>
              <WhatsappIcon size={48} round />
            </WhatsappShareButton>
          </Box>
          <Button onClick={handleClose} variant="outlined" color="secondary" style={{ marginTop: '16px' }}>
            Fermer
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Header;
