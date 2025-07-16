import {
  Typography,
  Button,
  Container,
  Stack,
  Box,
  Grid,
  Paper,
  Chip,
} from '@mui/material';
import {
  Home,
  ErrorOutline,
  Security,
  ArrowBack,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
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
                Secure Exam Platform
              </Typography>
              <Stack spacing={2} sx={{ width: '100%', maxWidth: 300 }}>
                {[
                  'Secure Navigation',
                  'Protected Routes',
                  'Safe Environment'
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

          {/* Right Panel - 404 Content */}
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
              <Stack spacing={4} alignItems="center">
                {/* Error Icon */}
                <ErrorOutline 
                  sx={{ 
                    fontSize: 120, 
                    color: 'error.main',
                    opacity: 0.8
                  }} 
                />

                {/* Error Code */}
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '4rem', md: '6rem' },
                    background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textAlign: 'center',
                  }}
                >
                  404
                </Typography>

                {/* Error Message */}
                <Stack spacing={2} alignItems="center">
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 600,
                      color: 'text.primary',
                      textAlign: 'center'
                    }}
                  >
                    Page Not Found
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'text.secondary',
                      textAlign: 'center',
                      maxWidth: 400,
                      lineHeight: 1.6
                    }}
                  >
                    The page you're looking for doesn't exist or has been moved. 
                    Let's get you back to where you need to be.
                  </Typography>
                </Stack>

                {/* Action Buttons */}
                <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 4 }}>
                  <Button
                    component={Link}
                    to="/signin"
                    variant="contained"
                    size="large"
                    startIcon={<Home />}
                    sx={{
                      py: 1.5,
                      px: 3,
                      borderRadius: 2,
                      fontWeight: 600,
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
                    Go to Sign In
                  </Button>

                  <Button
                    onClick={() => window.history.back()}
                    variant="outlined"
                    size="large"
                    startIcon={<ArrowBack />}
                    sx={{
                      py: 1.5,
                      px: 3,
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
                    Go Back
                  </Button>
                </Stack>

                {/* Help Text */}
                <Box sx={{ mt: 4, p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Need help? Contact our support team at{' '}
                    <Typography component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
                      support@procto.com
                    </Typography>
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
