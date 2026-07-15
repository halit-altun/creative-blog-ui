import React, { useEffect, useMemo } from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { ArrowForward } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import ParticleBackground from '../components/ParticleBackground';
import { useNavigate } from 'react-router-dom';
import TechStack from '../components/TechStack';
import TypewriterText from '../components/TypewriterText';
import { gradientText } from '../animations';

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  position: 'relative',
  backgroundColor: '#0a0a0a',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  '@media (max-width: 600px)': {
    minHeight: '100vh',
    padding: '20px 0',
    alignItems: 'flex-start',
  },
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
      radial-gradient(circle at 50% 50%, rgba(76, 0, 255, 0.1) 0%, transparent 50%),
      linear-gradient(135deg, rgba(76, 0, 255, 0.05) 0%, rgba(255, 0, 128, 0.05) 100%)
    `,
    opacity: 0.9,
    zIndex: 0,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle at center, transparent 30%, #0a0a0a 70%)',
    opacity: 0.8,
    zIndex: 0,
    animation: 'pulse 15s ease-in-out infinite',
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'translate(-50%, -50%) scale(1)',
    },
    '50%': {
      transform: 'translate(-50%, -50%) scale(1.2)',
    },
    '100%': {
      transform: 'translate(-50%, -50%) scale(1)',
    },
  },
}));

const GradientButton = styled(Button)({
  background: 'linear-gradient(45deg, #4C00FF 30%, #FF0080 90%)',
  border: 0,
  color: 'white',
  padding: '12px 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'none',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'all 0.5s ease',
  },
  '&:hover': {
    transform: 'scale(1.02)',
    '&::before': {
      left: '100%',
    },
  },
});

const heroLineSx = {
  display: 'block',
  fontWeight: 900,
  background: 'linear-gradient(90deg, #4C00FF, #FF0080, #4C00FF)',
  backgroundSize: '200% auto',
  animation: `${gradientText} 3s linear infinite`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  fontSize: { xs: '2.5rem', md: '3.5rem' },
  textShadow: '2px 2px 4px rgba(76, 0, 255, 0.3)',
  letterSpacing: '-0.5px',
  lineHeight: 1.2,
  minHeight: { xs: '3rem', md: '4.2rem' },
};

const Home = () => {
  const { t, i18n } = useTranslation('home');
  const navigate = useNavigate();

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

  const handleExplore = () => {
    navigate('/about');
  };

  const typeSpeed = 42;
  const gap = 280;

  const { line1, line2, line3, subtitle, delays } = useMemo(() => {
    const l1 = t('hero.line1');
    const l2 = t('hero.line2');
    const l3 = t('hero.line3');
    const sub = `${t('hero.subtitleBefore')} 💻 ${t('hero.subtitleMiddle')} ⚡ ${t('hero.subtitleAfter')} 🚀`;

    const d1 = 200;
    const d2 = d1 + l1.length * typeSpeed + gap;
    const d3 = d2 + l2.length * typeSpeed + gap;
    const dSub = d3 + l3.length * typeSpeed + gap;

    return {
      line1: l1,
      line2: l2,
      line3: l3,
      subtitle: sub,
      delays: { d1, d2, d3, dSub },
    };
  }, [t, i18n.language]);

  return (
    <HeroSection>
      <ParticleBackground />
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          mt: { xs: 22, md: 25 },
          mb: { xs: 30, md: 45 },
          height: '100%',
          display: 'flex',
          alignItems: { xs: 'flex-start', md: 'center' },
        }}
      >
        <motion.div
          key={i18n.language}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <TypewriterText
                    key={`l1-${i18n.language}`}
                    text={line1}
                    speed={typeSpeed}
                    startDelay={delays.d1}
                    component="h1"
                    sx={{ ...heroLineSx, mb: 0 }}
                  />
                  <TypewriterText
                    key={`l2-${i18n.language}`}
                    text={line2}
                    speed={typeSpeed}
                    startDelay={delays.d2}
                    component="h1"
                    sx={{ ...heroLineSx, mb: 0 }}
                  />
                  <TypewriterText
                    key={`l3-${i18n.language}`}
                    text={line3}
                    speed={typeSpeed}
                    startDelay={delays.d3}
                    component="h1"
                    sx={{ ...heroLineSx, mb: 3 }}
                  />
                </Box>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Box
                  sx={{
                    mb: 4,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-8px',
                      left: '0',
                      width: '80px',
                      height: '3px',
                      background: 'linear-gradient(90deg, #4C00FF, #FF0080)',
                      borderRadius: '2px',
                    },
                  }}
                >
                  <TypewriterText
                    key={`sub-${i18n.language}`}
                    text={subtitle}
                    speed={28}
                    startDelay={delays.dSub}
                    preserveEmojiColor
                    component="p"
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(90deg, #4C00FF, #FF0080, #4C00FF)',
                      backgroundSize: '200% auto',
                      animation: `${gradientText} 3s linear infinite`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      lineHeight: 1.8,
                      fontSize: { xs: '1.2rem', md: '1.5rem' },
                      textShadow: '1px 1px 2px rgba(76, 0, 255, 0.2)',
                      letterSpacing: '0.5px',
                      display: 'block',
                      minHeight: { xs: '5.5rem', md: '6.5rem' },
                    }}
                  />
                </Box>
              </motion.div>
              <motion.div variants={itemVariants}>
                <GradientButton
                  variant="contained"
                  endIcon={<ArrowForward />}
                  size="large"
                  onClick={handleExplore}
                  sx={{ mb: { xs: 6, md: 0 } }}
                >
                  {t('hero.cta')}
                </GradientButton>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6} sx={{ minWidth: 0, maxWidth: '100%' }}>
              <Box
                component={motion.div}
                variants={itemVariants}
                sx={{ width: '100%', maxWidth: '100%', overflow: 'visible' }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    paddingBottom: '5px',
                    background: 'linear-gradient(90deg, #4C00FF, #FF0080, #4C00FF)',
                    backgroundSize: '200% auto',
                    animation: `${gradientText} 3s linear infinite`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    mb: 3,
                    mt: { xs: 4, md: 0 },
                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                  }}
                >
                  {t('techStack.title')}
                </Typography>
                <TechStack itemVariants={itemVariants} />
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </HeroSection>
  );
};

export default Home;
