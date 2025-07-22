import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Stack,
  Fade,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  ExpandMore,
  Search,
  QuestionAnswer,
  Person,
  Security,
  Support,
  GetApp,
  Build
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import faqData from '../../data/faq.json';

export function FAQPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Icon mapping function
  const getIcon = (iconName: string): React.ComponentType<{ sx?: object }> => {
    const iconMap: { [key: string]: React.ComponentType<{ sx?: object }> } = {
      QuestionAnswer,
      GetApp,
      Build,
      Person,
      Security,
      Support
    };
    return iconMap[iconName] || QuestionAnswer;
  };

  // Get data from JSON with icon mapping
  const categories = faqData.categories.map(category => ({
    ...category,
    icon: getIcon(category.icon)
  }));

  const faqs = faqData.faqs;

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Box sx={{ bgcolor: '#0a0a0a', minHeight: '100vh', width: '100vw', margin: 0, padding: 0, overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          color: 'white', 
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          margin: 0,
          padding: 0
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
            pointerEvents: 'none'
          }}
        />
        <Container maxWidth={false} sx={{ maxWidth: '100%', mx: 0, px: { xs: 2, md: 4, lg: 6 }, width: '100%' }}>
          <Fade in={isVisible} timeout={1000}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Stack spacing={6} textAlign="center" alignItems="center">
                <Box
                  sx={{
                    width: { xs: 70, md: 90 },
                    height: { xs: 70, md: 90 },
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)'
                  }}
                >
                  <QuestionAnswer sx={{ fontSize: { xs: 35, md: 45 }, color: 'white' }} />
                </Box>
                
                <Stack spacing={3} textAlign="center" sx={{ maxWidth: 800, mx: 'auto' }}>
                  <Typography 
                    variant="h1" 
                    fontWeight={800}
                    sx={{
                      fontSize: { xs: '2.5rem', md: '4rem', lg: '4.5rem' },
                      background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '-0.02em',
                      lineHeight: { xs: 1.2, md: 1.1 },
                      mb: 2
                    }}
                  >
                    {faqData.hero.title}
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      lineHeight: 1.6,
                      color: 'rgba(255,255,255,0.85)',
                      fontWeight: 400,
                      fontSize: { xs: '1.1rem', md: '1.3rem' },
                      maxWidth: 600,
                      mx: 'auto'
                    }}
                  >
                    {faqData.hero.subtitle}
                  </Typography>
                </Stack>

                {/* Integrated Search */}
                <Box sx={{ width: '100%', maxWidth: 700, mx: 'auto' }}>
                  <TextField
                    fullWidth
                    placeholder="Search for answers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(255,255,255,0.98)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: 4,
                        fontSize: { xs: '1rem', md: '1.2rem' },
                        py: { xs: 1, md: 1.5 },
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        '& fieldset': { 
                          borderColor: 'transparent'
                        },
                        '&:hover fieldset': { 
                          borderColor: 'rgba(99, 102, 241, 0.4)'
                        },
                        '&.Mui-focused fieldset': { 
                          borderColor: '#6366f1',
                          borderWidth: 2
                        }
                      },
                      '& .MuiInputBase-input': {
                        color: '#1f2937',
                        py: { xs: 2, md: 2.5 },
                        fontSize: { xs: '1rem', md: '1.1rem' }
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search sx={{ color: '#6b7280', fontSize: { xs: 24, md: 28 } }} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
              </Stack>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth={false} sx={{ maxWidth: '100%', mx: 0, px: { xs: 2, md: 4, lg: 6 }, py: { xs: 6, md: 10 }, width: '100%' }}>
        <Fade in={isVisible} timeout={1200}>
          <Box>
            {/* Category Filter Pills */}
            <Box sx={{ mb: 6 }}>
              <Stack 
                direction="row" 
                spacing={{ xs: 2, md: 3 }} 
                flexWrap="wrap" 
                useFlexGap 
                justifyContent="center"
                sx={{ mb: 4 }}
              >
                {categories.map((category, index) => (
                  <Fade in={isVisible} timeout={1400 + index * 100} key={category.id}>
                    <Button
                      variant={selectedCategory === category.id ? 'contained' : 'outlined'}
                      startIcon={<category.icon />}
                      onClick={() => setSelectedCategory(category.id)}
                      sx={{ 
                        borderRadius: 50,
                        textTransform: 'none',
                        fontSize: { xs: '0.9rem', md: '1rem' },
                        fontWeight: 600,
                        px: { xs: 3, md: 4 },
                        py: { xs: 1.5, md: 2 },
                        minWidth: 'auto',
                        ...(selectedCategory === category.id ? {
                          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                          color: 'white',
                          boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)',
                          border: 'none',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 12px 35px rgba(99, 102, 241, 0.5)'
                          }
                        } : {
                          borderColor: 'rgba(255,255,255,0.15)',
                          color: '#e5e7eb',
                          background: 'rgba(255,255,255,0.05)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          '&:hover': {
                            borderColor: '#6366f1',
                            background: 'rgba(99, 102, 241, 0.1)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(99, 102, 241, 0.2)'
                          }
                        }),
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      {category.label}
                    </Button>
                  </Fade>
                ))}
              </Stack>
            </Box>

            {/* FAQ Accordion Section */}
            <Box sx={{ mb: 8 }}>
              <Stack spacing={3}>
                {filteredFAQs.length === 0 ? (
                  <Fade in={isVisible} timeout={1600}>
                    <Box
                      sx={{
                        textAlign: 'center',
                        py: 8,
                        px: 4,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                        borderRadius: 4,
                        border: '1px solid rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(20px)'
                      }}
                    >
                      <QuestionAnswer 
                        sx={{ 
                          fontSize: 60, 
                          color: 'rgba(255,255,255,0.3)', 
                          mb: 3 
                        }} 
                      />
                      <Typography 
                        variant="h5" 
                        fontWeight={600} 
                        sx={{ color: '#f9fafb', mb: 2 }}
                      >
                        No results found
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ color: 'rgba(255,255,255,0.7)', mb: 4, maxWidth: 400, mx: 'auto' }}
                      >
                        We couldn't find any FAQs matching your search. Try different keywords or browse our categories.
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                        }}
                        sx={{
                          borderColor: '#6366f1',
                          color: '#6366f1',
                          borderRadius: 3,
                          px: 4,
                          py: 1.5,
                          fontWeight: 600,
                          '&:hover': {
                            background: 'rgba(99, 102, 241, 0.1)',
                            borderColor: '#8b5cf6'
                          }
                        }}
                      >
                        Reset Search
                      </Button>
                    </Box>
                  </Fade>
                ) : (
                  filteredFAQs.map((faq, index) => (
                    <Fade in={isVisible} timeout={1600 + index * 100} key={index}>
                      <Accordion
                        sx={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '16px !important',
                          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                          overflow: 'hidden',
                          '&:before': { display: 'none' },
                          '&.Mui-expanded': {
                            margin: '16px 0',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 12px 40px rgba(99, 102, 241, 0.2)',
                            border: '1px solid rgba(99, 102, 241, 0.3)'
                          },
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      >
                        <AccordionSummary
                          expandIcon={
                            <ExpandMore 
                              sx={{ 
                                color: '#6366f1',
                                fontSize: 28,
                                transition: 'all 0.3s ease'
                              }} 
                            />
                          }
                          sx={{
                            px: { xs: 3, md: 4 },
                            py: { xs: 2, md: 3 },
                            '& .MuiAccordionSummary-content': {
                              margin: '16px 0'
                            },
                            '&:hover': {
                              background: 'rgba(99, 102, 241, 0.05)'
                            },
                            transition: 'background 0.3s ease'
                          }}
                        >
                          <Typography 
                            variant="h6" 
                            fontWeight={600}
                            sx={{ 
                              color: '#f9fafb',
                              fontSize: { xs: '1.1rem', md: '1.25rem' },
                              lineHeight: 1.4,
                              pr: 2
                            }}
                          >
                            {faq.question}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                          sx={{
                            px: { xs: 3, md: 4 },
                            pb: { xs: 3, md: 4 },
                            pt: 0,
                            borderTop: '1px solid rgba(255,255,255,0.08)'
                          }}
                        >
                          <Typography 
                            variant="body1"
                            sx={{ 
                              color: 'rgba(255,255,255,0.85)',
                              lineHeight: 1.7,
                              fontSize: { xs: '0.95rem', md: '1rem' }
                            }}
                          >
                            {faq.answer}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Fade>
                  ))
                )}
              </Stack>
            </Box>
          </Box>
        </Fade>

        {/* Contact Support Section */}
        <Fade in={isVisible} timeout={2000}>
          <Box
            sx={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              borderRadius: 4,
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(99, 102, 241, 0.3)'
            }}
          >
            {/* Background Pattern */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
                pointerEvents: 'none'
              }}
            />
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Stack spacing={3} alignItems="center" sx={{ maxWidth: 600, mx: 'auto' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Support sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Stack spacing={2} textAlign="center">
                  <Typography 
                    variant="h4" 
                    fontWeight={700}
                    sx={{ 
                      color: 'white',
                      fontSize: { xs: '1.8rem', md: '2.2rem' }
                    }}
                  >
                    {faqData.contact.title}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.9)',
                      lineHeight: 1.6,
                      fontSize: { xs: '1rem', md: '1.1rem' }
                    }}
                  >
                    {faqData.contact.description}
                  </Typography>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/contact')}
                    sx={{
                      background: 'white',
                      color: '#6366f1',
                      borderRadius: 3,
                      px: 4,
                      py: 1.5,
                      fontWeight: 700,
                      fontSize: '1rem',
                      boxShadow: '0 8px 25px rgba(255,255,255,0.2)',
                      '&:hover': {
                        background: 'rgba(255,255,255,0.95)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 35px rgba(255,255,255,0.3)'
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {faqData.contact.primaryCta}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/help')}
                    sx={{
                      borderColor: 'rgba(255,255,255,0.5)',
                      color: 'white',
                      borderRadius: 3,
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderWidth: 2,
                      '&:hover': {
                        borderColor: 'white',
                        background: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {faqData.contact.secondaryCta}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
