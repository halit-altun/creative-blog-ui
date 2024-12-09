import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Avatar, Chip, Divider, CircularProgress } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ParticleBackground from '../components/ParticleBackground';
import BlogDetailSection from '../components/BlogDetailSection';
import styled from '@emotion/styled';

const BlogCard = styled(motion.div)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '15px',
  padding: '30px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  position: 'relative',
  zIndex: 2,
  '&:hover': {
    border: '1px solid rgba(255, 255, 255, 0.2)',
  }
}));

const ProfileSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.5rem',
  marginBottom: '3rem',
  '@media (min-width: 600px)': {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '2.5rem',
  }
});

const BlogDetail = () => {
  const { category } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blogs/${category}`);
        setBlogData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogData();
    window.scrollTo(0, 0);
  }, [category]);

  if (loading) {
    return (
      <BlogDetailSection>
        <ParticleBackground />
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, minHeight: '60vh' }}>
          <CircularProgress size={60} sx={{ color: '#4C00FF' }} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                textAlign: 'center',
                color: '#fff',
                opacity: 0.9,
                fontWeight: 500,
                background: 'linear-gradient(90deg, #4C00FF, #FF0080)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Sunucuya bağlanıyor, lütfen 1 dakika bekleyiniz...
            </Typography>
          </motion.div>
        </Container>
      </BlogDetailSection>
    );
  }

  if (error) {
    return (
      <BlogDetailSection>
        <ParticleBackground />
        <Container sx={{ textAlign: 'center', py: 8 }}>
          <Typography color="error">Error: {error}</Typography>
        </Container>
      </BlogDetailSection>
    );
  }

  if (!blogData) return null;

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
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <BlogDetailSection>
      <ParticleBackground />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <BlogCard>
            {/* Hero Section */}
            <motion.div
              style={{ opacity, scale }}
              className="hero-section"
            >
              <Box sx={{ 
                textAlign: 'center', 
                mb: 8,
                pt: 4,
              }}>
                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      background: 'linear-gradient(90deg, #4C00FF, #FF0080)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      mb: 5,
                      fontSize: { xs: '2rem', md: '3.5rem' },
                      lineHeight: 1.2,
                    }}
                  >
                    {blogData.title}
                  </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <ProfileSection>
                    <Avatar
                      src="/images/profile.png"
                      alt={blogData.author}
                      sx={{
                        width: { xs: 150, md: 180 },
                        height: { xs: 150, md: 180 },
                        border: '2px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 0 20px rgba(76, 0, 255, 0.3)',
                      }}
                    />
                    <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          color: 'white', 
                          fontWeight: 600,
                          mb: 1 
                        }}
                      >
                        {blogData.author}
                      </Typography>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          color: 'rgba(255,255,255,0.7)',
                          mb: 2
                        }}
                      >
                        {blogData.date}
                      </Typography>
                      <Box sx={{ 
                        display: 'flex', 
                        gap: 1, 
                        flexWrap: 'wrap',
                        justifyContent: { xs: 'center', sm: 'flex-start' }
                      }}>
                        {blogData.tags.map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag}
                            sx={{
                              background: 'rgba(255,255,255,0.1)',
                              color: 'white',
                              backdropFilter: 'blur(10px)',
                              '&:hover': {
                                background: 'rgba(255,255,255,0.2)',
                              }
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </ProfileSection>
                </motion.div>
              </Box>
            </motion.div>

            {/* Content Section */}
            <Box sx={{ 
              maxWidth: '800px', 
              margin: '0 auto', 
              pb: 4,
              '& > *:first-of-type': {
                mt: 0
              }
            }}>
              {blogData.content.map((section, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {section.type === 'subtitle' ? (
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: 'white',
                        mt: 6,
                        mb: 3,
                        background: 'linear-gradient(90deg, #4C00FF, #FF0080)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      {section.text}
                    </Typography>
                  ) : (
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'rgba(255,255,255,0.8)',
                        mb: 3,
                        lineHeight: 1.8,
                        fontSize: '1.1rem',
                        textAlign: 'justify',
                        '&::first-letter': {
                          fontSize: '3.5rem',
                          float: 'left',
                          marginRight: '8px',
                          lineHeight: '1',
                          background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          color: 'transparent',
                          padding: '8px',
                        }
                      }}
                    >
                      {section.text}
                    </Typography>
                  )}
                  {index < blogData.content.length - 1 && (
                    <Divider sx={{ 
                      my: 4,
                      borderColor: 'rgba(255,255,255,0.1)',
                      width: '100%',
                      maxWidth: '100px',
                      margin: '2rem auto',
                    }} />
                  )}
                </motion.div>
              ))}
            </Box>
          </BlogCard>
        </motion.div>
      </Container>
    </BlogDetailSection>
  );
};

export default BlogDetail;
