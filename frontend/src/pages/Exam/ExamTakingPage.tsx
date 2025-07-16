import {
  Typography,
  Container,
  Grid,
  Paper,
  Stack,
  Box,
  Button,
  LinearProgress,
  Alert,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Chip,
} from '@mui/material';
import {
  Timer,
  Visibility,
  Warning,
  CheckCircle,
  Camera,
  Mic,
} from '@mui/icons-material';

export function ExamTakingPage() {
  const timeRemaining = "01:45:30";
  const currentQuestion = 5;
  const totalQuestions = 50;
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'grey.50',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header with Timer and Monitoring Status */}
      <Paper elevation={2} sx={{ p: 2, borderRadius: 0 }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Timer color="primary" />
                <Box>
                  <Typography variant="h6" color="primary">
                    {timeRemaining}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Time Remaining
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            
            <Grid size={{ xs: 12, md: 6 }}>
              <Box textAlign="center">
                <Typography variant="h6">
                  Advanced Mathematics - Final Exam
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={progress} 
                  sx={{ mt: 1, height: 8, borderRadius: 4 }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Question {currentQuestion} of {totalQuestions}
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Chip 
                  icon={<Camera />} 
                  label="Monitoring" 
                  color="success" 
                  size="small" 
                />
                <Chip 
                  icon={<Mic />} 
                  label="Audio" 
                  color="success" 
                  size="small" 
                />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ flex: 1, py: 3 }}>
        <Grid container spacing={3}>
          {/* Question Panel */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={3}>
                  {/* Question Header */}
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Question {currentQuestion}
                    </Typography>
                    <Chip 
                      label="Multiple Choice" 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                    />
                  </Box>

                  {/* Question Text */}
                  <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    What is the derivative of f(x) = 3x² + 2x - 5 with respect to x?
                  </Typography>

                  {/* Answer Options */}
                  <FormControl component="fieldset">
                    <RadioGroup name="question-5">
                      <FormControlLabel 
                        value="a" 
                        control={<Radio />} 
                        label="A) 6x + 2" 
                        sx={{ py: 1 }}
                      />
                      <FormControlLabel 
                        value="b" 
                        control={<Radio />} 
                        label="B) 3x² + 2" 
                        sx={{ py: 1 }}
                      />
                      <FormControlLabel 
                        value="c" 
                        control={<Radio />} 
                        label="C) 6x + 2x - 5" 
                        sx={{ py: 1 }}
                      />
                      <FormControlLabel 
                        value="d" 
                        control={<Radio />} 
                        label="D) 9x + 2" 
                        sx={{ py: 1 }}
                      />
                    </RadioGroup>
                  </FormControl>

                  {/* Navigation Buttons */}
                  <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mt: 4 }}>
                    <Button variant="outlined" disabled={currentQuestion <= 1}>
                      Previous
                    </Button>
                    <Stack direction="row" spacing={2}>
                      <Button variant="outlined">
                        Mark for Review
                      </Button>
                      <Button variant="contained">
                        {currentQuestion >= totalQuestions ? 'Submit Exam' : 'Next Question'}
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Side Panel */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={3}>
              {/* Monitoring Status */}
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Visibility color="primary" />
                      Proctoring Status
                    </Typography>
                    <Stack spacing={1}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">Camera Feed</Typography>
                        <Chip label="Active" color="success" size="small" />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">Screen Recording</Typography>
                        <Chip label="Active" color="success" size="small" />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">Audio Monitoring</Typography>
                        <Chip label="Active" color="success" size="small" />
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>

              {/* Question Navigator */}
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Question Navigator
                  </Typography>
                  <Grid container spacing={1}>
                    {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => (
                      <Grid size={2} key={num}>
                        <Button
                          size="small"
                          variant={num === currentQuestion ? "contained" : "outlined"}
                          color={num < currentQuestion ? "success" : "primary"}
                          sx={{ 
                            minWidth: 32, 
                            width: '100%',
                            height: 32 
                          }}
                        >
                          {num < currentQuestion ? <CheckCircle sx={{ fontSize: 16 }} /> : num}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>

              {/* Warnings */}
              <Alert severity="warning" icon={<Warning />}>
                <Typography variant="body2">
                  Please remain in full view of the camera and avoid looking away from the screen.
                </Typography>
              </Alert>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
