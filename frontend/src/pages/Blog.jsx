import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import ParticleBackground from '../components/ParticleBackground';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import axios from 'axios';

// Styled components
const BlogSection = styled('section')({
  minHeight: '100vh',
  position: 'relative',
  padding: '120px 0 60px',
  background: `
    linear-gradient(
      135deg, 
      rgba(15, 15, 27, 0.95), 
      rgba(26, 26, 46, 0.97)
    ),
    radial-gradient(
      circle at 50% 0%, 
      rgba(76, 0, 255, 0.15), 
      transparent 50%
    ),
    radial-gradient(
      circle at 100% 50%, 
      rgba(255, 0, 128, 0.15), 
      transparent 50%
    ),
    radial-gradient(
      circle at 0% 80%, 
      rgba(76, 0, 255, 0.15), 
      transparent 50%
    )
  `,
  backgroundBlendMode: 'overlay',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'url("/path/to/noise-texture.png")',
    opacity: 0.03,
    pointerEvents: 'none'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, transparent, rgba(15, 15, 27, 0.8))',
    pointerEvents: 'none'
  }
});

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        //const response = await axios.get('http://localhost:5000/api/blogs');
        const response = await axios.get('https://creative-blog-ui.onrender.com/api/blogs');
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        setError('Blog yazıları yüklenirken bir hata oluştu');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const navigate = useNavigate();

  const handleBlogClick = (category) => {
    navigate(`/blog/${category.toLowerCase()}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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

  return (
    <BlogSection>
      <ParticleBackground />
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Typography
            variant="h3"
            className="blog-title"
            sx={{
              fontWeight: 800,
              mb: 5,
              textAlign: 'center',
              background: 'linear-gradient(90deg, #4C00FF, #FF0080)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Teknoloji & Yazılım Blog
          </Typography>

          {loading ? (
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3
              }}
            >
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
            </Box>
          ) : error ? (
            <Typography color="error" align="center">{error}</Typography>
          ) : (
            <Grid container spacing={4}>
              {blogs.map((post, index) => (
                <Grid item xs={12} md={4} key={post._id || index}>
                  <BlogCard 
                    post={post}
                    variants={itemVariants}
                    onClick={() => handleBlogClick(post.category)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </motion.div>
      </Container>
    </BlogSection>
  );
};

export default Blog;
