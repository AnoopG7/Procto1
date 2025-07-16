import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Avatar,
  useTheme,
} from '@mui/material';
import {
  Assessment,
  People,
  Schedule,
  Security,
  TrendingUp,
  TrendingDown,
  TrendingFlat,
} from '@mui/icons-material';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  trend?: string;
  description?: string;
  size?: 'small' | 'medium' | 'large';
}

const iconMap = {
  Assessment,
  People,
  Schedule,
  Security,
};

const getTrendIcon = (trend: string) => {
  if (trend.startsWith('+')) return <TrendingUp fontSize="small" color="success" />;
  if (trend.startsWith('-')) return <TrendingDown fontSize="small" color="error" />;
  return <TrendingFlat fontSize="small" color="disabled" />;
};

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  color = 'primary',
  trend,
  description,
  size = 'medium',
}) => {
  const theme = useTheme();
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Assessment;

  const getAvatarSize = () => {
    switch (size) {
      case 'small': return { width: 40, height: 40 };
      case 'large': return { width: 72, height: 72 };
      default: return { width: 56, height: 56 };
    }
  };

  const getValueVariant = () => {
    switch (size) {
      case 'small': return 'h6';
      case 'large': return 'h3';
      default: return 'h4';
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        background: theme.palette.mode === 'light' 
          ? `linear-gradient(135deg, ${theme.palette[color].light}08 0%, ${theme.palette[color].main}12 100%)`
          : theme.palette.background.paper,
        border: `1px solid ${theme.palette[color].main}20`,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Avatar 
              sx={{ 
                bgcolor: `${color}.main`, 
                ...getAvatarSize(),
                boxShadow: theme.shadows[4]
              }}
            >
              <IconComponent />
            </Avatar>
            {trend && (
              <Stack direction="row" alignItems="center" spacing={0.5}>
                {getTrendIcon(trend)}
                <Typography 
                  variant="caption" 
                  fontWeight="bold"
                  color={trend.startsWith('+') ? 'success.main' : trend.startsWith('-') ? 'error.main' : 'text.secondary'}
                >
                  {trend}
                </Typography>
              </Stack>
            )}
          </Stack>

          <Box>
            <Typography 
              variant={getValueVariant() as 'h3' | 'h4' | 'h6'} 
              component="div" 
              fontWeight="bold"
              color={`${color}.main`}
              sx={{ mb: 0.5 }}
            >
              {typeof value === 'number' ? value.toLocaleString() : value}
            </Typography>
            <Typography color="text.secondary" variant="body2" fontWeight="medium">
              {title}
            </Typography>
            {description && (
              <Typography color="text.secondary" variant="caption" sx={{ mt: 0.5, display: 'block' }}>
                {description}
              </Typography>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
