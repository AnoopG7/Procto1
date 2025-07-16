import {
  Typography,
  Container,
  Grid,
  Paper,
  Stack,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Switch,
  FormControlLabel,
  Alert,
  Chip,
} from '@mui/material';
import {
  Person,
  Security,
  Notifications,
  Save,
  PhotoCamera,
} from '@mui/icons-material';
import { Layout } from '../../components/layout';

export function StudentProfile() {
  return (
    <Layout title="Profile Settings">
      <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Header */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Profile Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your account settings and preferences
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Profile Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, height: 'fit-content' }}>
              <Stack spacing={3} alignItems="center">
                <Box position="relative">
                  <Avatar
                    sx={{ 
                      width: 120, 
                      height: 120,
                      bgcolor: 'primary.main',
                      fontSize: '3rem'
                    }}
                  >
                    JD
                  </Avatar>
                  <Button
                    size="small"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      minWidth: 'auto',
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      '&:hover': { bgcolor: 'primary.dark' }
                    }}
                  >
                    <PhotoCamera sx={{ fontSize: 18, color: 'white' }} />
                  </Button>
                </Box>
                <Stack spacing={1} alignItems="center">
                  <Typography variant="h6">John Doe</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Administrator
                  </Typography>
                  <Chip 
                    label="Active" 
                    color="success" 
                    size="small" 
                  />
                </Stack>
              </Stack>
            </Paper>
          </Grid>

          {/* Settings Forms */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={3}>
              {/* Personal Information */}
              <Card>
                <CardContent>
                  <Stack spacing={3}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Person color="primary" />
                      <Typography variant="h6">Personal Information</Typography>
                    </Stack>
                    <Grid container spacing={2}>
                      <Grid size={6}>
                        <TextField
                          fullWidth
                          label="First Name"
                          defaultValue="John"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid size={6}>
                        <TextField
                          fullWidth
                          label="Last Name"
                          defaultValue="Doe"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid size={12}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          defaultValue="john.doe@procto.com"
                          variant="outlined"
                          type="email"
                        />
                      </Grid>
                      <Grid size={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          defaultValue="+1 (555) 123-4567"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid size={6}>
                        <TextField
                          fullWidth
                          label="Department"
                          defaultValue="IT Administration"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Stack>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card>
                <CardContent>
                  <Stack spacing={3}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Security color="primary" />
                      <Typography variant="h6">Security</Typography>
                    </Stack>
                    <Stack spacing={2}>
                      <TextField
                        fullWidth
                        label="Current Password"
                        type="password"
                        variant="outlined"
                      />
                      <TextField
                        fullWidth
                        label="New Password"
                        type="password"
                        variant="outlined"
                      />
                      <TextField
                        fullWidth
                        label="Confirm New Password"
                        type="password"
                        variant="outlined"
                      />
                    </Stack>
                    <Alert severity="info">
                      Password must be at least 8 characters with uppercase, lowercase, numbers, and special characters.
                    </Alert>
                  </Stack>
                </CardContent>
              </Card>

              {/* Notification Preferences */}
              <Card>
                <CardContent>
                  <Stack spacing={3}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Notifications color="primary" />
                      <Typography variant="h6">Notifications</Typography>
                    </Stack>
                    <Stack spacing={2}>
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Email notifications for exam alerts"
                      />
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="SMS notifications for critical issues"
                      />
                      <FormControlLabel
                        control={<Switch />}
                        label="Weekly performance reports"
                      />
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="System maintenance updates"
                      />
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>

              {/* Save Button */}
              <Button
                variant="contained"
                size="large"
                startIcon={<Save />}
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  alignSelf: 'flex-start'
                }}
              >
                Save Changes
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
    </Layout>
  );
}
