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
  Chip,
  Alert,
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
} from '@mui/icons-material';
import { useState } from 'react';

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
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', category: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Support',
      primary: '+1 (555) 123-4567',
      secondary: 'Available 24/7 for urgent issues',
      color: 'primary.main'
    },
    {
      icon: Email,
      title: 'Email Support',
      primary: 'support@procto.com',
      secondary: 'Response within 24 hours',
      color: 'success.main'
    },
    {
      icon: LocationOn,
      title: 'Main Office',
      primary: '123 Education Street',
      secondary: 'Learning City, LC 12345',
      color: 'warning.main'
    },
    {
      icon: Schedule,
      title: 'Business Hours',
      primary: 'Mon-Fri: 8AM-8PM EST',
      secondary: 'Sat-Sun: 10AM-6PM EST',
      color: 'info.main'
    }
  ];

  const departments = [
    { value: 'general', label: 'General Inquiry', icon: Person },
    { value: 'technical', label: 'Technical Support', icon: Support },
    { value: 'sales', label: 'Sales & Pricing', icon: Business },
    { value: 'educational', label: 'Educational Partnerships', icon: School }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Stack spacing={4} textAlign="center">
            <Typography variant="h2" fontWeight={600}>
              Contact Us
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
              Get in touch with our team. We're here to help with questions, support, and partnerships.
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              <Chip label="24/7 Support" sx={{ bgcolor: 'white', color: 'primary.main' }} />
              <Chip label="Expert Team" sx={{ bgcolor: 'white', color: 'primary.main' }} />
              <Chip label="Quick Response" sx={{ bgcolor: 'white', color: 'primary.main' }} />
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ borderRadius: 2, height: 'fit-content' }}>
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={3}>
                  <Stack spacing={2}>
                    <Typography variant="h4" fontWeight={600}>
                      Send us a Message
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </Typography>
                  </Stack>

                  {isSubmitted && (
                    <Alert severity="success" sx={{ borderRadius: 2 }}>
                      Thank you for your message! We'll get back to you within 24 hours.
                    </Alert>
                  )}

                  <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label="Full Name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
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
                          />
                        </Grid>
                      </Grid>

                      <FormControl fullWidth>
                        <InputLabel>Department</InputLabel>
                        <Select
                          value={formData.category}
                          label="Department"
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          required
                        >
                          {departments.map((dept) => (
                            <MenuItem key={dept.value} value={dept.value}>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <dept.icon fontSize="small" />
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
                      />

                      <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us about your inquiry, technical issue, or how we can help..."
                        required
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={<Send />}
                        sx={{ alignSelf: 'flex-start' }}
                      >
                        Send Message
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Information */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={4}>
              <Stack spacing={2}>
                <Typography variant="h4" fontWeight={600}>
                  Get in Touch
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Multiple ways to reach our team for support, sales, or partnerships.
                </Typography>
              </Stack>

              <Stack spacing={3}>
                {contactInfo.map((info, index) => (
                  <Card key={index} sx={{ borderRadius: 2 }}>
                    <CardContent sx={{ p: 3 }}>
                      <Stack direction="row" spacing={3} alignItems="center">
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: info.color,
                            color: 'white',
                            display: 'flex'
                          }}
                        >
                          <info.icon />
                        </Box>
                        <Stack spacing={0.5}>
                          <Typography variant="h6" fontWeight={600}>
                            {info.title}
                          </Typography>
                          <Typography variant="body1" fontWeight={500}>
                            {info.primary}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {info.secondary}
                          </Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>

              {/* Quick Links */}
              <Card sx={{ bgcolor: 'grey.50', borderRadius: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <Typography variant="h6" fontWeight={600}>
                      Quick Help
                    </Typography>
                    <Stack spacing={1}>
                      <Button variant="text" sx={{ justifyContent: 'flex-start' }}>
                        Browse FAQ
                      </Button>
                      <Button variant="text" sx={{ justifyContent: 'flex-start' }}>
                        Download User Guide
                      </Button>
                      <Button variant="text" sx={{ justifyContent: 'flex-start' }}>
                        System Requirements
                      </Button>
                      <Button variant="text" sx={{ justifyContent: 'flex-start' }}>
                        Integration Guide
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>

              {/* Office Hours */}
              <Alert severity="info" sx={{ borderRadius: 2 }}>
                <Typography variant="body2">
                  <strong>Need immediate help?</strong> Our 24/7 support team is available 
                  for urgent technical issues. For general inquiries, expect responses 
                  within one business day.
                </Typography>
              </Alert>
            </Stack>
          </Grid>
        </Grid>

        {/* Emergency Support Section */}
        <Box sx={{ mt: 8 }}>
          <Card sx={{ bgcolor: 'error.main', color: 'white', borderRadius: 2 }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Stack spacing={3}>
                <Typography variant="h5" fontWeight={600}>
                  Emergency Support
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Experiencing critical issues during an active exam? 
                  Contact our emergency support line immediately.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                  <Button
                    variant="contained"
                    sx={{ bgcolor: 'white', color: 'error.main', '&:hover': { bgcolor: 'grey.100' } }}
                    startIcon={<Phone />}
                  >
                    Call Emergency Line
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                    startIcon={<Email />}
                  >
                    Emergency Email
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
