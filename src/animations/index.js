import { keyframes } from '@mui/material/styles';

// Temel animasyonlar
export const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

export const gradientText = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

// Efekt animasyonları
export const cyber = keyframes`
  0% { box-shadow: 0 0 5px #4C00FF, 0 0 10px #4C00FF, 0 0 20px #4C00FF; }
  50% { box-shadow: 0 0 10px #FF0080, 0 0 20px #FF0080, 0 0 40px #FF0080; }
  100% { box-shadow: 0 0 5px #4C00FF, 0 0 10px #4C00FF, 0 0 20px #4C00FF; }
`;

export const glow = keyframes`
  0% { text-shadow: 0 0 10px rgba(76, 0, 255, 0.5), 0 0 20px rgba(76, 0, 255, 0.3); }
  50% { text-shadow: 0 0 20px rgba(255, 0, 128, 0.5), 0 0 40px rgba(255, 0, 128, 0.3); }
  100% { text-shadow: 0 0 10px rgba(76, 0, 255, 0.5), 0 0 20px rgba(76, 0, 255, 0.3); }
`;

export const neonPulse = keyframes`
  0% { box-shadow: 0 0 5px rgba(76, 0, 255, 0.5), 0 0 10px rgba(76, 0, 255, 0.3); }
  50% { box-shadow: 0 0 10px rgba(255, 0, 128, 0.5), 0 0 20px rgba(255, 0, 128, 0.3); }
  100% { box-shadow: 0 0 5px rgba(76, 0, 255, 0.5), 0 0 10px rgba(76, 0, 255, 0.3); }
`;

// Yazı animasyonları
export const typewriter = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

export const cursor = keyframes`
  from, to { border-right-color: transparent }
  50% { border-right-color: #FF0080 }
`;

// Ölçek animasyonları
export const scaleIn = keyframes`
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

export const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`; 