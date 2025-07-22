import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Typography,
  Button,
  Link,
  Container,
  TextField,
  Stack,
  Paper,
  Box,
  Alert,
  Fade,
  CircularProgress
} from '@mui/material';
import { 
  CheckCircleOutline,
  LockReset
} from '@mui/icons-material';

export default function VerifyPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  // OTP input refs and state
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));
  
  // Animation effect when component mounts
  useEffect(() => {
    setIsVisible(true);
    
    // Auto focus first input when component loads
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  
  // Timer for resend functionality
  useEffect(() => {
    let interval: number;
    
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [timer, canResend]);
  
  // Handle OTP input changes
  const handleOtpChange = (index: number, value: string) => {
    if (value === ' ') return; // Prevent space input
    
    // Only accept numbers
    if (value && !/^\d*$/.test(value)) return;
    
    // Create a new array with the updated value
    const newOtp = [...otp];
    // If pasting multiple characters, take only the first one
    newOtp[index] = value.substring(0, 1);
    setOtp(newOtp);
    
    // Auto-focus next input if current input is filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Check if all inputs are filled to auto-submit
    if (newOtp.every(digit => digit) && newOtp.join('').length === 6) {
      handleVerify();
    }
  };

  // Handle key press events for navigation between inputs
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move focus to previous input when backspace is pressed on empty input
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  // Handle paste event for OTP
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    // Check if pasted content only contains numbers
    if (!/^\d+$/.test(pastedData)) return;
    
    const pastedOtp = pastedData.substring(0, 6).split('');
    const newOtp = [...otp];
    
    // Fill the OTP fields with pasted data
    pastedOtp.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });
    
    setOtp(newOtp);
    
    // Focus the next empty field or the last field if all are filled
    const nextEmptyIndex = newOtp.findIndex(digit => !digit);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else if (inputRefs.current[5]) {
      inputRefs.current[5].focus();
    }
    
    // Auto-submit if all fields are filled
    if (newOtp.every(digit => digit)) {
      handleVerify();
    }
  };
  
  // Handle OTP verification
  const handleVerify = () => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setError('Please enter a complete verification code');
      return;
    }
    
    setError(null);
    setIsVerifying(true);
    
    // Simulate API verification
    setTimeout(() => {
      if (otpCode === '123456') { // Example validation
        setVerificationSuccess(true);
        setTimeout(() => {
          navigate('/dashboard'); // Redirect after successful verification
        }, 2000);
      } else {
        setError('Invalid verification code. Please try again.');
        setIsVerifying(false);
      }
    }, 1500);
  };
  
  // Handle resend code
  const handleResendCode = () => {
    if (!canResend) return;
    
    setCanResend(false);
    setTimer(60);
    
    // Simulate sending a new code
    setTimeout(() => {
      console.log('New verification code sent to email');
      // Clear OTP fields
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }, 1000);
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
          top: '15%',
          right: '10%',
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
          bottom: '10%',
          left: '15%',
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
                  Verify Your Account
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.7)', 
                    mt: 1,
                    maxWidth: '400px',
                    mx: 'auto'
                  }}
                >
                  Enter the 6-digit code sent to your email address to verify your account
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

              {/* Success Message */}
              {verificationSuccess && (
                <Alert 
                  icon={<CheckCircleOutline fontSize="inherit" />}
                  severity="success" 
                  sx={{ 
                    width: '100%',
                    bgcolor: 'rgba(46, 125, 50, 0.1)', 
                    color: '#f5f5f5',
                    border: '1px solid rgba(46, 125, 50, 0.3)',
                    '& .MuiAlert-icon': {
                      color: '#81c784'
                    }
                  }}
                >
                  Verification successful! Redirecting to dashboard...
                </Alert>
              )}

              {/* OTP Input */}
              {!verificationSuccess && (
                <Box sx={{ width: '100%' }}>
                  <Stack spacing={3} alignItems="center">
                    <Stack 
                      direction="row" 
                      spacing={1} 
                      justifyContent="center"
                      sx={{ width: '100%' }}
                    >
                      {otp.map((digit, index) => (
                        <TextField
                          key={index}
                          inputRef={el => inputRefs.current[index] = el}
                          value={digit}
                          onChange={e => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                          onPaste={index === 0 ? handlePaste : undefined}
                          inputProps={{
                            maxLength: 1,
                            style: { 
                              textAlign: 'center',
                              fontSize: '1.5rem',
                              fontWeight: 600,
                              padding: '12px 0',
                              color: 'white'
                            }
                          }}
                          sx={{
                            width: {xs: '40px', sm: '52px'},
                            height: {xs: '50px', sm: '64px'},
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                              '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                              '&.Mui-focused fieldset': { borderColor: '#8b5cf6' },
                            },
                          }}
                        />
                      ))}
                    </Stack>

                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      disabled={isVerifying || otp.some(digit => !digit)}
                      onClick={handleVerify}
                      startIcon={isVerifying ? <CircularProgress size={20} color="inherit" /> : null}
                      sx={{
                        py: 1.5,
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '1rem',
                        '&:hover': {
                          boxShadow: '0 10px 20px rgba(139, 92, 246, 0.3)'
                        },
                        '&.Mui-disabled': {
                          background: 'rgba(255,255,255,0.12)',
                          color: 'rgba(255,255,255,0.3)'
                        }
                      }}
                    >
                      {isVerifying ? 'Verifying...' : 'Verify Account'}
                    </Button>

                    <Box textAlign="center" sx={{ mt: 2, width: '100%' }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'rgba(255,255,255,0.7)',
                          mb: 1
                        }}
                      >
                        {canResend 
                          ? "Didn't receive the code?" 
                          : `Resend code in ${timer} seconds`
                        }
                      </Typography>
                      
                      <Button
                        variant={canResend ? "outlined" : "outlined"}
                        disabled={!canResend}
                        onClick={handleResendCode}
                        startIcon={<LockReset sx={{ color: canResend ? '#8b5cf6' : 'rgba(255,255,255,0.7)' }} />}
                        sx={{
                          mt: 1,
                          py: 1,
                          px: 2,
                          textTransform: 'none',
                          color: canResend ? '#8b5cf6' : 'rgba(255,255,255,0.7)',
                          borderColor: canResend ? '#8b5cf6' : 'rgba(255,255,255,0.3)',
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          '&:hover': {
                            backgroundColor: canResend ? 'rgba(139, 92, 246, 0.08)' : 'rgba(255,255,255,0.08)',
                            borderColor: canResend ? '#a78bfa' : 'rgba(255,255,255,0.4)'
                          },
                          '&.Mui-disabled': {
                            color: 'rgba(255,255,255,0.7)',
                            borderColor: 'rgba(255,255,255,0.3)'
                          },
                          display: 'inline-flex',
                          visibility: 'visible'
                        }}
                      >
                        Resend verification code
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              )}

              {/* Go back link */}
              <Typography 
                align="center" 
                sx={{ 
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.9rem'
                }}
              >
                Return to{' '}
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
