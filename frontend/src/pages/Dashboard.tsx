import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Avatar,
  Chip,
  LinearProgress,
  Button,
  Paper,
} from '@mui/material';
import {
  Assessment,
  Schedule,
  People,
  Security,
  PlayArrow,
  Stop,
  Visibility,
} from '@mui/icons-material';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color = 'primary' }) => (
  <Card>
    <CardContent>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar sx={{ bgcolor: `${color}.main`, width: 56, height: 56 }}>
          {icon}
        </Avatar>
        <Box>
          <Typography variant="h4" component="div" fontWeight="bold">
            {value}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {title}
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

interface ExamCardProps {
  title: string;
  startTime: string;
  duration: string;
  candidates: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

const ExamCard: React.FC<ExamCardProps> = ({ title, startTime, duration, candidates, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'upcoming': return 'warning';
      case 'ongoing': return 'success';
      case 'completed': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'upcoming': return <Schedule />;
      case 'ongoing': return <PlayArrow />;
      case 'completed': return <Stop />;
      default: return <Schedule />;
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="bold">
              {title}
            </Typography>
            <Chip
              icon={getStatusIcon()}
              label={status.charAt(0).toUpperCase() + status.slice(1)}
              color={getStatusColor()}
              variant="outlined"
            />
          </Stack>
          
          <Stack direction="row" spacing={2}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Start Time
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {startTime}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Duration
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {duration}
              </Typography>
            </Box>
          </Stack>
          
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1}>
              <People fontSize="small" />
              <Typography variant="body2">
                {candidates} candidates
              </Typography>
            </Stack>
            <Button
              variant={status === 'ongoing' ? 'contained' : 'outlined'}
              startIcon={status === 'ongoing' ? <Visibility /> : <PlayArrow />}
              size="small"
            >
              {status === 'ongoing' ? 'Monitor' : status === 'upcoming' ? 'Start' : 'View Results'}
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export const Dashboard: React.FC = () => {
  const stats = [
    { title: 'Active Exams', value: 5, icon: <Assessment />, color: 'primary' as const },
    { title: 'Total Candidates', value: 1247, icon: <People />, color: 'success' as const },
    { title: 'Scheduled Today', value: 12, icon: <Schedule />, color: 'warning' as const },
    { title: 'Security Alerts', value: 3, icon: <Security />, color: 'error' as const },
  ];

  const exams = [
    {
      title: 'Mathematics Final Exam',
      startTime: '10:00 AM',
      duration: '2 hours',
      candidates: 45,
      status: 'ongoing' as const,
    },
    {
      title: 'Computer Science Quiz',
      startTime: '2:00 PM',
      duration: '1 hour',
      candidates: 32,
      status: 'upcoming' as const,
    },
    {
      title: 'Physics Midterm',
      startTime: '9:00 AM',
      duration: '1.5 hours',
      candidates: 67,
      status: 'completed' as const,
    },
  ];

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor and manage your exam proctoring sessions
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={3}
          sx={{ 
            '& > *': { 
              flex: { xs: 'none', sm: 1 } 
            } 
          }}
        >
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </Stack>

        {/* Active Monitoring */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            System Status
          </Typography>
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={3}
            sx={{ 
              '& > *': { 
                flex: { xs: 'none', md: 1 } 
              } 
            }}
          >
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                Server Load
              </Typography>
              <LinearProgress variant="determinate" value={35} />
              <Typography variant="caption">35% (Optimal)</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                Bandwidth Usage
              </Typography>
              <LinearProgress variant="determinate" value={67} color="warning" />
              <Typography variant="caption">67% (High)</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                Active Connections
              </Typography>
              <LinearProgress variant="determinate" value={82} color="success" />
              <Typography variant="caption">82% (Good)</Typography>
            </Stack>
          </Stack>
        </Paper>

        {/* Recent Exams */}
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Recent Exams
          </Typography>
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={3}
            sx={{ 
              '& > *': { 
                flex: { xs: 'none', md: 1 } 
              } 
            }}
          >
            {exams.map((exam, index) => (
              <ExamCard key={index} {...exam} />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};
