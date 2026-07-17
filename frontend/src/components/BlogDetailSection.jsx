import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const BlogDetailSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  position: 'relative',
  backgroundColor: '#0a0a0a',
  overflow: 'hidden',
  paddingTop: '100px',
  paddingBottom: '50px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 50% 50%, rgba(76, 0, 255, 0.15) 0%, transparent 60%),
      radial-gradient(circle at 80% 20%, rgba(255, 0, 128, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 40%),
      conic-gradient(from 45deg at 50% 50%, 
        rgba(76, 0, 255, 0.1) 0%, 
        rgba(255, 0, 128, 0.1) 25%, 
        rgba(0, 255, 255, 0.1) 50%, 
        rgba(76, 0, 255, 0.1) 75%, 
        rgba(255, 0, 128, 0.1) 100%
      )
    `,
    opacity: 0.8,
    zIndex: 1,
    animation: 'rotateBackground 20s linear infinite',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      repeating-linear-gradient(
        45deg,
        transparent 0,
        transparent 10px,
        rgba(76, 0, 255, 0.03) 10px,
        rgba(76, 0, 255, 0.03) 20px
      ),
      repeating-linear-gradient(
        -45deg,
        transparent 0,
        transparent 10px,
        rgba(255, 0, 128, 0.03) 10px,
        rgba(255, 0, 128, 0.03) 20px
      )
    `,
    backdropFilter: 'blur(100px)',
    opacity: 0.5,
    zIndex: 1,
  },
  '@keyframes rotateBackground': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    }
  },
  '@keyframes pulseGlow': {
    '0%, 100%': {
      opacity: 0.5,
    },
    '50%': {
      opacity: 0.8,
    }
  }
}));

export default BlogDetailSection; 