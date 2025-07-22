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
  Avatar,
  Divider,
  Alert,
  Tabs,
  Tab,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Slider,
} from '@mui/material';
import {
  Settings,
  Person,
  Security,
  Notifications,
  Computer,
  Visibility,
  Save,
  Camera,
  Warning,
} from '@mui/icons-material';
import { useState } from 'react';
import { Layout } from '../../components/layout';

export function ProctororSettings() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [settings, setSettings] = useState({
    // Profile settings
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@university.edu',
    proctorId: 'PROC001',
    institution: 'University of Technology',
    department: 'Computer Science',
    certificationLevel: 'Advanced',
    
    // Monitoring preferences
    maxStudents: 16,
    alertSensitivity: 'medium',
    autoFlagViolations: true,
    recordSessions: true,
    enableAudioMonitoring: true,
    faceDetectionThreshold: 70,
    
    // Security settings
    requireStudentAuth: true,
    allowStudentBreaks: false,
    lockdownBrowser: true,
    screenshotInterval: 30,
    
    // Notification preferences
    violationAlerts: true,
    emailReports: true,
    instantNotifications: true,
    weeklyReports: false,
    
    // System settings
    cameraQuality: 'high',
    audioQuality: 'high',
    bandwidth: 'auto',
    storageLocation: 'cloud',
  });

  const handleSettingChange = (setting: string, value: string | boolean | number) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const tabs = [
    { label: 'Profile', icon: Person },
    { label: 'Monitoring', icon: Visibility },
    { label: 'Security', icon: Security },
    { label: 'Notifications', icon: Notifications },
    { label: 'System', icon: Computer }
  ];

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* Header */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <Settings />
            </Avatar>
            <Stack>
              <Typography variant="h4" fontWeight={600}>
                Proctorer Settings
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Configure monitoring preferences, security settings, and system options
              </Typography>
            </Stack>
          </Stack>

          <Grid container spacing={4}>
            {/* Sidebar */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Card>
                <CardContent>
                  <Tabs
                    orientation="vertical"
                    value={selectedTab}
                    onChange={(_, newValue) => setSelectedTab(newValue)}
                    sx={{ minHeight: 400 }}
                  >
                    {tabs.map((tab) => (
                      <Tab
                        key={tab.label}
                        icon={<tab.icon />}
                        label={tab.label}
                        iconPosition="start"
                        sx={{ justifyContent: 'flex-start', minHeight: 60 }}
                      />
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </Grid>

            {/* Content */}
            <Grid size={{ xs: 12, md: 9 }}>
              <Card>
                <CardContent sx={{ p: 4 }}>
                  {/* Profile Tab */}
                  {selectedTab === 0 && (
                    <Stack spacing={4}>
                      <Typography variant="h6" fontWeight={600}>
                        Proctorer Profile
                      </Typography>
                      
                      <Stack direction="row" spacing={3} alignItems="center">
                        <Avatar sx={{ width: 80, height: 80 }}>
                          {settings.firstName[0]}{settings.lastName[0]}
                        </Avatar>
                        <Stack spacing={1}>
                          <Button variant="outlined" startIcon={<Camera />}>
                            Change Photo
                          </Button>
                          <Typography variant="body2" color="text.secondary">
                            Professional photo recommended
                          </Typography>
                        </Stack>
                      </Stack>

                      <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label="First Name"
                            value={settings.firstName}
                            onChange={(e) => handleSettingChange('firstName', e.target.value)}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label="Last Name"
                            value={settings.lastName}
                            onChange={(e) => handleSettingChange('lastName', e.target.value)}
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <TextField
                            fullWidth
                            label="Email Address"
                            value={settings.email}
                            disabled
                            helperText="Contact system administrator to change email"
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label="Proctorer ID"
                            value={settings.proctorId}
                            disabled
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label="Institution"
                            value={settings.institution}
                            disabled
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label="Department"
                            value={settings.department}
                            onChange={(e) => handleSettingChange('department', e.target.value)}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <FormControl fullWidth>
                            <InputLabel>Certification Level</InputLabel>
                            <Select
                              value={settings.certificationLevel}
                              label="Certification Level"
                              onChange={(e) => handleSettingChange('certificationLevel', e.target.value)}
                            >
                              <MenuItem value="Basic">Basic</MenuItem>
                              <MenuItem value="Intermediate">Intermediate</MenuItem>
                              <MenuItem value="Advanced">Advanced</MenuItem>
                              <MenuItem value="Expert">Expert</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Stack>
                  )}

                  {/* Monitoring Tab */}
                  {selectedTab === 1 && (
                    <Stack spacing={4}>
                      <Typography variant="h6" fontWeight={600}>
                        Monitoring Preferences
                      </Typography>
                      
                      <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <Stack spacing={2}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              Maximum Students per Session
                            </Typography>
                            <Slider
                              value={settings.maxStudents}
                              onChange={(_, value) => handleSettingChange('maxStudents', value)}
                              min={1}
                              max={25}
                              marks={[
                                { value: 1, label: '1' },
                                { value: 8, label: '8' },
                                { value: 16, label: '16' },
                                { value: 25, label: '25' }
                              ]}
                              valueLabelDisplay="on"
                            />
                          </Stack>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <FormControl fullWidth>
                            <InputLabel>Alert Sensitivity</InputLabel>
                            <Select
                              value={settings.alertSensitivity}
                              label="Alert Sensitivity"
                              onChange={(e) => handleSettingChange('alertSensitivity', e.target.value)}
                            >
                              <MenuItem value="low">Low - Fewer alerts</MenuItem>
                              <MenuItem value="medium">Medium - Balanced</MenuItem>
                              <MenuItem value="high">High - More sensitive</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>

                      <Divider />

                      <Stack spacing={2}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          Monitoring Features
                        </Typography>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.autoFlagViolations}
                              onChange={(e) => handleSettingChange('autoFlagViolations', e.target.checked)}
                            />
                          }
                          label="Automatically flag potential violations"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.recordSessions}
                              onChange={(e) => handleSettingChange('recordSessions', e.target.checked)}
                            />
                          }
                          label="Record all exam sessions"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.enableAudioMonitoring}
                              onChange={(e) => handleSettingChange('enableAudioMonitoring', e.target.checked)}
                            />
                          }
                          label="Enable audio monitoring and analysis"
                        />
                      </Stack>

                      <Divider />

                      <Stack spacing={2}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          Face Detection Threshold: {settings.faceDetectionThreshold}%
                        </Typography>
                        <Slider
                          value={settings.faceDetectionThreshold}
                          onChange={(_, value) => handleSettingChange('faceDetectionThreshold', value)}
                          min={50}
                          max={95}
                          step={5}
                          marks={[
                            { value: 50, label: '50%' },
                            { value: 70, label: '70%' },
                            { value: 90, label: '90%' }
                          ]}
                          valueLabelDisplay="auto"
                        />
                        <Typography variant="body2" color="text.secondary">
                          Higher values require more confident face detection
                        </Typography>
                      </Stack>
                    </Stack>
                  )}

                  {/* Security Tab */}
                  {selectedTab === 2 && (
                    <Stack spacing={4}>
                      <Typography variant="h6" fontWeight={600}>
                        Security Settings
                      </Typography>
                      
                      <Alert severity="warning">
                        These settings affect exam security. Changes may impact violation detection.
                      </Alert>

                      <Stack spacing={3}>
                        <Stack spacing={2}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            Authentication
                          </Typography>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings.requireStudentAuth}
                                onChange={(e) => handleSettingChange('requireStudentAuth', e.target.checked)}
                              />
                            }
                            label="Require student ID verification before exam"
                          />
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings.lockdownBrowser}
                                onChange={(e) => handleSettingChange('lockdownBrowser', e.target.checked)}
                              />
                            }
                            label="Enforce lockdown browser mode"
                          />
                        </Stack>

                        <Divider />

                        <Stack spacing={2}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            Exam Control
                          </Typography>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings.allowStudentBreaks}
                                onChange={(e) => handleSettingChange('allowStudentBreaks', e.target.checked)}
                              />
                            }
                            label="Allow students to take breaks during exam"
                          />
                          <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                              <FormControl fullWidth>
                                <InputLabel>Screenshot Interval</InputLabel>
                                <Select
                                  value={settings.screenshotInterval}
                                  label="Screenshot Interval"
                                  onChange={(e) => handleSettingChange('screenshotInterval', e.target.value)}
                                >
                                  <MenuItem value={15}>Every 15 seconds</MenuItem>
                                  <MenuItem value={30}>Every 30 seconds</MenuItem>
                                  <MenuItem value={60}>Every minute</MenuItem>
                                  <MenuItem value={120}>Every 2 minutes</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Stack>
                      </Stack>
                    </Stack>
                  )}

                  {/* Notifications Tab */}
                  {selectedTab === 3 && (
                    <Stack spacing={4}>
                      <Typography variant="h6" fontWeight={600}>
                        Notification Preferences
                      </Typography>
                      
                      <Stack spacing={3}>
                        <Stack spacing={2}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            Real-time Alerts
                          </Typography>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings.violationAlerts}
                                onChange={(e) => handleSettingChange('violationAlerts', e.target.checked)}
                              />
                            }
                            label={
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <Warning />
                                <span>Violation alerts during monitoring</span>
                              </Stack>
                            }
                          />
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings.instantNotifications}
                                onChange={(e) => handleSettingChange('instantNotifications', e.target.checked)}
                              />
                            }
                            label="Instant notifications for high-severity violations"
                          />
                        </Stack>

                        <Divider />

                        <Stack spacing={2}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            Reports
                          </Typography>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings.emailReports}
                                onChange={(e) => handleSettingChange('emailReports', e.target.checked)}
                              />
                            }
                            label="Email exam reports after completion"
                          />
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings.weeklyReports}
                                onChange={(e) => handleSettingChange('weeklyReports', e.target.checked)}
                              />
                            }
                            label="Weekly summary reports"
                          />
                        </Stack>

                        <Divider />

                        <Stack spacing={2}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            Alert Types
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap">
                            <Chip label="Face Detection" color="error" />
                            <Chip label="Multiple Faces" color="error" />
                            <Chip label="Tab Switching" color="warning" />
                            <Chip label="Audio Anomalies" color="warning" />
                            <Chip label="Excessive Movement" color="info" />
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  )}

                  {/* System Tab */}
                  {selectedTab === 4 && (
                    <Stack spacing={4}>
                      <Typography variant="h6" fontWeight={600}>
                        System Configuration
                      </Typography>
                      
                      <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <FormControl fullWidth>
                            <InputLabel>Camera Quality</InputLabel>
                            <Select
                              value={settings.cameraQuality}
                              label="Camera Quality"
                              onChange={(e) => handleSettingChange('cameraQuality', e.target.value)}
                            >
                              <MenuItem value="low">Low (480p)</MenuItem>
                              <MenuItem value="medium">Medium (720p)</MenuItem>
                              <MenuItem value="high">High (1080p)</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <FormControl fullWidth>
                            <InputLabel>Audio Quality</InputLabel>
                            <Select
                              value={settings.audioQuality}
                              label="Audio Quality"
                              onChange={(e) => handleSettingChange('audioQuality', e.target.value)}
                            >
                              <MenuItem value="low">Low (16kHz)</MenuItem>
                              <MenuItem value="medium">Medium (32kHz)</MenuItem>
                              <MenuItem value="high">High (48kHz)</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <FormControl fullWidth>
                            <InputLabel>Bandwidth Management</InputLabel>
                            <Select
                              value={settings.bandwidth}
                              label="Bandwidth Management"
                              onChange={(e) => handleSettingChange('bandwidth', e.target.value)}
                            >
                              <MenuItem value="auto">Auto-adjust</MenuItem>
                              <MenuItem value="low">Optimize for low bandwidth</MenuItem>
                              <MenuItem value="high">Prioritize quality</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <FormControl fullWidth>
                            <InputLabel>Storage Location</InputLabel>
                            <Select
                              value={settings.storageLocation}
                              label="Storage Location"
                              onChange={(e) => handleSettingChange('storageLocation', e.target.value)}
                            >
                              <MenuItem value="cloud">Cloud Storage</MenuItem>
                              <MenuItem value="local">Local Storage</MenuItem>
                              <MenuItem value="hybrid">Hybrid</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>

                      <Divider />

                      <Alert severity="info">
                        <Typography variant="body2">
                          <strong>Performance Tip:</strong> Higher quality settings require more bandwidth 
                          and storage. Adjust based on your network capacity and storage limits.
                        </Typography>
                      </Alert>
                    </Stack>
                  )}

                  {/* Save Button */}
                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      startIcon={<Save />}
                      size="large"
                    >
                      Save Settings
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Layout>
  );
}
