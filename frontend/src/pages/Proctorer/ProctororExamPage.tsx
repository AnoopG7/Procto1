import {
  Typography,
  Container,
  Grid,
  Stack,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import {
  Visibility,
  Flag,
  Warning,
  Videocam,
  Mic,
  Computer,
  Send,
  Fullscreen,
  FiberManualRecord,
} from '@mui/icons-material';
import { Layout } from '../../components/layout';
import { useState } from 'react';

export function ProctororExamPage() {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [flagDialogOpen, setFlagDialogOpen] = useState(false);
  const [flagType, setFlagType] = useState('');
  const [flagDescription, setFlagDescription] = useState('');

  const examDetails = {
    title: 'Mathematics Final Exam',
    course: 'MATH 101',
    instructor: 'Dr. Smith',
    startTime: '09:00 AM',
    duration: '3 hours',
    timeRemaining: '2h 15m',
    totalStudents: 50,
    activeStudents: 45
  };

  const students = [
    {
      id: 1,
      name: 'John Doe',
      status: 'active',
      violations: 2,
      lastActivity: '2 min ago',
      cameraStatus: 'active',
      micStatus: 'active',
      screenStatus: 'shared'
    },
    {
      id: 2,
      name: 'Jane Smith',
      status: 'flagged',
      violations: 1,
      lastActivity: '1 min ago',
      cameraStatus: 'active',
      micStatus: 'muted',
      screenStatus: 'shared'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      status: 'active',
      violations: 0,
      lastActivity: '30 sec ago',
      cameraStatus: 'active',
      micStatus: 'active',
      screenStatus: 'shared'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      status: 'warning',
      violations: 3,
      lastActivity: '5 min ago',
      cameraStatus: 'disconnected',
      micStatus: 'active',
      screenStatus: 'shared'
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      student: 'John Doe',
      type: 'Multiple Faces Detected',
      time: '2 minutes ago',
      severity: 'high'
    },
    {
      id: 2,
      student: 'Sarah Wilson',
      type: 'Camera Disconnected',
      time: '5 minutes ago',
      severity: 'high'
    },
    {
      id: 3,
      student: 'Jane Smith',
      type: 'Tab Switch Detected',
      time: '8 minutes ago',
      severity: 'medium'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'flagged': return 'error';
      case 'warning': return 'warning';
      default: return 'default';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const handleFlagStudent = () => {
    // Handle flag submission
    setFlagDialogOpen(false);
    setFlagType('');
    setFlagDescription('');
  };

  return (
    <Layout title="Live Exam Monitoring">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* Exam Header */}
          <Card>
            <CardContent>
              <Grid container spacing={3} alignItems="center">
                <Grid size={{ xs: 12, md: 8 }}>
                  <Stack spacing={2}>
                    <Typography variant="h4" fontWeight={600}>
                      {examDetails.title}
                    </Typography>
                    <Stack direction="row" spacing={3} alignItems="center">
                      <Chip label={examDetails.course} color="primary" />
                      <Typography variant="body2" color="text.secondary">
                        Instructor: {examDetails.instructor}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Time Remaining: {examDetails.timeRemaining}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Stack direction="row" spacing={2} justifyContent="end">
                    <Button variant="outlined" startIcon={<FiberManualRecord />}>
                      Start Recording
                    </Button>
                    <Button variant="contained" startIcon={<Flag />} color="warning">
                      Flag Session
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Grid container spacing={4}>
            {/* Student Monitoring Grid */}
            <Grid size={{ xs: 12, lg: 8 }}>
              <Card>
                <CardContent>
                  <Stack spacing={3}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6">
                        Students ({examDetails.activeStudents}/{examDetails.totalStudents})
                      </Typography>
                      <Button variant="outlined" startIcon={<Fullscreen />}>
                        Full Screen View
                      </Button>
                    </Stack>
                    
                    <Grid container spacing={2}>
                      {students.map((student) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={student.id}>
                          <Card 
                            variant="outlined"
                            sx={{ 
                              cursor: 'pointer',
                              border: selectedStudent === student.name ? '2px solid' : '1px solid',
                              borderColor: selectedStudent === student.name ? 'primary.main' : 'divider'
                            }}
                            onClick={() => setSelectedStudent(student.name)}
                          >
                            <CardContent sx={{ p: 2 }}>
                              <Stack spacing={2}>
                                {/* Video Feed Placeholder */}
                                <Stack 
                                  sx={{ 
                                    height: 120, 
                                    bgcolor: 'grey.100', 
                                    borderRadius: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                >
                                  <Videocam sx={{ fontSize: 40, color: 'grey.400' }} />
                                  <Typography variant="caption" color="text.secondary">
                                    Live Feed
                                  </Typography>
                                </Stack>

                                {/* Student Info */}
                                <Stack spacing={1}>
                                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography variant="subtitle2" fontWeight={600}>
                                      {student.name}
                                    </Typography>
                                    <Chip 
                                      label={student.status} 
                                      size="small"
                                      color={getStatusColor(student.status) as 'success' | 'error' | 'warning' | 'default'}
                                    />
                                  </Stack>

                                  <Typography variant="caption" color="text.secondary">
                                    Violations: {student.violations} | {student.lastActivity}
                                  </Typography>

                                  {/* Status Indicators */}
                                  <Stack direction="row" spacing={1} justifyContent="center">
                                    <Chip
                                      icon={<Videocam />}
                                      label=""
                                      size="small"
                                      color={student.cameraStatus === 'active' ? 'success' : 'error'}
                                    />
                                    <Chip
                                      icon={<Mic />}
                                      label=""
                                      size="small"
                                      color={student.micStatus === 'active' ? 'success' : 'default'}
                                    />
                                    <Chip
                                      icon={<Computer />}
                                      label=""
                                      size="small"
                                      color={student.screenStatus === 'shared' ? 'success' : 'error'}
                                    />
                                  </Stack>

                                  {/* Actions */}
                                  <Stack direction="row" spacing={1} justifyContent="center">
                                    <IconButton size="small" color="primary">
                                      <Visibility />
                                    </IconButton>
                                    <IconButton 
                                      size="small" 
                                      color="warning"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedStudent(student.name);
                                        setFlagDialogOpen(true);
                                      }}
                                    >
                                      <Flag />
                                    </IconButton>
                                  </Stack>
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
            </Grid>

            {/* Alerts & Controls */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <Stack spacing={3}>
                {/* Recent Alerts */}
                <Card>
                  <CardContent>
                    <Stack spacing={3}>
                      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Warning color="primary" />
                        Live Alerts
                      </Typography>
                      
                      <List sx={{ p: 0 }}>
                        {recentAlerts.map((alert) => (
                          <ListItem key={alert.id} sx={{ px: 0 }}>
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: getSeverityColor(alert.severity) + '.main' }}>
                                <Warning />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={alert.type}
                              secondary={
                                <Stack spacing={0.5}>
                                  <Typography variant="body2" color="text.secondary">
                                    {alert.student}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {alert.time}
                                  </Typography>
                                </Stack>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Stack>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography variant="h6">Session Stats</Typography>
                      <Grid container spacing={2}>
                        <Grid size={6}>
                          <Stack spacing={1} alignItems="center">
                            <Typography variant="h4" color="success.main">
                              42
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Clean Sessions
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid size={6}>
                          <Stack spacing={1} alignItems="center">
                            <Typography variant="h4" color="warning.main">
                              3
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Flagged Students
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid size={6}>
                          <Stack spacing={1} alignItems="center">
                            <Typography variant="h4" color="error.main">
                              6
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Total Violations
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid size={6}>
                          <Stack spacing={1} alignItems="center">
                            <Typography variant="h4" color="info.main">
                              135
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Minutes Elapsed
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Stack>

        {/* Flag Student Dialog */}
        <Dialog open={flagDialogOpen} onClose={() => setFlagDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            Flag Student: {selectedStudent}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <FormControl fullWidth>
                <InputLabel>Violation Type</InputLabel>
                <Select
                  value={flagType}
                  onChange={(e) => setFlagType(e.target.value)}
                  label="Violation Type"
                >
                  <MenuItem value="multiple-faces">Multiple Faces Detected</MenuItem>
                  <MenuItem value="tab-switch">Tab Switching</MenuItem>
                  <MenuItem value="camera-off">Camera Turned Off</MenuItem>
                  <MenuItem value="audio-anomaly">Audio Anomaly</MenuItem>
                  <MenuItem value="suspicious-behavior">Suspicious Behavior</MenuItem>
                  <MenuItem value="technical-issue">Technical Issue</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Description"
                multiline
                rows={4}
                value={flagDescription}
                onChange={(e) => setFlagDescription(e.target.value)}
                placeholder="Provide additional details about the violation..."
              />
              <Alert severity="warning">
                This action will create a violation record for the student and may result in exam termination.
              </Alert>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setFlagDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleFlagStudent} startIcon={<Send />}>
              Submit Flag
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
}
