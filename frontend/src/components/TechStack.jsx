import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { styled, keyframes } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;

const cyber = keyframes`
  0% { box-shadow: 0 0 5px #4C00FF, 0 0 10px #4C00FF; }
  50% { box-shadow: 0 0 8px #FF0080, 0 0 16px #FF0080; }
  100% { box-shadow: 0 0 5px #4C00FF, 0 0 10px #4C00FF; }
`;

const scaleIn = keyframes`
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const TechStackCard = styled(motion.div)({
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '12px',
  padding: '14px 16px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'border 0.3s ease, background 0.3s ease, transform 0.25s ease, box-shadow 0.25s ease',
  height: '100%',
  minHeight: 0,
  minWidth: 0,
  width: '100%',
  maxWidth: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'visible',
  transformOrigin: 'center center',
  '&:hover': {
    animation: `${cyber} 2s infinite`,
    border: '1px solid rgba(255, 255, 255, 0.3)',
    background: 'rgba(255, 255, 255, 0.07)',
    transform: 'translateY(-4px)',
  },
});

const techCategories = [
  {
    titleKey: 'techStack.languages',
    emoji: '💻',
    items: [
      { name: 'C#', icon: '🔷' },
      { name: 'JavaScript', icon: '🟨' },
      { name: 'TypeScript', icon: '📘' },
    ],
  },
  {
    titleKey: 'techStack.frontend',
    emoji: '🎨',
    items: [
      { name: 'React', icon: '⚛️' },
      { name: 'Next.js', icon: '⏭️' },
      { name: 'HTML5', icon: '📄' },
      { name: 'CSS3', icon: '🎯' },
    ],
  },
  {
    titleKey: 'techStack.backend',
    emoji: '🔧',
    items: [
      { name: '.NET Core', icon: '🟪' },
      { name: 'Node.js', icon: '🟢' },
      { name: 'JWT Auth', icon: '🔐' },
    ],
  },
  {
    titleKey: 'techStack.database',
    emoji: '🗄️',
    items: [
      { name: 'SQL Server', icon: '🗃️' },
      { name: 'MongoDB', icon: '🍃' },
    ],
  },
  {
    titleKey: 'techStack.cloudTools',
    emoji: '☁️',
    items: [
      { name: 'AWS', icon: '🟠' },
      { name: 'Docker', icon: '🐳' },
      { name: 'GitHub', icon: '📦' },
      { name: 'Bitbucket', icon: '🪣' },
      { name: 'Jira', icon: '📋' },
    ],
  },
  {
    titleKey: 'techStack.apiAutomation',
    emoji: '🔄',
    items: [
      { name: 'REST API', icon: '🌐' },
      { nameKey: 'techStack.marketplaceApi', icon: '🛒' },
      { name: 'n8n', icon: '⚡' },
      { name: 'Agile / Scrum', icon: '🔁' },
    ],
  },
];

const TechStack = ({ itemVariants }) => {
  const { t } = useTranslation('home');

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        overflow: 'visible',
        py: 0.5,
        px: 0.25,
      }}
    >
      <Grid container spacing={1.5} alignItems="stretch" sx={{ overflow: 'visible' }}>
        {techCategories.map((category, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            key={category.titleKey}
            sx={{
              display: 'flex',
              minWidth: 0,
              maxWidth: '100%',
              overflow: 'visible',
            }}
          >
            <TechStackCard
              variants={itemVariants}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
              style={{
                animation: `${scaleIn} 0.5s ease-out ${index * 0.08}s both`,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  mb: 1.25,
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.75,
                  minWidth: 0,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  '& .category-emoji': {
                    animation: `${float} 2s ease-in-out infinite`,
                    display: 'inline-block',
                    flexShrink: 0,
                  },
                }}
              >
                <span className="category-emoji">{category.emoji}</span>
                {t(category.titleKey)}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                  minWidth: 0,
                  flex: 1,
                }}
              >
                {category.items.map((item, i) => (
                  <motion.div
                    key={item.nameKey || item.name}
                    initial={{ x: -12, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06 }}
                    style={{ minWidth: 0, maxWidth: '100%' }}
                  >
                    <Typography
                      sx={{
                        color: '#fff',
                        opacity: 0.85,
                        fontSize: { xs: '0.8rem', md: '0.85rem' },
                        lineHeight: 1.4,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.75,
                        minWidth: 0,
                        maxWidth: '100%',
                        overflow: 'hidden',
                        '&:hover': {
                          opacity: 1,
                          transform: 'translateX(3px)',
                          transition: 'all 0.25s ease',
                        },
                        '&:before': {
                          content: '""',
                          width: 5,
                          height: 5,
                          flexShrink: 0,
                          borderRadius: '50%',
                          background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
                        },
                      }}
                    >
                      <Box
                        component="span"
                        sx={{ fontSize: '1rem', flexShrink: 0, lineHeight: 1 }}
                      >
                        {item.icon}
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          minWidth: 0,
                        }}
                      >
                        {item.nameKey ? t(item.nameKey) : item.name}
                      </Box>
                    </Typography>
                  </motion.div>
                ))}
              </Box>
            </TechStackCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TechStack;
