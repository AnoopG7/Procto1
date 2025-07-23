import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
  Divider,
  Chip,
  Alert,
  Fade,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Email,
  Lock,
  Person,
  PersonAdd
} from '@mui/icons-material';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Animation effect when component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (!agreeToTerms) {
      setError('Please agree to the Terms & Conditions');
      return;
    }
    
    // Here you would typically make an API call to register the user
    console.log('Sign up:', { firstName, lastName, email, password, role });
    
    // Here you would typically make an API call to register the user
    console.log('Sign up:', { firstName, lastName, email, password });
    
    // For demo purposes, simulate successful registration
    setError(null);
    navigate('/verify');
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        m: 0,
        p: 0,
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '100%'
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          right: '10%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          filter: 'blur(35px)',
        }}
      />
      
      <Fade in={isVisible} timeout={800}>
        <Container maxWidth="sm" sx={{ py: 4, px: { xs: 2, sm: 3 } }}>
          <Paper
            elevation={10}
            sx={{
              p: 4,
              borderRadius: 2,
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
          >
            <Stack spacing={4} alignItems="center">
              {/* Header */}
              <Box textAlign="center" mb={1}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Create Account
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.7)', 
                    mt: 1 
                  }}
                >
                  Join Procto to start your journey
                </Typography>
              </Box>

              {/* Error Alert */}
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    width: '100%',
                    bgcolor: 'rgba(211, 47, 47, 0.1)', 
                    color: '#f5f5f5',
                    border: '1px solid rgba(211, 47, 47, 0.3)',
                    '& .MuiAlert-icon': {
                      color: '#f48fb1'
                    }
                  }}
                >
                  {error}
                </Alert>
              )}

              {/* Form */}
              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <Stack spacing={3}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="First Name"
                      variant="outlined"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person sx={{ color: 'rgba(255,255,255,0.5)' }} />
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{ 
                        style: { color: 'rgba(255,255,255,0.7)' } 
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                          '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                          '&.Mui-focused fieldset': { borderColor: '#8b5cf6' },
                        },
                        '& .MuiInputBase-input': { color: 'white' }
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Last Name"
                      variant="outlined"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      InputLabelProps={{ 
                        style: { color: 'rgba(255,255,255,0.7)' } 
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                          '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                          '&.Mui-focused fieldset': { borderColor: '#8b5cf6' },
                        },
                        '& .MuiInputBase-input': { color: 'white' }
                      }}
                    />
                  </Stack>
                  
                  <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: 'rgba(255,255,255,0.5)' }} />
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{ 
                      style: { color: 'rgba(255,255,255,0.7)' } 
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                        '&.Mui-focused fieldset': { borderColor: '#8b5cf6' },
                      },
                      '& .MuiInputBase-input': { color: 'white' }
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: 'rgba(255,255,255,0.5)' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleTogglePassword}
                            edge="end"
                            sx={{ color: 'rgba(255,255,255,0.5)' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{ 
                      style: { color: 'rgba(255,255,255,0.7)' } 
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                        '&.Mui-focused fieldset': { borderColor: '#8b5cf6' },
                      },
                      '& .MuiInputBase-input': { color: 'white' }
                    }}
                  />
                  
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>Role</InputLabel>
                    <Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      label="Role"
                      sx={{
                        color: 'white',
                        '& .MuiOutlinedInput-notchedOutline': { 
                          borderColor: 'rgba(255,255,255,0.2)' 
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': { 
                          borderColor: 'rgba(255,255,255,0.4)' 
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                          borderColor: '#8b5cf6' 
                        },
                        '& .MuiSvgIcon-root': { 
                          color: 'rgba(255,255,255,0.7)' 
                        }
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            bgcolor: 'rgba(30, 41, 59, 0.95)',
                            color: 'white',
                            '& .MuiMenuItem-root:hover': {
                              bgcolor: 'rgba(139, 92, 246, 0.15)'
                            },
                            '& .MuiMenuItem-root.Mui-selected': {
                              bgcolor: 'rgba(139, 92, 246, 0.2)'
                            }
                          }
                        }
                      }}
                    >
                      <MenuItem value="student">Student</MenuItem>
                      <MenuItem value="proctor">Proctor</MenuItem>
                      <MenuItem value="admin">Administrator</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        sx={{
                          color: 'rgba(255,255,255,0.7)',
                          '&.Mui-checked': {
                            color: '#8b5cf6',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        I agree to the{' '}
                        <Link 
                          component={RouterLink} 
                          to="/terms" 
                          sx={{ 
                            color: '#8b5cf6',
                            '&:hover': { color: '#a78bfa' }
                          }}
                        >
                          Terms & Conditions
                        </Link>
                      </Typography>
                    }
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    endIcon={<PersonAdd />}
                    sx={{
                      py: 1.5,
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '1rem',
                      '&:hover': {
                        boxShadow: '0 10px 20px rgba(139, 92, 246, 0.3)'
                      }
                    }}
                  >
                    Create Account
                  </Button>

                  <Divider>
                    <Chip 
                      label="OR" 
                      sx={{ 
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        color: 'rgba(255,255,255,0.7)',
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}
                    />
                  </Divider>

                  <Typography 
                    align="center" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.9rem'
                    }}
                  >
                    Already have an account?{' '}
                    <Link
                      component={RouterLink}
                      to="/signin"
                      underline="hover"
                      sx={{ 
                        color: '#8b5cf6',
                        fontWeight: 600,
                        '&:hover': {
                          color: '#a78bfa'
                        }
                      }}
                    >
                      Sign in
                    </Link>
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Paper>
          
          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 3,
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.75rem'
            }}
          >
            © {new Date().getFullYear()} Procto. All rights reserved.
          </Typography>
        </Container>
      </Fade>
    </Box>
  );
}
