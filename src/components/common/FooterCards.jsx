import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FooterCards = ({ itemVariants, latestBlogs, projectCount, blogCount }) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={4}>
      {/* DevJourney Bölümü */}
      <Grid item xs={12} md={4}>
        <motion.div variants={itemVariants}>
          <Box
            sx={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '15px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              minHeight: '250px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box 
              sx={{ 
                p: 2,
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Typography 
                variant="h3"
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  mb: 1,
                }}
              >
                DevJourney
              </Typography>
            </Box>
            
            <Box sx={{ p: 2 }}>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Modern web teknolojileriyle çıktığım developer yolculuğumda, React ve Node.js ile projeler geliştiriyor, öğrendiklerimi blog yazılarımda paylaşıyorum.
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Grid>

      {/* İstatistikler */}
      <Grid item xs={12} md={2}>
        <motion.div variants={itemVariants}>
          <Box
            sx={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '15px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              minHeight: '250px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box 
              sx={{ 
                p: 2,
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Typography 
                variant="h3"
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  mb: 1,
                }}
              >
                İstatistikler
              </Typography>
            </Box>

            <Box 
              onClick={() => {
                navigate('/projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              sx={{ 
                p: 2,
                cursor: 'none',
                transition: 'all 0.3s ease',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  background: 'rgba(76, 0, 255, 0.1)',
                  '& .stat-number': {
                    transform: 'scale(1.1)',
                    color: '#FF0080',
                  },
                  '& .stat-label': {
                    color: '#fff',
                  }
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography
                  className="stat-number"
                  sx={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {projectCount}
                </Typography>
                <Typography
                  className="stat-label"
                  sx={{ 
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Proje
                </Typography>
              </Box>
            </Box>

            <Box 
              onClick={() => navigate('/blog')}
              sx={{ 
                p: 2,
                cursor: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 0, 128, 0.1)',
                  '& .stat-number': {
                    transform: 'scale(1.1)',
                    color: '#4C00FF',
                  },
                  '& .stat-label': {
                    color: '#fff',
                  }
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography
                  className="stat-number"
                  sx={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {blogCount}
                </Typography>
                <Typography
                  className="stat-label"
                  sx={{ 
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Blog Yazısı
                </Typography>
              </Box>
            </Box>
          </Box>
        </motion.div>
      </Grid>

      {/* İletişim Bilgileri ve Son Yazılar */}
      <Grid item xs={12} md={6}>
        <Grid container spacing={4}>
          {/* Son Blog Yazıları */}
          <Grid item xs={12} sm={6}>
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  minHeight: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box 
                  sx={{ 
                    p: 2,
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Typography 
                    variant="h3"
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      mb: 1,
                    }}
                  >
                    Son Yazılar
                  </Typography>
                </Box>
                
                {Array.isArray(latestBlogs) ? latestBlogs.map((blog, index) => (
                  <Box
                    key={index}
                    component="a"
                    onClick={() => navigate(`/blog/${blog.category}`)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 2,
                      textDecoration: 'none',
                      color: 'rgba(255,255,255,0.8)',
                      transition: 'all 0.3s ease',
                      cursor: 'none',
                      borderBottom: index !== latestBlogs.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                      '&:hover': {
                        background: 'rgba(76, 0, 255, 0.1)',
                        color: '#FF0080',
                        '& .blog-text': {
                          color: '#fff',
                        }
                      },
                      '&::before': {
                        content: '"→"',
                        marginRight: '8px',
                        color: '#4C00FF',
                        transition: 'transform 0.3s ease',
                      },
                      '&:hover::before': {
                        transform: 'translateX(5px)',
                      }
                    }}
                  >
                    <Typography 
                      variant="body2"
                      className="blog-text"
                      sx={{ 
                        color: 'rgba(255,255,255,0.6)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {blog.title}
                    </Typography>
                  </Box>
                )): (
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                      Yükleniyor...
                    </Typography>
                  </Box>
                )}
              </Box>
            </motion.div>
          </Grid>

          {/* İletişim Bilgileri */}
          <Grid item xs={12} sm={6}>
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  minHeight: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box 
                  sx={{ 
                    p: 2,
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Typography 
                    variant="h3"
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      mb: 1,
                    }}
                  >
                    İletişim
                  </Typography>
                </Box>

                <Box 
                  component="a"
                  href="mailto:halitaltun002@gmail.com"
                  sx={{ 
                    p: 2,
                    display: 'flex', 
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: 'inherit',
                    cursor: 'none',
                    transition: 'all 0.3s ease',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      background: 'rgba(76, 0, 255, 0.1)',
                      '& .contact-text': {
                        color: '#fff',
                      }
                    },
                  }}
                >
                  <Email sx={{ mr: 1 }} />
                  <Typography 
                    variant="body2" 
                    className="contact-text"
                    sx={{ 
                      color: 'rgba(255,255,255,0.6)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    halitaltun002@gmail.com
                  </Typography>
                </Box>

                <Box 
                  component="a"
                  href="tel:+905313825079"
                  sx={{ 
                    p: 2,
                    display: 'flex', 
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: 'inherit',
                    cursor: 'none',
                    transition: 'all 0.3s ease',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      background: 'rgba(76, 0, 255, 0.1)',
                      '& .contact-text': {
                        color: '#fff',
                      }
                    },
                  }}
                >
                  <Phone sx={{ mr: 1 }} />
                  <Typography 
                    variant="body2"
                    className="contact-text"
                    sx={{ 
                      color: 'rgba(255,255,255,0.6)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    +90 531 382 50 79
                  </Typography>
                </Box>

                <Box 
                  component="a"
                  href="https://maps.google.com/?q=Güngören,Istanbul"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    p: 2,
                    display: 'flex', 
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: 'inherit',
                    cursor: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(76, 0, 255, 0.1)',
                      '& .contact-text': {
                        color: '#fff',
                      }
                    },
                  }}
                >
                  <LocationOn sx={{ mr: 1 }} />
                  <Typography 
                    variant="body2"
                    className="contact-text"
                    sx={{ 
                      color: 'rgba(255,255,255,0.6)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    İstanbul, Güngören
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FooterCards; 