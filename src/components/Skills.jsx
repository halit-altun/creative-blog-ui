import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Code, Brush, Build, Psychology, Storage, Security, Speed } from '@mui/icons-material';
import { StyledPaper } from './StyledComponents'; 
import { gradientText } from '../animations';

const Skills = () => {
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

  const skills = [
    {
      icon: <Code sx={{ fontSize: 40, color: '#4C00FF' }} />,
      title: "Frontend Geliştirme",
      description: "HTML5, CSS3, React, Next.js, Material-UI ile modern ve responsive web arayüzleri geliştirme"
    },
    {
      icon: <Storage sx={{ fontSize: 40, color: '#FF0080' }} />,
      title: "Backend Geliştirme",
      description: "Node.js, ASP.NET Core, MongoDB, MySQL ile güvenli ve ölçeklenebilir backend sistemleri"
    },
    {
      icon: <Security sx={{ fontSize: 40, color: '#4C00FF' }} />,
      title: "Güvenlik",
      description: "Token tabanlı kimlik doğrulama, JWT implementasyonu ve güvenli API geliştirme"
    },
    {
      icon: <Build sx={{ fontSize: 40, color: '#FF0080' }} />,
      title: "Araçlar & Teknolojiler",
      description: "Redux Toolkit, REST API, ES6+, Git, Docker, Bitbucket, Jira, Modern web teknolojileri"
    },
    {
      icon: <Psychology sx={{ fontSize: 40, color: '#4C00FF' }} />,
      title: "Problem Çözme",
      description: "Analitik düşünme ve karmaşık problemlere çözüm üretme yeteneği"
    },
    {
      icon: <Brush sx={{ fontSize: 40, color: '#FF0080' }} />,
      title: "UI/UX Tasarım",
      description: "Figma ile kullanıcı deneyimi odaklı, modern ve estetik arayüz tasarımları"
    },
    {
      icon: <Code sx={{ fontSize: 40, color: '#4C00FF' }} />,
      title: "Clean Code",
      description: "SOLID prensipleri ve clean architecture ile sürdürülebilir kod yazımı"
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: '#FF0080' }} />,
      title: "Performans Optimizasyonu",
      description: "Web uygulamalarında hız ve performans iyileştirmeleri"
    }
  ];

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
          Uzmanlık Alanlarım
        </Typography>
      </Grid>
      {skills.map((skill, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <StyledPaper>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                {skill.icon}
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  textAlign: 'center',
                  background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {skill.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  textAlign: 'center',
                  lineHeight: 1.6,
                }}
              >
                {skill.description}
              </Typography>
            </StyledPaper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default Skills; 