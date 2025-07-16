import React, { useState } from 'react';
import {
  Typography,
  Button,
  Link,
  Container,
  TextField,
  Stack,
  Paper,
  Box,
  Grid,
  Divider,
  Chip,
  Alert,
  InputAdornment,
} from '@mui/material';
import {
  VerifiedUser,
  Email,
  Security,
  Send,
} from '@mui/icons-material';

export default function VerifyPage() {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Verify code:', code);
  };

  const handleResend = () => {
    console.log('Resending verification code...');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        m: 0,
        p: 0,
      }}
    >
      <Container maxWidth={false} sx={{ width: '100%', height: '100vh', p: 0 }}>
        <Grid container spacing={0} sx={{ height: '100vh' }}>
          {/* Left Panel - Hidden on mobile */}
          <Grid 
            size={{ xs: 0, md: 6 }} 
            sx={{ 
              display: { xs: 'none', md: 'flex' },
              background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
              backdropFilter: 'blur(10px)',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: 4,
              position: 'relative',
              overflow: 'hidden',
              height: '100vh',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              }}
            />
            <Stack spacing={4} alignItems="center" sx={{ zIndex: 1 }}>
              <Security sx={{ fontSize: 80, color: 'white', opacity: 0.9 }} />
              <Typography 
                variant="h3" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 700,
                  textAlign: 'center',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                Procto
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'rgba(255,255,255,0.9)', 
                  textAlign: 'center',
                  maxWidth: 300
                }}
              >
                Secure Email Verification
              </Typography>
              <Stack spacing={2} sx={{ width: '100%', maxWidth: 300 }}>
                {[
                  'Email Protection',
                  'Secure Access',
                  'Account Safety'
                ].map((feature, index) => (
                  <Chip
                    key={index}
                    label={feature}
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 500,
                      '& .MuiChip-label': { px: 2 }
                    }}
                  />
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Right Panel - Verify Form */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={24}
              sx={{
                height: '100vh',
                borderRadius: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: { xs: 3, sm: 4, md: 5 },
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Stack spacing={4}>
                {/* Header */}
                <Stack spacing={2} alignItems="center">
                  <VerifiedUser 
                    sx={{ 
                      fontSize: 48, 
                      color: 'primary.main',
                      p: 1,
                      borderRadius: '50%',
                      bgcolor: 'action.hover'
                    }} 
                  />
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 600,
                      color: 'text.primary',
                      textAlign: 'center'
                    }}
                  >
                    Verify Your Email
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'text.secondary',
                      textAlign: 'center',
                      maxWidth: 400
                    }}
                  >
                    We sent a verification code to your email address. Please enter the code below to verify your account.
                  </Typography>
                </Stack>

                {/* Demo Alert */}
                <Alert 
                  severity="warning" 
                  sx={{ 
                    borderRadius: 2,
                    '& .MuiAlert-message': { width: '100%' }
                  }}
                >
                  <Typography variant="body2">
                    <strong>Demo Mode:</strong> Enter any 6-digit code to proceed
                  </Typography>
                </Alert>

                {/* Form */}
                <Box component="form" onSubmit={handleSubmit}>
                  <Stack spacing={4}>
                    <TextField
                      fullWidth
                      label="Verification Code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      required
                      placeholder="Enter 6-digit code"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: 'action.active' }} />
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{
                        maxLength: 6,
                        style: { 
                          textAlign: 'center', 
                          fontSize: '1.2rem', 
                          letterSpacing: '0.3rem',
                          fontWeight: 600
                        }
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          transform: 'translate(14px, 16px) scale(1)',
                        },
                        '& .MuiInputLabel-shrink': {
                          transform: 'translate(14px, -9px) scale(0.75)',
                        },
                      }}
                    />

                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        background: 'linear-gradient(45deg, #FF9800 30%, #FFC107 90%)',
                        boxShadow: '0 3px 5px 2px rgba(255, 152, 0, .3)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #F57C00 30%, #FF8F00 90%)',
                          transform: 'translateY(-1px)',
                          boxShadow: '0 6px 10px 2px rgba(255, 152, 0, .3)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Verify Email
                    </Button>

                    <Button
                      fullWidth
                      variant="outlined"
                      size="large"
                      onClick={handleResend}
                      startIcon={<Send />}
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        '&:hover': {
                          borderColor: 'primary.dark',
                          backgroundColor: 'action.hover',
                          transform: 'translateY(-1px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Resend Code
                    </Button>
                  </Stack>
                </Box>

                {/* Divider */}
                <Divider sx={{ my: 2 }}>
                  <Chip label="Need help?" size="small" />
                </Divider>

                {/* Back to Sign In Link */}
                <Stack direction="row" justifyContent="center" spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    Wrong email address?
                  </Typography>
                  <Link 
                    href="/signin" 
                    variant="body2"
                    sx={{ 
                      fontWeight: 600,
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    Back to Sign In
                  </Link>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
