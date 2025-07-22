import {
  Typography,
  Container,
  Grid,
  Stack,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Alert,
  Avatar,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Quiz,
  Timer,
  Save,
  Send,
  CheckCircle,
  VolumeUp,
  Camera,
  Security,
  Help,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';

export function StudentExamTaking() {
  const [timeRemaining, setTimeRemaining] = useState(5400); // 90 minutes in seconds
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [examStarted, setExamStarted] = useState(false);

  // Mock exam data
  const examData = {
    id: 'EXAM001',
    title: 'Advanced Mathematics Final Examination',
    course: 'MATH 401',
    instructor: 'Dr. Sarah Johnson',
    duration: 90, // minutes
    totalQuestions: 25,
    instructions: [
      'Read all questions carefully before answering',
      'You can navigate between questions using the navigation panel',
      'Your progress is automatically saved every 30 seconds',
      'Submit your exam before time expires',
      'Use of external resources is strictly prohibited'
    ],
    proctoring: {
      enabled: true,
      cameraRequired: true,
      microphoneRequired: true,
      screenRecording: true,
      lockdownBrowser: true
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeRemaining < 600) return 'error'; // Less than 10 minutes
    if (timeRemaining < 1800) return 'warning'; // Less than 30 minutes
    return 'primary';
  };

  useEffect(() => {
    if (examStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [examStarted, timeRemaining]);

  if (!examStarted) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid size={{ xs: 12, md: 8 }}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={4} alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main', width: 80, height: 80 }}>
                    <Quiz sx={{ fontSize: 40 }} />
                  </Avatar>
                  
                  <Stack spacing={2} textAlign="center">
                    <Typography variant="h4" fontWeight={600}>
                      {examData.title}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {examData.course} • {examData.instructor}
                    </Typography>
                    <Stack direction="row" justifyContent="center" spacing={2}>
                      <Chip
                        icon={<Timer />}
                        label={`${examData.duration} minutes`}
                        color="primary"
                      />
                      <Chip
                        icon={<Quiz />}
                        label={`${examData.totalQuestions} questions`}
                        color="info"
                      />
                    </Stack>
                  </Stack>

                  {/* Proctoring Status */}
                  {examData.proctoring.enabled && (
                    <Alert severity="info" sx={{ width: '100%' }}>
                      <Typography variant="body2">
                        <strong>Proctored Exam:</strong> This exam is monitored using AI proctoring technology.
                        Ensure your camera and microphone are enabled.
                      </Typography>
                    </Alert>
                  )}

                  {/* System Checks */}
                  <Card sx={{ width: '100%', bgcolor: 'grey.50' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        System Checks
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircle color="success" />
                          </ListItemIcon>
                          <ListItemText primary="Camera Access" secondary="Enabled and working" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircle color="success" />
                          </ListItemIcon>
                          <ListItemText primary="Microphone Access" secondary="Enabled and working" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircle color="success" />
                          </ListItemIcon>
                          <ListItemText primary="Internet Connection" secondary="Stable connection detected" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircle color="success" />
                          </ListItemIcon>
                          <ListItemText primary="Browser Compatibility" secondary="Supported browser detected" />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>

                  {/* Instructions */}
                  <Card sx={{ width: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Exam Instructions
                      </Typography>
                      <List>
                        {examData.instructions.map((instruction, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <Typography variant="body2" fontWeight={600}>
                                {index + 1}.
                              </Typography>
                            </ListItemIcon>
                            <ListItemText primary={instruction} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>

                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => setExamStarted(true)}
                    sx={{ px: 6, py: 2 }}
                  >
                    Start Exam
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 2, minHeight: '100vh' }}>
      <Stack spacing={2}>
        {/* Exam Header */}
        <Card>
          <CardContent sx={{ py: 2 }}>
            <Grid container alignItems="center" spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Stack>
                  <Typography variant="h6" fontWeight={600}>
                    {examData.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Question {currentQuestion} of {examData.totalQuestions}
                  </Typography>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
                  <Timer color={getTimeColor()} />
                  <Typography 
                    variant="h6" 
                    fontWeight={600}
                    color={`${getTimeColor()}.main`}
                  >
                    {formatTime(timeRemaining)}
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={((examData.duration * 60 - timeRemaining) / (examData.duration * 60)) * 100}
                  color={getTimeColor()}
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    startIcon={<Save />}
                    size="small"
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Send />}
                    size="small"
                    onClick={() => setShowSubmitDialog(true)}
                  >
                    Submit
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Time Warning */}
        {timeRemaining < 600 && (
          <Alert severity="error">
            <Typography variant="body2">
              <strong>Warning:</strong> Less than 10 minutes remaining! Make sure to submit your exam before time expires.
            </Typography>
          </Alert>
        )}

        <Grid container spacing={2}>
          {/* Question Navigation */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Card sx={{ position: 'sticky', top: 16 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Questions
                </Typography>
                <Grid container spacing={1}>
                  {Array.from({ length: examData.totalQuestions }, (_, i) => (
                    <Grid key={i + 1} size={3}>
                      <Button
                        variant={currentQuestion === i + 1 ? "contained" : "outlined"}
                        size="small"
                        onClick={() => setCurrentQuestion(i + 1)}
                        sx={{ minWidth: 40, aspectRatio: 1 }}
                      >
                        {i + 1}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
                
                <Divider sx={{ my: 2 }} />
                
                <Stack spacing={2}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Proctoring Status
                  </Typography>
                  <Stack spacing={1}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Camera color="success" />
                      <Typography variant="body2">Camera Active</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <VolumeUp color="success" />
                      <Typography variant="body2">Audio Monitoring</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Security color="success" />
                      <Typography variant="body2">Browser Locked</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Question Content */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={4}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" fontWeight={600}>
                      Question {currentQuestion}
                    </Typography>
                    <IconButton>
                      <Help />
                    </IconButton>
                  </Stack>
                  
                  {/* Question content would go here */}
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    Solve the following integral: ∫₀¹ (x² + 2x + 1) dx
                  </Typography>
                  
                  {/* Question options/answer area would go here */}
                  <Card sx={{ bgcolor: 'grey.50' }}>
                    <CardContent>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Your Answer:
                      </Typography>
                      {/* Answer input components would go here */}
                      <Typography variant="body1" sx={{ minHeight: 100, p: 2, border: '1px dashed', borderColor: 'grey.300', borderRadius: 1 }}>
                        [Answer input area - implementation depends on question type]
                      </Typography>
                    </CardContent>
                  </Card>

                  {/* Navigation buttons */}
                  <Stack direction="row" justifyContent="space-between">
                    <Button
                      variant="outlined"
                      onClick={() => setCurrentQuestion(Math.max(1, currentQuestion - 1))}
                      disabled={currentQuestion === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => setCurrentQuestion(Math.min(examData.totalQuestions, currentQuestion + 1))}
                      disabled={currentQuestion === examData.totalQuestions}
                    >
                      Next
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Submit Dialog */}
        <Dialog open={showSubmitDialog} onClose={() => setShowSubmitDialog(false)}>
          <DialogTitle>Submit Exam</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to submit your exam? You have answered {currentQuestion} out of {examData.totalQuestions} questions.
              Once submitted, you cannot make any changes.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Time remaining: {formatTime(timeRemaining)}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowSubmitDialog(false)}>
              Continue Exam
            </Button>
            <Button variant="contained" color="primary">
              Submit Exam
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Container>
  );
}
