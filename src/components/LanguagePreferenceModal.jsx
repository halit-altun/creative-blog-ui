import React from 'react';
import { Box, Typography, Button, IconButton, Dialog } from '@mui/material';
import { Close } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { setLanguageCookie } from '../utils/languageCookie';

const LanguagePreferenceModal = ({ open, onClose }) => {
  const { i18n } = useTranslation();

  const handleSelect = (lang) => {
    setLanguageCookie(lang);
    i18n.changeLanguage(lang);
    onClose();
  };

  const handleDismiss = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleDismiss}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          background: 'rgba(12, 12, 18, 0.96)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '18px',
          overflow: 'hidden',
          backdropFilter: 'blur(14px)',
          boxShadow: '0 0 40px rgba(76, 0, 255, 0.35)',
        },
      }}
      sx={{
        zIndex: 100000,
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.72)',
          backdropFilter: 'blur(4px)',
        },
      }}
    >
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        sx={{ p: { xs: 3, sm: 4 }, position: 'relative' }}
      >
        <IconButton
          onClick={handleDismiss}
          aria-label="close"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'rgba(255,255,255,0.7)',
            '&:hover': { color: '#fff', background: 'rgba(255,255,255,0.08)' },
          }}
        >
          <Close />
        </IconButton>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            mb: 1,
            pr: 4,
            background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Choose your language
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'rgba(255,255,255,0.75)', mb: 3, lineHeight: 1.6 }}
        >
          Tercih dilinizi seçin / Select your preferred language / Wählen Sie Ihre Sprache
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleSelect('en')}
            sx={{
              py: 1.4,
              fontWeight: 700,
              textTransform: 'none',
              background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
              boxShadow: '0 0 18px rgba(76, 0, 255, 0.35)',
              '&:hover': {
                boxShadow: '0 0 24px rgba(255, 0, 128, 0.45)',
              },
            }}
          >
            English
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => handleSelect('tr')}
            sx={{
              py: 1.4,
              fontWeight: 700,
              textTransform: 'none',
              color: '#fff',
              borderColor: 'rgba(255,255,255,0.28)',
              '&:hover': {
                borderColor: '#FF0080',
                background: 'rgba(255, 0, 128, 0.12)',
              },
            }}
          >
            Türkçe
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => handleSelect('de')}
            sx={{
              py: 1.4,
              fontWeight: 700,
              textTransform: 'none',
              color: '#fff',
              borderColor: 'rgba(255,255,255,0.28)',
              '&:hover': {
                borderColor: '#FF0080',
                background: 'rgba(255, 0, 128, 0.12)',
              },
            }}
          >
            Deutsch
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default LanguagePreferenceModal;
