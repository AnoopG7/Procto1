import React, { useState } from 'react';
import {
  Typography,
  Button,
  Link,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  Stack,
  Paper,
  Box,
  Grid,
  Divider,
  Chip,
  Alert,
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Email,
  Lock,
  Security,
  LoginOutlined 
} from '@mui/icons-material';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign in:', { email, password, rememberMe });
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
                Advanced Exam Proctoring Platform
              </Typography>
              <Stack spacing={2} sx={{ width: '100%', maxWidth: 300 }}>
                {[
                  'AI-Powered Monitoring',
                  'Real-time Analytics',
                  'Secure Environment'
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

          {/* Right Panel - Login Form */}
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
                  <LoginOutlined 
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
                    Welcome Back
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'text.secondary',
                      textAlign: 'center',
                      maxWidth: 300
                    }}
                  >
                    Sign in to access your proctoring dashboard
                  </Typography>
                </Stack>

                {/* Demo Alert */}
                <Alert 
                  severity="info" 
                  sx={{ 
                    borderRadius: 2,
                    '& .MuiAlert-message': { width: '100%' }
                  }}
                >
                  <Typography variant="body2">
                    <strong>Demo Mode:</strong> Use any email and password to continue
                  </Typography>
                </Alert>

                {/* Form */}
                <Box component="form" onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: 'action.active' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock sx={{ color: 'action.active' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{ mr: 0.5 }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    />

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => setRememberMe(!rememberMe)}
                        sx={{ 
                          color: rememberMe ? 'primary.main' : 'text.secondary',
                          fontWeight: rememberMe ? 600 : 400
                        }}
                      >
                        {rememberMe ? '✓ ' : ''}Remember me
                      </Button>
                      <Link 
                        href="/verify" 
                        variant="body2"
                        sx={{ 
                          textDecoration: 'none',
                          fontWeight: 500,
                          '&:hover': { textDecoration: 'underline' }
                        }}
                      >
                        Forgot password?
                      </Link>
                    </Stack>

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
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                          transform: 'translateY(-1px)',
                          boxShadow: '0 6px 10px 2px rgba(33, 203, 243, .3)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Sign In to Dashboard
                    </Button>
                  </Stack>
                </Box>

                {/* Divider */}
                <Divider sx={{ my: 2 }}>
                  <Chip label="New to Procto?" size="small" />
                </Divider>

                {/* Sign Up Link */}
                <Stack direction="row" justifyContent="center" spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    Don't have an account?
                  </Typography>
                  <Link 
                    href="/signup" 
                    variant="body2"
                    sx={{ 
                      fontWeight: 600,
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    Create Account
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
