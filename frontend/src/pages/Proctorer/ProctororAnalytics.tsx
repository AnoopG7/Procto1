import {
  Typography,
  Container,
  Grid,
  Stack,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import {
  Analytics,
  Visibility,
  Warning,
  CheckCircle,
  Error,
  People,
  Timer,
  Security,
} from '@mui/icons-material';
import { useState } from 'react';
import { Layout } from '../../components/layout';

export function ProctororAnalytics() {
  const [timeRange, setTimeRange] = useState('month');

  // Mock proctoring analytics data
  const analyticsData = {
    totalSessions: 84,
    studentsMonitored: 342,
    violationsDetected: 23,
    averageSessionTime: 95, // minutes
    flaggedExams: 12,
    cleanSessions: 72,
    alertAccuracy: 87.5,
    responseTime: 1.2 // minutes
  };

  const violationBreakdown = [
    { type: 'Face Detection Lost', count: 8, percentage: 34.8 },
    { type: 'Tab Switching', count: 6, percentage: 26.1 },
    { type: 'Multiple Faces', count: 4, percentage: 17.4 },
    { type: 'Audio Anomalies', count: 3, percentage: 13.0 },
    { type: 'Excessive Movement', count: 2, percentage: 8.7 }
  ];

  const recentSessions = [
    {
      id: 'SESSION001',
      examTitle: 'Advanced Mathematics Final',
      date: '2024-12-15',
      students: 16,
      duration: 120,
      violations: 2,
      status: 'completed',
      flagged: 1
    },
    {
      id: 'SESSION002',
      examTitle: 'Physics Midterm',
      date: '2024-12-14',
      students: 12,
      duration: 90,
      violations: 0,
      status: 'completed',
      flagged: 0
    },
    {
      id: 'SESSION003',
      examTitle: 'Chemistry Lab Assessment',
      date: '2024-12-13',
      students: 8,
      duration: 60,
      violations: 1,
      status: 'completed',
      flagged: 0
    }
  ];

  const performanceMetrics = [
    { metric: 'Detection Accuracy', value: 92, target: 90, status: 'good' },
    { metric: 'False Positive Rate', value: 8, target: 10, status: 'good' },
    { metric: 'Response Time', value: 1.2, target: 2.0, status: 'excellent' },
    { metric: 'Session Coverage', value: 98, target: 95, status: 'excellent' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'success';
      case 'good': return 'info';
      case 'warning': return 'warning';
      default: return 'error';
    }
  };

  const getViolationColor = (count: number) => {
    if (count === 0) return 'success';
    if (count <= 2) return 'warning';
    return 'error';
  };

  return (
    <Layout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <Analytics />
              </Avatar>
              <Stack>
                <Typography variant="h4" fontWeight={600}>
                  Proctoring Analytics
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Monitor your proctoring performance and violation detection metrics
                </Typography>
              </Stack>
            </Stack>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                label="Time Range"
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
                <MenuItem value="quarter">This Quarter</MenuItem>
                <MenuItem value="year">This Year</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {/* Key Metrics */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <Visibility />
                    </Avatar>
                    <Stack>
                      <Typography variant="h4" fontWeight={600}>
                        {analyticsData.totalSessions}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Sessions
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'info.main' }}>
                      <People />
                    </Avatar>
                    <Stack>
                      <Typography variant="h4" fontWeight={600}>
                        {analyticsData.studentsMonitored}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Students Monitored
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'warning.main' }}>
                      <Warning />
                    </Avatar>
                    <Stack>
                      <Typography variant="h4" fontWeight={600}>
                        {analyticsData.violationsDetected}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Violations Detected
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'success.main' }}>
                      <Security />
                    </Avatar>
                    <Stack>
                      <Typography variant="h4" fontWeight={600}>
                        {analyticsData.alertAccuracy}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Alert Accuracy
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            {/* Violation Breakdown */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Violation Breakdown
                  </Typography>
                  <Stack spacing={3}>
                    {violationBreakdown.map((violation) => (
                      <Stack key={violation.type} spacing={1}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body1" fontWeight={500}>
                            {violation.type}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="body2" fontWeight={600}>
                              {violation.count}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              ({violation.percentage}%)
                            </Typography>
                          </Stack>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={violation.percentage}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Performance Metrics */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Performance Metrics
                  </Typography>
                  <Stack spacing={3}>
                    {performanceMetrics.map((metric) => (
                      <Stack key={metric.metric} spacing={1}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body1" fontWeight={500}>
                            {metric.metric}
                          </Typography>
                          <Chip
                            label={metric.status}
                            color={getStatusColor(metric.status)}
                            size="small"
                            sx={{ textTransform: 'capitalize' }}
                          />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="body2" fontWeight={600}>
                            {metric.value}{metric.metric.includes('Time') ? ' min' : '%'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Target: {metric.target}{metric.metric.includes('Time') ? ' min' : '%'}
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={metric.metric.includes('Rate') ? 100 - metric.value : metric.value}
                          color={getStatusColor(metric.status)}
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Recent Sessions */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Recent Proctoring Sessions
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Exam</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Students</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Violations</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Flagged</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentSessions.map((session) => (
                      <TableRow key={session.id} hover>
                        <TableCell>
                          <Stack spacing={0.5}>
                            <Typography variant="body2" fontWeight={500}>
                              {session.examTitle}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {session.id}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {new Date(session.date).toLocaleDateString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <People fontSize="small" />
                            <Typography variant="body2">
                              {session.students}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Timer fontSize="small" />
                            <Typography variant="body2">
                              {session.duration} min
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={session.violations}
                            color={getViolationColor(session.violations)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={session.status}
                            color="success"
                            size="small"
                            sx={{ textTransform: 'capitalize' }}
                          />
                        </TableCell>
                        <TableCell>
                          {session.flagged > 0 ? (
                            <Chip
                              label={`${session.flagged} flagged`}
                              color="error"
                              size="small"
                              icon={<Error />}
                            />
                          ) : (
                            <Chip
                              label="Clean"
                              color="success"
                              size="small"
                              icon={<CheckCircle />}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card sx={{ bgcolor: 'info.main', color: 'white' }}>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h6" fontWeight={600}>
                  Performance Summary
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Session Efficiency
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Average {analyticsData.averageSessionTime} minutes per session
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Detection Rate
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {((analyticsData.violationsDetected / analyticsData.totalSessions) * 100).toFixed(1)}% of sessions had violations
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Response Time
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Average {analyticsData.responseTime} minutes to address violations
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Performance Insights:</strong> Your detection accuracy is above target at {analyticsData.alertAccuracy}%. 
              Consider adjusting sensitivity settings for face detection to reduce false positives while maintaining security standards.
            </Typography>
          </Alert>
        </Stack>
      </Container>
    </Layout>
  );
}
