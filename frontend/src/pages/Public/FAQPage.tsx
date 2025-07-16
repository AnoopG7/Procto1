import {
  Typography,
  Container,
  Grid,
  Stack,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  TextField,
  Chip,
} from '@mui/material';
import {
  ExpandMore,
  Help,
  Search,
  School,
  Security,
  Computer,
  Support,
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function FAQPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Questions', icon: Help },
    { id: 'getting-started', label: 'Getting Started', icon: School },
    { id: 'technical', label: 'Technical', icon: Computer },
    { id: 'security', label: 'Security', icon: Security },
    { id: 'support', label: 'Support', icon: Support }
  ];

  const faqs = [
    {
      category: 'getting-started',
      question: 'How do I create my first exam?',
      answer: 'To create your first exam, navigate to the Admin Dashboard and click on "Create New Exam". Follow the step-by-step wizard to configure your exam settings, add questions, and set up proctoring options.'
    },
    {
      category: 'getting-started',
      question: 'What devices are supported for taking exams?',
      answer: 'Procto supports desktop and laptop computers running the latest versions of Chrome, Firefox, Safari, and Edge. Mobile devices are not supported for security reasons.'
    },
    {
      category: 'technical',
      question: 'What are the minimum system requirements?',
      answer: 'Minimum requirements include: Modern web browser, stable internet connection (minimum 1 Mbps), webcam, microphone, and at least 4GB RAM.'
    },
    {
      category: 'technical',
      question: 'How do I troubleshoot camera or microphone issues?',
      answer: 'First, ensure your browser has permission to access camera and microphone. Check your system settings and restart your browser. If issues persist, try using a different browser or contact support.'
    },
    {
      category: 'security',
      question: 'How secure is the proctoring system?',
      answer: 'Procto uses advanced AI algorithms and machine learning to detect suspicious behavior. All data is encrypted in transit and at rest, and recordings are stored securely with automatic deletion after the retention period.'
    },
    {
      category: 'security',
      question: 'What types of violations can be detected?',
      answer: 'Our AI can detect multiple faces, tab switching, window changes, audio anomalies, excessive movement, and other suspicious behaviors that may indicate cheating attempts.'
    },
    {
      category: 'support',
      question: 'How can I contact support?',
      answer: 'You can reach our support team through live chat, email (support@procto.com), or phone. Our support team is available 24/7 for urgent issues.'
    },
    {
      category: 'support',
      question: 'What training is available for instructors?',
      answer: 'We offer comprehensive training including video tutorials, webinars, documentation, and one-on-one training sessions for new users.'
    },
    {
      category: 'getting-started',
      question: 'Can I integrate Procto with my existing LMS?',
      answer: 'Yes, Procto integrates with popular LMS platforms including Canvas, Blackboard, Moodle, and others through APIs and LTI compliance.'
    },
    {
      category: 'technical',
      question: 'How long are exam recordings stored?',
      answer: 'Exam recordings are stored for 90 days by default, but this can be configured based on your institution\'s requirements. All recordings are automatically deleted after the retention period.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Stack spacing={4} textAlign="center">
            <Typography variant="h2" fontWeight={600}>
              Frequently Asked Questions
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
              Find answers to common questions about Procto's online proctoring platform
            </Typography>
            <Box sx={{ maxWidth: 500, mx: 'auto' }}>
              <TextField
                fullWidth
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                    '& fieldset': { borderColor: 'transparent' },
                    '&:hover fieldset': { borderColor: 'transparent' },
                    '&.Mui-focused fieldset': { borderColor: 'transparent' }
                  }
                }}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {/* Categories Sidebar */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6">Categories</Typography>
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? 'contained' : 'outlined'}
                      startIcon={<category.icon />}
                      onClick={() => setSelectedCategory(category.id)}
                      fullWidth
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      {category.label}
                    </Button>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* FAQ Content */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Stack spacing={3}>
              {/* Results Header */}
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">
                  {filteredFAQs.length} {filteredFAQs.length === 1 ? 'Question' : 'Questions'} Found
                </Typography>
                {selectedCategory !== 'all' && (
                  <Chip
                    label={categories.find(c => c.id === selectedCategory)?.label}
                    onDelete={() => setSelectedCategory('all')}
                    color="primary"
                  />
                )}
              </Stack>

              {/* FAQ Accordions */}
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => (
                  <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : (
                <Card>
                  <CardContent sx={{ textAlign: 'center', py: 6 }}>
                    <Help sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No questions found
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Try adjusting your search terms or browse different categories
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </Stack>
          </Grid>
        </Grid>

        {/* Contact Support Section */}
        <Box sx={{ mt: 8 }}>
          <Card sx={{ bgcolor: 'grey.50' }}>
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Still have questions?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Can't find what you're looking for? Our support team is here to help.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  onClick={() => navigate('/public/contact')}
                >
                  Contact Support
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/help')}
                >
                  Browse Help Center
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
