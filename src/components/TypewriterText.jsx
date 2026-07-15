import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/material/styles';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const emojiRegex = /\p{Extended_Pictographic}/u;

const emojiSx = {
  display: 'inline',
  color: 'initial',
  background: 'none',
  backgroundImage: 'none',
  WebkitBackgroundClip: 'unset',
  backgroundClip: 'unset',
  WebkitTextFillColor: 'initial',
  textShadow: 'none',
  filter: 'none',
};

const TypewriterText = ({
  text = '',
  speed = 45,
  startDelay = 0,
  showCursor = true,
  preserveEmojiColor = false,
  onComplete,
  component = 'span',
  sx = {},
  ...props
}) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);

    const chars = Array.from(text || '');

    if (!chars.length) {
      setDone(true);
      onComplete?.();
      return undefined;
    }

    let index = 0;
    let intervalId;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1;
        setDisplayed(chars.slice(0, index).join(''));

        if (index >= chars.length) {
          clearInterval(intervalId);
          setDone(true);
          onComplete?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay, onComplete]);

  const renderContent = () => {
    if (!preserveEmojiColor) {
      return displayed;
    }

    return Array.from(displayed).map((char, index) =>
      emojiRegex.test(char) ? (
        <Box component="span" key={`emoji-${index}`} sx={emojiSx}>
          {char}
        </Box>
      ) : (
        <React.Fragment key={`char-${index}`}>{char}</React.Fragment>
      )
    );
  };

  return (
    <Typography
      component={component}
      sx={{
        display: 'inline',
        whiteSpace: 'pre-wrap',
        ...sx,
      }}
      {...props}
    >
      {renderContent()}
      {showCursor && !done && (
        <Box
          component="span"
          aria-hidden
          sx={{
            display: 'inline-block',
            width: '3px',
            height: '0.9em',
            ml: '3px',
            verticalAlign: 'text-bottom',
            backgroundColor: '#FF0080',
            backgroundImage: 'none',
            WebkitBackgroundClip: 'unset',
            backgroundClip: 'unset',
            color: '#FF0080',
            animation: `${blink} 0.8s step-end infinite`,
          }}
        />
      )}
    </Typography>
  );
};

export default TypewriterText;
