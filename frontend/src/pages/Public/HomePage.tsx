import {
  Typography,
  Container,
  Grid,
  Stack,
  Card,
  CardContent,
  Button,
  Box,
  Rating,
  Chip,
  Paper,
  IconButton,
  Fade,
  Slide,
} from '@mui/material';
import {
  Security,
  School,
  Assessment,
  Visibility,
  ArrowForward,
  Groups,
  TrendingUp,
  PlayArrow,
  CheckCircle,
  Speed,
  CloudSync,
  Psychology,
  Extension,
  BarChart,
  Shield,
  Lock,
  Notifications,
  Verified,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Import homepage data
import homepageData from '../../data/homepage.json';

export function HomePage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Icon mapping function  
  const getIcon = (iconName: string): React.ComponentType<{ sx?: object }> => {
    const iconMap: { [key: string]: React.ComponentType<{ sx?: object }> } = {
      Security,
      Visibility,
      Assessment,
      School,
      TrendingUp,
      Groups,
      Psychology,
      Speed,
      CloudSync,
      Shield,
      Extension,
      BarChart,
      Lock,
      Verified,
      Notifications
    };
    return iconMap[iconName] || Assessment;
  };

  // Get data from JSON with icon mapping
  const features = homepageData.features.map(feature => ({
    ...feature,
    icon: getIcon(feature.icon)
  }));

  const testimonials = homepageData.testimonials;
  
  const stats = homepageData.stats.map(stat => ({
    ...stat,
    icon: getIcon(stat.icon)
  }));

  const advancedFeatures = homepageData.advancedFeatures.map(feature => ({
    ...feature,
    icon: getIcon(feature.icon)
  }));

  const security = homepageData.security.features.map(item => ({
    ...item,
    icon: getIcon(item.icon)
  }));

  const pricing = homepageData.pricing;
  const hero = homepageData.hero;
  const cta = homepageData.cta;

  return (
    <Box sx={{ width: '100vw', overflow: 'hidden', bgcolor: '#0a0a0a', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          color: 'white',
          py: { xs: 10, md: 15 },
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.2) 0%, transparent 50%)',
            opacity: 0.6
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="1.5"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.4
          }
        }}
      >
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in={isVisible} timeout={1000}>
            <Grid container spacing={6} alignItems="center" sx={{ minHeight: '80vh' }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={5}>
                  <Chip 
                    label={hero.chip} 
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.15)', 
                      color: '#e0e7ff',
                      fontWeight: 600,
                      alignSelf: 'flex-start',
                      px: 3,
                      py: 1,
                      fontSize: '1rem',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }} 
                  />
                  <Typography 
                    variant="h1" 
                    fontWeight={900} 
                    sx={{ 
                      fontSize: { xs: '3rem', md: '5rem' },
                      background: 'linear-gradient(45deg, #ffffff 30%, #c7d2fe 70%, #a78bfa 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      lineHeight: 1.1,
                      mb: 3,
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {hero.title}
                  </Typography>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      opacity: 0.9, 
                      lineHeight: 1.6,
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      fontWeight: 400,
                      maxWidth: 600,
                      color: '#e2e8f0'
                    }}
                  >
                    {hero.subtitle}
                  </Typography>
                  
                  <Stack spacing={4}>
                    <Stack direction="row" spacing={4} alignItems="center" flexWrap="wrap">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <CheckCircle sx={{ fontSize: 24, color: '#10b981' }} />
                        <Typography variant="h6" fontWeight={600} sx={{ color: '#f1f5f9' }}>99.9% Accuracy</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <CheckCircle sx={{ fontSize: 24, color: '#10b981' }} />
                        <Typography variant="h6" fontWeight={600} sx={{ color: '#f1f5f9' }}>24/7 Support</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <CheckCircle sx={{ fontSize: 24, color: '#10b981' }} />
                        <Typography variant="h6" fontWeight={600} sx={{ color: '#f1f5f9' }}>GDPR Compliant</Typography>
                      </Stack>
                    </Stack>
                    
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                      <Button
                        variant="contained"
                        size="large"
                        sx={{ 
                          bgcolor: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', 
                          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                          color: 'white',
                          px: 6,
                          py: 3,
                          fontWeight: 700,
                          borderRadius: 4,
                          textTransform: 'none',
                          fontSize: '1.2rem',
                          boxShadow: '0 12px 40px rgba(99, 102, 241, 0.4)',
                          border: 'none',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                            transform: 'translateY(-4px)',
                            boxShadow: '0 20px 60px rgba(99, 102, 241, 0.5)'
                          },
                          transition: 'all 0.4s ease'
                        }}
                        onClick={() => navigate('/signup')}
                      >
                        {hero.primaryCta}
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<PlayArrow />}
                        sx={{ 
                          borderColor: 'rgba(255,255,255,0.3)', 
                          color: '#e2e8f0',
                          px: 6,
                          py: 3,
                          fontWeight: 700,
                          borderRadius: 4,
                          textTransform: 'none',
                          fontSize: '1.2rem',
                          borderWidth: 2,
                          bgcolor: 'rgba(255,255,255,0.05)',
                          '&:hover': {
                            borderColor: 'rgba(255,255,255,0.5)',
                            bgcolor: 'rgba(255,255,255,0.1)',
                            transform: 'translateY(-4px)',
                            borderWidth: 2
                          },
                          transition: 'all 0.4s ease'
                        }}
                        onClick={() => navigate('/contact')}
                      >
                        {hero.secondaryCta}
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Slide direction="left" in={isVisible} timeout={1200}>
                  <Box
                    sx={{
                      height: 500,
                      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                      borderRadius: 6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '200%',
                        height: '200%',
                        background: 'conic-gradient(from 0deg, transparent, rgba(99, 102, 241, 0.1), transparent)',
                        animation: 'rotate 20s linear infinite',
                        transform: 'translate(-50%, -50%)'
                      },
                      '@keyframes rotate': {
                        '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
                        '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' }
                      }
                    }}
                  >
                    <Stack spacing={4} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
                      <IconButton 
                        sx={{ 
                          bgcolor: 'rgba(99, 102, 241, 0.2)', 
                          width: 100, 
                          height: 100,
                          '&:hover': {
                            bgcolor: 'rgba(99, 102, 241, 0.3)',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <PlayArrow sx={{ fontSize: 50, color: '#c7d2fe' }} />
                      </IconButton>
                      <Typography variant="h3" sx={{ opacity: 0.95, textAlign: 'center', fontWeight: 700, color: '#f1f5f9' }}>
                        Live Demo Preview
                      </Typography>
                      <Typography variant="h6" sx={{ opacity: 0.8, textAlign: 'center', maxWidth: 350, lineHeight: 1.6, color: '#cbd5e1' }}>
                        See how our AI-powered proctoring works in real-time
                      </Typography>
                    </Stack>
                  </Box>
                </Slide>
              </Grid>
            </Grid>
          </Fade>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 12, bgcolor: '#111827' }}>
        <Container maxWidth="xl">
          <Fade in={isVisible} timeout={1500}>
            <Grid container spacing={4}>
              {stats.map((stat, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      textAlign: 'center', 
                      py: 6, 
                      px: 4,
                      borderRadius: 4,
                      background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      transition: 'all 0.4s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-12px)',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                        border: '1px solid rgba(99, 102, 241, 0.5)',
                        '& .stat-icon': {
                          transform: 'scale(1.3) rotate(10deg)'
                        },
                        '& .stat-number': {
                          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }
                      }
                    }}
                  >
                    <Stack spacing={4} alignItems="center">
                      <Box
                        className="stat-icon"
                        sx={{
                          width: 100,
                          height: 100,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.4s ease',
                          boxShadow: '0 10px 40px rgba(99, 102, 241, 0.3)'
                        }}
                      >
                        <stat.icon sx={{ fontSize: 48, color: 'white' }} />
                      </Box>
                      <Typography 
                        variant="h2" 
                        fontWeight={900} 
                        className="stat-number"
                        sx={{
                          fontSize: { xs: '2.5rem', md: '3rem' },
                          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          transition: 'all 0.4s ease'
                        }}
                      >
                        {stat.number}
                      </Typography>
                      <Typography variant="h5" color="#9ca3af" fontWeight={700} sx={{ fontSize: '1.2rem' }}>
                        {stat.label}
                      </Typography>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Fade>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ bgcolor: '#1f2937', py: 12 }}>
        <Container maxWidth="xl">
          <Stack spacing={10}>
            <Fade in={isVisible} timeout={2000}>
              <Stack spacing={4} textAlign="center">
                <Typography 
                  variant="h2" 
                  fontWeight={800}
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Why Choose Procto?
                </Typography>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    maxWidth: 800, 
                    mx: 'auto',
                    lineHeight: 1.6,
                    fontWeight: 400,
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                    color: '#9ca3af'
                  }}
                >
                  Our comprehensive proctoring solution ensures academic integrity while providing 
                  a seamless experience for both educators and students.
                </Typography>
              </Stack>
            </Fade>

            <Grid container spacing={6}>
              {features.map((feature, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index}>
                  <Fade in={isVisible} timeout={2500 + index * 200}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        p: 5,
                        borderRadius: 6,
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 6,
                          background: feature.gradient,
                        },
                        '&:hover': {
                          transform: 'translateY(-16px)',
                          boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
                          border: '1px solid rgba(99, 102, 241, 0.5)',
                          '& .feature-icon': {
                            transform: 'scale(1.2) rotate(10deg)',
                            background: feature.gradient
                          },
                          '& .feature-title': {
                            background: feature.gradient,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                          }
                        }
                      }}
                    >
                      <CardContent sx={{ p: 0 }}>
                        <Stack spacing={5}>
                          <Box
                            className="feature-icon"
                            sx={{
                              width: 100,
                              height: 100,
                              borderRadius: 4,
                              background: 'linear-gradient(135deg, #4b5563 0%, #6b7280 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                              boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                            }}
                          >
                            <feature.icon sx={{ fontSize: 50, color: '#e5e7eb' }} />
                          </Box>
                          <Stack spacing={3}>
                            <Typography 
                              variant="h3" 
                              fontWeight={800}
                              className="feature-title"
                              sx={{ 
                                color: '#f9fafb',
                                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                fontSize: { xs: '1.8rem', md: '2.2rem' },
                                letterSpacing: '-0.01em'
                              }}
                            >
                              {feature.title}
                            </Typography>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                lineHeight: 1.7,
                                fontSize: '1.2rem',
                                fontWeight: 400,
                                color: '#9ca3af'
                              }}
                            >
                              {feature.description}
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 12, bgcolor: '#0f172a' }}>
        <Container maxWidth="xl">
          <Stack spacing={10}>
            <Fade in={isVisible} timeout={3000}>
              <Stack spacing={4} textAlign="center">
                <Typography 
                  variant="h2" 
                  fontWeight={800}
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Trusted by Leading Institutions
                </Typography>
                <Typography variant="h4" fontWeight={400} sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' }, color: '#9ca3af' }}>
                  See what educators and administrators are saying about Procto
                </Typography>
              </Stack>
            </Fade>

            <Grid container spacing={6}>
              {testimonials.map((testimonial, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <Fade in={isVisible} timeout={3500 + index * 300}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        p: 5,
                        borderRadius: 6,
                        background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        position: 'relative',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-12px)',
                          boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
                          border: '1px solid rgba(99, 102, 241, 0.5)',
                          '& .quote-icon': {
                            transform: 'scale(1.2) rotate(10deg)',
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                          }
                        }
                      }}
                    >
                      <CardContent sx={{ p: 0 }}>
                        <Stack spacing={5}>
                          <Box
                            className="quote-icon"
                            sx={{
                              width: 80,
                              height: 80,
                              borderRadius: 3,
                              background: 'linear-gradient(135deg, #4b5563 0%, #6b7280 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                              alignSelf: 'flex-start'
                            }}
                          >
                            <Typography 
                              sx={{ 
                                fontSize: 36, 
                                fontWeight: 900,
                                color: '#e5e7eb',
                                fontFamily: 'serif'
                              }}
                            >
                              "
                            </Typography>
                          </Box>
                          
                          <Stack spacing={3}>
                            <Rating 
                              value={testimonial.rating} 
                              readOnly 
                              size="large"
                              sx={{
                                '& .MuiRating-iconFilled': {
                                  color: '#fbbf24'
                                }
                              }}
                            />
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                fontStyle: 'italic', 
                                lineHeight: 1.8,
                                fontSize: '1.2rem',
                                color: '#e5e7eb',
                                fontWeight: 400
                              }}
                            >
                              {testimonial.comment}
                            </Typography>
                          </Stack>
                          
                          <Box
                            sx={{
                              pt: 3,
                              borderTop: '1px solid rgba(255,255,255,0.1)'
                            }}
                          >
                            <Stack spacing={1}>
                              <Typography variant="h5" fontWeight={800} color="#f9fafb">
                                {testimonial.name}
                              </Typography>
                              <Typography 
                                variant="h6" 
                                sx={{
                                  color: '#6366f1',
                                  fontWeight: 600
                                }}
                              >
                                {testimonial.role}
                              </Typography>
                            </Stack>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

      {/* Advanced Features Section */}
      <Box sx={{ py: 12, bgcolor: '#111827' }}>
        <Container maxWidth="xl">
          <Stack spacing={10}>
            <Fade in={isVisible} timeout={3200}>
              <Stack spacing={4} textAlign="center">
                <Typography 
                  variant="h2" 
                  fontWeight={800}
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Advanced Capabilities
                </Typography>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    maxWidth: 800, 
                    mx: 'auto',
                    lineHeight: 1.6,
                    fontWeight: 400,
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                    color: '#9ca3af'
                  }}
                >
                  Discover powerful features that make Procto the most advanced proctoring solution
                </Typography>
              </Stack>
            </Fade>

            <Grid container spacing={4}>
              {advancedFeatures.map((feature, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <Fade in={isVisible} timeout={3400 + index * 200}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        p: 4,
                        borderRadius: 4,
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                          border: '1px solid rgba(99, 102, 241, 0.5)',
                          '& .adv-feature-icon': {
                            background: feature.gradient
                          }
                        }
                      }}
                    >
                      <CardContent sx={{ p: 0 }}>
                        <Stack spacing={3} alignItems="center" textAlign="center">
                          <Box
                            className="adv-feature-icon"
                            sx={{
                              width: 80,
                              height: 80,
                              borderRadius: 2,
                              background: 'linear-gradient(135deg, #4b5563 0%, #6b7280 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                          >
                            <feature.icon sx={{ fontSize: 40, color: 'white' }} />
                          </Box>
                          <Typography 
                            variant="h5" 
                            fontWeight={700}
                            sx={{ color: '#f9fafb' }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              lineHeight: 1.6,
                              color: '#9ca3af'
                            }}
                          >
                            {feature.description}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

      {/* Security & Compliance Section */}
      <Box sx={{ py: 12, bgcolor: '#1f2937' }}>
        <Container maxWidth="xl">
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Fade in={isVisible} timeout={3600}>
                <Stack spacing={6}>
                  <Stack spacing={3}>
                    <Typography 
                      variant="h2" 
                      fontWeight={800}
                      sx={{
                        fontSize: { xs: '2.5rem', md: '3.5rem' },
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {homepageData.security.title}
                    </Typography>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        lineHeight: 1.6,
                        color: '#9ca3af',
                        fontWeight: 400
                      }}
                    >
                      {homepageData.security.description}
                    </Typography>
                  </Stack>

                  <Grid container spacing={3}>
                    {security.map((item, index) => (
                      <Grid size={{ xs: 12, sm: 6 }} key={index}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box
                            sx={{
                              width: 50,
                              height: 50,
                              borderRadius: 2,
                              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <item.icon sx={{ fontSize: 24, color: 'white' }} />
                          </Box>
                          <Stack>
                            <Typography variant="h6" fontWeight={600} color="#f9fafb">
                              {item.title}
                            </Typography>
                            <Typography variant="body2" color="#9ca3af">
                              {item.desc}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </Fade>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Fade in={isVisible} timeout={3800}>
                <Box
                  sx={{
                    height: 400,
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                    borderRadius: 4,
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <Stack spacing={3} alignItems="center">
                    <Typography variant="h4" color="#f9fafb" fontWeight={700} textAlign="center">
                      Security Dashboard
                    </Typography>
                    <Typography variant="body1" color="#9ca3af" textAlign="center" sx={{ maxWidth: 300 }}>
                      Monitor security metrics and compliance status in real-time
                    </Typography>
                  </Stack>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Pricing Preview Section */}
      <Box sx={{ py: 12, bgcolor: '#0f172a' }}>
        <Container maxWidth="xl">
          <Stack spacing={10}>
            <Fade in={isVisible} timeout={4000}>
              <Stack spacing={4} textAlign="center">
                <Typography 
                  variant="h2" 
                  fontWeight={800}
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Choose Your Plan
                </Typography>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    maxWidth: 700, 
                    mx: 'auto',
                    lineHeight: 1.6,
                    fontWeight: 400,
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                    color: '#9ca3af'
                  }}
                >
                  Flexible pricing options designed to scale with your institution
                </Typography>
              </Stack>
            </Fade>

            <Grid container spacing={4} justifyContent="center">
              {pricing.map((plan, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <Fade in={isVisible} timeout={4200 + index * 200}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        p: 4,
                        borderRadius: 4,
                        border: plan.popular ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
                        background: plan.popular ? 
                          'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)' :
                          'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
                        position: 'relative',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                        }
                      }}
                    >
                      {plan.popular && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: -1,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            bgcolor: '#6366f1',
                            color: 'white',
                            px: 3,
                            py: 1,
                            borderRadius: '0 0 12px 12px',
                            fontSize: '0.875rem',
                            fontWeight: 600
                          }}
                        >
                          Most Popular
                        </Box>
                      )}
                      <CardContent sx={{ p: 0 }}>
                        <Stack spacing={4} textAlign="center">
                          <Stack spacing={2}>
                            <Typography variant="h4" fontWeight={700} color="#f9fafb">
                              {plan.name}
                            </Typography>
                            <Typography variant="body1" color="#9ca3af">
                              {plan.description}
                            </Typography>
                            <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                              <Typography 
                                variant="h2" 
                                fontWeight={800}
                                sx={{
                                  fontSize: '3rem',
                                  background: plan.color,
                                  backgroundClip: 'text',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent'
                                }}
                              >
                                {plan.price}
                              </Typography>
                              {plan.period && (
                                <Typography variant="h6" color="#9ca3af">
                                  {plan.period}
                                </Typography>
                              )}
                            </Stack>
                          </Stack>

                          <Stack spacing={2}>
                            {plan.features.map((feature, featureIndex) => (
                              <Stack direction="row" alignItems="center" spacing={2} key={featureIndex}>
                                <CheckCircle sx={{ color: '#10b981', fontSize: 20 }} />
                                <Typography variant="body1" color="#e5e7eb">
                                  {feature}
                                </Typography>
                              </Stack>
                            ))}
                          </Stack>

                          <Button
                            variant={plan.popular ? "contained" : "outlined"}
                            size="large"
                            fullWidth
                            sx={{
                              mt: 2,
                              py: 1.5,
                              borderRadius: 2,
                              fontWeight: 600,
                              fontSize: '1.1rem',
                              ...(plan.popular ? {
                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                '&:hover': {
                                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                  transform: 'translateY(-2px)',
                                  boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)'
                                }
                              } : {
                                borderColor: '#374151',
                                color: '#f9fafb',
                                '&:hover': {
                                  borderColor: '#6366f1',
                                  background: 'rgba(99, 102, 241, 0.1)',
                                  transform: 'translateY(-2px)'
                                }
                              })
                            }}
                          >
                            {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          color: 'white', 
          py: 15,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.1
          }
        }}
      >
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in={isVisible} timeout={4000}>
            <Stack spacing={8} textAlign="center">
              <Stack spacing={4}>
                <Typography 
                  variant="h1" 
                  fontWeight={900}
                  sx={{
                    fontSize: { xs: '3rem', md: '5rem' },
                    background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {cta.title}
                </Typography>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    opacity: 0.95, 
                    maxWidth: 800, 
                    mx: 'auto',
                    lineHeight: 1.6,
                    fontWeight: 400,
                    fontSize: { xs: '1.25rem', md: '1.5rem' }
                  }}
                >
                  {cta.description}
                </Typography>
              </Stack>
              
              <Stack spacing={6}>
                <Stack direction="row" spacing={6} justifyContent="center" flexWrap="wrap">
                  {cta.benefits.map((feature: string, index: number) => (
                    <Stack key={index} direction="row" spacing={2} alignItems="center">
                      <CheckCircle sx={{ fontSize: 32, color: '#4caf50' }} />
                      <Typography variant="h5" fontWeight={700}>{feature}</Typography>
                    </Stack>
                  ))}
                </Stack>
                
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} justifyContent="center">
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ 
                      bgcolor: 'white', 
                      color: 'primary.main',
                      px: 8,
                      py: 4,
                      fontWeight: 800,
                      fontSize: '1.3rem',
                      borderRadius: 4,
                      textTransform: 'none',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                      '&:hover': {
                        bgcolor: 'grey.100',
                        transform: 'translateY(-6px)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
                      },
                      transition: 'all 0.4s ease'
                    }}
                    endIcon={<ArrowForward sx={{ fontSize: 28 }} />}
                    onClick={() => navigate('/signup')}
                  >
                    {cta.primaryCta}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{ 
                      borderColor: 'white', 
                      color: 'white',
                      px: 8,
                      py: 4,
                      fontWeight: 800,
                      fontSize: '1.3rem',
                      borderRadius: 4,
                      textTransform: 'none',
                      borderWidth: 3,
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-6px)',
                        borderWidth: 3
                      },
                      transition: 'all 0.4s ease'
                    }}
                    onClick={() => navigate('/contact')}
                  >
                    {cta.secondaryCta}
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
}
