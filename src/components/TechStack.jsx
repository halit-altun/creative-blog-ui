import React from 'react';
import { Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { styled, keyframes } from '@mui/material/styles';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const cyber = keyframes`
  0% { box-shadow: 0 0 5px #4C00FF, 0 0 10px #4C00FF, 0 0 20px #4C00FF; }
  50% { box-shadow: 0 0 10px #FF0080, 0 0 20px #FF0080, 0 0 40px #FF0080; }
  100% { box-shadow: 0 0 5px #4C00FF, 0 0 10px #4C00FF, 0 0 20px #4C00FF; }
`;

const scaleIn = keyframes`
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const TechStackCard = styled(motion.div)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '12px',
  padding: '20px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    animation: `${cyber} 2s infinite`,
    border: '1px solid rgba(255, 255, 255, 0.3)',
    background: 'rgba(255, 255, 255, 0.05)',
    boxShadow: '0 0 20px rgba(76, 0, 255, 0.5)'
  }
}));

const techCategories = [
  {
    title: 'Frontend 🎨',
    items: [
      { name: 'React', icon: '⚛️' },
      { name: 'Next.js', icon: '⏭️' },
      { name: 'Material-UI', icon: '🎨' },
      { name: 'CSS3', icon: '🎯' },
      { name: 'HTML5', icon: '📱' }
    ]
  },
  {
    title: 'Backend 🔧',
    items: [
      { name: 'Node.js', icon: '🟢' },
      { name: 'ASP.NET Core', icon: '🔷' },
      { name: 'Express', icon: '🚂' },
      { name: 'JWT Auth', icon: '🔐' }
    ]
  },
  {
    title: 'Database 🗄️',
    items: [
      { name: 'MongoDB', icon: '🍃' },
      { name: 'MySQL', icon: '🐬' },
      { name: 'SQL Server', icon: '🗃️' }
    ]
  },
  {
    title: 'Tools 🛠️',
    items: [
      { name: 'Git', icon: '📦' },
      { name: 'VS Code', icon: '💻' },
      { name: 'Postman', icon: '🚀' },
      { name: 'Figma', icon: '🎭' }
    ]
  },
  {
    title: 'API & Entegrasyon 🔄',
    items: [
      { name: 'REST API', icon: '🌐' },
      { name: 'E-Ticaret API', icon: '🛒' },
      { name: 'Pazaryeri Entegrasyonu', icon: '🔗' }
    ]
  }
];

const TechStack = ({ itemVariants }) => {
  return (
    <Grid container spacing={3}>
      {techCategories.map((category, index) => (
        <Grid item xs={12} sm={6} md={index === 4 ? 12 : 6} key={index}>
          <TechStackCard
            variants={itemVariants}
            whileHover={{ scale: 1.08 }}
            transition={{ 
              type: "spring", 
              stiffness: 400,
              damping: 10,
              duration: 0.2
            }}
            style={{
              animation: `${scaleIn} 0.5s ease-out ${index * 0.1}s forwards`,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '& .category-emoji': {
                  animation: `${float} 2s ease-in-out infinite`,
                  display: 'inline-block',
                }
              }}
            >
              <span className="category-emoji">{category.emoji}</span>
              {category.title}
            </Typography>
            {category.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Typography
                  sx={{
                    color: '#fff',
                    opacity: 0.8,
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    '&:hover': {
                      opacity: 1,
                      transform: 'translateX(5px)',
                      transition: 'all 0.3s ease'
                    },
                    '&:before': {
                      content: '""',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
                      marginRight: '10px',
                    }
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                  {item.name}
                </Typography>
              </motion.div>
            ))}
          </TechStackCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default TechStack; 