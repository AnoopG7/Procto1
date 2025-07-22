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
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Badge,
  Alert,
  LinearProgress,
  Divider,
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Camera,
  VolumeUp,
  Block,
  Flag,
  Person,
  Visibility,
  Chat,
  NotificationImportant,
  Security,
  MonitorHeart,
  PlayArrow,
  Pause,
  Stop,
} from '@mui/icons-material';
import { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`exam-tabpanel-${index}`}
      aria-labelledby={`exam-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export function ProctororExamMonitoring() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showIncidentDialog, setShowIncidentDialog] = useState(false);
  const [monitoringActive, setMonitoringActive] = useState(true);

  // Mock exam and student data
  const examData = {
    id: 'EXAM001',
    title: 'Advanced Mathematics Final Examination',
    course: 'MATH 401',
    startTime: '2024-01-15 14:00',
    duration: 90,
    totalStudents: 24,
    activeStudents: 22,
    completedStudents: 2,
  };

  const students = [
    {
      id: '1',
      name: 'Alice Johnson',
      avatar: '/avatars/alice.jpg',
      progress: 75,
      status: 'active',
      violations: 0,
      lastActivity: '2 minutes ago',
      cameraStatus: 'active',
      audioStatus: 'active',
      screenStatus: 'locked',
    },
    {
      id: '2',
      name: 'Bob Smith',
      avatar: '/avatars/bob.jpg',
      progress: 60,
      status: 'flagged',
      violations: 2,
      lastActivity: '1 minute ago',
      cameraStatus: 'inactive',
      audioStatus: 'active',
      screenStatus: 'locked',
    },
    {
      id: '3',
      name: 'Carol Brown',
      avatar: '/avatars/carol.jpg',
      progress: 90,
      status: 'active',
      violations: 0,
      lastActivity: '30 seconds ago',
      cameraStatus: 'active',
      audioStatus: 'active',
      screenStatus: 'locked',
    },
    {
      id: '4',
      name: 'David Wilson',
      avatar: '/avatars/david.jpg',
      progress: 45,
      status: 'warning',
      violations: 1,
      lastActivity: '5 minutes ago',
      cameraStatus: 'active',
      audioStatus: 'inactive',
      screenStatus: 'unlocked',
    },
  ];

  const recentIncidents = [
    {
      id: '1',
      studentId: '2',
      studentName: 'Bob Smith',
      type: 'Face not detected',
      severity: 'high',
      timestamp: '14:25:30',
      description: 'Student\'s face was not visible for 30 seconds',
      status: 'flagged'
    },
    {
      id: '2',
      studentId: '4',
      studentName: 'David Wilson',
      type: 'Multiple faces detected',
      severity: 'medium',
      timestamp: '14:20:15',
      description: 'Multiple people detected in camera feed',
      status: 'reviewing'
    },
    {
      id: '3',
      studentId: '4',
      studentName: 'David Wilson',
      type: 'Browser tab switch',
      severity: 'low',
      timestamp: '14:18:45',
      description: 'Student switched browser tabs',
      status: 'acknowledged'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'warning': return 'warning';
      case 'flagged': return 'error';
      case 'completed': return 'info';
      default: return 'primary';
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

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack>
            <Typography variant="h4" fontWeight={600}>
              Exam Monitoring
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {examData.title} • {examData.course}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button
              variant={monitoringActive ? "contained" : "outlined"}
              startIcon={monitoringActive ? <Pause /> : <PlayArrow />}
              onClick={() => setMonitoringActive(!monitoringActive)}
              color={monitoringActive ? "error" : "success"}
            >
              {monitoringActive ? 'Pause Monitoring' : 'Resume Monitoring'}
            </Button>
            <Button
              variant="outlined"
              startIcon={<Stop />}
              color="error"
            >
              End Exam
            </Button>
          </Stack>
        </Stack>

        {/* Status Overview */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <Person />
                  </Avatar>
                  <Stack>
                    <Typography variant="h6" fontWeight={600}>
                      {examData.activeStudents}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Students
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'warning.main' }}>
                    <Flag />
                  </Avatar>
                  <Stack>
                    <Typography variant="h6" fontWeight={600}>
                      3
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Flagged Students
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'error.main' }}>
                    <NotificationImportant />
                  </Avatar>
                  <Stack>
                    <Typography variant="h6" fontWeight={600}>
                      7
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Violations
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'success.main' }}>
                    <MonitorHeart />
                  </Avatar>
                  <Stack>
                    <Typography variant="h6" fontWeight={600}>
                      {monitoringActive ? 'Active' : 'Paused'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Monitoring Status
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Main Content */}
        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
              <Tab label="Student Overview" />
              <Tab label="Live Monitoring" />
              <Tab label="Incident Reports" />
              <Tab label="System Status" />
            </Tabs>
          </Box>

          <TabPanel value={selectedTab} index={0}>
            {/* Student Overview */}
            <Grid container spacing={3}>
              {students.map((student) => (
                <Grid key={student.id} size={{ xs: 12, md: 6, lg: 4 }}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Stack spacing={2}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Badge
                            color={getStatusColor(student.status)}
                            variant="dot"
                            sx={{ '& .MuiBadge-badge': { width: 12, height: 12 } }}
                          >
                            <Avatar>{student.name.split(' ').map(n => n[0]).join('')}</Avatar>
                          </Badge>
                          <Stack sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {student.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {student.lastActivity}
                            </Typography>
                          </Stack>
                          <IconButton
                            size="small"
                          >
                            <Visibility />
                          </IconButton>
                        </Stack>

                        <Stack spacing={1}>
                          <Stack direction="row" justifyContent="space-between">
                            <Typography variant="body2">Progress</Typography>
                            <Typography variant="body2">{student.progress}%</Typography>
                          </Stack>
                          <LinearProgress
                            variant="determinate"
                            value={student.progress}
                            color={getStatusColor(student.status)}
                          />
                        </Stack>

                        <Stack direction="row" spacing={2} justifyContent="space-between">
                          <Stack direction="row" spacing={1}>
                            <IconButton size="small" color={student.cameraStatus === 'active' ? 'success' : 'error'}>
                              <Camera />
                            </IconButton>
                            <IconButton size="small" color={student.audioStatus === 'active' ? 'success' : 'error'}>
                              <VolumeUp />
                            </IconButton>
                            <IconButton size="small" color={student.screenStatus === 'locked' ? 'success' : 'error'}>
                              <Security />
                            </IconButton>
                          </Stack>
                          <Chip
                            label={`${student.violations} violations`}
                            size="small"
                            color={student.violations > 0 ? 'error' : 'success'}
                          />
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={selectedTab} index={1}>
            {/* Live Monitoring */}
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Stack spacing={3}>
                  <Typography variant="h6">Live Video Feeds</Typography>
                  <Grid container spacing={2}>
                    {students.slice(0, 4).map((student) => (
                      <Grid key={student.id} size={{ xs: 12, sm: 6 }}>
                        <Card>
                          <CardContent sx={{ p: 2 }}>
                            <Stack spacing={1}>
                              <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="subtitle2" noWrap>
                                  {student.name}
                                </Typography>
                                <Chip
                                  label={student.status}
                                  size="small"
                                  color={getStatusColor(student.status)}
                                />
                              </Stack>
                              <Box
                                sx={{
                                  aspectRatio: '16/9',
                                  bgcolor: 'grey.100',
                                  borderRadius: 1,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  border: student.status === 'flagged' ? '2px solid' : 'none',
                                  borderColor: 'error.main'
                                }}
                              >
                                <Typography variant="body2" color="text.secondary">
                                  [Live Video Feed]
                                </Typography>
                              </Box>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Monitoring Controls
                    </Typography>
                    <Stack spacing={2}>
                      <Button
                        variant="contained"
                        startIcon={<Flag />}
                        fullWidth
                        onClick={() => setShowIncidentDialog(true)}
                      >
                        Report Incident
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Chat />}
                        fullWidth
                      >
                        Send Message
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Block />}
                        fullWidth
                        color="error"
                      >
                        Block Student
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={selectedTab} index={2}>
            {/* Incident Reports */}
            <Stack spacing={3}>
              <Typography variant="h6">Recent Incidents</Typography>
              <List>
                {recentIncidents.map((incident, index) => (
                  <div key={incident.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {incident.type}
                            </Typography>
                            <Chip
                              label={incident.severity}
                              size="small"
                              color={getSeverityColor(incident.severity)}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {incident.timestamp}
                            </Typography>
                          </Stack>
                        }
                        secondary={
                          <Stack spacing={1} sx={{ mt: 1 }}>
                            <Typography variant="body2">
                              <strong>{incident.studentName}</strong> • {incident.description}
                            </Typography>
                            <Chip
                              label={incident.status}
                              size="small"
                              variant="outlined"
                            />
                          </Stack>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end">
                          <Visibility />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < recentIncidents.length - 1 && <Divider />}
                  </div>
                ))}
              </List>
            </Stack>
          </TabPanel>

          <TabPanel value={selectedTab} index={3}>
            {/* System Status */}
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      AI Detection Status
                    </Typography>
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">Face Detection</Typography>
                        <Chip label="Active" color="success" size="small" />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">Object Detection</Typography>
                        <Chip label="Active" color="success" size="small" />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">Screen Monitoring</Typography>
                        <Chip label="Active" color="success" size="small" />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">Audio Analysis</Typography>
                        <Chip label="Active" color="success" size="small" />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      System Performance
                    </Typography>
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">CPU Usage</Typography>
                        <Typography variant="body2">45%</Typography>
                      </Stack>
                      <LinearProgress variant="determinate" value={45} />
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">Memory Usage</Typography>
                        <Typography variant="body2">62%</Typography>
                      </Stack>
                      <LinearProgress variant="determinate" value={62} />
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">Network Latency</Typography>
                        <Typography variant="body2">23ms</Typography>
                      </Stack>
                      <LinearProgress variant="determinate" value={77} color="success" />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
        </Card>

        {/* Incident Dialog */}
        <Dialog open={showIncidentDialog} onClose={() => setShowIncidentDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Report Incident</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <Alert severity="info">
                Select a student and incident type to create a new violation report.
              </Alert>
              {/* Incident form would go here */}
              <Typography variant="body2">
                [Incident reporting form - select student, violation type, severity, and add notes]
              </Typography>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowIncidentDialog(false)}>
              Cancel
            </Button>
            <Button variant="contained">
              Report Incident
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Container>
  );
}
