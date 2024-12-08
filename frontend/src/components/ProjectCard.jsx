import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Dialog } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { GitHub, ArrowForward, ArrowBack } from '@mui/icons-material';
import { cyber } from '../animations';

const ImageSlider = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '250px',
  borderRadius: '10px',
  overflow: 'hidden',
  marginBottom: '20px',
});

const SliderImage = styled(motion.img)({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  borderRadius: '10px',
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
  cursor: 'none',
});

const SliderButton = styled(IconButton)({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(5px)',
  color: 'white',
  zIndex: 2,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  border: '2px solid rgba(255, 255, 255, 0.5)',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  width: '40px',
  height: '40px',
  transition: 'all 0.3s ease',
  cursor: 'none',
});

const TechChip = styled(motion.span)(({ theme }) => ({
  display: 'inline-block',
  padding: '4px 12px',
  margin: '4px',
  borderRadius: '15px',
  background: 'rgba(255, 255, 255, 0.1)',
  color: '#fff',
  fontSize: '0.8rem',
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
}));

const ProjectLink = styled(motion.a)({
  color: '#fff',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 16px',
  borderRadius: '20px',
  background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
  transition: 'all 0.3s ease',
  cursor: 'none',
  '&:hover': {
    transform: 'scale(1.05)',
    animation: `${cyber} 2s infinite`,
  }
});

const FeatureList = styled(Box)({
  margin: '20px 0',
  padding: '15px',
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '10px',
  backdropFilter: 'blur(5px)',
});

const StyledProjectCard = styled(motion.div)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.03)',
  borderRadius: '15px',
  padding: '30px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    animation: `${cyber} 2s infinite`,
    border: '1px solid rgba(255, 255, 255, 0.3)',
    background: 'rgba(255, 255, 255, 0.05)',
    boxShadow: '0 0 20px rgba(76, 0, 255, 0.5)'
  }
}));

const ProjectCard = ({ project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (!isFullScreen) {
      const timer = setInterval(() => {
        setCurrentImageIndex((prev) => 
          prev === project.images.length - 1 ? 0 : prev + 1
        );
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [project.images.length, isFullScreen]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const truncateDescription = (text, lines = 2) => {
    return (
      <Box sx={{ position: 'relative', mb: 3 }}>
        <Typography
          onClick={() => setShowFullDescription(!showFullDescription)}
          sx={{
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.6,
            cursor: 'none',
            display: '-webkit-box',
            WebkitLineClamp: showFullDescription ? 'unset' : lines,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
          }}
        >
          {text}
        </Typography>
      </Box>
    );
  };

  return (
    <StyledProjectCard
      transition={{ type: "spring", stiffness: 300 }}
    >
      <ImageSlider>
        <AnimatePresence mode='wait'>
          <SliderImage
            key={currentImageIndex}
            src={project.images[currentImageIndex]}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsFullScreen(true)}
          />
        </AnimatePresence>
        <SliderButton
          onClick={prevImage}
          sx={{ left: 10 }}
        >
          <ArrowBack />
        </SliderButton>
        <SliderButton
          onClick={nextImage}
          sx={{ right: 10 }}
        >
          <ArrowForward />
        </SliderButton>
      </ImageSlider>

      <Typography
        variant="h4"
        sx={{
          mb: 2,
          background: 'linear-gradient(45deg, #D4BBFF, #FFBBDD)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {project.title}
      </Typography>

      {truncateDescription(project.description)}

      <FeatureList>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: '#fff',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            paddingBottom: '10px'
          }}
        >
          Key Features
        </Typography>
        {project.features.map((feature, index) => (
          <Typography
            key={index}
            sx={{
              color: 'rgba(255,255,255,0.8)',
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              '&::before': {
                content: '""',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
                marginRight: '10px',
              }
            }}
          >
            {feature}
          </Typography>
        ))}
      </FeatureList>

      <Box sx={{ mb: 3 }}>
        {project.tech.map((tech, i) => (
          <TechChip
            key={i}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {tech}
          </TechChip>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ProjectLink
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
        >
          <GitHub /> View on GitHub
        </ProjectLink>
      </Box>

      <Dialog
        fullScreen
        open={isFullScreen}
        onClose={() => setIsFullScreen(false)}
        sx={{
          '& .MuiDialog-paper': {
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }
        }}
      >
        <Box sx={{ position: 'relative', width: '90vw', height: '90vh' }}>
          <SliderImage
            key={`fullscreen-${currentImageIndex}`}
            src={project.images[currentImageIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ 
              position: 'relative', 
              objectFit: 'contain',
              width: '100%',
              height: '100%'
            }}
          />
          <SliderButton
            onClick={prevImage}
            sx={{ left: 20 }}
          >
            <ArrowBack />
          </SliderButton>
          <SliderButton
            onClick={nextImage}
            sx={{ right: 20 }}
          >
            <ArrowForward />
          </SliderButton>
          <IconButton
            onClick={() => setIsFullScreen(false)}
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              cursor: 'none',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)'
              }
            }}
          >
            ✕
          </IconButton>
        </Box>
      </Dialog>
    </StyledProjectCard>
  );
};

export default ProjectCard; 