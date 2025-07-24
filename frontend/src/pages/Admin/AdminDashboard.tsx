import React, { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Fade,
  Grid,
  Avatar,
  Chip,
  Container,
  Badge,
} from '@mui/material';
import {
  TrendingUp,
  People,
  Assessment,
  Settings,
  Security,
  Computer,
  Visibility,
  BarChart,
  Add,
  Flag,
  CheckCircle,
  Schedule,
  PlayArrow,
  Stop,
  Warning,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Import admin dashboard data
import adminDashboardData from '../../data/admin-dashboard.json';
export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Icon mapping function
  const getIcon = (iconName: string): React.ComponentType<{ sx?: object }> => {
    const iconMap: { [key: string]: React.ComponentType<{ sx?: object }> } = {
      Assessment,
      People,
      CheckCircle,
      Computer,
      Add,
      Visibility,
      BarChart,
      Settings,
      Security,
      Flag,
      Schedule,
      PlayArrow,
      Stop,
      Warning,
      TrendingUp
    };
    return iconMap[iconName] || Assessment;
  };

  // Get data from JSON with icon mapping
  const hero = adminDashboardData.hero;
  const stats = adminDashboardData.stats.map(stat => ({
    ...stat,
    icon: getIcon(stat.icon)
  }));
  const quickActions = adminDashboardData.quickActions.map(action => ({
    ...action,
    icon: getIcon(action.icon)
  }));
  const recentActivities = adminDashboardData.recentActivities.map(activity => ({
    ...activity,
    icon: getIcon(activity.icon)
  }));
  const systemPerformance = adminDashboardData.systemPerformance;
  const upcomingExams = adminDashboardData.upcomingExams;
  const liveExams = adminDashboardData.liveExams;
  const securityOverview = adminDashboardData.securityOverview;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'primary';
    }
  };

  return (
    <Box sx={{ 
      width: '100vw', 
      overflow: 'hidden', 
      bgcolor: '#0a0a0a', 
      minHeight: '100vh',
      color: 'white'
    }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          py: { xs: 6, md: 8 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.2) 0%, transparent 50%)',
            opacity: 0.6
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="1.5"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.4
          }
        }}
      >
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in={isVisible} timeout={600}>
            <Box sx={{ textAlign: 'center' }}>
              <Box>
                <Chip 
                  icon={<CheckCircle />} 
                  label={hero.chip} 
                  sx={{ 
                    bgcolor: 'rgba(16, 185, 129, 0.15)', 
                    color: '#10b981',
                    fontWeight: 600,
                    mb: 3,
                    px: 3,
                    py: 1,
                    fontSize: '0.95rem',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }} 
                />
                <Typography 
                  variant="h1" 
                  fontWeight={900} 
                  sx={{ 
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    background: 'linear-gradient(45deg, #ffffff 30%, #c7d2fe 70%, #a78bfa 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.1,
                    mb: 2,
                    letterSpacing: '-0.02em'
                  }}
                >
                  {hero.title}
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    opacity: 0.9, 
                    lineHeight: 1.6,
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    fontWeight: 400,
                    maxWidth: 600,
                    color: '#e2e8f0',
                    mb: 2
                  }}
                >
                  {hero.subtitle}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {hero.lastUpdated} • Last updated: {new Date().toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Stack spacing={4}>
          {/* Stats Cards */}
          <Fade in={isVisible} timeout={800}>
            <Grid container spacing={5}>
              {stats.map((stat) => (
                <Grid key={stat.id} size={{ xs: 12, sm: 6, lg: 3 }}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      background: stat.gradient,
                      border: 'none',
                      color: 'white',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(255,255,255,0.1)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease'
                      },
                      '&:hover::before': {
                        opacity: 1
                      }
                    }}
                  >
                    <CardContent sx={{ p: 5 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
                        <Box>
                          <Typography variant="body2" sx={{ opacity: 0.9, mb: 1, fontWeight: 500, color: 'white' }}>
                            {stat.title}
                          </Typography>
                          <Typography variant="h3" fontWeight={900} sx={{ mb: 1, color: 'white' }}>
                            {stat.value}{stat.suffix || ''}
                          </Typography>
                        </Box>
                        <Avatar
                          sx={{
                            bgcolor: 'rgba(255,255,255,0.2)',
                            width: 56,
                            height: 56,
                            border: '2px solid rgba(255,255,255,0.3)'
                          }}
                        >
                          <stat.icon sx={{ fontSize: 28 }} />
                        </Avatar>
                      </Stack>
                      
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Chip
                          label={stat.change}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            fontWeight: 600,
                            border: '1px solid rgba(255,255,255,0.3)'
                          }}
                          icon={stat.trend === 'up' ? <TrendingUp /> : <TrendingUp sx={{ transform: 'rotate(180deg)' }} />}
                        />
                        <Typography variant="caption" sx={{ opacity: 0.8, fontWeight: 500, color: 'white' }}>
                          {stat.description}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Fade>

          {/* Live Exams Section */}
          <Fade in={isVisible} timeout={1000}>
            <Card sx={{ 
              borderRadius: 4, 
              bgcolor: '#111111', 
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white'
            }}>
              <CardContent sx={{ p: 5 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                  <Typography variant="h4" fontWeight="bold" sx={{ 
                    background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Live Exams
                  </Typography>
                  <Chip 
                    label={`${liveExams.length} Active`} 
                    color="error" 
                    variant="outlined"
                    icon={<PlayArrow />}
                    sx={{ color: '#ff6b6b', borderColor: '#ff6b6b' }}
                  />
                </Stack>
                
                <Grid container spacing={3}>
                  {liveExams.map((exam) => (
                    <Grid key={exam.id} size={{ xs: 12, md: 6 }}>
                      <Card sx={{ 
                        bgcolor: 'rgba(255, 107, 107, 0.1)', 
                        border: '1px solid rgba(255, 107, 107, 0.3)',
                        borderRadius: 3
                      }}>
                        <CardContent sx={{ p: 3 }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                            <Box>
                              <Typography variant="h6" fontWeight="bold" sx={{ color: '#ffffff', mb: 0.5 }}>
                                {exam.title}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#e0e0e0', fontWeight: 500 }}>
                                {exam.subject} • Started: {exam.startTime}
                              </Typography>
                            </Box>
                            <Badge badgeContent={exam.issues} color="warning">
                              <PlayArrow sx={{ color: '#ff6b6b' }} />
                            </Badge>
                          </Stack>
                          
                          <Stack spacing={2}>
                            <Stack direction="row" justifyContent="space-between">
                              <Typography variant="body2" sx={{ color: '#e0e0e0', fontWeight: 500 }}>
                                Progress: {exam.progress}%
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#e0e0e0', fontWeight: 500 }}>
                                {exam.students} students
                              </Typography>
                            </Stack>
                            <LinearProgress 
                              variant="determinate" 
                              value={exam.progress} 
                              sx={{ 
                                height: 6, 
                                borderRadius: 3,
                                bgcolor: 'rgba(255,255,255,0.1)',
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: '#ff6b6b'
                                }
                              }}
                            />
                            <Stack direction="row" spacing={2}>
                              <Button 
                                size="small" 
                                variant="outlined"
                                sx={{ color: '#ff6b6b', borderColor: '#ff6b6b' }}
                                onClick={() => navigate('/admin/monitoring')}
                              >
                                Monitor
                              </Button>
                              <Button 
                                size="small" 
                                variant="text"
                                sx={{ color: 'rgba(255,255,255,0.7)' }}
                              >
                                Details
                              </Button>
                            </Stack>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Fade>

          {/* Quick Actions */}
          <Fade in={isVisible} timeout={1200}>
            <Card sx={{ 
              borderRadius: 4, 
              bgcolor: '#111111', 
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ 
                  mb: 4,
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Quick Actions
                </Typography>
                
                <Grid container spacing={3}>
                  {quickActions.map((action) => (
                    <Grid key={action.id} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                      <Card
                        sx={{
                          cursor: 'pointer',
                          borderRadius: 3,
                          background: action.gradient,
                          border: 'none',
                          color: 'white',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          overflow: 'hidden',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 15px 30px rgba(0,0,0,0.3)'
                          },
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(255,255,255,0.1)',
                            opacity: 0,
                            transition: 'opacity 0.3s ease'
                          },
                          '&:hover::before': {
                            opacity: 1
                          }
                        }}
                        onClick={() => navigate(action.route)}
                      >
                        <CardContent sx={{ p: 3, textAlign: 'center', height: 160 }}>
                          <Avatar
                            sx={{
                              bgcolor: 'rgba(255,255,255,0.2)',
                              width: 36,
                              height: 36,
                              mx: 'auto',
                              mb: 1.5,
                              border: '2px solid rgba(255,255,255,0.3)'
                            }}
                          >
                            <action.icon sx={{ fontSize: 20 }} />
                          </Avatar>
                          <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                            {action.title}
                          </Typography>
                          <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.75rem', lineHeight: 1.2 }}>
                            {action.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Fade>

          {/* Recent Activities - Now Horizontal */}
          <Fade in={isVisible} timeout={1400}>
            <Card sx={{ 
              borderRadius: 4, 
              bgcolor: '#111111', 
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ 
                  mb: 4,
                  background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Recent Activities
                </Typography>
                
                <Grid container spacing={3}>
                  {recentActivities.map((activity) => (
                    <Grid key={activity.id} size={{ xs: 12, sm: 6, md: 3 }}>
                      <Card sx={{ 
                        bgcolor: 'rgba(79, 172, 254, 0.1)', 
                        border: '1px solid rgba(79, 172, 254, 0.3)',
                        borderRadius: 3,
                        height: 140
                      }}>
                        <CardContent sx={{ p: 3 }}>
                          <Stack direction="row" spacing={1.5} alignItems="flex-start">
                            <Avatar
                              sx={{
                                bgcolor: `${activity.color}.main`,
                                width: 32,
                                height: 32
                              }}
                            >
                              <activity.icon sx={{ fontSize: 16 }} />
                            </Avatar>
                            <Box sx={{ flex: 1, overflow: 'hidden' }}>
                              <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5, color: '#ffffff', fontSize: '0.875rem' }}>
                                {activity.title}
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 0.5, color: '#e0e0e0', fontSize: '0.75rem', lineHeight: 1.2 }}>
                                {activity.description}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#b0b0b0', fontSize: '0.7rem' }}>
                                {activity.time}
                              </Typography>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Button
                    variant="outlined"
                    sx={{ 
                      borderRadius: 2,
                      color: '#4facfe',
                      borderColor: '#4facfe',
                      '&:hover': {
                        borderColor: '#00f2fe',
                        bgcolor: 'rgba(79, 172, 254, 0.1)'
                      }
                    }}
                    onClick={() => navigate('/admin/activities')}
                  >
                    View All Activities
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Fade>

          {/* Upcoming Exams */}
          <Fade in={isVisible} timeout={1600}>
            <Card sx={{ 
              borderRadius: 4, 
              bgcolor: '#111111', 
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                  <Typography variant="h4" fontWeight="bold" sx={{ 
                    background: 'linear-gradient(45deg, #43e97b, #38f9d7)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Upcoming Exams
                  </Typography>
                  <Button 
                    variant="outlined" 
                    startIcon={<Schedule />}
                    sx={{ 
                      color: '#43e97b', 
                      borderColor: '#43e97b',
                      '&:hover': {
                        borderColor: '#38f9d7',
                        bgcolor: 'rgba(67, 233, 123, 0.1)'
                      }
                    }}
                    onClick={() => navigate('/admin/schedule')}
                  >
                    View Schedule
                  </Button>
                </Stack>
                
                <Grid container spacing={3}>
                  {upcomingExams.map((exam) => (
                    <Grid key={exam.id} size={{ xs: 12, md: 4 }}>
                      <Card sx={{ 
                        bgcolor: 'rgba(67, 233, 123, 0.1)', 
                        border: '1px solid rgba(67, 233, 123, 0.3)',
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          bgcolor: 'rgba(67, 233, 123, 0.15)'
                        }
                      }}>
                        <CardContent sx={{ p: 3 }}>
                          <Typography variant="h6" fontWeight="bold" color="white" sx={{ mb: 1 }}>
                            {exam.title}
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                            {exam.subject}
                          </Typography>
                          
                          <Stack spacing={1.5}>
                            <Stack direction="row" justifyContent="space-between">
                              <Typography variant="caption" sx={{ opacity: 0.7 }}>Date:</Typography>
                              <Typography variant="caption" color="white">{exam.date}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                              <Typography variant="caption" sx={{ opacity: 0.7 }}>Time:</Typography>
                              <Typography variant="caption" color="white">{exam.time}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                              <Typography variant="caption" sx={{ opacity: 0.7 }}>Students:</Typography>
                              <Typography variant="caption" color="white">{exam.students}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                              <Typography variant="caption" sx={{ opacity: 0.7 }}>Duration:</Typography>
                              <Typography variant="caption" color="white">{exam.duration}</Typography>
                            </Stack>
                          </Stack>
                          
                          <Chip 
                            label={exam.status.toUpperCase()} 
                            size="small" 
                            sx={{ 
                              mt: 2,
                              bgcolor: 'rgba(67, 233, 123, 0.2)',
                              color: '#43e97b',
                              fontWeight: 600
                            }}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Fade>

          {/* Security Overview - Now Horizontal */}
          <Fade in={isVisible} timeout={1800}>
            <Card sx={{ 
              borderRadius: 4, 
              bgcolor: '#111111', 
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ 
                  mb: 4,
                  background: 'linear-gradient(45deg, #ff9a9e, #fecfef)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Security Overview
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card sx={{ 
                      bgcolor: 'rgba(255, 154, 158, 0.1)',
                      border: '1px solid rgba(255, 154, 158, 0.3)',
                      borderRadius: 3,
                      height: 120
                    }}>
                      <CardContent sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h4" fontWeight="bold" color="#ff9a9e" sx={{ mb: 0.5 }}>
                          {securityOverview.totalFlags}
                        </Typography>
                        <Typography variant="subtitle1" fontWeight="bold" color="white" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                          Active Flags
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.7rem' }}>
                          Security incidents requiring attention
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card sx={{ 
                      bgcolor: 'rgba(67, 233, 123, 0.1)',
                      border: '1px solid rgba(67, 233, 123, 0.3)',
                      borderRadius: 3,
                      height: 120
                    }}>
                      <CardContent sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h4" fontWeight="bold" color="#43e97b" sx={{ mb: 0.5 }}>
                          {securityOverview.resolvedToday}
                        </Typography>
                        <Typography variant="subtitle1" fontWeight="bold" color="white" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                          Resolved Today
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.7rem' }}>
                          Issues resolved in 24 hours
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card sx={{ 
                      bgcolor: 'rgba(79, 172, 254, 0.1)',
                      border: '1px solid rgba(79, 172, 254, 0.3)',
                      borderRadius: 3,
                      height: 120
                    }}>
                      <CardContent sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h4" fontWeight="bold" color="#4facfe" sx={{ mb: 0.5 }}>
                          {securityOverview.avgResponseTime}
                        </Typography>
                        <Typography variant="subtitle1" fontWeight="bold" color="white" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                          Avg Response
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.7rem' }}>
                          Average response time
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card sx={{ 
                      bgcolor: 'rgba(139, 92, 246, 0.1)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: 3,
                      height: 120
                    }}>
                      <CardContent sx={{ p: 3, textAlign: 'center' }}>
                        <Chip 
                          label={securityOverview.riskLevel}
                          size="small"
                          color={securityOverview.riskLevel === 'Low' ? 'success' : 'warning'}
                          sx={{ mb: 1, fontWeight: 600, fontSize: '0.75rem' }}
                        />
                        <Typography variant="subtitle1" fontWeight="bold" color="white" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                          Risk Level
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.7rem' }}>
                          Current system risk status
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Security />}
                    sx={{ 
                      color: '#ff9a9e',
                      borderColor: '#ff9a9e',
                      '&:hover': {
                        borderColor: '#fecfef',
                        bgcolor: 'rgba(255, 154, 158, 0.1)'
                      }
                    }}
                    onClick={() => navigate('/admin/security')}
                  >
                    Security Center
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Fade>

          {/* System Performance */}
          <Fade in={isVisible} timeout={2000}>
            <Card sx={{ 
              borderRadius: 4, 
              bgcolor: '#111111', 
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ 
                  mb: 4,
                  background: 'linear-gradient(45deg, #f093fb, #f5576c)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  System Performance
                </Typography>
                
                <Grid container spacing={4}>
                  {systemPerformance.map((metric) => (
                    <Grid key={metric.id} size={{ xs: 12, md: 3 }}>
                      <Stack spacing={2}>
                        <Typography variant="h6" fontWeight="medium" color="white">
                          {metric.title}
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={metric.value} 
                          color={getStatusColor(metric.status)}
                          sx={{ 
                            height: 12, 
                            borderRadius: 6,
                            bgcolor: 'rgba(255,255,255,0.1)'
                          }}
                        />
                        <Typography variant="body2" sx={{ opacity: 0.8, color: 'white' }}>
                          {metric.value}% - {metric.description}
                        </Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Fade>
        </Stack>
      </Container>
    </Box>
  );
};
