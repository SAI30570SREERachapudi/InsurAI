// src/pages/HomePage.jsx
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import { useTranslation } from 'react-i18next';
import '../locales/en/translation.json';
const HomePage = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `linear-gradient(to bottom, rgba(190, 244, 190, 0.7), rgba(176, 244, 193, 0.7)), url(${require('./image.png')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <NavBar />
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 64px)',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Container maxWidth="sm">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography
              component="h1"
              variant="h2"
              color="#388E3C"
              fontWeight="bold"
              gutterBottom
              sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}
            >
              {t('welcome')}
            </Typography>

            <Typography
              variant="h6"
              color="#2E7D32"
              fontWeight={500}
              paragraph
              sx={{ mt: 2 }}
            >
              {t('tagline')}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#FF9800',
                  width: 200,
                  height: 50,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  borderRadius: 8,
                  color: '#fff',
                  textTransform: 'none',
                  boxShadow: '0px 4px 10px rgba(0,0,0,0.25)',
                  '&:hover': {
                    backgroundColor: '#FB8C00',
                  },
                }}
              >
                {t('getStarted')}
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
