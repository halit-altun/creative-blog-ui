import React, { useState, useEffect } from 'react';
import { AppBar, Container, Box, Typography, IconButton, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { styled, keyframes } from '@mui/material/styles';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#0a0a0a',
  padding: '15px 0',
  position: 'fixed',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(76, 0, 255, 0.15) 0%, rgba(255, 0, 128, 0.15) 100%)',
    animation: 'gradientAnimation 15s ease infinite',
    zIndex: 0,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
    animation: `${shimmer} 3s infinite linear`,
  },
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  color: '#fff',
  margin: '0 10px',
  position: 'relative',
  cursor: 'none',
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: -2,
    left: 0,
    width: active ? '100%' : '0%',
    height: '2px',
    background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
    transition: 'width 0.3s ease',
  },
  '&:hover': {
    background: 'transparent',
    '&::before': {
      width: '100%',
    },
  },
}));

const Navbar = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const navItems = [
    { title: 'Ana Sayfa', path: '/' },
    { title: 'Hakkımda', path: '/about' },
    { title: 'Blog', path: '/blog' },
    { title: 'Projeler', path: '/projects' },
    { title: 'İletişim', path: '/contact' },
  ];

  return (
    <StyledAppBar 
      elevation={scrolled ? 4 : 0}
      onMouseMove={handleMouseMove}
      sx={{ 
        cursor: 'none',
        transition: 'all 0.3s ease',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.95)' : '#0a0a0a',
      }}
    >
      <Box
        sx={{
          width: '20px',
          height: '20px',
          background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
          borderRadius: '50%',
          position: 'absolute',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          left: cursorPosition.x,
          top: cursorPosition.y,
          boxShadow: '0 0 20px rgba(255, 0, 128, 0.5)',
        }}
      />
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textDecoration: 'none',
              fontWeight: 'bold',
              cursor: 'none',
            }}
          >
            Blog Adı
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navItems.map((item) => (
              <NavButton
                key={item.path}
                component={Link}
                to={item.path}
                active={location.pathname === item.path ? 1 : 0}
              >
                {item.title}
              </NavButton>
            ))}
          </Box>

          <IconButton
            sx={{ 
              display: { xs: 'block', md: 'none' },
              color: 'white',
              cursor: 'none',
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;
