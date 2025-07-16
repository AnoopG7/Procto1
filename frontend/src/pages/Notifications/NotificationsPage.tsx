import {
  Typography,
  Container,
  Grid,
  Stack,
  Card,
  CardContent,
  Button,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Divider,
  FormControlLabel,
  Switch,
  TextField,
  Badge,
  Box,
} from '@mui/material';
import {
  Notifications,
  Security,
  Assessment,
  People,
  Settings,
  Info,
  Delete,
  MarkEmailRead,
  FilterList,
  Search,
} from '@mui/icons-material';
import { Layout } from '../../components/layout';

export function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'security',
      title: 'Suspicious Activity Detected',
      message: 'Multiple face detection in exam "Mathematics Final" by student John Doe',
      time: '2 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'exam',
      title: 'Exam Completed',
      message: 'Physics Midterm has been completed by 89 students',
      time: '15 minutes ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'system',
      title: 'System Maintenance Scheduled',
      message: 'Maintenance window scheduled for tonight at 2:00 AM EST',
      time: '1 hour ago',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'user',
      title: 'New User Registration',
      message: '5 new students have registered for the platform',
      time: '2 hours ago',
      read: true,
      priority: 'low'
    },
    {
      id: 5,
      type: 'security',
      title: 'Failed Login Attempts',
      message: 'Multiple failed login attempts detected from IP 192.168.1.100',
      time: '3 hours ago',
      read: false,
      priority: 'high'
    },
    {
      id: 6,
      type: 'exam',
      title: 'Exam Starting Soon',
      message: 'Chemistry Quiz will start in 30 minutes',
      time: '4 hours ago',
      read: true,
      priority: 'medium'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'security': return <Security color="error" />;
      case 'exam': return <Assessment color="primary" />;
      case 'system': return <Settings color="warning" />;
      case 'user': return <People color="success" />;
      default: return <Info color="info" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Layout title="Notifications">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* Header */}
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} spacing={2}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Notifications
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" startIcon={<MarkEmailRead />}>
                Mark All Read
              </Button>
              <Button variant="outlined" startIcon={<Delete />}>
                Clear All
              </Button>
            </Stack>
          </Stack>

          <Grid container spacing={4}>
            {/* Notification List */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={3}>
                {/* Search and Filter */}
                <Card>
                  <CardContent>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField
                        placeholder="Search notifications..."
                        size="small"
                        sx={{ flexGrow: 1 }}
                        InputProps={{
                          startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                        }}
                      />
                      <Button variant="outlined" startIcon={<FilterList />}>
                        Filter
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>

                {/* Notifications List */}
                <Card>
                  <List sx={{ p: 0 }}>
                    {notifications.map((notification, index) => (
                      <Box key={notification.id}>
                        <ListItem
                          sx={{
                            bgcolor: notification.read ? 'transparent' : 'action.hover',
                            '&:hover': { bgcolor: 'action.selected' }
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'transparent' }}>
                              {getNotificationIcon(notification.type)}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography variant="subtitle2" sx={{ fontWeight: notification.read ? 400 : 600 }}>
                                  {notification.title}
                                </Typography>
                                <Chip
                                  label={notification.priority}
                                  size="small"
                                  color={getPriorityColor(notification.priority) as 'error' | 'warning' | 'success' | 'default'}
                                  variant="outlined"
                                />
                                {!notification.read && (
                                  <Badge color="primary" variant="dot" />
                                )}
                              </Stack>
                            }
                            secondary={
                              <Stack spacing={0.5}>
                                <Typography variant="body2" color="text.secondary">
                                  {notification.message}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {notification.time}
                                </Typography>
                              </Stack>
                            }
                          />
                          <Stack direction="row" spacing={1}>
                            <IconButton size="small">
                              <MarkEmailRead />
                            </IconButton>
                            <IconButton size="small">
                              <Delete />
                            </IconButton>
                          </Stack>
                        </ListItem>
                        {index < notifications.length - 1 && <Divider />}
                      </Box>
                    ))}
                  </List>
                </Card>
              </Stack>
            </Grid>

            {/* Notification Settings */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={3}>
                {/* Quick Stats */}
                <Card>
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography variant="h6">Notification Summary</Typography>
                      <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2">Unread</Typography>
                          <Chip label="3" color="primary" size="small" />
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2">High Priority</Typography>
                          <Chip label="2" color="error" size="small" />
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2">Today</Typography>
                          <Chip label="6" color="info" size="small" />
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>

                {/* Notification Preferences */}
                <Card>
                  <CardContent>
                    <Stack spacing={3}>
                      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Notifications color="primary" />
                        Notification Settings
                      </Typography>
                      
                      <Stack spacing={2}>
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Security Alerts"
                        />
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Exam Notifications"
                        />
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="System Updates"
                        />
                        <FormControlLabel
                          control={<Switch />}
                          label="User Activity"
                        />
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Email Notifications"
                        />
                        <FormControlLabel
                          control={<Switch />}
                          label="SMS Notifications"
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>

                {/* Alert Categories */}
                <Card>
                  <CardContent>
                    <Stack spacing={3}>
                      <Typography variant="h6">Alert Categories</Typography>
                      
                      <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Security color="error" fontSize="small" />
                            <Typography variant="body2">Security</Typography>
                          </Stack>
                          <Chip label="2" color="error" size="small" />
                        </Stack>
                        
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Assessment color="primary" fontSize="small" />
                            <Typography variant="body2">Exams</Typography>
                          </Stack>
                          <Chip label="2" color="primary" size="small" />
                        </Stack>
                        
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Settings color="warning" fontSize="small" />
                            <Typography variant="body2">System</Typography>
                          </Stack>
                          <Chip label="1" color="warning" size="small" />
                        </Stack>
                        
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <People color="success" fontSize="small" />
                            <Typography variant="body2">Users</Typography>
                          </Stack>
                          <Chip label="1" color="success" size="small" />
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Layout>
  );
}
