import {
  Typography,
  Container,
  Grid,
  Stack,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Link,
  Chip,
} from '@mui/material';
import {
  Help,
  Email,
  Phone,
  Chat,
  Article,
  ExpandMore,
  Send,
  VideoLibrary,
  Book,
} from '@mui/icons-material';
import { Layout } from '../../components/layout';

export function HelpPage() {
  const faqs = [
    {
      question: "How do I set up a new exam?",
      answer: "Navigate to the Exam Management section, click 'Create New Exam', and follow the step-by-step wizard to configure your exam settings, questions, and proctoring options."
    },
    {
      question: "What browsers are supported for exam taking?",
      answer: "Procto supports the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using Chrome with camera and microphone permissions enabled."
    },
    {
      question: "How does the proctoring system work?",
      answer: "Our AI-powered proctoring system monitors video feeds, audio, and screen activity in real-time. It detects suspicious behavior and flags potential violations for review by administrators."
    },
    {
      question: "Can students take exams on mobile devices?",
      answer: "Currently, exams can only be taken on desktop or laptop computers with webcam access. Mobile devices are not supported for security and monitoring purposes."
    },
    {
      question: "How long are exam recordings stored?",
      answer: "Exam recordings are stored for 90 days by default, but this can be configured in the system settings. After the retention period, recordings are automatically deleted."
    }
  ];

  return (
    <Layout title="Help & Support">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* Header */}
          <Box textAlign="center">
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              Help & Support
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Find answers to your questions or get in touch with our support team
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {/* Quick Actions */}
            <Grid size={12}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card sx={{ textAlign: 'center', p: 2, cursor: 'pointer', '&:hover': { elevation: 4 } }}>
                    <Stack spacing={2} alignItems="center">
                      <VideoLibrary color="primary" sx={{ fontSize: 40 }} />
                      <Typography variant="h6">Video Tutorials</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Watch step-by-step guides
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card sx={{ textAlign: 'center', p: 2, cursor: 'pointer', '&:hover': { elevation: 4 } }}>
                    <Stack spacing={2} alignItems="center">
                      <Book color="primary" sx={{ fontSize: 40 }} />
                      <Typography variant="h6">User Manual</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Complete documentation
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card sx={{ textAlign: 'center', p: 2, cursor: 'pointer', '&:hover': { elevation: 4 } }}>
                    <Stack spacing={2} alignItems="center">
                      <Chat color="primary" sx={{ fontSize: 40 }} />
                      <Typography variant="h6">Live Chat</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Get instant support
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card sx={{ textAlign: 'center', p: 2, cursor: 'pointer', '&:hover': { elevation: 4 } }}>
                    <Stack spacing={2} alignItems="center">
                      <Article color="primary" sx={{ fontSize: 40 }} />
                      <Typography variant="h6">Knowledge Base</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Browse all articles
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            {/* FAQ Section */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Card>
                <CardContent>
                  <Stack spacing={3}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Help color="primary" />
                      Frequently Asked Questions
                    </Typography>
                    
                    {faqs.map((faq, index) => (
                      <Accordion key={index}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="subtitle1">{faq.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography variant="body2" color="text.secondary">
                            {faq.answer}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Contact Support */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={3}>
                {/* Support Ticket */}
                <Card>
                  <CardContent>
                    <Stack spacing={3}>
                      <Typography variant="h6">Submit Support Ticket</Typography>
                      <TextField
                        fullWidth
                        label="Subject"
                        variant="outlined"
                        placeholder="Brief description of your issue"
                      />
                      <TextField
                        fullWidth
                        label="Priority"
                        select
                        defaultValue="medium"
                        variant="outlined"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </TextField>
                      <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        placeholder="Describe your issue in detail"
                      />
                      <Button
                        variant="contained"
                        startIcon={<Send />}
                        fullWidth
                      >
                        Submit Ticket
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardContent>
                    <Stack spacing={3}>
                      <Typography variant="h6">Contact Information</Typography>
                      
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Email color="primary" />
                          <Box>
                            <Typography variant="body2" fontWeight={600}>Email Support</Typography>
                            <Link href="mailto:support@procto.com" underline="hover">
                              support@procto.com
                            </Link>
                          </Box>
                        </Stack>

                        <Stack direction="row" spacing={2} alignItems="center">
                          <Phone color="primary" />
                          <Box>
                            <Typography variant="body2" fontWeight={600}>Phone Support</Typography>
                            <Typography variant="body2" color="text.secondary">
                              +1 (555) 123-4567
                            </Typography>
                          </Box>
                        </Stack>

                        <Stack direction="row" spacing={2} alignItems="center">
                          <Chat color="primary" />
                          <Box>
                            <Typography variant="body2" fontWeight={600}>Live Chat</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Available 24/7
                            </Typography>
                          </Box>
                        </Stack>
                      </Stack>

                      <Alert severity="info">
                        <Typography variant="body2">
                          Our support team typically responds within 2-4 hours during business hours.
                        </Typography>
                      </Alert>
                    </Stack>
                  </CardContent>
                </Card>

                {/* System Status */}
                <Card>
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography variant="h6">System Status</Typography>
                      <Stack spacing={1}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2">Platform Status</Typography>
                          <Chip label="Operational" color="success" size="small" />
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2">Proctoring Service</Typography>
                          <Chip label="Operational" color="success" size="small" />
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2">Video Processing</Typography>
                          <Chip label="Operational" color="success" size="small" />
                        </Stack>
                      </Stack>
                      <Link href="#" variant="body2" underline="hover">
                        View detailed status page →
                      </Link>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Layout>
  );
}
