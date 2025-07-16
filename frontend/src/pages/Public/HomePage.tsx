import {
  Typography,
  Container,
  Grid,
  Stack,
  Card,
  CardContent,
  Button,
  Box,
  Avatar,
  Rating,
} from '@mui/material';
import {
  Security,
  School,
  Assessment,
  Visibility,
  ArrowForward,
  Groups,
  TrendingUp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Security,
      title: 'AI-Powered Proctoring',
      description: 'Advanced AI technology monitors exam sessions to ensure academic integrity and prevent cheating.'
    },
    {
      icon: Visibility,
      title: 'Real-time Monitoring',
      description: 'Live video and audio monitoring with instant alerts for suspicious activities during exams.'
    },
    {
      icon: Assessment,
      title: 'Comprehensive Analytics',
      description: 'Detailed reports and analytics to track exam performance and identify potential issues.'
    },
    {
      icon: School,
      title: 'Easy Integration',
      description: 'Seamlessly integrate with existing LMS platforms and educational systems.'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Professor, Stanford University',
      rating: 5,
      comment: 'Procto has revolutionized our online examination process. The AI detection is incredibly accurate.'
    },
    {
      name: 'Mark Thompson',
      role: 'IT Director, MIT',
      rating: 5,
      comment: 'Easy to implement and use. Our faculty loves the comprehensive monitoring capabilities.'
    },
    {
      name: 'Lisa Chen',
      role: 'Academic Coordinator, Harvard',
      rating: 4,
      comment: 'Excellent platform for maintaining exam integrity in our remote learning environment.'
    }
  ];

  const stats = [
    { number: '10M+', label: 'Exams Proctored', icon: Assessment },
    { number: '500+', label: 'Universities', icon: School },
    { number: '99.9%', label: 'Uptime', icon: TrendingUp },
    { number: '24/7', label: 'Support', icon: Groups }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: 12,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={4}>
                <Typography variant="h2" fontWeight={700} sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
                  Secure Online Exam Proctoring
                </Typography>
                <Typography variant="h5" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                  Ensure academic integrity with AI-powered proctoring technology. 
                  Monitor exams in real-time and maintain examination standards.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ 
                      bgcolor: 'white', 
                      color: 'primary.main',
                      px: 4,
                      py: 2,
                      '&:hover': {
                        bgcolor: 'grey.100'
                      }
                    }}
                    onClick={() => navigate('/signup')}
                  >
                    Get Started Free
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{ 
                      borderColor: 'white', 
                      color: 'white',
                      px: 4,
                      py: 2,
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                    onClick={() => navigate('/public/contact')}
                  >
                    Request Demo
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  height: 400,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Typography variant="h4" sx={{ opacity: 0.7 }}>
                  Live Demo Preview
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card elevation={0} sx={{ textAlign: 'center', py: 4 }}>
                <CardContent>
                  <Stack spacing={2} alignItems="center">
                    <stat.icon color="primary" sx={{ fontSize: 48 }} />
                    <Typography variant="h3" fontWeight={700} color="primary.main">
                      {stat.number}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Stack spacing={6}>
            <Stack spacing={2} textAlign="center">
              <Typography variant="h3" fontWeight={600}>
                Why Choose Procto?
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                Our comprehensive proctoring solution ensures academic integrity while providing 
                a seamless experience for both educators and students.
              </Typography>
            </Stack>

            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index}>
                  <Card sx={{ height: '100%', p: 3 }}>
                    <CardContent>
                      <Stack spacing={3}>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64 }}>
                          <feature.icon sx={{ fontSize: 32 }} />
                        </Avatar>
                        <Typography variant="h5" fontWeight={600}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                          {feature.description}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack spacing={6}>
          <Stack spacing={2} textAlign="center">
            <Typography variant="h3" fontWeight={600}>
              Trusted by Leading Institutions
            </Typography>
            <Typography variant="h6" color="text.secondary">
              See what educators and administrators are saying about Procto
            </Typography>
          </Stack>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card sx={{ height: '100%', p: 3 }}>
                  <CardContent>
                    <Stack spacing={3}>
                      <Rating value={testimonial.rating} readOnly />
                      <Typography variant="body1" sx={{ fontStyle: 'italic', lineHeight: 1.7 }}>
                        "{testimonial.comment}"
                      </Typography>
                      <Stack spacing={1}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Stack spacing={4} textAlign="center">
            <Typography variant="h3" fontWeight={600}>
              Ready to Get Started?
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
              Join thousands of institutions worldwide that trust Procto for their online examination needs.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                sx={{ 
                  bgcolor: 'white', 
                  color: 'primary.main',
                  px: 4,
                  py: 2,
                  '&:hover': {
                    bgcolor: 'grey.100'
                  }
                }}
                endIcon={<ArrowForward />}
                onClick={() => navigate('/signup')}
              >
                Start Free Trial
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ 
                  borderColor: 'white', 
                  color: 'white',
                  px: 4,
                  py: 2,
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
                onClick={() => navigate('/public/contact')}
              >
                Contact Sales
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
