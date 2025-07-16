import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  IconButton,
  Button,
  Avatar,
  useTheme,
  LinearProgress,
} from '@mui/material';
import {
  Schedule,
  People,
  PlayArrow,
  Visibility,
  MoreVert,
  CheckCircle,
  Warning,
  Error,
} from '@mui/icons-material';

interface ExamCardProps {
  exam: {
    id: string;
    title: string;
    subject?: string;
    startTime: string;
    duration: string;
    candidates: number;
    registeredCandidates?: number;
    totalCandidates?: number;
    status: 'upcoming' | 'ongoing' | 'completed' | 'draft' | 'scheduled';
    instructor?: string;
    progress?: number;
  };
  onStart?: (examId: string) => void;
  onView?: (examId: string) => void;
  onEdit?: (examId: string) => void;
  variant?: 'default' | 'compact' | 'detailed';
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'upcoming':
    case 'scheduled':
      return { color: 'warning' as const, icon: <Schedule />, label: 'Scheduled' };
    case 'ongoing':
      return { color: 'success' as const, icon: <PlayArrow />, label: 'Live' };
    case 'completed':
      return { color: 'info' as const, icon: <CheckCircle />, label: 'Completed' };
    case 'draft':
      return { color: 'default' as const, icon: <Warning />, label: 'Draft' };
    default:
      return { color: 'default' as const, icon: <Error />, label: status };
  }
};

export const ExamCard: React.FC<ExamCardProps> = ({
  exam,
  onStart,
  onView,
  onEdit,
  variant = 'default',
}) => {
  const theme = useTheme();
  const statusConfig = getStatusConfig(exam.status);

  const getActionButton = () => {
    if (exam.status === 'ongoing') {
      return (
        <Button
          variant="contained"
          startIcon={<Visibility />}
          size="small"
          onClick={() => onView?.(exam.id)}
          sx={{ minWidth: 100 }}
        >
          Monitor
        </Button>
      );
    }
    if (exam.status === 'scheduled') {
      return (
        <Button
          variant="contained"
          startIcon={<PlayArrow />}
          size="small"
          onClick={() => onStart?.(exam.id)}
          sx={{ minWidth: 100 }}
        >
          Start
        </Button>
      );
    }
    if (exam.status === 'completed') {
      return (
        <Button
          variant="outlined"
          startIcon={<Visibility />}
          size="small"
          onClick={() => onView?.(exam.id)}
          sx={{ minWidth: 100 }}
        >
          Results
        </Button>
      );
    }
    return (
      <Button
        variant="outlined"
        startIcon={<PlayArrow />}
        size="small"
        onClick={() => onEdit?.(exam.id)}
        sx={{ minWidth: 100 }}
      >
        Configure
      </Button>
    );
  };

  if (variant === 'compact') {
    return (
      <Card 
        sx={{ 
          height: '100%',
          transition: 'all 0.2s ease-in-out',
          '&:hover': { 
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[4]
          }
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Stack spacing={1.5}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Typography variant="subtitle1" fontWeight="bold" noWrap>
                {exam.title}
              </Typography>
              <Chip
                icon={statusConfig.icon}
                label={statusConfig.label}
                color={statusConfig.color}
                size="small"
                variant="outlined"
              />
            </Stack>
            
            <Stack direction="row" alignItems="center" spacing={1}>
              <People fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {exam.registeredCandidates || exam.candidates}/{exam.totalCandidates || exam.candidates}
              </Typography>
            </Stack>

            {getActionButton()}
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      sx={{ 
        height: '100%',
        background: exam.status === 'ongoing' 
          ? `linear-gradient(135deg, ${theme.palette.success.light}08 0%, ${theme.palette.success.main}12 100%)`
          : theme.palette.background.paper,
        border: exam.status === 'ongoing' ? `2px solid ${theme.palette.success.main}30` : '1px solid',
        borderColor: exam.status === 'ongoing' ? 'success.main' : 'divider',
        transition: 'all 0.3s ease-in-out',
        '&:hover': { 
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8]
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2.5}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom noWrap>
                {exam.title}
              </Typography>
              {exam.subject && (
                <Typography variant="body2" color="text.secondary">
                  {exam.subject}
                </Typography>
              )}
              {exam.instructor && (
                <Typography variant="caption" color="text.secondary">
                  By {exam.instructor}
                </Typography>
              )}
            </Box>
            
            <Stack direction="row" alignItems="center" spacing={1}>
              <Chip
                icon={statusConfig.icon}
                label={statusConfig.label}
                color={statusConfig.color}
                variant={exam.status === 'ongoing' ? 'filled' : 'outlined'}
                sx={{ 
                  fontWeight: 'bold',
                  ...(exam.status === 'ongoing' && {
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': { opacity: 1 },
                      '50%': { opacity: 0.7 },
                      '100%': { opacity: 1 },
                    }
                  })
                }}
              />
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </Stack>
          </Stack>

          {/* Progress (for ongoing exams) */}
          {exam.status === 'ongoing' && exam.progress !== undefined && (
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Progress
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {exam.progress}%
                </Typography>
              </Stack>
              <LinearProgress 
                variant="determinate" 
                value={exam.progress} 
                sx={{ 
                  height: 6, 
                  borderRadius: 3,
                  backgroundColor: theme.palette.success.light + '30',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: theme.palette.success.main,
                  }
                }}
              />
            </Box>
          )}

          {/* Details */}
          <Stack direction="row" spacing={3}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Start Time
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {exam.startTime}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Duration
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {exam.duration}
              </Typography>
            </Box>
          </Stack>

          {/* Footer */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main' }}>
                <People fontSize="small" />
              </Avatar>
              <Typography variant="body2" fontWeight="medium">
                {exam.registeredCandidates || exam.candidates}
                {exam.totalCandidates && `/${exam.totalCandidates}`} candidates
              </Typography>
            </Stack>
            
            {getActionButton()}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
