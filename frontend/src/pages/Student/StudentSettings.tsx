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
} from '@mui/material';
import {
  Settings,
  Person,
  Security,
  Notifications,
  Computer,
  School,
  Save,
  Camera,
  Mic,
} from '@mui/icons-material';
import { useState } from 'react';
import { Layout } from '../../components/layout';

export function StudentSettings() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [settings, setSettings] = useState({
    // Profile settings
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@university.edu',
    studentId: 'STU2024001',
    institution: 'University of Technology',
    major: 'Computer Science',
    graduationYear: '2025',
    
    // Exam preferences
    preferredLanguage: 'en',
    timezone: 'America/New_York',
    examReminders: true,
    autoSubmit: true,
    saveProgress: true,
    
    // Privacy settings
    allowRecording: true,
    sharePerformance: false,
    dataRetention: '90days',
    
    // Notification preferences
    emailNotifications: true,
    resultNotifications: true,
    systemUpdates: false,
    
    // System settings
    cameraEnabled: true,
    microphoneEnabled: true,
    screenSharing: true,
    browserLock: true,
  });

  const handleSettingChange = (setting: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const tabs = [
    { label: 'Profile', icon: Person },
    { label: 'Exam Preferences', icon: School },
    { label: 'Privacy', icon: Security },
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
                Student Settings
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage your profile, exam preferences, and system settings
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
                        Profile Information
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
                            JPG, PNG, or GIF (max 5MB)
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
                            helperText="Contact your institution to change email"
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label="Student ID"
                            value={settings.studentId}
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
                            label="Major"
                            value={settings.major}
                            onChange={(e) => handleSettingChange('major', e.target.value)}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <FormControl fullWidth>
                            <InputLabel>Expected Graduation</InputLabel>
                            <Select
                              value={settings.graduationYear}
                              label="Expected Graduation"
                              onChange={(e) => handleSettingChange('graduationYear', e.target.value)}
                            >
                              <MenuItem value="2024">2024</MenuItem>
                              <MenuItem value="2025">2025</MenuItem>
                              <MenuItem value="2026">2026</MenuItem>
                              <MenuItem value="2027">2027</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Stack>
                  )}

                  {/* Exam Preferences Tab */}
                  {selectedTab === 1 && (
                    <Stack spacing={4}>
                      <Typography variant="h6" fontWeight={600}>
                        Exam Preferences
                      </Typography>
                      
                      <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <FormControl fullWidth>
                            <InputLabel>Preferred Language</InputLabel>
                            <Select
                              value={settings.preferredLanguage}
                              label="Preferred Language"
                              onChange={(e) => handleSettingChange('preferredLanguage', e.target.value)}
                            >
                              <MenuItem value="en">English</MenuItem>
                              <MenuItem value="es">Spanish</MenuItem>
                              <MenuItem value="fr">French</MenuItem>
                              <MenuItem value="de">German</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <FormControl fullWidth>
                            <InputLabel>Timezone</InputLabel>
                            <Select
                              value={settings.timezone}
                              label="Timezone"
                              onChange={(e) => handleSettingChange('timezone', e.target.value)}
                            >
                              <MenuItem value="America/New_York">Eastern Time</MenuItem>
                              <MenuItem value="America/Chicago">Central Time</MenuItem>
                              <MenuItem value="America/Denver">Mountain Time</MenuItem>
                              <MenuItem value="America/Los_Angeles">Pacific Time</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>

                      <Divider />

                      <Stack spacing={2}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          Exam Behavior
                        </Typography>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.autoSubmit}
                              onChange={(e) => handleSettingChange('autoSubmit', e.target.checked)}
                            />
                          }
                          label="Auto-submit exam when time expires"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.saveProgress}
                              onChange={(e) => handleSettingChange('saveProgress', e.target.checked)}
                            />
                          }
                          label="Automatically save progress every 30 seconds"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={settings.examReminders}
                              onChange={(e) => handleSettingChange('examReminders', e.target.checked)}
                            />
                          }
                          label="Show time remaining warnings"
                        />
                      </Stack>
                    </Stack>
                  )}

                  {/* Privacy Tab */}
                  {selectedTab === 2 && (
                    <Stack spacing={4}>
                      <Typography variant="h6" fontWeight={600}>
                        Privacy & Data Settings
                      </Typography>
                      
                      <Alert severity="info">
                        These settings control how your data is collected and used during exams. 
                        Some settings may be required by your institution.
                      </Alert>

                      <Stack spacing={3}>
                        <Stack spacing={2}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            Recording Permissions
                          </Typography>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings.allowRecording}
                                onChange={(e) => handleSettingChange('allowRecording', e.target.checked)}
                              />
                            }
                            label="Allow video and audio recording during exams"
                          />
                          <Typography variant="body2" color="text.secondary">
                            Required for proctored exams. Recordings are used only for exam integrity verification.
                          </Typography>
                        </Stack>

                        <Divider />

                        <Stack spacing={2}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            Performance Data
                          </Typography>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings.sharePerformance}
                                onChange={(e) => handleSettingChange('sharePerformance', e.target.checked)}
                              />
                            }
                            label="Share anonymous performance data for research"
                          />
                          <Typography variant="body2" color="text.secondary">
                            Help improve the platform by sharing anonymized exam performance data.
                          </Typography>
                        </Stack>

                        <Divider />

                        <Stack spacing={2}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            Data Retention
                          </Typography>
                          <FormControl fullWidth sx={{ maxWidth: 300 }}>
                            <InputLabel>Data Retention Period</InputLabel>
                            <Select
                              value={settings.dataRetention}
                              label="Data Retention Period"
                              onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
                            >
                              <MenuItem value="30days">30 Days</MenuItem>
                              <MenuItem value="90days">90 Days</MenuItem>
                              <MenuItem value="1year">1 Year</MenuItem>
                              <MenuItem value="institution">Institution Policy</MenuItem>
                            </Select>
                          </FormControl>
                          <Typography variant="body2" color="text.secondary">
                            How long your exam recordings and data are stored.
                          </Typography>
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
                            Email Notifications
                          </Typography>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings.emailNotifications}
                                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                              />
                            }
                            label="Receive email notifications"
                          />
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings.resultNotifications}
                                onChange={(e) => handleSettingChange('resultNotifications', e.target.checked)}
                              />
                            }
                            label="Exam result notifications"
                          />
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings.systemUpdates}
                                onChange={(e) => handleSettingChange('systemUpdates', e.target.checked)}
                              />
                            }
                            label="System updates and maintenance notices"
                          />
                        </Stack>

                        <Divider />

                        <Stack spacing={2}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            Exam Reminders
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Get notified about upcoming exams and important deadlines.
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap">
                            <Chip label="24 hours before" color="primary" />
                            <Chip label="2 hours before" color="primary" />
                            <Chip label="30 minutes before" color="primary" />
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  )}

                  {/* System Tab */}
                  {selectedTab === 4 && (
                    <Stack spacing={4}>
                      <Typography variant="h6" fontWeight={600}>
                        System Settings
                      </Typography>
                      
                      <Alert severity="warning">
                        These settings affect exam functionality. Disabling required features 
                        may prevent you from taking proctored exams.
                      </Alert>

                      <Stack spacing={3}>
                        <Stack spacing={2}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            Hardware Permissions
                          </Typography>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings.cameraEnabled}
                                onChange={(e) => handleSettingChange('cameraEnabled', e.target.checked)}
                              />
                            }
                            label={
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <Camera />
                                <span>Camera Access</span>
                              </Stack>
                            }
                          />
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings.microphoneEnabled}
                                onChange={(e) => handleSettingChange('microphoneEnabled', e.target.checked)}
                              />
                            }
                            label={
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <Mic />
                                <span>Microphone Access</span>
                              </Stack>
                            }
                          />
                        </Stack>

                        <Divider />

                        <Stack spacing={2}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            Exam Security
                          </Typography>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings.screenSharing}
                                onChange={(e) => handleSettingChange('screenSharing', e.target.checked)}
                              />
                            }
                            label="Allow screen sharing (required for proctored exams)"
                          />
                          <FormControlLabel
                            control={
                              <Switch
                                checked={settings.browserLock}
                                onChange={(e) => handleSettingChange('browserLock', e.target.checked)}
                              />
                            }
                            label="Enable browser lockdown mode"
                          />
                        </Stack>
                      </Stack>
                    </Stack>
                  )}

                  {/* Save Button */}
                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      startIcon={<Save />}
                      size="large"
                    >
                      Save Changes
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
