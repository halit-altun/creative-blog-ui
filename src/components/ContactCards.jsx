import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Email, Phone, LocationOn, LinkedIn, GitHub } from '@mui/icons-material';
import { cyber } from '../animations';

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  padding: '30px',
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

const ContactInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
  padding: '15px',
  borderRadius: '10px',
  background: 'rgba(255, 255, 255, 0.05)',
  transition: 'all 0.3s ease',
  cursor: 'none',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateX(10px)',
    boxShadow: '0 0 15px rgba(76, 0, 255, 0.3)',
  }
}));

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const ContactCards = () => {
  const contactDetails = [
    {
      icon: <Email sx={{ fontSize: 24, color: '#FF0080' }} />,
      text: 'halitaltun002@gmail.com',
      link: 'mailto:halitaltun002@gmail.com'
    },
    {
      icon: <Phone sx={{ fontSize: 24, color: '#FF0080' }} />,
      text: '+90 531 382 50 79',
      link: 'tel:+905313825079'
    },
    {
      icon: <LocationOn sx={{ fontSize: 24, color: '#FF0080' }} />,
      text: 'Güngören, İstanbul',
      link: 'https://www.google.com/maps/place/G%C3%BCng%C3%B6ren%2F%C4%B0stanbul/@41.019998,28.860142,14z/'
    }
  ];

  const socialLinks = [
    {
      icon: <LinkedIn sx={{ fontSize: 24 }} />,
      link: 'https://www.linkedin.com/in/halit-altun-923207258/'
    },
    {
      icon: <GitHub sx={{ fontSize: 24 }} />,
      link: 'https://github.com/halit-altun'
    }
  ];

  return (
    <motion.div variants={itemVariants}>
      <StyledPaper>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 3,
            background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          İletişim Bilgileri
        </Typography>

        {contactDetails.map((detail, index) => (
          <ContactInfo
            key={index}
            component="a"
            href={detail.link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              textDecoration: 'none',
              color: 'white',
            }}
          >
            <Box sx={{ mr: 2 }}>{detail.icon}</Box>
            <Typography variant="body1" sx={{ opacity: 0.8 }}>
              {detail.text}
            </Typography>
          </ContactInfo>
        ))}

        <Box 
          sx={{ 
            display: 'flex', 
            gap: 2, 
            mt: 4,
            justifyContent: 'center'
          }}
        >
          {socialLinks.map((social, index) => (
            <Box
              key={index}
              component={motion.div}
              whileHover={{ 
                scale: 1.2,
                rotate: 360,
                transition: { duration: 0.5 }
              }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              sx={{ zIndex: 10 }}
            >
              <a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  position: 'relative',
                  cursor: 'none',
                }}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            </Box>
          ))}
        </Box>
      </StyledPaper>
    </motion.div>
  );
};

export default ContactCards; 