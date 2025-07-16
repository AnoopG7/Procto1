import {
  Typography,
  Container,
  Grid,
  Stack,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Settings,
  Security,
  Storage,
  Notifications,
  VideoCall,
  Save,
  RestartAlt,
} from '@mui/icons-material';
import { Layout } from '../../components/layout';

export function SystemSettingsPage() {
  return (
    <Layout title="System Settings">
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Header */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            System Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure system-wide settings and preferences
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* General Settings */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Stack spacing={3}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Settings color="primary" />
                    <Typography variant="h6">General Settings</Typography>
                  </Stack>
                  
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="System Name"
                      defaultValue="Procto Exam Platform"
                      variant="outlined"
                    />
                    
                    <FormControl fullWidth>
                      <InputLabel>Default Language</InputLabel>
                      <Select defaultValue="en" label="Default Language">
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="es">Spanish</MenuItem>
                        <MenuItem value="fr">French</MenuItem>
                        <MenuItem value="de">German</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      <InputLabel>Time Zone</InputLabel>
                      <Select defaultValue="utc" label="Time Zone">
                        <MenuItem value="utc">UTC</MenuItem>
                        <MenuItem value="est">Eastern Time</MenuItem>
                        <MenuItem value="pst">Pacific Time</MenuItem>
                        <MenuItem value="cet">Central European Time</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Enable maintenance mode"
                    />
                    
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Allow user registration"
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Security Settings */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Stack spacing={3}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Security color="primary" />
                    <Typography variant="h6">Security</Typography>
                  </Stack>
                  
                  <Stack spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel>Session Timeout</InputLabel>
                      <Select defaultValue="60" label="Session Timeout">
                        <MenuItem value="30">30 minutes</MenuItem>
                        <MenuItem value="60">1 hour</MenuItem>
                        <MenuItem value="120">2 hours</MenuItem>
                        <MenuItem value="240">4 hours</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      <InputLabel>Password Policy</InputLabel>
                      <Select defaultValue="strong" label="Password Policy">
                        <MenuItem value="basic">Basic (8+ characters)</MenuItem>
                        <MenuItem value="medium">Medium (8+ chars, mixed case)</MenuItem>
                        <MenuItem value="strong">Strong (8+ chars, mixed case, numbers, symbols)</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Enable two-factor authentication"
                    />
                    
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Force HTTPS connections"
                    />
                    
                    <FormControlLabel
                      control={<Switch />}
                      label="Enable IP whitelisting"
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Monitoring Settings */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Stack spacing={3}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <VideoCall color="primary" />
                    <Typography variant="h6">Monitoring & Proctoring</Typography>
                  </Stack>
                  
                  <Stack spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel>Video Quality</InputLabel>
                      <Select defaultValue="hd" label="Video Quality">
                        <MenuItem value="sd">SD (480p)</MenuItem>
                        <MenuItem value="hd">HD (720p)</MenuItem>
                        <MenuItem value="fhd">Full HD (1080p)</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      <InputLabel>Recording Retention</InputLabel>
                      <Select defaultValue="30" label="Recording Retention">
                        <MenuItem value="7">7 days</MenuItem>
                        <MenuItem value="30">30 days</MenuItem>
                        <MenuItem value="90">90 days</MenuItem>
                        <MenuItem value="365">1 year</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Enable face detection"
                    />
                    
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Enable audio monitoring"
                    />
                    
                    <FormControlLabel
                      control={<Switch />}
                      label="Enable screen sharing detection"
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Storage & Performance */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Stack spacing={3}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Storage color="primary" />
                    <Typography variant="h6">Storage & Performance</Typography>
                  </Stack>
                  
                  <Alert severity="info">
                    <Typography variant="body2">
                      Current storage usage: 2.4 TB / 5.0 TB (48% used)
                    </Typography>
                  </Alert>
                  
                  <Stack spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel>Backup Frequency</InputLabel>
                      <Select defaultValue="daily" label="Backup Frequency">
                        <MenuItem value="hourly">Hourly</MenuItem>
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      <InputLabel>Log Level</InputLabel>
                      <Select defaultValue="info" label="Log Level">
                        <MenuItem value="error">Error</MenuItem>
                        <MenuItem value="warn">Warning</MenuItem>
                        <MenuItem value="info">Info</MenuItem>
                        <MenuItem value="debug">Debug</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Enable automatic cleanup"
                    />
                    
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Compress archived data"
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Notification Settings */}
          <Grid size={12}>
            <Card>
              <CardContent>
                <Stack spacing={3}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Notifications color="primary" />
                    <Typography variant="h6">System Notifications</Typography>
                  </Stack>
                  
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Stack spacing={2}>
                        <Typography variant="subtitle2">Email Notifications</Typography>
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="System alerts"
                        />
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Failed login attempts"
                        />
                        <FormControlLabel
                          control={<Switch />}
                          label="Performance reports"
                        />
                      </Stack>
                    </Grid>
                    
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Stack spacing={2}>
                        <Typography variant="subtitle2">SMS Notifications</Typography>
                        <FormControlLabel
                          control={<Switch />}
                          label="Critical system errors"
                        />
                        <FormControlLabel
                          control={<Switch />}
                          label="Security breaches"
                        />
                        <FormControlLabel
                          control={<Switch />}
                          label="Server downtime"
                        />
                      </Stack>
                    </Grid>
                    
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Stack spacing={2}>
                        <Typography variant="subtitle2">Dashboard Alerts</Typography>
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Real-time monitoring alerts"
                        />
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Exam irregularities"
                        />
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="System status changes"
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            startIcon={<RestartAlt />}
            color="warning"
          >
            Reset to Defaults
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            size="large"
            sx={{ px: 4 }}
          >
            Save Settings
          </Button>
        </Stack>
      </Stack>
    </Container>
    </Layout>
  );
}
