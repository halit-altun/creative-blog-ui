import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Paper, Alert, Snackbar } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import ParticleBackground from '../components/ParticleBackground';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { shimmer, gradientText, cyber, neonPulse } from '../animations';
import ContactCards from '../components/ContactCards';

const ContactSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: '#0a0a0a',
  position: 'relative',
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
      linear-gradient(217deg, rgba(76, 0, 255, 0.1), rgba(255,0,0,0) 70.71%),
      linear-gradient(127deg, rgba(255, 0, 128, 0.1), rgba(0,255,0,0) 70.71%),
      linear-gradient(336deg, rgba(76, 0, 255, 0.15), rgba(0,0,255,0) 70.71%),
      radial-gradient(circle at 50% 50%, rgba(76, 0, 255, 0.05) 0%, transparent 60%)
    `,
    opacity: 0.9,
    zIndex: 1,
    animation: `${neonPulse} 8s ease-in-out infinite`,
  }
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  padding: '30px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 30px rgba(76, 0, 255, 0.3)',
    animation: `${cyber} 2s infinite`,
    '&::before': {
      transform: 'translateX(100%)',
    }
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
    transition: 'transform 0.5s ease',
  }
}));

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const validationSchema = Yup.object({
    name: Yup.string().required('İsim alanı zorunludur'),
    surname: Yup.string().required('Soyad alanı zorunludur'),
    email: Yup.string().email('Geçerli bir email adresi giriniz').required('Email alanı zorunludur'),
    subject: Yup.string().required('Konu alanı zorunludur'),
    message: Yup.string().required('Mesaj alanı zorunludur').min(10, 'Mesaj en az 10 karakter olmalıdır')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      subject: '',
      message: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setStatus }) => {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/mail/send`, values);
        setStatus({ success: true });
        resetForm();
        setSnackbar({
          open: true,
          message: 'Message sent successfully!',
          severity: 'success'
        });
      } catch (error) {
        setStatus({ success: false });
        setSnackbar({
          open: true,
          message: 'Failed to send message. Please try again.',
          severity: 'error'
        });
      } finally {
        setSubmitting(false);
      }
    }
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <ContactSection>
      <ParticleBackground />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              textAlign: 'center',
              mb: 6,
              background: 'linear-gradient(90deg, #4C00FF, #FF0080, #4C00FF)',
              backgroundSize: '200% auto',
              animation: `${gradientText} 3s linear infinite`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            İletişime Geç
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <ContactCards />
            </Grid>

            <Grid item xs={12} md={7}>
              <motion.div variants={itemVariants}>
                <StyledPaper component="form" onSubmit={formik.handleSubmit}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      background: 'linear-gradient(45deg, #4C00FF, #FF0080)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    Mesaj Gönder
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="name"
                        label="Adınız"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                              borderColor: 'rgba(255,255,255,0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(255,255,255,0.5)',
                              cursor: 'none',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#4C00FF',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                          },
                          '& .MuiOutlinedInput-input': {
                            cursor: 'none',
                          },
                          '&:hover': {
                            cursor: 'none',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="surname"
                        label="Soyadınız"
                        value={formik.values.surname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.surname && Boolean(formik.errors.surname)}
                        helperText={formik.touched.surname && formik.errors.surname}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                              borderColor: 'rgba(255,255,255,0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(255,255,255,0.5)',
                              cursor: 'none',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#4C00FF',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                          },
                          '& .MuiOutlinedInput-input': {
                            cursor: 'none',
                          },
                          '&:hover': {
                            cursor: 'none',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                              borderColor: 'rgba(255,255,255,0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(255,255,255,0.5)',
                              cursor: 'none',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#4C00FF',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                          },
                          '& .MuiOutlinedInput-input': {
                            cursor: 'none',
                          },
                          '&:hover': {
                            cursor: 'none',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="subject"
                        label="Konu"
                        value={formik.values.subject}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.subject && Boolean(formik.errors.subject)}
                        helperText={formik.touched.subject && formik.errors.subject}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                              borderColor: 'rgba(255,255,255,0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(255,255,255,0.5)',
                              cursor: 'none',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#4C00FF',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                          },
                          '& .MuiOutlinedInput-input': {
                            cursor: 'none',
                          },
                          '&:hover': {
                            cursor: 'none',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        name="message"
                        label="Mesajınız"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.message && Boolean(formik.errors.message)}
                        helperText={formik.touched.message && formik.errors.message}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                              borderColor: 'rgba(255,255,255,0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(255,255,255,0.5)',
                              cursor: 'none',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#4C00FF',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                          },
                          '& .MuiOutlinedInput-input': {
                            cursor: 'none',
                          },
                          '&:hover': {
                            cursor: 'none',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={formik.isSubmitting}
                        component={motion.button}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        sx={{
                          background: 'linear-gradient(45deg, #4C00FF 30%, #FF0080 90%)',
                          height: '50px',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          overflow: 'hidden',
                          cursor: 'none',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                            animation: `${shimmer} 2s infinite`,
                          },
                          '&:hover': {
                            boxShadow: '0 0 20px rgba(76, 0, 255, 0.5)',
                          },
                        }}
                      >
                        {formik.isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
                      </Button>
                    </Grid>
                  </Grid>
                </StyledPaper>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ContactSection>
  );
};

export default Contact;
