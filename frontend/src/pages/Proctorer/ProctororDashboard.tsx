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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  LinearProgress,
  Paper,
  Box,
} from '@mui/material';
import {
  Visibility,
  Security,
  Assessment,
  People,
  Warning,
  Flag,
  NotificationsActive,
} from '@mui/icons-material';
import { LayoutWithoutSidebar } from '../../components/layout';
import { useNavigate } from 'react-router-dom';

export function ProctororDashboard() {
  const navigate = useNavigate();

  const activeExams = [
    {
      id: 1,
      title: 'Mathematics Final Exam',
      course: 'MATH 101',
      activeStudents: 45,
      totalStudents: 50,
      violations: 3,
      startTime: '09:00 AM',
      timeRemaining: '2h 15m',
      status: 'in-progress'
    },
    {
      id: 2,
      title: 'Physics Midterm',
      course: 'PHYS 201',
      activeStudents: 28,
      totalStudents: 30,
      violations: 1,
      startTime: '02:00 PM',
      timeRemaining: '45m',
      status: 'in-progress'
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      student: 'John Doe',
      exam: 'Mathematics Final',
      type: 'Multiple Faces Detected',
      time: '2 minutes ago',
      severity: 'high'
    },
    {
      id: 2,
      student: 'Jane Smith',
      exam: 'Physics Midterm',
      type: 'Tab Switch Detected',
      time: '5 minutes ago',
      severity: 'medium'
    },
    {
      id: 3,
      student: 'Mike Johnson',
      exam: 'Mathematics Final',
      type: 'Audio Anomaly',
      time: '8 minutes ago',
      severity: 'low'
    }
  ];

  const stats = [
    { title: 'Active Exams', value: '2', icon: Assessment, color: 'primary' },
    { title: 'Students Monitored', value: '73', icon: People, color: 'info' },
    { title: 'Total Violations', value: '4', icon: Warning, color: 'warning' },
    { title: 'Flagged Sessions', value: '2', icon: Flag, color: 'error' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  return (
    <LayoutWithoutSidebar title="Proctorer Dashboard">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* Welcome Section */}
          <Card>
            <CardContent>
              <Stack direction="row" spacing={3} alignItems="center">
                <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
                  <Security sx={{ fontSize: 40 }} />
                </Avatar>
                <Stack>
                  <Typography variant="h4" fontWeight={600}>
                    Proctoring Dashboard
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Monitor ongoing exams and ensure academic integrity
                  </Typography>
                </Stack>
                <Button
                  variant="contained"
                  startIcon={<NotificationsActive />}
                  color="warning"
                >
                  4 Active Alerts
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardContent>
                    <Stack spacing={2} alignItems="center" textAlign="center">
                      <stat.icon color={stat.color as 'primary' | 'info' | 'warning' | 'error'} sx={{ fontSize: 40 }} />
                      <Typography variant="h4" fontWeight={600}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.title}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={4}>
            {/* Active Exams */}
            <Grid item xs={12} lg={8}>
              <Card>
                <CardContent>
                  <Stack spacing={3}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Assessment color="primary" />
                      Active Exams
                    </Typography>
                    
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Exam Details</TableCell>
                            <TableCell align="center">Students</TableCell>
                            <TableCell align="center">Progress</TableCell>
                            <TableCell align="center">Violations</TableCell>
                            <TableCell align="center">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {activeExams.map((exam) => (
                            <TableRow key={exam.id}>
                              <TableCell>
                                <Stack spacing={0.5}>
                                  <Typography variant="subtitle2" fontWeight={600}>
                                    {exam.title}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {exam.course} • Started at {exam.startTime}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Stack spacing={1} alignItems="center">
                                  <Typography variant="body2" fontWeight={500}>
                                    {exam.activeStudents}/{exam.totalStudents}
                                  </Typography>
                                  <LinearProgress
                                    variant="determinate"
                                    value={(exam.activeStudents / exam.totalStudents) * 100}
                                    sx={{ width: 60, height: 4 }}
                                  />
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Stack spacing={0.5} alignItems="center">
                                  <Typography variant="body2" fontWeight={500}>
                                    {exam.timeRemaining}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    remaining
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Chip
                                  label={exam.violations}
                                  size="small"
                                  color={exam.violations === 0 ? 'success' : exam.violations < 3 ? 'warning' : 'error'}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Stack direction="row" justifyContent="center" spacing={0.5}>
                                  <IconButton 
                                    size="small" 
                                    color="primary"
                                    onClick={() => navigate(`/proctorer/exam/${exam.id}`)}
                                  >
                                    <Visibility />
                                  </IconButton>
                                  <IconButton size="small" color="warning">
                                    <Flag />
                                  </IconButton>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Recent Alerts */}
            <Grid item xs={12} lg={4}>
              <Card>
                <CardContent>
                  <Stack spacing={3}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Warning color="primary" />
                      Recent Alerts
                    </Typography>
                    
                    <Stack spacing={2}>
                      {recentAlerts.map((alert) => (
                        <Card key={alert.id} variant="outlined">
                          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                            <Stack spacing={1}>
                              <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="subtitle2" fontWeight={600}>
                                  {alert.type}
                                </Typography>
                                <Chip
                                  label={alert.severity}
                                  size="small"
                                  color={getSeverityColor(alert.severity) as 'error' | 'warning' | 'info' | 'default'}
                                />
                              </Stack>
                              <Typography variant="body2" color="text.secondary">
                                Student: {alert.student}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Exam: {alert.exam}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {alert.time}
                              </Typography>
                            </Stack>
                          </CardContent>
                        </Card>
                      ))}
                    </Stack>

                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => navigate('/proctorer/alerts')}
                    >
                      View All Alerts
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Quick Actions */}
          <Box
            sx={{
              width: '100%',
              minHeight: '500px', 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 3
            }}
          >
            <Paper
              elevation={10}
              sx={{
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 15px 30px -12px rgba(0, 0, 0, 0.3)',
                overflow: 'hidden',
                position: 'relative',
                width: '100%'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '-20px',
                  right: '10%',
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                  zIndex: 0
                }}
              />
            <CardContent sx={{ p: 4, width: '100%', textAlign: 'center' }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: 1,
                  color: 'white',
                  fontWeight: 700,
                  mb: 5,
                  pb: 2,
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  width: '100%',
                  textAlign: 'center',
                  letterSpacing: '0.5px'
                }}
              >
                Quick Actions
              </Typography>

              <Grid container spacing={4} justifyContent="center" alignItems="stretch">
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    onClick={() => navigate('/proctorer/live-monitoring')}
                    sx={{
                      py: 3,
                      px: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                      background: 'rgba(99, 102, 241, 0.1)',
                      border: '1px solid rgba(99, 102, 241, 0.2)',
                      borderRadius: 3,
                      color: 'white',
                      textTransform: 'none',
                      transition: 'all 0.3s ease',
                      height: '100%',
                      '&:hover': {
                        background: 'rgba(99, 102, 241, 0.2)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 10px 25px rgba(99, 102, 241, 0.4)'
                      }
                    }}
                  >
                    <Avatar 
                      sx={{
                        bgcolor: 'rgba(99, 102, 241, 0.2)',
                        color: '#6366f1',
                        width: 64,
                        height: 64,
                        mb: 1
                      }}
                    >
                      <Visibility />
                    </Avatar>
                    <Typography fontWeight={600}>Live Monitoring</Typography>
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    onClick={() => navigate('/proctorer/violations')}
                    sx={{
                      py: 3,
                      px: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      borderRadius: 3,
                      color: 'white',
                      textTransform: 'none',
                      transition: 'all 0.3s ease',
                      height: '100%',
                      '&:hover': {
                        background: 'rgba(239, 68, 68, 0.2)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 10px 25px rgba(239, 68, 68, 0.4)'
                      }
                    }}
                  >
                    <Avatar 
                      sx={{
                        bgcolor: 'rgba(239, 68, 68, 0.2)',
                        color: '#ef4444',
                        width: 64,
                        height: 64,
                        mb: 1
                      }}
                    >
                      <Flag />
                    </Avatar>
                    <Typography fontWeight={600}>Violation Reports</Typography>
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    onClick={() => navigate('/proctorer/exams')}
                    sx={{
                      py: 3,
                      px: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      borderRadius: 3,
                      color: 'white',
                      textTransform: 'none',
                      transition: 'all 0.3s ease',
                      height: '100%',
                      '&:hover': {
                        background: 'rgba(16, 185, 129, 0.2)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)'
                      }
                    }}
                  >
                    <Avatar 
                      sx={{
                        bgcolor: 'rgba(16, 185, 129, 0.2)',
                        color: '#10b981',
                        width: 50,
                        height: 50
                      }}
                    >
                      <Assessment />
                    </Avatar>
                    <Typography fontWeight={600}>Exam Sessions</Typography>
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    onClick={() => navigate('/proctorer/profile')}
                    sx={{
                      py: 3,
                      px: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                      background: 'rgba(139, 92, 246, 0.1)',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      borderRadius: 3,
                      color: 'white',
                      textTransform: 'none',
                      transition: 'all 0.3s ease',
                      height: '100%',
                      '&:hover': {
                        background: 'rgba(139, 92, 246, 0.2)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 10px 25px rgba(139, 92, 246, 0.4)'
                      }
                    }}
                  >
                    <Avatar 
                      sx={{
                        bgcolor: 'rgba(139, 92, 246, 0.2)',
                        color: '#8b5cf6',
                        width: 50,
                        height: 50
                      }}
                    >
                      <Security />
                    </Avatar>
                    <Typography fontWeight={600}>Profile Settings</Typography>
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
            </Paper>
          </Box>
        </Stack>
      </Container>
    </LayoutWithoutSidebar>
  );
}
