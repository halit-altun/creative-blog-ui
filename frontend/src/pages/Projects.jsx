import React, { useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import ParticleBackground from '../components/ParticleBackground';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';
import { useTranslation } from 'react-i18next';

const ProjectSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: '#0a0a0a',
  position: 'relative',
  overflow: 'hidden',
  paddingTop: '100px',
  paddingBottom: '50px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 20%, rgba(76, 0, 255, 0.15) 0%, transparent 25%),
      radial-gradient(circle at 80% 80%, rgba(255, 0, 128, 0.15) 0%, transparent 25%),
      radial-gradient(circle at 50% 50%, rgba(76, 0, 255, 0.1) 0%, transparent 50%)
    `,
    opacity: 0.9,
    zIndex: 1,
    animation: 'backgroundShift 20s linear infinite',
  },
  '@keyframes backgroundShift': {
    '0%': {
      backgroundPosition: '0% 0%',
    },
    '50%': {
      backgroundPosition: '100% 100%',
    },
    '100%': {
      backgroundPosition: '0% 0%',
    },
  },
}));

const Projects = () => {
  const { t } = useTranslation('projects');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <ProjectSection>
      <ParticleBackground />
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 6,
              fontWeight: 800,
              background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 0 20px rgba(76, 0, 255, 0.3)',
            }}
          >
            {t('title')}
          </Typography>

          <Grid container spacing={4}>
            {projects.map((project) => (
              <Grid item xs={12} md={6} key={project.github} sx={{ display: 'flex', minWidth: 0 }}>
                <motion.div variants={itemVariants} style={{ width: '100%', minWidth: 0 }}>
                  <ProjectCard project={project} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </ProjectSection>
  );
};

export default Projects;
