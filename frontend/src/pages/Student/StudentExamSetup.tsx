import {
  Typography,
  Container,
  Grid,
  Stack,
  Card,
  CardContent,
  Button,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Checkbox,
  FormControlLabel,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Computer,
  Videocam,
  Mic,
  CheckCircle,
  Settings,
  PlayArrow,
  Schedule,
  Security,
} from '@mui/icons-material';
import { Layout } from '../../components/layout';
import { useNavigate, useParams } from 'react-router-dom';

export function StudentExamSetup() {
  const navigate = useNavigate();
  const { examId } = useParams();

  const systemChecks = [
    { name: 'Camera Access', status: 'passed', icon: Videocam },
    { name: 'Microphone Access', status: 'passed', icon: Mic },
    { name: 'Browser Compatibility', status: 'passed', icon: Computer },
    { name: 'Internet Connection', status: 'warning', icon: Settings },
  ];

  const examDetails = {
    title: 'Mathematics Final Exam',
    course: 'MATH 101',
    duration: '3 hours',
    questions: 50,
    startTime: '09:00 AM',
    endTime: '12:00 PM',
    instructor: 'Dr. Smith',
    attempts: 1,
    timeLimit: '180 minutes'
  };

  const proctoringSetting = [
    'Video monitoring will be active throughout the exam',
    'Screen recording will capture your desktop',
    'Audio will be monitored for suspicious sounds',
    'Browser lockdown will prevent tab switching',
    'AI detection will flag unusual behavior'
  ];

  const steps = ['System Check', 'Exam Instructions', 'Start Exam'];
  const activeStep = 1;

  return (
    <Layout title="Exam Setup">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* Header */}
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h4" fontWeight={600}>
                  {examDetails.title}
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Chip label={examDetails.course} color="primary" />
                  <Typography variant="body2" color="text.secondary">
                    {examDetails.instructor}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {/* Progress Stepper */}
          <Card>
            <CardContent>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>

          <Grid container spacing={4}>
            {/* System Check */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Stack spacing={3}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Computer color="primary" />
                      System Requirements Check
                    </Typography>
                    
                    <List sx={{ p: 0 }}>
                      {systemChecks.map((check, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon>
                            <check.icon 
                              color={check.status === 'passed' ? 'success' : 'warning'} 
                            />
                          </ListItemIcon>
                          <ListItemText 
                            primary={check.name}
                            secondary={
                              <Chip 
                                label={check.status} 
                                size="small"
                                color={check.status === 'passed' ? 'success' : 'warning'}
                              />
                            }
                          />
                        </ListItem>
                      ))}
                    </List>

                    {systemChecks.some(check => check.status === 'warning') && (
                      <Alert severity="warning">
                        Some system checks need attention. Please ensure all requirements are met before starting the exam.
                      </Alert>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Exam Details */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Stack spacing={3}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Schedule color="primary" />
                      Exam Details
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid size={6}>
                        <Stack spacing={1}>
                          <Typography variant="body2" color="text.secondary">Duration</Typography>
                          <Typography variant="body1" fontWeight={600}>{examDetails.duration}</Typography>
                        </Stack>
                      </Grid>
                      <Grid size={6}>
                        <Stack spacing={1}>
                          <Typography variant="body2" color="text.secondary">Questions</Typography>
                          <Typography variant="body1" fontWeight={600}>{examDetails.questions}</Typography>
                        </Stack>
                      </Grid>
                      <Grid size={6}>
                        <Stack spacing={1}>
                          <Typography variant="body2" color="text.secondary">Start Time</Typography>
                          <Typography variant="body1" fontWeight={600}>{examDetails.startTime}</Typography>
                        </Stack>
                      </Grid>
                      <Grid size={6}>
                        <Stack spacing={1}>
                          <Typography variant="body2" color="text.secondary">End Time</Typography>
                          <Typography variant="body1" fontWeight={600}>{examDetails.endTime}</Typography>
                        </Stack>
                      </Grid>
                    </Grid>

                    <Alert severity="info">
                      <Typography variant="body2">
                        <strong>Important:</strong> Once you start the exam, you cannot pause or restart. 
                        Make sure you have a stable internet connection and adequate time to complete the exam.
                      </Typography>
                    </Alert>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Proctoring Information */}
          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Security color="primary" />
                  Proctoring & Security Measures
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 8 }}>
                    <List sx={{ p: 0 }}>
                      {proctoringSetting.map((setting, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon>
                            <CheckCircle color="success" />
                          </ListItemIcon>
                          <ListItemText primary={setting} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Alert severity="warning">
                      <Typography variant="body2">
                        <strong>Privacy Notice:</strong> All exam sessions are recorded for security purposes. 
                        Recordings are encrypted and will be deleted after 90 days.
                      </Typography>
                    </Alert>
                  </Grid>
                </Grid>
              </Stack>
            </CardContent>
          </Card>

          {/* Exam Instructions */}
          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Typography variant="h6">Exam Instructions</Typography>
                
                <Stack spacing={2}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="I have read and understood the exam instructions"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="I consent to video and audio monitoring during the exam"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="I confirm that I am in a quiet, private environment"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="I agree to the academic integrity policy"
                  />
                </Stack>

                <Alert severity="error">
                  <Typography variant="body2">
                    <strong>Academic Integrity Warning:</strong> Any form of cheating, plagiarism, or unauthorized assistance 
                    will result in immediate exam termination and disciplinary action.
                  </Typography>
                </Alert>
              </Stack>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardContent>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="outlined"
                  onClick={() => navigate('/student/dashboard')}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrow />}
                  onClick={() => navigate(`/student/exam/take/${examId}`)}
                  sx={{ px: 4 }}
                >
                  Start Exam
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Layout>
  );
}
