import React, { useEffect } from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { ArrowForward } from '@mui/icons-material';
import ParticleBackground from '../components/ParticleBackground';
import { useNavigate } from 'react-router-dom';
import TechStack from '../components/TechStack';
import { float, gradientText, typewriter, cursor } from '../animations';

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
  }
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

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const handleExplore = () => {
    navigate('/blog');
  };

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
          alignItems: { xs: 'flex-start', md: 'center' }
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                    variant="h1"
                    sx={{
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
                      position: 'relative',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      borderRight: '3px solid',
                      width: 'fit-content',
                      animation: `
                        ${typewriter} 1s steps(12) 0s forwards,
                        ${cursor} 0.8s steps(12) infinite
                      `,
                      width: '0',
                      padding: '5px 0',
                    }}
                  >
                    DevJourney
                  </Typography>
                  <Typography
                    variant="h1"
                    sx={{
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
                      position: 'relative',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      borderRight: '3px solid',
                      width: 'fit-content',
                      animation: `
                        ${typewriter} 1s steps(12) 1.2s forwards,
                        ${cursor} 0.8s steps(12) infinite
                      `,
                      width: '0',
                      padding: '5px 0',
                    }}
                  >
                    Blog Sayfama
                  </Typography>
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 900,
                      background: 'linear-gradient(90deg, #4C00FF, #FF0080, #4C00FF)',
                      backgroundSize: '200% auto',
                      animation: `${gradientText} 3s linear infinite`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      mb: 3,
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      textShadow: '2px 2px 4px rgba(76, 0, 255, 0.3)',
                      letterSpacing: '-0.5px',
                      position: 'relative',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      borderRight: '3px solid',
                      width: 'fit-content',
                      animation: `
                        ${typewriter} 1s steps(12) 2.4s forwards,
                        ${cursor} 0.8s steps(12) infinite
                      `,
                      width: '0',
                    }}
                  >
                    Hoş Geldiniz
                  </Typography>
                </Box>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(90deg, #4C00FF, #FF0080, #4C00FF)',
                    backgroundSize: '200% auto',
                    animation: `${gradientText} 3s linear infinite`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    mb: 4,
                    lineHeight: 1.8,
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                    textShadow: '1px 1px 2px rgba(76, 0, 255, 0.2)',
                    letterSpacing: '0.5px',
                    position: 'relative',
                    '& .emoji': {
                      display: 'inline-block',
                      marginRight: '4px',
                      animation: `${float} 2s ease-in-out infinite`,
                      WebkitBackgroundClip: 'unset',
                      backgroundClip: 'unset',
                      color: 'initial',
                      textShadow: 'none',
                      background: 'none'
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-8px',
                      left: '0',
                      width: '80px',
                      height: '3px',
                      background: 'linear-gradient(90deg, #4C00FF, #FF0080)',
                      borderRadius: '2px',
                    }
                  }}
                > 
                  Backend'den Frontend'e <span className="emoji">💻</span> modern web teknolojilerinden 
                  sistem mimarisine <span className="emoji">⚡</span> full&nbsp;stack dünyasından deneyimlerim 
                  burada! <span className="emoji">🚀</span>
                </Typography>
              </motion.div>
              <motion.div variants={itemVariants}>
                <GradientButton
                  variant="contained"
                  endIcon={<ArrowForward />}
                  size="large"
                  onClick={handleExplore}
                  sx={{ mb: { xs: 6, md: 0 } }}
                >
                  Keşfetmeye Başla
                </GradientButton>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    paddingBottom: '05px',
                    background: 'linear-gradient(90deg, #4C00FF, #FF0080, #4C00FF)',
                    backgroundSize: '200% auto',
                    animation: `${gradientText} 3s linear infinite`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    mb: 4,
                    mt: { xs: 30, md: 0 }
                  }}
                >
                  Teknoloji Stack'im
                </Typography>
                <TechStack itemVariants={itemVariants} />
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </HeroSection>
  );
};

export default Home;
