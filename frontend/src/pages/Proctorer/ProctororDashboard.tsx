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
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
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
            <Grid size={{ xs: 12, lg: 8 }}>
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
            <Grid size={{ xs: 12, lg: 4 }}>
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
          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Typography variant="h6">Quick Actions</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<Visibility />}
                      onClick={() => navigate('/proctorer/live-monitoring')}
                      sx={{ py: 2 }}
                    >
                      Live Monitoring
                    </Button>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<Flag />}
                      onClick={() => navigate('/proctorer/violations')}
                      sx={{ py: 2 }}
                    >
                      Violation Reports
                    </Button>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<Assessment />}
                      onClick={() => navigate('/proctorer/exams')}
                      sx={{ py: 2 }}
                    >
                      Exam Sessions
                    </Button>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<Security />}
                      onClick={() => navigate('/proctorer/profile')}
                      sx={{ py: 2 }}
                    >
                      Profile Settings
                    </Button>
                  </Grid>
                </Grid>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </LayoutWithoutSidebar>
  );
}
