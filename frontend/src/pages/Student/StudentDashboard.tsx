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
  LinearProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import {
  School,
  Assignment,
  Schedule,
  TrendingUp,
  PlayArrow,
  Visibility,
  Assessment,
  Timer,
  CheckCircle,
} from '@mui/icons-material';
import { LayoutWithoutSidebar } from '../../components/layout';
import { useNavigate } from 'react-router-dom';

export function StudentDashboard() {
  const navigate = useNavigate();

  const upcomingExams = [
    {
      id: 1,
      title: 'Mathematics Final Exam',
      course: 'MATH 101',
      date: '2024-01-25',
      time: '09:00 AM',
      duration: '3 hours',
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'Physics Midterm',
      course: 'PHYS 201',
      date: '2024-01-26',
      time: '02:00 PM',
      duration: '2 hours',
      status: 'available'
    }
  ];

  const recentResults = [
    {
      id: 1,
      title: 'Chemistry Quiz',
      course: 'CHEM 301',
      score: 92,
      maxScore: 100,
      date: '2024-01-20',
      status: 'passed'
    },
    {
      id: 2,
      title: 'Biology Assessment',
      course: 'BIO 101',
      score: 78,
      maxScore: 100,
      date: '2024-01-18',
      status: 'passed'
    }
  ];

  const stats = [
    { title: 'Completed Exams', value: '12', icon: CheckCircle, color: 'success' },
    { title: 'Upcoming Exams', value: '3', icon: Schedule, color: 'info' },
    { title: 'Average Score', value: '87%', icon: TrendingUp, color: 'primary' },
    { title: 'Active Courses', value: '5', icon: School, color: 'secondary' }
  ];

  return (
    <LayoutWithoutSidebar title="Student Dashboard">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* Welcome Section */}
          <Card>
            <CardContent>
              <Stack direction="row" spacing={3} alignItems="center">
                <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
                  <School sx={{ fontSize: 40 }} />
                </Avatar>
                <Stack>
                  <Typography variant="h4" fontWeight={600}>
                    Welcome back, John!
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    You have 2 exams scheduled for this week
                  </Typography>
                </Stack>
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
                      <stat.icon color={stat.color as 'success' | 'info' | 'primary' | 'secondary'} sx={{ fontSize: 40 }} />
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
            {/* Upcoming Exams */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Card>
                <CardContent>
                  <Stack spacing={3}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Schedule color="primary" />
                      Upcoming Exams
                    </Typography>
                    
                    {upcomingExams.length > 0 ? (
                      <Stack spacing={2}>
                        {upcomingExams.map((exam) => (
                          <Card key={exam.id} variant="outlined">
                            <CardContent>
                              <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Stack spacing={1}>
                                  <Typography variant="h6" fontWeight={600}>
                                    {exam.title}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {exam.course} • {exam.date} at {exam.time}
                                  </Typography>
                                  <Stack direction="row" spacing={1} alignItems="center">
                                    <Timer fontSize="small" color="action" />
                                    <Typography variant="body2">{exam.duration}</Typography>
                                  </Stack>
                                </Stack>
                                <Stack spacing={1} alignItems="end">
                                  <Chip 
                                    label={exam.status} 
                                    color={exam.status === 'available' ? 'success' : 'info'}
                                    size="small"
                                  />
                                  {exam.status === 'available' && (
                                    <Button 
                                      variant="contained" 
                                      startIcon={<PlayArrow />}
                                      onClick={() => navigate(`/student/exam/take/${exam.id}`)}
                                    >
                                      Start Exam
                                    </Button>
                                  )}
                                </Stack>
                              </Stack>
                            </CardContent>
                          </Card>
                        ))}
                      </Stack>
                    ) : (
                      <Alert severity="info">No upcoming exams scheduled</Alert>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Recent Results */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Stack spacing={3}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Assessment color="primary" />
                      Recent Results
                    </Typography>
                    
                    <List sx={{ p: 0 }}>
                      {recentResults.map((result) => (
                        <ListItem key={result.id} sx={{ px: 0 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: result.status === 'passed' ? 'success.main' : 'error.main' }}>
                              <Assessment />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={result.title}
                            secondary={
                              <Stack spacing={0.5}>
                                <Typography variant="body2" color="text.secondary">
                                  {result.course} • {result.date}
                                </Typography>
                                <Stack direction="row" spacing={1} alignItems="center">
                                  <LinearProgress
                                    variant="determinate"
                                    value={(result.score / result.maxScore) * 100}
                                    sx={{ flexGrow: 1, height: 6, borderRadius: 3 }}
                                    color={result.score >= 70 ? 'success' : 'error'}
                                  />
                                  <Typography variant="body2" fontWeight={600}>
                                    {result.score}/{result.maxScore}
                                  </Typography>
                                </Stack>
                              </Stack>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
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
                      startIcon={<Assignment />}
                      onClick={() => navigate('/student/exams')}
                      sx={{ py: 2 }}
                    >
                      View All Exams
                    </Button>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<Assessment />}
                      onClick={() => navigate('/student/results')}
                      sx={{ py: 2 }}
                    >
                      View Results
                    </Button>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<Schedule />}
                      onClick={() => navigate('/student/schedule')}
                      sx={{ py: 2 }}
                    >
                      My Schedule
                    </Button>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<Visibility />}
                      onClick={() => navigate('/student/profile')}
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
