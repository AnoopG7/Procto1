import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Button,
  Paper,
  LinearProgress,
  useTheme,
  IconButton,
  Tooltip,
  Fade,
  Grid,
} from '@mui/material';
import {
  Add,
  Visibility,
  BarChart,
  Refresh,
  TrendingUp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/layout';
import { StatsCard } from '../../components/stats';
import { ExamCard } from '../../components/exam';
import dashboardData from '../../data/dashboard.json';

interface DashboardData {
  stats: Array<{
    id: string;
    title: string;
    value: number;
    icon: string;
    color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
    trend: string;
    description: string;
  }>;
  systemStatus: Array<{
    id: string;
    title: string;
    value: number;
    status: string;
    description: string;
  }>;
  recentExams: Array<{
    id: string;
    title: string;
    startTime: string;
    duration: string;
    candidates: number;
    status: 'upcoming' | 'ongoing' | 'completed';
    subject: string;
    instructor: string;
  }>;
  quickActions: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    route: string;
  }>;
}

export const AdminDashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [data] = useState(dashboardData as DashboardData);
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'success';
      case 'high': return 'warning'; 
      case 'good': return 'info';
      default: return 'primary';
    }
  };

  return (
    <Layout title="Procto - Dashboard">
      <Stack spacing={4}>
        {/* Header Section */}
        <Fade in timeout={500}>
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
              <Box>
                <Typography 
                  variant="h3" 
                  fontWeight="bold" 
                  sx={{ 
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1
                  }}
                >
                  Welcome to Procto
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  Monitor and manage your exam proctoring sessions
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <TrendingUp color="success" />
                  <Typography variant="body2" color="success.main" fontWeight="medium">
                    All systems operational
                  </Typography>
                </Stack>
              </Box>
              
              <Stack direction="row" spacing={1}>
                <Tooltip title="Refresh Dashboard">
                  <IconButton 
                    onClick={handleRefresh} 
                    disabled={loading}
                    sx={{ 
                      bgcolor: 'background.paper',
                      boxShadow: theme.shadows[2],
                      '&:hover': { boxShadow: theme.shadows[4] }
                    }}
                  >
                    <Refresh />
                  </IconButton>
                </Tooltip>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => navigate('/exams')}
                  size="large"
                  sx={{ 
                    borderRadius: 2,
                    px: 3,
                    boxShadow: theme.shadows[4],
                    '&:hover': { boxShadow: theme.shadows[8] }
                  }}
                >
                  Create Exam
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Fade>

        {/* Stats Cards */}
        <Fade in timeout={800}>
          <Grid container spacing={3}>
            {data.stats.map((stat) => (
              <Grid key={stat.id} size={{ xs: 12, sm: 6, lg: 3 }}>
                <StatsCard
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  color={stat.color}
                  trend={stat.trend}
                  description={stat.description}
                />
              </Grid>
            ))}
          </Grid>
        </Fade>

        {/* System Status */}
        <Fade in timeout={1000}>
          <Paper 
            sx={{ 
              p: 4,
              background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}08 100%)`,
              borderRadius: 3,
              border: `1px solid ${theme.palette.primary.main}20`
            }}
          >
            <Stack spacing={3}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" fontWeight="bold">
                  System Status
                </Typography>
                {loading && <LinearProgress sx={{ width: 100 }} />}
              </Stack>
              
              <Grid container spacing={4}>
                {data.systemStatus.map((status) => (
                  <Grid key={status.id} size={{ xs: 12, md: 4 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body1" fontWeight="medium">
                          {status.title}
                        </Typography>
                        <Typography 
                          variant="h6" 
                          fontWeight="bold"
                          color={`${getStatusColor(status.status)}.main`}
                        >
                          {status.value}%
                        </Typography>
                      </Stack>
                      
                      <LinearProgress 
                        variant="determinate" 
                        value={status.value}
                        color={getStatusColor(status.status) as 'primary' | 'success' | 'warning' | 'info'}
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: theme.palette.grey[200]
                        }}
                      />
                      
                      <Typography variant="caption" color="text.secondary">
                        {status.description}
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Paper>
        </Fade>

        {/* Quick Actions */}
        <Fade in timeout={1200}>
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              {data.quickActions.map((action) => (
                <Grid key={action.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Paper
                    sx={{
                      p: 3,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease-in-out',
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[8],
                        borderColor: 'primary.main',
                      }
                    }}
                    onClick={() => navigate(action.route)}
                  >
                    <Stack spacing={2}>
                      <Typography variant="h6" fontWeight="bold">
                        {action.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {action.description}
                      </Typography>
                      <Button 
                        variant="outlined" 
                        color={action.color as 'primary' | 'success' | 'info'}
                        sx={{ alignSelf: 'flex-start' }}
                      >
                        Get Started
                      </Button>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Recent Exams */}
        <Fade in timeout={1400}>
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight="bold">
                Recent Exams
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  startIcon={<Visibility />}
                  onClick={() => navigate('/monitoring')}
                >
                  Monitor Live
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<BarChart />}
                  onClick={() => navigate('/reports')}
                >
                  View Reports
                </Button>
              </Stack>
            </Stack>
            
            <Grid container spacing={3}>
              {data.recentExams.map((exam) => (
                <Grid key={exam.id} size={{ xs: 12, md: 6, lg: 4 }}>
                  <ExamCard
                    exam={exam}
                    onStart={() => navigate('/monitoring')}
                    onView={() => navigate('/monitoring')}
                    variant="default"
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>
      </Stack>
    </Layout>
  );
};
