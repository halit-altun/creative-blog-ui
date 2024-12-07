import React, { useState, useEffect } from 'react';
import { AppBar, Container, Box, Typography, IconButton, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const gradientText = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
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
    background: 'linear-gradient(-45deg, #4C00FF, #FF0080, #4C00FF, #FF0080)',
    backgroundSize: '400% 400%',
    animation: `${gradientAnimation} 15s ease infinite`,
    opacity: 0.15,
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
  background: 'linear-gradient(90deg, #D4BBFF, #FFBBDD)',
  backgroundSize: '200% auto',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  fontWeight: 600,
  animation: `${gradientText} 3s linear infinite`,
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
    background: 'linear-gradient(90deg, #D4BBFF, #FFBBDD)',
    backgroundSize: '200% auto',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    '&::before': {
      width: '100%',
    },
  },
}));

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { title: 'Ana Sayfa', path: '/' },
    { title: 'Hakkımda', path: '/about' },
    { title: 'Blog', path: '/blog' },
    { title: 'Projeler', path: '/projects' },
    { title: 'İletişim', path: '/contact' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <StyledAppBar 
      elevation={scrolled ? 4 : 0}
      sx={{ 
        transition: 'all 0.3s ease',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.95)' : '#0a0a0a',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                background: 'linear-gradient(90deg, #4C00FF, #FF0080, #4C00FF)',
                backgroundSize: '200% auto',
                animation: `${gradientText} 3s linear infinite`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textDecoration: 'none',
                fontWeight: 'bold',
                cursor: 'none',
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                textShadow: '1px 1px 2px rgba(76, 0, 255, 0.2)',
                letterSpacing: '0.5px',
              }}
            >
              Halit Altun
            </Typography>
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                background: 'linear-gradient(90deg, #4C00FF, #FF0080, #4C00FF)',
                backgroundSize: '200% auto',
                animation: `${gradientText} 3s linear infinite`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textDecoration: 'none',
                fontWeight: 'bold',
                cursor: 'none',
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                textShadow: '1px 1px 2px rgba(76, 0, 255, 0.2)',
                letterSpacing: '0.5px',
              }}
            >
              {'<'}Full Stack Developer{'>'}
            </Typography>
          </Box>

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
            onClick={handleDrawerToggle}
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

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 240,
            background: '#0a0a0a',
            borderLeft: '1px solid rgba(255,255,255,0.1)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(circle at 20% 20%, rgba(76, 0, 255, 0.15) 0%, transparent 25%),
                radial-gradient(circle at 80% 80%, rgba(255, 0, 128, 0.15) 0%, transparent 25%),
                radial-gradient(circle at 50% 50%, rgba(76, 0, 255, 0.1) 0%, transparent 50%),
                linear-gradient(135deg, rgba(76, 0, 255, 0.05) 0%, rgba(255, 0, 128, 0.05) 100%)
              `,
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
          },
        }}
      >
        <List sx={{ 
          pt: 8,
          position: 'relative',
          zIndex: 1 
        }}>
          {navItems.map((item) => (
            <ListItem 
              key={item.path}
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                color: '#fff',
                '&:hover': {
                  background: 'rgba(255,255,255,0.1)',
                },
                ...(location.pathname === item.path && {
                  background: 'linear-gradient(90deg, rgba(76, 0, 255, 0.2), rgba(255, 0, 128, 0.2))',
                })
              }}
            >
              <ListItemText 
                primary={item.title}
                sx={{
                  '& .MuiListItemText-primary': {
                    background: 'linear-gradient(90deg, #D4BBFF, #FFBBDD)',
                    backgroundSize: '200% auto',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    fontWeight: 600,
                    animation: `${gradientText} 3s linear infinite`,
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </StyledAppBar>
  );
};

export default Navbar;
