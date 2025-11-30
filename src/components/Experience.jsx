import React from 'react';
import { Typography, Grid } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Work, School } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { neonPulse, gradientText } from '../animations';

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Pronist Yazılım",
    period: "Ocak 2025 - Devam",
    description: "Next.js, Figma tasarım, .NET, SQL Server ve proje yönetimi gibi alanlarda aktif roller üstlenerek full stack geliştirici olarak çalışmaktayım. Özellikle e-ticaret pazaryeri entegrasyon projesinde görev alarak Amazon, Trendyol ve Hepsiburada gibi platformların API entegrasyonlarını geliştirdim. Çalışmamın 3. ayında gösterdiğim üstün performans, projelerdeki hızlı adaptasyonum ve teknik becerilerim sayesinde takım lideri tarafından önerilerek erken terfi aldım. Geliştirdiğim yenilikçi çözümler ve optimize ettiğim iş süreçleri şirket içinde takdir topladı.",
    icon: <Work />,
    color: "#4C00FF"
  },
  {
    title: "Stajyer",
    company: "Yıldız Teknik Üniversitesi",
    period: "2023",
    description: "Bilgi Teknolojileri ve Siber Güvenlik Araştırma Merkezinde modern web teknolojileri ve güvenlik uygulamaları konusunda pratik deneyim. ASP.NET Core, Token tabanlı kimlik doğrulama sistemleri ve MySQL veritabanı yönetimi konularında çalışmalar.",
    icon: <Work />,
    color: "#4C00FF"
  },
  {
    title: "Bilgisayar Mühendisliği",
    company: "Biruni Üniversitesi",
    period: "2020 - 2024",
    description: "Lisans Eğitimi",
    icon: <School />,
    color: "#FF0080"
  },
  {
    title: "Freelance Full Stack Developer",
    company: "Bağımsız Projeler",
    period: "2023 - Devam",
    description: "Modern web teknolojileri kullanarak müşteri odaklı projeler geliştirme",
    icon: <Work />,
    color: "#4C00FF"
  }
];


const Experience = ({ itemVariants }) => {
  return (
    <Grid container mb={8}>
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
          Deneyim
        </Typography>
        <motion.div variants={itemVariants}>
          <Timeline position="alternate"sx={{ p: 0 }}>
            {experiences.map((exp, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <TimelineDot
                      sx={{
                        background: exp.color,
                        p: 1,
                        boxShadow: `0 0 10px ${exp.color}`,
                        animation: `${neonPulse} 2s infinite`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: `0 0 20px ${exp.color}, 0 0 40px ${exp.color}`,
                        }
                      }}
                    >
                      {exp.icon}
                    </TimelineDot>
                  </motion.div>
                  {index !== experiences.length - 1 && (
                    <TimelineConnector 
                      sx={{ 
                        background: `linear-gradient(${exp.color}, ${experiences[index + 1].color})`,
                        width: '2px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          width: '4px',
                          boxShadow: '0 0 10px rgba(76, 0, 255, 0.5)',
                        }
                      }} 
                    />
                  )}
                </TimelineSeparator>
                <TimelineContent>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        background: `linear-gradient(45deg, ${exp.color}, ${index % 2 === 0 ? '#FF0080' : '#4C00FF'})`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        mb: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          textShadow: `0 0 10px ${exp.color}`,
                        }
                      }}
                    >
                      {exp.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: 'rgba(255,255,255,0.9)',
                        fontWeight: 600,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: 'rgba(255,255,255,1)',
                          textShadow: '0 0 10px rgba(255,255,255,0.5)',
                        }
                      }}
                    >
                      {exp.company}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'rgba(255,255,255,0.6)',
                        display: 'block',
                        mb: 1,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {exp.period}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255,255,255,0.7)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: 'rgba(255,255,255,0.9)',
                        }
                      }}
                    >
                      {exp.description}
                    </Typography>
                  </motion.div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default Experience; 