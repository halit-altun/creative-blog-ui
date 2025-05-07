import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import BlogDetail from './pages/BlogDetail';
import { AppProvider } from './context/AppContext';
import { useTheme, useMediaQuery } from '@mui/material';

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const handleMouseMove = (e) => {
    if (isLargeScreen) {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseLeave = () => {
    if (isLargeScreen) {
      setCursorPosition({ x: -100, y: -100 });
    }
  };

  return (
    <AppProvider>
      <Router>
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column',
            minHeight: '100vh',
            cursor: isLargeScreen ? 'none' : 'auto',
            position: 'relative',
            paddingTop: '0',
            backgroundColor: '#0a0a0a',
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {isLargeScreen && (
            <div
              style={{
                width: '20px',
                height: '20px',
                background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
                borderRadius: '50%',
                position: 'fixed',
                pointerEvents: 'none',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999,
                left: cursorPosition.x,
                top: cursorPosition.y,
                boxShadow: '0 0 20px rgba(255, 0, 128, 0.5)',
                transition: 'opacity 0.2s',
              }}
            />
          )}
          
          <Navbar />
          
          <main style={{ 
            flex: '1 0 auto',
            position: 'relative',
            marginBottom: 0,
            backgroundColor: '#0a0a0a',
            minHeight: 'calc(100vh - 80px)'
          }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:category" element={<BlogDetail />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
