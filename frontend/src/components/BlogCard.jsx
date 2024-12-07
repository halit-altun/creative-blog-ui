import React, { useState } from 'react';
import { Typography, Box, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { cyber } from '../animations';

const BlogCardWrapper = styled(motion.div)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '15px',
  padding: '25px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  cursor: 'none',
  position: 'relative',
  zIndex: 2,
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 30px rgba(76, 0, 255, 0.3)',
    animation: `${cyber} 2s infinite`,
    border: '1px solid rgba(255, 255, 255, 0.2)',
  }
}));

const BlogCard = ({ post, onClick, variants }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExcerptClick = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const truncateExcerpt = (text) => {
    const words = text.split(' ');
    let result = '';
    let lines = 0;
    let currentLine = '';
    
    for (let word of words) {
      if ((currentLine + word).length > 50) {
        if (lines === 1) {
          return result.trim() + '...';
        }
        result += currentLine.trim() + ' ';
        currentLine = word + ' ';
        lines++;
      } else {
        currentLine += word + ' ';
      }
    }
    
    return text;
  };

  return (
    <BlogCardWrapper 
      variants={variants} 
      initial="hidden"
      animate="visible"
      onClick={onClick}
    >
      <Box sx={{ mb: 2 }}>
        <Chip
          label={post.category}
          sx={{
            background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
            color: 'white',
            fontWeight: 600
          }}
        />
      </Box>
      
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 2,
          background: 'linear-gradient(45deg, #fff, rgba(255,255,255,0.7))',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {post.title}
      </Typography>

      <Typography
        variant="body2"
        onClick={handleExcerptClick}
        sx={{
          color: 'rgba(255,255,255,0.7)',
          mb: 2,
          flex: 1,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            color: 'rgba(255,255,255,0.9)',
            cursor: 'none',
          }
        }}
      >
        {expanded ? post.excerpt : truncateExcerpt(post.excerpt)}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
        {post.tags.map((tag, idx) => (
          <Chip
            key={idx}
            label={tag}
            size="small"
            sx={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              '&:hover': {
                background: 'rgba(255,255,255,0.2)',
              }
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '0.875rem'
        }}
      >
        <span>{post.date}</span>
        <span>{post.readTime}</span>
      </Box>
    </BlogCardWrapper>
  );
};

export default BlogCard; 