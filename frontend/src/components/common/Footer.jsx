import React from 'react';
import { Box, Container, Grid, Typography, IconButton, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { styled, keyframes } from '@mui/material/styles';
import { FaInstagram, FaLinkedinIn, FaGithub} from 'react-icons/fa';
import { Email, Phone, LocationOn, KeyboardArrowUp } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import FooterCards from './FooterCards';

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const gradientText = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const StyledFooter = styled('footer')(({ theme }) => ({
  backgroundColor: '#0a0a0a',
  color: '#fff',
  padding: '20px 0 10px 0',
  position: 'relative',
  overflow: 'hidden',
  marginTop: 'auto',
  flexShrink: 0,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(-45deg, #4C00FF, #FF0080, #4C00FF, #FF0080)',
    backgroundSize: '400% 400%',
    animation: `${gradientAnimation} 15s ease infinite`,
    opacity: 0.15,
    zIndex: 0,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
    animation: `${shimmer} 3s infinite linear`,
  },
  '@keyframes gradientAnimation': {
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  }
}));

const GradientOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '100%',
  background: 'linear-gradient(135deg, rgba(76, 0, 255, 0.1) 0%, rgba(255, 0, 128, 0.1) 100%)',
  zIndex: 1,
});

const ContentWrapper = styled(Box)({
  position: 'relative',
  zIndex: 2,
  padding: '0 20px',
  '& h4, & h6': {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '20px',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: '-5px',
      width: '50px',
      height: '2px',
      backgroundColor: '#FF0080',
    },
  },
  '& p': {
    color: 'rgba(255,255,255,0.8)',
    lineHeight: '1.6',
  }
});

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: '#D4BBFF',
  margin: '0 10px',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  position: 'relative',
  cursor: 'none',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
    opacity: 0,
    transition: 'all 0.4s ease',
    transform: 'scale(0.8)',
  },
  '&:hover': {
    transform: 'translateY(-5px) rotate(360deg) scale(1.1)',
    '&::before': {
      opacity: 0.7,
      transform: 'scale(2)',
    },
    '& svg': {
      color: '#FF0080',
      filter: 'drop-shadow(0 0 5px #FF0080)',
    },
  },
  '& svg': {
    zIndex: 1,
    position: 'relative',
  },
  animation: `${float} 3s ease-in-out infinite`,
  animationDelay: props => props.delay || '0s',
}));

const AnimatedBox = motion(Box);

const ScrollButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
  color: '#fff',
  borderRadius: '50%',
  padding: '15px',
  zIndex: 1000,
  cursor: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#FF0080',
    transform: 'translateY(-5px)',
    boxShadow: '0 0 20px rgba(255, 0, 128, 0.5)',
  },
}));

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        when: "beforeChildren",
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

  const [isVisible, setIsVisible] = useState(false);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    blogCount: 0,
    projectCount: 0
  });
  const { projectCount, blogCount, setBlogCount } = useAppContext();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blogs`);
        // Get the latest 3 blogs
        setLatestBlogs(response.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching latest blogs:', error);
      }
    };

    fetchLatestBlogs();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch blog count
        //const blogsResponse = await axios.get('http://localhost:5000/api/blogs');
        //const projectsResponse = await axios.get('http://localhost:5000/api/projects');

        const blogsResponse = await axios.get('https://creative-blog-ui.onrender.com/api/blogs');
        const projectsResponse = await axios.get('https://creative-blog-ui.onrender.com/api/projects');

        setStats({
          blogCount: blogsResponse.data.length,
          projectCount: projectsResponse.data.length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchBlogCount = async () => {
      try {
        //const response = await axios.get('http://localhost:5000/api/blogs');
        const response = await axios.get('https://creative-blog-ui.onrender.com/api/blogs');
        console.log('API Response:', response.data); 

        const blogs = Array.isArray(response.data) ? response.data : [];
        const uniqueBlogIds = new Set(blogs.map(blog => blog._id)).size;
        setBlogCount(uniqueBlogIds);
      } catch (error) {
        console.error('Error fetching blog count:', error);
        setBlogCount(0);
      }
    };

    fetchBlogCount();
  }, [setBlogCount]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <StyledFooter>
      <GradientOverlay />
      <ContentWrapper>
        <Container maxWidth="lg">
          <AnimatedBox
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <FooterCards 
              itemVariants={itemVariants}
              latestBlogs={latestBlogs}
              projectCount={projectCount}
              blogCount={blogCount}
            />

            {/* Sosyal Medya İkonları */}
            <Box
              component={motion.div}
              variants={itemVariants}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 3,
                mb: 2,
                gap: 2,
              }}
            >
              <SocialButton 
                component="a"
                href="https://www.instagram.com/_halitaltun/"
                target="_blank"
                rel="noopener noreferrer"
                delay="0s"
              >
                <FaInstagram />
              </SocialButton>
              <SocialButton 
                component="a"
                href="https://www.linkedin.com/in/halit-altun-923207258/"
                target="_blank"
                rel="noopener noreferrer"
                delay="0.2s"
              >
                <FaLinkedinIn />
              </SocialButton>
              <SocialButton 
                component="a"
                href="https://github.com/halit-altun"
                target="_blank"
                rel="noopener noreferrer"
                delay="0.4s"
              >
                <FaGithub/>
              </SocialButton>
            </Box>

            {/* Telif Hakkı */}
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2, color: 'rgba(255,255,255,0.6)' }}
              component={motion.div}
              variants={itemVariants}
            >
              © {new Date().getFullYear()} DevJourney. Tüm hakları saklıdır.
            </Typography>
          </AnimatedBox>
        </Container>
      </ContentWrapper>
      <AnimatedBox
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ScrollButton
          onClick={scrollToTop}
          aria-label="scroll to top"
          sx={{ display: isVisible ? 'flex' : 'none' }}
        >
          <KeyboardArrowUp />
        </ScrollButton>
      </AnimatedBox>
    </StyledFooter>
  );
};

export default Footer;
