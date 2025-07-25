import {
  Typography,
  Container,
  Grid,
  Stack,
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
  Box,
  Paper,
  Divider,
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
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          minHeight: '100vh',
          pt: 2,
          pb: 6,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Background decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
            zIndex: 0
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
            filter: 'blur(40px)',
            zIndex: 0
          }}
        />
        
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
          <Stack spacing={4}>
            {/* Welcome Section */}
            <Paper
              elevation={10}
              sx={{
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '-30px',
                  left: '-30px',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  filter: 'blur(25px)',
                }}
              />
              <CardContent sx={{ p: 4 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
                  <Avatar 
                    sx={{ 
                      width: 100, 
                      height: 100, 
                      bgcolor: 'rgba(139, 92, 246, 0.2)',
                      border: '4px solid rgba(139, 92, 246, 0.3)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
                    }}
                  >
                    <School sx={{ fontSize: 50, color: 'rgba(255,255,255,0.9)' }} />
                  </Avatar>
                  <Stack>
                    <Typography 
                      variant="h4" 
                      fontWeight={700} 
                      sx={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Welcome back, John!
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)', mt: 1 }}>
                      You have 2 exams scheduled for this week
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Paper>

            {/* Stats Cards */}
            <Grid container spacing={3}>
              {stats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper
                    elevation={10}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 15px 30px -12px rgba(0, 0, 0, 0.3)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      },
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -20,
                        right: -20,
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${stat.color === 'primary' ? 'rgba(139, 92, 246, 0.2)' : 
                          stat.color === 'info' ? 'rgba(99, 102, 241, 0.2)' : 
                          stat.color === 'success' ? 'rgba(16, 185, 129, 0.2)' : 
                          stat.color === 'secondary' ? 'rgba(236, 72, 153, 0.2)' : 'rgba(139, 92, 246, 0.2)'}, transparent 70%)`,
                        filter: 'blur(15px)',
                      }}
                    />
                    <Stack spacing={2} alignItems="flex-start">
                      <Avatar
                        sx={{ 
                          bgcolor: 'rgba(255, 255, 255, 0.05)',
                          color: stat.color === 'primary' ? '#8b5cf6' : 
                            stat.color === 'info' ? '#6366f1' : 
                            stat.color === 'success' ? '#10b981' : 
                            stat.color === 'secondary' ? '#ec4899' : '#8b5cf6',
                          width: 56,
                          height: 56,
                          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        <stat.icon sx={{ fontSize: 28 }} />
                      </Avatar>
                      <Typography 
                        variant="h3" 
                        fontWeight={700}
                        sx={{
                          color: 'white',
                          textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        {stat.title}
                      </Typography>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={4}>
              {/* Upcoming Exams */}
              <Grid item xs={12} md={8}>
                <Paper
                  elevation={10}
                  sx={{
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 15px 30px -12px rgba(0, 0, 0, 0.3)',
                    overflow: 'hidden',
                    height: '100%'
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={3}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1,
                          color: 'white',
                          fontWeight: 600,
                          pb: 1,
                          borderBottom: '1px solid rgba(255,255,255,0.1)'
                        }}
                      >
                        <Schedule sx={{ color: '#8b5cf6' }} />
                        Upcoming Exams
                      </Typography>
                      
                      {upcomingExams.length > 0 ? (
                        <Stack spacing={2}>
                          {upcomingExams.map((exam) => (
                            <Paper 
                              key={exam.id} 
                              elevation={3}
                              sx={{
                                borderRadius: 2,
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  background: 'rgba(255, 255, 255, 0.06)',
                                  transform: 'translateY(-2px)',
                                  boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.3)',
                                }
                              }}
                            >
                              <CardContent>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                  <Stack spacing={1}>
                                    <Typography variant="h6" fontWeight={600} sx={{ color: 'white' }}>
                                      {exam.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                      {exam.course} • {exam.date} at {exam.time}
                                    </Typography>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                      <Timer fontSize="small" sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                        {exam.duration}
                                      </Typography>
                                    </Stack>
                                  </Stack>
                                  <Stack spacing={1} alignItems="end">
                                    <Chip 
                                      label={exam.status} 
                                      color={exam.status === 'available' ? 'success' : 'info'}
                                      size="small"
                                      sx={{
                                        backgroundColor: exam.status === 'available' 
                                          ? 'rgba(16, 185, 129, 0.2)' 
                                          : 'rgba(99, 102, 241, 0.2)',
                                        color: exam.status === 'available' 
                                          ? '#10b981' 
                                          : '#6366f1',
                                        border: '1px solid',
                                        borderColor: exam.status === 'available' 
                                          ? 'rgba(16, 185, 129, 0.3)' 
                                          : 'rgba(99, 102, 241, 0.3)'
                                      }}
                                    />
                                    {exam.status === 'available' && (
                                      <Button 
                                        variant="contained" 
                                        startIcon={<PlayArrow />}
                                        onClick={() => navigate(`/student/exam/take/${exam.id}`)}
                                        sx={{
                                          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                          color: 'white',
                                          fontWeight: 600,
                                          textTransform: 'none',
                                          '&:hover': {
                                            boxShadow: '0 8px 16px rgba(139, 92, 246, 0.4)'
                                          }
                                        }}
                                      >
                                        Start Exam
                                      </Button>
                                    )}
                                  </Stack>
                                </Stack>
                              </CardContent>
                            </Paper>
                          ))}
                        </Stack>
                      ) : (
                        <Alert severity="info">No upcoming exams scheduled</Alert>
                      )}
                    </Stack>
                  </CardContent>
                </Paper>
              </Grid>

              {/* Recent Results */}
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={10}
                  sx={{
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 15px 30px -12px rgba(0, 0, 0, 0.3)',
                    overflow: 'hidden',
                    height: '100%'
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={3}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1,
                          color: 'white',
                          fontWeight: 600,
                          pb: 1,
                          borderBottom: '1px solid rgba(255,255,255,0.1)'
                        }}
                      >
                        <Assessment sx={{ color: '#8b5cf6' }} />
                        Recent Results
                      </Typography>
                      
                      <Stack spacing={2}>
                        {recentResults.map((result) => (
                          <Paper 
                            key={result.id}
                            elevation={3}
                            sx={{
                              borderRadius: 2,
                              background: 'rgba(255, 255, 255, 0.04)',
                              border: '1px solid rgba(255, 255, 255, 0.05)',
                              overflow: 'hidden',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                background: 'rgba(255, 255, 255, 0.06)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.3)',
                              }
                            }}
                          >
                            <ListItem sx={{ px: 2, py: 1.5 }}>
                              <ListItemAvatar>
                                <Avatar 
                                  sx={{ 
                                    bgcolor: result.status === 'passed' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                    border: '1px solid',
                                    borderColor: result.status === 'passed' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)',
                                    color: result.status === 'passed' ? '#10b981' : '#ef4444'
                                  }}
                                >
                                  {result.status === 'passed' ? <CheckCircle /> : <Assignment />}
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Typography variant="subtitle2" fontWeight={600} sx={{ color: 'white' }}>
                                    {result.title}
                                  </Typography>
                                }
                                secondary={
                                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                    {result.course} • {result.date}
                                  </Typography>
                                }
                                sx={{ my: 0 }}
                              />
                              <Box sx={{ minWidth: 70, textAlign: 'right' }}>
                                <Typography variant="subtitle2" fontWeight={600} sx={{ color: 'white' }}>
                                  {result.score}/{result.maxScore}
                                </Typography>
                                <Box sx={{ width: 70, mt: 0.5 }}>
                                  <LinearProgress 
                                    variant="determinate" 
                                    value={(result.score / result.maxScore) * 100} 
                                    sx={{
                                      height: 4,
                                      borderRadius: 2,
                                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                      '& .MuiLinearProgress-bar': {
                                        backgroundColor: result.status === 'passed' ? '#10b981' : '#ef4444',
                                      }
                                    }}
                                  />
                                </Box>
                              </Box>
                            </ListItem>
                          </Paper>
                        ))}
                      </Stack>
                    </Stack>
                  </CardContent>
                </Paper>
              </Grid>
            </Grid>

            {/* Quick Actions */}
            <Paper
              elevation={10}
              sx={{
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 15px 30px -12px rgba(0, 0, 0, 0.3)',
                overflow: 'hidden',
                position: 'relative'
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
              <CardContent sx={{ p: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    color: 'white',
                    fontWeight: 600,
                    mb: 3,
                    pb: 1,
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  Quick Actions
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      onClick={() => navigate('/student/exams')}
                      sx={{
                        py: 2,
                        px: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1.5,
                        background: 'rgba(99, 102, 241, 0.1)',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                        borderRadius: 2,
                        color: 'white',
                        textTransform: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(99, 102, 241, 0.2)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <Avatar 
                        sx={{
                          bgcolor: 'rgba(99, 102, 241, 0.2)',
                          color: '#6366f1',
                          width: 50,
                          height: 50
                        }}
                      >
                        <Visibility />
                      </Avatar>
                      <Typography fontWeight={600}>View All Exams</Typography>
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      onClick={() => navigate('/student/results')}
                      sx={{
                        py: 2,
                        px: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1.5,
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        borderRadius: 2,
                        color: 'white',
                        textTransform: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(16, 185, 129, 0.2)',
                          transform: 'translateY(-2px)'
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
                      <Typography fontWeight={600}>My Results</Typography>
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      onClick={() => navigate('/student/schedule')}
                      sx={{
                        py: 2,
                        px: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1.5,
                        background: 'rgba(236, 72, 153, 0.1)',
                        border: '1px solid rgba(236, 72, 153, 0.2)',
                        borderRadius: 2,
                        color: 'white',
                        textTransform: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(236, 72, 153, 0.2)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <Avatar 
                        sx={{
                          bgcolor: 'rgba(236, 72, 153, 0.2)',
                          color: '#ec4899',
                          width: 50,
                          height: 50
                        }}
                      >
                        <Schedule />
                      </Avatar>
                      <Typography fontWeight={600}>My Schedule</Typography>
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      onClick={() => navigate('/student/profile')}
                      sx={{
                        py: 2,
                        px: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1.5,
                        background: 'rgba(139, 92, 246, 0.1)',
                        border: '1px solid rgba(139, 92, 246, 0.2)',
                        borderRadius: 2,
                        color: 'white',
                        textTransform: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(139, 92, 246, 0.2)',
                          transform: 'translateY(-2px)'
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
                        <School />
                      </Avatar>
                      <Typography fontWeight={600}>Profile Settings</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Paper>
          </Stack>
        </Container>
      </Box>
    </LayoutWithoutSidebar>
  );
}
