import {
  Typography,
  Container,
  Grid,
  Stack,
  Card,
  CardContent,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Fade
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  Schedule,
  Send,
  Support,
  Business,
  School,
  Person,
  ContactSupport,
  Chat,
  Assignment,
  CheckCircle,
  AccessTime,
  Security,
  HeadsetMic
} from '@mui/icons-material';
import { useState } from 'react';
import contactData from '../../data/contact.json';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', category: '', message: '' });
  };

  // Icon mapping function
  const getIcon = (iconName: string): React.ComponentType<{ sx?: object }> => {
    const iconMap: { [key: string]: React.ComponentType<{ sx?: object }> } = {
      Support,
      Business,
      School,
      Person,
      Chat,
      Assignment,
      ContactSupport,
      Phone,
      Email,
      LocationOn,
      Schedule,
      HeadsetMic,
      Security
    };
    return iconMap[iconName] || Support;
  };

  // Get data from JSON with icon mapping
  const contactInfo = contactData.contactInfo.map(info => ({
    ...info,
    icon: getIcon(info.icon)
  }));

  const departments = contactData.departments.map(dept => ({
    ...dept,
    icon: getIcon(dept.icon)
  }));

  const quickActions = contactData.quickActions.map(action => ({
    ...action,
    icon: getIcon(action.icon)
  }));

  return (
    <Box 
      sx={{
        width: '100vw',
        margin: 0,
        bgcolor: '#0a0a0a',
        minHeight: '100vh',
        color: 'white'
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          py: 10,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in timeout={800}>
            <Stack spacing={4} textAlign="center">
              <Typography 
                variant="h1" 
                sx={{
                  fontSize: { xs: '3rem', md: '4.5rem' },
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2
                }}
              >
                {contactData.hero.title}
              </Typography>
              
              <Typography 
                variant="h5" 
                sx={{ 
                  opacity: 0.9, 
                  maxWidth: 700, 
                  mx: 'auto',
                  fontWeight: 400,
                  lineHeight: 1.6
                }}
              >
                {contactData.hero.subtitle}
              </Typography>

              <Stack 
                direction="row" 
                spacing={2} 
                justifyContent="center" 
                flexWrap="wrap"
                sx={{ mt: 4 }}
              >
                {quickActions.map((action, index) => (
                  <Fade in timeout={1000 + index * 200} key={action.title}>
                    <Button
                      variant="outlined"
                      startIcon={<action.icon />}
                      sx={{
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        color: 'white',
                        backdropFilter: 'blur(10px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        px: 3,
                        py: 1.5,
                        '&:hover': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {action.title}
                    </Button>
                  </Fade>
                ))}
              </Stack>
            </Stack>
          </Fade>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack spacing={8}>
          {/* Contact Form */}
          <Fade in timeout={1200}>
            <Card 
              sx={{ 
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
            >
              <CardContent sx={{ p: 5 }}>
                <Stack spacing={4}>
                  <Stack spacing={2}>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      Send us a Message
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </Typography>
                  </Stack>

                  {isSubmitted && (
                    <Alert 
                      severity="success" 
                      sx={{ 
                        borderRadius: 2,
                        bgcolor: 'rgba(6, 214, 160, 0.1)',
                        border: '1px solid rgba(6, 214, 160, 0.3)',
                        color: '#06d6a0',
                        '& .MuiAlert-icon': { color: '#06d6a0' }
                      }}
                    >
                      Thank you for your message! We'll get back to you within 24 hours.
                    </Alert>
                  )}

                  <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                      <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label="Full Name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: 2,
                                '& fieldset': {
                                  borderColor: 'rgba(255, 255, 255, 0.2)',
                                },
                                '&:hover fieldset': {
                                  borderColor: 'rgba(255, 255, 255, 0.3)',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#6366f1',
                                },
                              },
                              '& .MuiInputLabel-root': {
                                color: 'rgba(255, 255, 255, 0.7)',
                                '&.Mui-focused': {
                                  color: '#6366f1',
                                },
                              },
                              '& .MuiOutlinedInput-input': {
                                color: 'white',
                              },
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: 2,
                                '& fieldset': {
                                  borderColor: 'rgba(255, 255, 255, 0.2)',
                                },
                                '&:hover fieldset': {
                                  borderColor: 'rgba(255, 255, 255, 0.3)',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#6366f1',
                                },
                              },
                              '& .MuiInputLabel-root': {
                                color: 'rgba(255, 255, 255, 0.7)',
                                '&.Mui-focused': {
                                  color: '#6366f1',
                                },
                              },
                              '& .MuiOutlinedInput-input': {
                                color: 'white',
                              },
                            }}
                          />
                        </Grid>
                      </Grid>

                      <FormControl fullWidth>
                        <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Department</InputLabel>
                        <Select
                          value={formData.category}
                          label="Department"
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          required
                          sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: 2,
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'rgba(255, 255, 255, 0.2)',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'rgba(255, 255, 255, 0.3)',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#6366f1',
                            },
                            '& .MuiSelect-select': {
                              color: 'white',
                            },
                            '& .MuiSelect-icon': {
                              color: 'rgba(255, 255, 255, 0.7)',
                            },
                          }}
                        >
                          {departments.map((dept) => (
                            <MenuItem 
                              key={dept.value} 
                              value={dept.value}
                              sx={{
                                bgcolor: '#1a1a1a',
                                color: 'white',
                                '&:hover': {
                                  bgcolor: 'rgba(99, 102, 241, 0.1)',
                                },
                                '&.Mui-selected': {
                                  bgcolor: 'rgba(99, 102, 241, 0.2)',
                                  '&:hover': {
                                    bgcolor: 'rgba(99, 102, 241, 0.3)',
                                  },
                                },
                              }}
                            >
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <dept.icon sx={{ fontSize: 'small' }} />
                                <span>{dept.label}</span>
                              </Stack>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <TextField
                        fullWidth
                        label="Subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.3)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#6366f1',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255, 255, 255, 0.7)',
                            '&.Mui-focused': {
                              color: '#6366f1',
                            },
                          },
                          '& .MuiOutlinedInput-input': {
                            color: 'white',
                          },
                        }}
                      />

                      <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us about your inquiry, technical issue, or how we can help..."
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.3)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#6366f1',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255, 255, 255, 0.7)',
                            '&.Mui-focused': {
                              color: '#6366f1',
                            },
                          },
                          '& .MuiOutlinedInput-input': {
                            color: 'white',
                          },
                          '& .MuiInputBase-input::placeholder': {
                            color: 'rgba(255, 255, 255, 0.5)',
                            opacity: 1,
                          },
                        }}
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={<Send />}
                        sx={{ 
                          alignSelf: 'flex-start',
                          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                          px: 4,
                          py: 1.5,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          '&:hover': {
                            background: 'linear-gradient(135deg, #5856eb 0%, #7c3aed 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 20px 40px -12px rgba(99, 102, 241, 0.4)',
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Send Message
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Fade>

          {/* Contact Information */}
          <Fade in timeout={1400}>
            <Card 
              sx={{ 
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
            >
              <CardContent sx={{ p: 5 }}>
                <Stack spacing={4}>
                  <Stack spacing={2}>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      Contact Information
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Multiple ways to reach our team for support, sales, or partnerships.
                    </Typography>
                  </Stack>

                  <Grid container spacing={3}>
                    {contactInfo.map((info, index) => (
                      <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        <Card 
                          sx={{ 
                            borderRadius: 3,
                            background: 'rgba(255, 255, 255, 0.03)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            height: '100%',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
                              border: `1px solid ${info.color}`,
                            }
                          }}
                        >
                          <CardContent sx={{ p: 3, textAlign: 'center' }}>
                            <Stack spacing={2} alignItems="center">
                              <Box
                                sx={{
                                  p: 2.5,
                                  borderRadius: 3,
                                  bgcolor: info.bgColor,
                                  color: info.color,
                                  display: 'flex',
                                  border: `1px solid ${info.color}`,
                                }}
                              >
                                <info.icon sx={{ fontSize: 28 }} />
                              </Box>
                              <Stack spacing={0.5} alignItems="center">
                                <Typography variant="h6" fontWeight={700} color="white">
                                  {info.title}
                                </Typography>
                                <Typography variant="body1" fontWeight={600} color={info.color}>
                                  {info.primary}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                  {info.secondary}
                                </Typography>
                              </Stack>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </CardContent>
            </Card>
          </Fade>

          {/* Quick Help Resources */}
          <Fade in timeout={1600}>
            <Card 
              sx={{ 
                borderRadius: 3,
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
              }}
            >
              <CardContent sx={{ p: 5 }}>
                <Stack spacing={4}>
                  <Stack spacing={2}>
                    <Typography variant="h3" fontWeight={700} color="white">
                      Quick Help Resources
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Access helpful resources and get instant support for common questions.
                    </Typography>
                  </Stack>
                  
                  <Grid container spacing={3}>
                    {[
                      { title: 'Browse FAQ', icon: ContactSupport, description: 'Find answers to common questions' },
                      { title: 'Download User Guide', icon: Assignment, description: 'Complete documentation and tutorials' },
                      { title: 'System Requirements', icon: CheckCircle, description: 'Technical specifications and compatibility' },
                      { title: 'Integration Guide', icon: Security, description: 'API documentation and setup instructions' }
                    ].map((item, index) => (
                      <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        <Button
                          variant="text"
                          sx={{
                            width: '100%',
                            height: '100%',
                            minHeight: 120,
                            p: 3,
                            borderRadius: 3,
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid transparent',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': {
                              backgroundColor: 'rgba(99, 102, 241, 0.1)',
                              border: '1px solid rgba(99, 102, 241, 0.3)',
                              transform: 'translateY(-4px)',
                            },
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <Stack spacing={2} alignItems="center">
                            <item.icon sx={{ fontSize: 32, color: '#6366f1' }} />
                            <Stack spacing={1} alignItems="center">
                              <Typography variant="h6" fontWeight={700} color="white">
                                {item.title}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: 'rgba(255, 255, 255, 0.6)',
                                  textAlign: 'center',
                                  lineHeight: 1.4
                                }}
                              >
                                {item.description}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </CardContent>
            </Card>
          </Fade>

          {/* Support Notice */}
          <Fade in timeout={1800}>
            <Alert 
              severity="info" 
              sx={{ 
                borderRadius: 3,
                bgcolor: 'rgba(6, 214, 160, 0.1)',
                border: '1px solid rgba(6, 214, 160, 0.3)',
                color: '#06d6a0',
                p: 3,
                '& .MuiAlert-icon': { color: '#06d6a0' }
              }}
            >
              <Typography variant="body1">
                <strong>Need immediate help?</strong> Our 24/7 support team is available 
                for urgent technical issues. For general inquiries, expect responses 
                within one business day.
              </Typography>
            </Alert>
          </Fade>
        </Stack>

        {/* Emergency Support Section */}
        <Fade in timeout={2800}>
          <Box sx={{ mt: 8 }}>
            <Card 
              sx={{ 
                borderRadius: 4,
                background: 'linear-gradient(135deg, #f72585 0%, #b5179e 100%)',
                border: '1px solid rgba(247, 37, 133, 0.3)',
                boxShadow: '0 25px 50px -12px rgba(247, 37, 133, 0.4)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at 70% 30%, rgba(181, 23, 158, 0.3) 0%, transparent 70%)',
                }}
              />
              
              <CardContent sx={{ p: 6, textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <Stack spacing={4}>
                  <Stack spacing={2} alignItems="center">
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 4,
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        mb: 2
                      }}
                    >
                      <HeadsetMic sx={{ fontSize: 48, color: 'white' }} />
                    </Box>
                    
                    <Typography variant="h3" fontWeight={700} color="white">
                      Emergency Support
                    </Typography>
                    
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        opacity: 0.9, 
                        maxWidth: 600,
                        lineHeight: 1.6,
                        color: 'white'
                      }}
                    >
                      Experiencing critical issues during an active exam? 
                      Contact our emergency support line immediately for instant assistance.
                    </Typography>
                  </Stack>
                  
                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={3} 
                    justifyContent="center"
                  >
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<Phone />}
                      sx={{
                        bgcolor: 'white',
                        color: '#f72585',
                        px: 4,
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        borderRadius: 3,
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.9)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.3)',
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Call Emergency Line
                    </Button>
                    
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<Email />}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        px: 4,
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: 3,
                        borderWidth: 2,
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                          transform: 'translateY(-2px)',
                          borderWidth: 2,
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Emergency Email
                    </Button>
                  </Stack>
                  
                  <Stack direction="row" spacing={4} justifyContent="center" flexWrap="wrap">
                    {[
                      { icon: AccessTime, text: '24/7 Availability' },
                      { icon: CheckCircle, text: 'Instant Response' },
                      { icon: Security, text: 'Secure Communication' }
                    ].map((feature, index) => (
                      <Stack key={index} direction="row" alignItems="center" spacing={1}>
                        <feature.icon sx={{ color: 'white', opacity: 0.9 }} />
                        <Typography variant="body2" sx={{ color: 'white', opacity: 0.9, fontWeight: 500 }}>
                          {feature.text}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
