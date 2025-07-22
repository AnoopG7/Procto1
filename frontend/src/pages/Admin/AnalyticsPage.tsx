import {
  Typography,
  Container,
  Grid,
  Stack,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Assessment,
  People,
  School,
  Security,
  Schedule,
  Warning,
  CheckCircle,
  Cancel,
  MoreVert,
} from '@mui/icons-material';
import { LayoutWithoutSidebar } from '../../components/layout';

export function AdminAnalytics() {
  const stats = [
    { title: 'Total Exams', value: '1,247', change: '+12%', trend: 'up', color: 'primary' },
    { title: 'Active Students', value: '8,932', change: '+8%', trend: 'up', color: 'success' },
    { title: 'Completion Rate', value: '94.2%', change: '+2.1%', trend: 'up', color: 'info' },
    { title: 'Violation Rate', value: '2.8%', change: '-0.5%', trend: 'down', color: 'warning' },
  ];

  const recentExams = [
    {
      name: 'Mathematics Final Exam',
      students: 156,
      completion: 98,
      violations: 3,
      status: 'Completed',
      date: '2024-01-20'
    },
    {
      name: 'Physics Midterm',
      students: 89,
      completion: 94,
      violations: 2,
      status: 'In Progress',
      date: '2024-01-20'
    },
    {
      name: 'Chemistry Quiz',
      students: 67,
      completion: 100,
      violations: 0,
      status: 'Completed',
      date: '2024-01-19'
    },
    {
      name: 'Biology Assessment',
      students: 123,
      completion: 87,
      violations: 5,
      status: 'In Progress',
      date: '2024-01-19'
    },
  ];

  const topViolations = [
    { type: 'Multiple Faces Detected', count: 23, percentage: 35 },
    { type: 'Browser Tab Switch', count: 18, percentage: 27 },
    { type: 'Excessive Movement', count: 12, percentage: 18 },
    { type: 'Audio Anomaly', count: 8, percentage: 12 },
    { type: 'Window Focus Lost', count: 5, percentage: 8 },
  ];

  return (
    <LayoutWithoutSidebar title="Analytics Dashboard">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Analytics Dashboard
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Period</InputLabel>
              <Select value="30d" label="Period">
                <MenuItem value="7d">Last 7 days</MenuItem>
                <MenuItem value="30d">Last 30 days</MenuItem>
                <MenuItem value="90d">Last 90 days</MenuItem>
                <MenuItem value="1y">Last year</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {/* Key Metrics */}
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card>
                  <CardContent>
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" color="text.secondary">
                          {stat.title}
                        </Typography>
                        {stat.trend === 'up' ? (
                          <TrendingUp color="success" fontSize="small" />
                        ) : (
                          <TrendingDown color="error" fontSize="small" />
                        )}
                      </Stack>
                      <Typography variant="h4" sx={{ fontWeight: 600 }}>
                        {stat.value}
                      </Typography>
                      <Chip
                        label={stat.change}
                        size="small"
                        color={stat.trend === 'up' ? 'success' : 'error'}
                        variant="outlined"
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={4}>
            {/* Exam Performance */}
            <Grid size={{ xs: 12, lg: 8 }}>
              <Card>
                <CardContent>
                  <Stack spacing={3}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Assessment color="primary" />
                      Recent Exam Performance
                    </Typography>
                    
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Exam Name</TableCell>
                            <TableCell align="center">Students</TableCell>
                            <TableCell align="center">Completion</TableCell>
                            <TableCell align="center">Violations</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {recentExams.map((exam, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Typography variant="body2" fontWeight={500}>
                                  {exam.name}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">{exam.students}</TableCell>
                              <TableCell align="center">
                                <Stack spacing={1} alignItems="center">
                                  <Typography variant="body2">{exam.completion}%</Typography>
                                  <LinearProgress
                                    variant="determinate"
                                    value={exam.completion}
                                    sx={{ width: 60, height: 4 }}
                                  />
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Chip
                                  label={exam.violations}
                                  size="small"
                                  color={exam.violations === 0 ? 'success' : exam.violations < 3 ? 'warning' : 'error'}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Chip
                                  label={exam.status}
                                  size="small"
                                  color={exam.status === 'Completed' ? 'success' : 'info'}
                                  variant="outlined"
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="body2" color="text.secondary">
                                  {exam.date}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <IconButton size="small">
                                  <MoreVert />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Violation Analysis */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <Stack spacing={3}>
                <Card>
                  <CardContent>
                    <Stack spacing={3}>
                      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Security color="primary" />
                        Top Violations
                      </Typography>
                      
                      <Stack spacing={2}>
                        {topViolations.map((violation, index) => (
                          <Stack key={index} spacing={1}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                              <Typography variant="body2" fontWeight={500}>
                                {violation.type}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {violation.count}
                              </Typography>
                            </Stack>
                            <LinearProgress
                              variant="determinate"
                              value={violation.percentage}
                              color={violation.percentage > 30 ? 'error' : violation.percentage > 15 ? 'warning' : 'success'}
                              sx={{ height: 6, borderRadius: 3 }}
                            />
                          </Stack>
                        ))}
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <Stack spacing={3}>
                      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Schedule color="primary" />
                        System Health
                      </Typography>
                      
                      <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2">Server Status</Typography>
                          <CheckCircle color="success" fontSize="small" />
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2">Database</Typography>
                          <CheckCircle color="success" fontSize="small" />
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2">AI Proctoring</Typography>
                          <CheckCircle color="success" fontSize="small" />
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2">Video Storage</Typography>
                          <Warning color="warning" fontSize="small" />
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2">Email Service</Typography>
                          <Cancel color="error" fontSize="small" />
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>

          {/* Quick Stats */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Stack spacing={2} alignItems="center" textAlign="center">
                    <People color="primary" sx={{ fontSize: 48 }} />
                    <Typography variant="h5" fontWeight={600}>
                      2,847
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Registered Students
                    </Typography>
                    <Chip label="+156 this month" color="success" size="small" />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Stack spacing={2} alignItems="center" textAlign="center">
                    <School color="primary" sx={{ fontSize: 48 }} />
                    <Typography variant="h5" fontWeight={600}>
                      23
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Courses
                    </Typography>
                    <Chip label="5 new courses" color="info" size="small" />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Stack spacing={2} alignItems="center" textAlign="center">
                    <Assessment color="primary" sx={{ fontSize: 48 }} />
                    <Typography variant="h5" fontWeight={600}>
                      12.4 hrs
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Avg. Exam Duration
                    </Typography>
                    <Chip label="15% decrease" color="success" size="small" />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </LayoutWithoutSidebar>
  );
}
