import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Container,
  Stack,
  Box,
  Card,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Fade,
  Link
} from '@mui/material';
import {
  Help,
  Email,
  Phone,
  Chat,
  Support,
  KeyboardArrowDown,
  KeyboardArrowUp
} from '@mui/icons-material';

export function HelpPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Add animation for support cards
    const timer = setTimeout(() => {
      const supportCards = document.querySelectorAll('.support-card');
      supportCards.forEach((card, index) => {
        setTimeout(() => {
          (card as HTMLElement).style.opacity = '1';
          (card as HTMLElement).style.transform = 'translateY(0)';
        }, 100 * index);
      });
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleAccordionChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Handle chat button click
  const handleChatButtonClick = () => {
    alert('Live chat support will be available soon. Please try another support option for now.');
  };

  return (
    <Box 
      sx={{
        width: '100vw',
        margin: 0,
        bgcolor: '#0a0a0a',
        minHeight: '100vh',
        color: 'white',
        overflowX: 'hidden',
        position: 'relative',
        maxWidth: '100%'
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          py: 10,
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          left: 0,
          right: 0
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
          <Fade in={isVisible} timeout={800}>
            <Stack spacing={4} textAlign="center">
              <Typography 
                variant="h1" 
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2
                }}
              >
                Welcome to Procto Support
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
                We're here to help you with any issues or questions you may have
              </Typography>
            </Stack>
          </Fade>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8, px: { xs: 2, sm: 3 } }}>
        {/* Support Options Grid */}
        <Box sx={{ mb: 8 }}>
          <Fade in={isVisible} timeout={1000}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
              {/* Live Chat */}
              <Box sx={{ flex: 1 }}>
                <Card 
                  className="support-card"
                  sx={{ 
                    height: '100%',
                    textAlign: 'center',
                    p: 4,
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 3,
                    transition: 'all 0.5s ease',
                    opacity: 0,
                    transform: 'translateY(20px)',
                    '&:hover': { 
                      transform: 'translateY(-5px)',
                      boxShadow: '0 20px 30px rgba(0, 0, 0, 0.3)'
                    }
                  }}
                >
                  <Stack spacing={3} alignItems="center">
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Chat sx={{ fontSize: 40, color: '#8b5cf6' }} />
                    </Box>
                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                      Live Chat
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                      Get instant answers to your questions with our 24/7 live chat support team.
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={handleChatButtonClick}
                      sx={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        py: 1.5,
                        px: 3,
                        fontWeight: 600,
                        '&:hover': {
                          boxShadow: '0 10px 20px rgba(139, 92, 246, 0.3)'
                        }
                      }}
                    >
                      Start Chat
                    </Button>
                  </Stack>
                </Card>
              </Box>

              {/* Call Center */}
              <Box sx={{ flex: 1 }}>
                <Card 
                  className="support-card"
                  sx={{ 
                    height: '100%',
                    textAlign: 'center',
                    p: 4,
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 3,
                    transition: 'all 0.5s ease',
                    opacity: 0,
                    transform: 'translateY(20px)',
                    '&:hover': { 
                      transform: 'translateY(-5px)',
                      boxShadow: '0 20px 30px rgba(0, 0, 0, 0.3)'
                    }
                  }}
                >
                  <Stack spacing={3} alignItems="center">
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Phone sx={{ fontSize: 40, color: '#8b5cf6' }} />
                    </Box>
                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                      Call Center
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                      Speak directly to our support agents at our dedicated call center.
                    </Typography>
                    <Button
                      variant="contained"
                      component={Link}
                      href="tel:+18005551234"
                      sx={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        py: 1.5,
                        px: 3,
                        fontWeight: 600,
                        '&:hover': {
                          boxShadow: '0 10px 20px rgba(139, 92, 246, 0.3)'
                        }
                      }}
                    >
                      Call Now
                    </Button>
                  </Stack>
                </Card>
              </Box>

              {/* Email Support */}
              <Box sx={{ flex: 1 }}>
                <Card 
                  className="support-card"
                  sx={{ 
                    height: '100%',
                    textAlign: 'center',
                    p: 4,
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 3,
                    transition: 'all 0.5s ease',
                    opacity: 0,
                    transform: 'translateY(20px)',
                    '&:hover': { 
                      transform: 'translateY(-5px)',
                      boxShadow: '0 20px 30px rgba(0, 0, 0, 0.3)'
                    }
                  }}
                >
                  <Stack spacing={3} alignItems="center">
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Email sx={{ fontSize: 40, color: '#8b5cf6' }} />
                    </Box>
                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                      Email Support
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                      Send us an email and we'll get back to you within 24 hours.
                    </Typography>
                    <Button
                      variant="contained"
                      component={Link}
                      href="mailto:support@procto.com"
                      sx={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        py: 1.5,
                        px: 3,
                        fontWeight: 600,
                        '&:hover': {
                          boxShadow: '0 10px 20px rgba(139, 92, 246, 0.3)'
                        }
                      }}
                    >
                      Email Us
                    </Button>
                  </Stack>
                </Card>
              </Box>
            </Stack>
          </Fade>
        </Box>

        {/* Support Process Timeline */}
        <Box sx={{ mb: 8 }}>
          <Fade in={isVisible} timeout={1200}>
            <Card sx={{ 
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              p: 4
            }}>
              <Stack spacing={4}>
                <Typography variant="h4" sx={{ 
                  textAlign: 'center', 
                  color: 'white',
                  fontWeight: 600,
                  mb: 3
                }}>
                  How Our Support Process Works
                </Typography>
                
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
                  {[
                    {
                      step: 1,
                      title: "Submit Your Request",
                      description: "Contact us through your preferred support channel - chat, phone, or email."
                    },
                    {
                      step: 2,
                      title: "Get a Support Ticket",
                      description: "We'll create a support ticket to track your issue from start to resolution."
                    },
                    {
                      step: 3,
                      title: "Issue Resolution",
                      description: "Our team will work on your request and keep you updated throughout the process."
                    },
                    {
                      step: 4,
                      title: "Feedback and Follow-up",
                      description: "We'll check in to make sure your issue has been resolved to your satisfaction."
                    }
                  ].map((step, index) => (
                    <Box key={index} sx={{ flex: 1 }}>
                      <Stack 
                        spacing={2} 
                        sx={{ 
                          position: 'relative',
                          '&:not(:last-child)::after': {
                            content: '""',
                            position: 'absolute',
                            top: '2.5rem',
                            right: { xs: 'auto', md: '-1.5rem' },
                            bottom: { xs: '-1.5rem', md: 'auto' },
                            left: { xs: '2.5rem', md: 'auto' },
                            width: { xs: '2px', md: '100%' },
                            height: { xs: '100%', md: '2px' },
                            backgroundColor: 'rgba(139, 92, 246, 0.3)',
                            display: { xs: 'none', md: 'block' }
                          }
                        }}
                      >
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '1.25rem',
                            color: 'white',
                            boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)',
                            zIndex: 1
                          }}
                        >
                          {step.step}
                        </Box>
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                          {step.title}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          {step.description}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Card>
          </Fade>
        </Box>

        {/* Common Support Topics - Accordions */}
        <Box sx={{ mb: 8 }}>
          <Fade in={isVisible} timeout={1400}>
            <Card sx={{ 
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              p: 4
            }}>
              <Stack spacing={4}>
                <Typography variant="h4" sx={{ 
                  textAlign: 'center', 
                  color: 'white',
                  fontWeight: 600
                }}>
                  Common Support Topics
                </Typography>
                
                {[
                  {
                    id: 'panel1',
                    title: 'Exam Issues or Cancellations',
                    content: 'If you are experiencing issues with your current exam or need help with a cancellation, please contact our support team immediately through the in-app emergency button or call our dedicated support line. We are available 24/7 to assist with urgent exam-related concerns.'
                  },
                  {
                    id: 'panel2',
                    title: 'Payment and Billing Support',
                    content: 'For any questions regarding charges, refunds, or payment methods, our billing specialists can help resolve payment discrepancies, explain charges, and process refunds when applicable. Please have your exam details and invoice number ready when contacting us.'
                  },
                  {
                    id: 'panel3',
                    title: 'Technical Issues',
                    content: 'Having technical problems during an exam? Our technical support team can help troubleshoot camera, microphone, or connectivity issues. We provide quick solutions to ensure minimal disruption to your exam experience.'
                  },
                  {
                    id: 'panel4',
                    title: 'Account and Security Issues',
                    content: 'For account access problems, security concerns, or updating personal information, our security team is available to assist. We take your account security seriously and are ready to help with any related issues.'
                  }
                ].map((item, index) => (
                  <Accordion 
                    key={index}
                    expanded={expanded === item.id}
                    onChange={handleAccordionChange(item.id)}
                    sx={{ 
                      background: 'rgba(255,255,255,0.05)',
                      color: 'white',
                      borderRadius: '8px !important',
                      mb: 1,
                      '&:before': { display: 'none' },
                      boxShadow: 'none',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      overflow: 'hidden'
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        expanded === item.id ? 
                          <KeyboardArrowUp sx={{ color: '#8b5cf6' }} /> : 
                          <KeyboardArrowDown sx={{ color: '#8b5cf6' }} />
                      }
                      sx={{ 
                        px: 3,
                        '&.Mui-expanded': {
                          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                        }
                      }}
                    >
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 500 }}>
                        {item.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 3, py: 2 }}>
                      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        {item.content}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Stack>
            </Card>
          </Fade>
        </Box>

        {/* Help Cards Section */}
        <Box>
          <Fade in={isVisible} timeout={1600}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
              <Box sx={{ flex: 1 }}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    p: 3,
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      transform: 'translateY(-5px)',
                      boxShadow: '0 20px 30px rgba(0, 0, 0, 0.3)',
                      cursor: 'pointer'
                    }
                  }}
                  onClick={() => navigate('/faq')}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3
                    }}
                  >
                    <Help sx={{ fontSize: 30, color: '#8b5cf6' }} />
                  </Box>
                  <Stack>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                      Visit our FAQ
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      Find answers to commonly asked questions about exams and proctoring
                    </Typography>
                  </Stack>
                </Card>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    p: 3,
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      transform: 'translateY(-5px)',
                      boxShadow: '0 20px 30px rgba(0, 0, 0, 0.3)',
                      cursor: 'pointer'
                    }
                  }}
                  onClick={() => navigate('/contact')}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3
                    }}
                  >
                    <Support sx={{ fontSize: 30, color: '#8b5cf6' }} />
                  </Box>
                  <Stack>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                      Contact Us
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      Get in touch with our support team for immediate assistance
                    </Typography>
                  </Stack>
                </Card>
              </Box>
            </Stack>
          </Fade>
        </Box>
      </Container>
    </Box>
  );
}
