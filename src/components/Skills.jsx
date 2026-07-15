import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Code,
  Build,
  Storage,
  Security,
  Hub,
  Cloud,
  Architecture,
  Groups,
} from '@mui/icons-material';
import { StyledPaper } from './StyledComponents';
import { gradientText } from '../animations';
import { useTranslation } from 'react-i18next';

const skillMeta = [
  { id: 'frontend', icon: <Code sx={{ fontSize: 40, color: '#4C00FF' }} /> },
  { id: 'backend', icon: <Storage sx={{ fontSize: 40, color: '#FF0080' }} /> },
  { id: 'api', icon: <Hub sx={{ fontSize: 40, color: '#4C00FF' }} /> },
  { id: 'architecture', icon: <Architecture sx={{ fontSize: 40, color: '#FF0080' }} /> },
  { id: 'security', icon: <Security sx={{ fontSize: 40, color: '#4C00FF' }} /> },
  { id: 'cloud', icon: <Cloud sx={{ fontSize: 40, color: '#FF0080' }} /> },
  { id: 'automation', icon: <Build sx={{ fontSize: 40, color: '#4C00FF' }} /> },
  { id: 'agile', icon: <Groups sx={{ fontSize: 40, color: '#FF0080' }} /> },
];

const Skills = () => {
  const { t } = useTranslation('about');

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            textAlign: 'center',
            mb: 4,
            background: 'linear-gradient(90deg, #4C00FF, #FF0080, #4C00FF)',
            backgroundSize: '200% auto',
            animation: `${gradientText} 3s linear infinite`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {t('skills.title')}
        </Typography>
      </Grid>
      {skillMeta.map((skill, index) => (
        <Grid item xs={12} sm={6} md={3} key={skill.id} sx={{ display: 'flex', minWidth: 0 }}>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{ width: '100%', minWidth: 0 }}
          >
            <StyledPaper
              sx={{
                height: '100%',
                overflow: 'hidden',
                boxSizing: 'border-box',
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 2 }}>{skill.icon}</Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  textAlign: 'center',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {t(`skills.items.${skill.id}.title`)}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  textAlign: 'center',
                  lineHeight: 1.6,
                  wordBreak: 'break-word',
                }}
              >
                {t(`skills.items.${skill.id}.description`)}
              </Typography>
            </StyledPaper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default Skills;
