import React, { useEffect } from 'react';
import { Box, Container, Typography, Grid, Paper, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import ParticleBackground from '../components/ParticleBackground';
import { float, gradientText, cyber, glow } from '../animations';
import Skills from '../components/Skills';
import Experience from '../components/Experience';

const AboutSection = styled(Box)(({ theme }) => ({
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
      linear-gradient(135deg, rgba(76, 0, 255, 0.05) 0%, transparent 50%),
      linear-gradient(45deg, rgba(255, 0, 128, 0.05) 0%, transparent 50%),
      repeating-linear-gradient(
        45deg,
        transparent 0px,
        transparent 10px,
        rgba(76, 0, 255, 0.03) 10px,
        rgba(76, 0, 255, 0.03) 11px
      ),
      repeating-linear-gradient(
        -45deg,
        transparent 0px,
        transparent 10px,
        rgba(255, 0, 128, 0.03) 10px,
        rgba(255, 0, 128, 0.03) 11px
      ),
      radial-gradient(circle at 50% 0%, rgba(76, 0, 255, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 100% 50%, rgba(255, 0, 128, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 0% 100%, rgba(76, 0, 255, 0.2) 0%, transparent 50%)
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
    }
  }
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  padding: '30px',
  height: '100%',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 30px rgba(76, 0, 255, 0.3)',
    animation: `${cyber} 2s infinite`,
    '&::before': {
      transform: 'translateX(100%)',
    }
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
    transition: 'transform 0.5s ease',
  }
}));

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const personalInfo = {
    name: "HALİT ALTUN",
    title: "FULL STACK JR. DEVELOPER"
  };

  return (
    <AboutSection>
      <ParticleBackground />
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 2,
          py: 4
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container justifyContent="center" mb={6}>
            <Grid item xs={12}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    background: 'linear-gradient(90deg, #4C00FF, #FF0080, #4C00FF)',
                    backgroundSize: '200% auto',
                    animation: `${gradientText} 3s linear infinite`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    textAlign: 'center',
                    textShadow: '2px 2px 4px rgba(76, 0, 255, 0.3)',
                  }}
                >
                  Hakkımda
                </Typography>
              </motion.div>
            </Grid>
          </Grid>

          <Grid container spacing={4} mb={8}>
            <Grid item xs={12} md={4}>
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    position: 'sticky',
                    top: '100px',
                  }}
                >
                  <Avatar
                    src="/images/profile.png"
                    alt="Halit Altun"
                    sx={{
                      width: 250,
                      height: 250,
                      border: '4px solid rgba(255,255,255,0.1)',
                      boxShadow: '0 0 20px rgba(76, 0, 255, 0.3)',
                      transition: 'all 0.5s ease',
                      animation: `${float} 6s ease-in-out infinite`,
                      '&:hover': {
                        transform: 'scale(1.05) rotate(5deg)',
                        boxShadow: '0 0 30px rgba(255, 0, 128, 0.4), 0 0 60px rgba(76, 0, 255, 0.3)',
                        border: '4px solid rgba(255,255,255,0.2)',
                      }
                    }}
                  />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      textAlign: 'center',
                      animation: `${glow} 3s ease-in-out infinite`,
                    }}
                  >
                    {personalInfo.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
                      textAlign: 'center',
                      fontWeight: 500,
                      textShadow: '0 0 10px rgba(255,255,255,0.3)',
                    }}
                  >
                    {personalInfo.title}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={8}>
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    background: 'linear-gradient(90deg, #D4BBFF, #FFBBDD)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    animation: `${glow} 3s ease-in-out infinite`,
                    transform: 'perspective(1000px)',
                    '&:hover': {
                      transform: 'perspective(1000px) translateZ(20px)',
                    }
                  }}
                >
                  Merhaba, Ben Halit Altun 👋
                </Typography>
                <Typography
                  component={motion.p}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  variant="body1"
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                    mb: 3,
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: '-20px',
                      top: '50%',
                      width: '10px',
                      height: '10px',
                      background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
                      borderRadius: '50%',
                      transform: 'translateY(-50%)',
                      boxShadow: '0 0 10px rgba(76, 0, 255, 0.5)',
                    }
                  }}
                >
                  Full Stack Developer olarak modern web teknolojileri ile çalışmaktan keyif alıyorum. 
                  Yazılım geliştirme sürecinin her aşamasında aktif rol alarak, kullanıcı deneyimini 
                  ön planda tutan projeler geliştiriyorum.
                </Typography>
                <Typography
                  component={motion.p}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  variant="body1"
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: '-20px',
                      top: '50%',
                      width: '10px',
                      height: '10px',
                      background: 'linear-gradient(45deg, #FF0080, #4C00FF)',
                      borderRadius: '50%',
                      transform: 'translateY(-50%)',
                      boxShadow: '0 0 10px rgba(255, 0, 128, 0.5)',
                    }
                  }}
                >
                  Sürekli öğrenme ve gelişim odaklı yaklaşımımla, yeni teknolojileri takip ediyor 
                  ve bunları projelerimde kullanarak daha iyi çözümler üretmeye çalışıyorum.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>

          <Experience itemVariants={itemVariants} />

          <Skills />
          
        </motion.div>
      </Container>
    </AboutSection>
  );
};

export default About;
