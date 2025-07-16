import {
  Typography,
  Container,
  Grid,
  Stack,
  Card,
  CardContent,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  Alert,
  Tabs,
  Tab,
  Chip,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Settings,
  Security,
  Notifications,
  Storage,
  Api,
  Monitor,
  Save,
  Refresh,
  Warning,
  CheckCircle,
  Edit,
} from '@mui/icons-material';
import { useState } from 'react';
import { Layout } from '../../components/layout';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

export function AdminSystemSettings() {
  const [activeTab, setActiveTab] = useState(0);
  const [settings, setSettings] = useState({
    // General Settings
    systemName: 'Procto',
    systemUrl: 'https://procto.example.com',
    adminEmail: 'admin@procto.com',
    timezone: 'UTC',
    language: 'English',
    
    // Security Settings
    sessionTimeout: 30,
    passwordMinLength: 8,
    twoFactorAuth: true,
    ipWhitelist: false,
    encryptionLevel: 'AES-256',
    
    // Proctoring Settings
    faceDetection: true,
    audioMonitoring: true,
    screenRecording: true,
    tabSwitchDetection: true,
    multipleFaceDetection: true,
    violationThreshold: 3,
    
    // Storage Settings
    recordingRetention: 90,
    autoDelete: true,
    cloudStorage: true,
    localBackup: false,
    storageQuota: 500,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    slackIntegration: false,
    discordIntegration: false,
    webhookUrl: '',
    
    // API Settings
    apiRateLimit: 1000,
    apiKeyRotation: true,
    webhooksEnabled: true,
    corsEnabled: true,
    apiVersion: 'v1'
  });

  const handleSettingChange = (setting: string, value: string | number | boolean) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleSaveSettings = () => {
    // Simulate saving settings
    console.log('Saving settings:', settings);
  };

  const tabs = [
    { label: 'General', icon: Settings },
    { label: 'Security', icon: Security },
    { label: 'Proctoring', icon: Monitor },
    { label: 'Storage', icon: Storage },
    { label: 'Notifications', icon: Notifications },
    { label: 'API', icon: Api }
  ];

  return (
    <Layout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <Settings />
              </Avatar>
              <Stack>
                <Typography variant="h4" fontWeight={600}>
                  System Settings
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Configure system-wide settings and preferences
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" startIcon={<Refresh />}>
                Reset
              </Button>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSaveSettings}
              >
                Save Changes
              </Button>
            </Stack>
          </Stack>

          {/* System Status Alert */}
          <Alert severity="success" icon={<CheckCircle />}>
            System is running normally. Last backup: 2 hours ago • API Status: Operational
          </Alert>

          {/* Settings Tabs */}
          <Card>
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.label}
                  icon={<tab.icon />}
                  label={tab.label}
                  iconPosition="start"
                />
              ))}
            </Tabs>

            <CardContent sx={{ p: 4 }}>
              {/* General Settings */}
              <TabPanel value={activeTab} index={0}>
                <Stack spacing={4}>
                  <Typography variant="h6" fontWeight={600}>
                    General Configuration
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="System Name"
                        value={settings.systemName}
                        onChange={(e) => handleSettingChange('systemName', e.target.value)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="System URL"
                        value={settings.systemUrl}
                        onChange={(e) => handleSettingChange('systemUrl', e.target.value)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Admin Email"
                        type="email"
                        value={settings.adminEmail}
                        onChange={(e) => handleSettingChange('adminEmail', e.target.value)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <FormControl fullWidth>
                        <InputLabel>Timezone</InputLabel>
                        <Select
                          value={settings.timezone}
                          label="Timezone"
                          onChange={(e) => handleSettingChange('timezone', e.target.value)}
                        >
                          <MenuItem value="UTC">UTC</MenuItem>
                          <MenuItem value="America/New_York">Eastern Time</MenuItem>
                          <MenuItem value="America/Chicago">Central Time</MenuItem>
                          <MenuItem value="America/Los_Angeles">Pacific Time</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Stack>
              </TabPanel>

              {/* Security Settings */}
              <TabPanel value={activeTab} index={1}>
                <Stack spacing={4}>
                  <Typography variant="h6" fontWeight={600}>
                    Security Configuration
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack spacing={2}>
                        <Typography variant="subtitle2">Session Timeout (minutes)</Typography>
                        <Slider
                          value={settings.sessionTimeout}
                          onChange={(_, value) => handleSettingChange('sessionTimeout', value)}
                          min={15}
                          max={120}
                          marks={[
                            { value: 15, label: '15m' },
                            { value: 30, label: '30m' },
                            { value: 60, label: '1h' },
                            { value: 120, label: '2h' }
                          ]}
                          valueLabelDisplay="auto"
                        />
                      </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Minimum Password Length"
                        type="number"
                        value={settings.passwordMinLength}
                        onChange={(e) => handleSettingChange('passwordMinLength', parseInt(e.target.value))}
                        inputProps={{ min: 6, max: 20 }}
                      />
                    </Grid>
                    <Grid size={12}>
                      <Stack spacing={2}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.twoFactorAuth}
                              onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                            />
                          }
                          label="Require Two-Factor Authentication"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.ipWhitelist}
                              onChange={(e) => handleSettingChange('ipWhitelist', e.target.checked)}
                            />
                          }
                          label="Enable IP Whitelisting"
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                  <Alert severity="warning" icon={<Warning />}>
                    Changes to security settings will affect all users. Ensure you have administrative access before making changes.
                  </Alert>
                </Stack>
              </TabPanel>

              {/* Proctoring Settings */}
              <TabPanel value={activeTab} index={2}>
                <Stack spacing={4}>
                  <Typography variant="h6" fontWeight={600}>
                    Proctoring Configuration
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack spacing={2}>
                        <Typography variant="subtitle2">Detection Features</Typography>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.faceDetection}
                              onChange={(e) => handleSettingChange('faceDetection', e.target.checked)}
                            />
                          }
                          label="Face Detection"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.audioMonitoring}
                              onChange={(e) => handleSettingChange('audioMonitoring', e.target.checked)}
                            />
                          }
                          label="Audio Monitoring"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.screenRecording}
                              onChange={(e) => handleSettingChange('screenRecording', e.target.checked)}
                            />
                          }
                          label="Screen Recording"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.tabSwitchDetection}
                              onChange={(e) => handleSettingChange('tabSwitchDetection', e.target.checked)}
                            />
                          }
                          label="Tab Switch Detection"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.multipleFaceDetection}
                              onChange={(e) => handleSettingChange('multipleFaceDetection', e.target.checked)}
                            />
                          }
                          label="Multiple Face Detection"
                        />
                      </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack spacing={2}>
                        <Typography variant="subtitle2">Violation Threshold</Typography>
                        <Slider
                          value={settings.violationThreshold}
                          onChange={(_, value) => handleSettingChange('violationThreshold', value)}
                          min={1}
                          max={10}
                          marks
                          valueLabelDisplay="auto"
                        />
                        <Typography variant="body2" color="text.secondary">
                          Number of violations before flagging for review
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </TabPanel>

              {/* Storage Settings */}
              <TabPanel value={activeTab} index={3}>
                <Stack spacing={4}>
                  <Typography variant="h6" fontWeight={600}>
                    Storage Configuration
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Recording Retention (days)"
                        type="number"
                        value={settings.recordingRetention}
                        onChange={(e) => handleSettingChange('recordingRetention', parseInt(e.target.value))}
                        inputProps={{ min: 1, max: 365 }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Storage Quota (GB)"
                        type="number"
                        value={settings.storageQuota}
                        onChange={(e) => handleSettingChange('storageQuota', parseInt(e.target.value))}
                        inputProps={{ min: 100, max: 10000 }}
                      />
                    </Grid>
                    <Grid size={12}>
                      <Stack spacing={2}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.autoDelete}
                              onChange={(e) => handleSettingChange('autoDelete', e.target.checked)}
                            />
                          }
                          label="Auto-delete expired recordings"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.cloudStorage}
                              onChange={(e) => handleSettingChange('cloudStorage', e.target.checked)}
                            />
                          }
                          label="Enable cloud storage backup"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.localBackup}
                              onChange={(e) => handleSettingChange('localBackup', e.target.checked)}
                            />
                          }
                          label="Maintain local backup copies"
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </TabPanel>

              {/* Notification Settings */}
              <TabPanel value={activeTab} index={4}>
                <Stack spacing={4}>
                  <Typography variant="h6" fontWeight={600}>
                    Notification Configuration
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack spacing={2}>
                        <Typography variant="subtitle2">Notification Channels</Typography>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.emailNotifications}
                              onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                            />
                          }
                          label="Email Notifications"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.smsNotifications}
                              onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                            />
                          }
                          label="SMS Notifications"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.slackIntegration}
                              onChange={(e) => handleSettingChange('slackIntegration', e.target.checked)}
                            />
                          }
                          label="Slack Integration"
                        />
                      </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Webhook URL"
                        value={settings.webhookUrl}
                        onChange={(e) => handleSettingChange('webhookUrl', e.target.value)}
                        placeholder="https://hooks.slack.com/services/..."
                      />
                    </Grid>
                  </Grid>
                </Stack>
              </TabPanel>

              {/* API Settings */}
              <TabPanel value={activeTab} index={5}>
                <Stack spacing={4}>
                  <Typography variant="h6" fontWeight={600}>
                    API Configuration
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="API Rate Limit (requests/hour)"
                        type="number"
                        value={settings.apiRateLimit}
                        onChange={(e) => handleSettingChange('apiRateLimit', parseInt(e.target.value))}
                        inputProps={{ min: 100, max: 10000 }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <FormControl fullWidth>
                        <InputLabel>API Version</InputLabel>
                        <Select
                          value={settings.apiVersion}
                          label="API Version"
                          onChange={(e) => handleSettingChange('apiVersion', e.target.value)}
                        >
                          <MenuItem value="v1">Version 1.0</MenuItem>
                          <MenuItem value="v2">Version 2.0 (Beta)</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={12}>
                      <Stack spacing={2}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.apiKeyRotation}
                              onChange={(e) => handleSettingChange('apiKeyRotation', e.target.checked)}
                            />
                          }
                          label="Automatic API key rotation"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.webhooksEnabled}
                              onChange={(e) => handleSettingChange('webhooksEnabled', e.target.checked)}
                            />
                          }
                          label="Enable webhooks"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.corsEnabled}
                              onChange={(e) => handleSettingChange('corsEnabled', e.target.checked)}
                            />
                          }
                          label="Enable CORS"
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </TabPanel>
            </CardContent>
          </Card>

          {/* System Information */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="h6" fontWeight={600}>
                      System Information
                    </Typography>
                    <Stack spacing={1}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2">Version:</Typography>
                        <Chip label="v2.1.0" size="small" />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2">Uptime:</Typography>
                        <Typography variant="body2">15 days, 6 hours</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2">Active Users:</Typography>
                        <Typography variant="body2">1,247</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2">Storage Used:</Typography>
                        <Typography variant="body2">324 GB / 500 GB</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="h6" fontWeight={600}>
                      Recent Activities
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="body2">
                        Settings updated by admin@procto.com
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        2 hours ago
                      </Typography>
                      <Divider />
                      <Typography variant="body2">
                        Backup completed successfully
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        4 hours ago
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="h6" fontWeight={600}>
                      Quick Actions
                    </Typography>
                    <Stack spacing={1}>
                      <Button variant="outlined" startIcon={<Refresh />} fullWidth>
                        Restart Services
                      </Button>
                      <Button variant="outlined" startIcon={<Storage />} fullWidth>
                        Run Backup
                      </Button>
                      <Button variant="outlined" startIcon={<Edit />} fullWidth>
                        Edit Maintenance Mode
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Layout>
  );
}
