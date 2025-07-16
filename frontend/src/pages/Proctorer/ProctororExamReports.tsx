import {
  Typography,
  Container,
  Grid,
  Stack,
  Card,
  CardContent,
  Button,
  IconButton,
  TextField,
  MenuItem,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  LinearProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Assessment,
  Search,
  FilterList,
  Download,
  Visibility,
  Warning,
  CheckCircle,
  Error,
  ExpandMore,
  Security,
  Flag,
} from '@mui/icons-material';
import { useState } from 'react';
import { Layout } from '../../components/layout';

interface ExamReport {
  id: string;
  examTitle: string;
  studentName: string;
  studentId: string;
  date: string;
  duration: number;
  timeSpent: number;
  status: 'completed' | 'interrupted' | 'flagged';
  violations: Violation[];
  proctorNotes: string;
  overallRisk: 'low' | 'medium' | 'high';
}

interface Violation {
  id: string;
  type: 'face_detection' | 'tab_switching' | 'audio_anomaly' | 'movement' | 'multiple_faces';
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  evidence?: string;
}

export function ProctororExamReports() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Mock exam reports data
  const examReports: ExamReport[] = [
    {
      id: 'RPT001',
      examTitle: 'Advanced Mathematics Final',
      studentName: 'Alice Johnson',
      studentId: 'STU001',
      date: '2024-12-15',
      duration: 120,
      timeSpent: 118,
      status: 'completed',
      violations: [
        {
          id: 'V1',
          type: 'tab_switching',
          timestamp: '14:23:45',
          severity: 'medium',
          description: 'Student switched to another tab for 3 seconds'
        }
      ],
      proctorNotes: 'Minor tab switching incident. Student appeared focused otherwise.',
      overallRisk: 'low'
    },
    {
      id: 'RPT002',
      examTitle: 'Physics Midterm',
      studentName: 'Michael Brown',
      studentId: 'STU002',
      date: '2024-12-14',
      duration: 90,
      timeSpent: 92,
      status: 'flagged',
      violations: [
        {
          id: 'V2',
          type: 'multiple_faces',
          timestamp: '10:15:30',
          severity: 'high',
          description: 'Multiple faces detected in frame'
        },
        {
          id: 'V3',
          type: 'audio_anomaly',
          timestamp: '10:45:12',
          severity: 'medium',
          description: 'Suspicious audio pattern detected'
        }
      ],
      proctorNotes: 'Multiple violations detected. Requires investigation.',
      overallRisk: 'high'
    },
    {
      id: 'RPT003',
      examTitle: 'Chemistry Lab Assessment',
      studentName: 'Sarah Wilson',
      studentId: 'STU003',
      date: '2024-12-13',
      duration: 60,
      timeSpent: 58,
      status: 'completed',
      violations: [],
      proctorNotes: 'Clean exam session with no violations.',
      overallRisk: 'low'
    },
    {
      id: 'RPT004',
      examTitle: 'English Literature Essay',
      studentName: 'David Lee',
      studentId: 'STU004',
      date: '2024-12-12',
      duration: 150,
      timeSpent: 95,
      status: 'interrupted',
      violations: [
        {
          id: 'V4',
          type: 'face_detection',
          timestamp: '11:30:00',
          severity: 'high',
          description: 'Student left the frame for extended period'
        }
      ],
      proctorNotes: 'Student disconnected mid-exam. Face detection lost.',
      overallRisk: 'medium'
    }
  ];

  const statusColors = {
    completed: 'success',
    interrupted: 'warning',
    flagged: 'error'
  } as const;

  const riskColors = {
    low: 'success',
    medium: 'warning',
    high: 'error'
  } as const;

  const filteredReports = examReports.filter(report => {
    const matchesSearch = report.examTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesRisk = riskFilter === 'all' || report.overallRisk === riskFilter;
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const stats = {
    total: examReports.length,
    completed: examReports.filter(r => r.status === 'completed').length,
    flagged: examReports.filter(r => r.status === 'flagged').length,
    highRisk: examReports.filter(r => r.overallRisk === 'high').length,
    totalViolations: examReports.reduce((acc, r) => acc + r.violations.length, 0)
  };

  return (
    <Layout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <Assessment />
              </Avatar>
              <Stack>
                <Typography variant="h4" fontWeight={600}>
                  Exam Reports
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Review proctoring reports and violation analysis
                </Typography>
              </Stack>
            </Stack>
            <Button
              variant="outlined"
              startIcon={<Download />}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              Export Reports
            </Button>
          </Stack>

          {/* Stats Cards */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <Assessment />
                    </Avatar>
                    <Stack>
                      <Typography variant="h4" fontWeight={600}>
                        {stats.total}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Reports
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'success.main' }}>
                      <CheckCircle />
                    </Avatar>
                    <Stack>
                      <Typography variant="h4" fontWeight={600}>
                        {stats.completed}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Completed
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'error.main' }}>
                      <Flag />
                    </Avatar>
                    <Stack>
                      <Typography variant="h4" fontWeight={600}>
                        {stats.flagged}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Flagged
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'warning.main' }}>
                      <Error />
                    </Avatar>
                    <Stack>
                      <Typography variant="h4" fontWeight={600}>
                        {stats.highRisk}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        High Risk
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'info.main' }}>
                      <Warning />
                    </Avatar>
                    <Stack>
                      <Typography variant="h4" fontWeight={600}>
                        {stats.totalViolations}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Violations
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Filters */}
          <Card>
            <CardContent>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
                <TextField
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                  sx={{ minWidth: 300 }}
                />
                <TextField
                  select
                  label="Status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="interrupted">Interrupted</MenuItem>
                  <MenuItem value="flagged">Flagged</MenuItem>
                </TextField>
                <TextField
                  select
                  label="Risk Level"
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value="all">All Risk</MenuItem>
                  <MenuItem value="low">Low Risk</MenuItem>
                  <MenuItem value="medium">Medium Risk</MenuItem>
                  <MenuItem value="high">High Risk</MenuItem>
                </TextField>
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  sx={{ ml: 'auto' }}
                >
                  More Filters
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Reports Table */}
          <Card>
            <CardContent sx={{ p: 0 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Exam Details</TableCell>
                      <TableCell>Student</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Violations</TableCell>
                      <TableCell>Risk Level</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredReports
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((report) => (
                        <TableRow key={report.id} hover>
                          <TableCell>
                            <Stack spacing={0.5}>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {report.examTitle}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                ID: {report.id}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Stack spacing={0.5}>
                              <Typography variant="body2" fontWeight={500}>
                                {report.studentName}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {report.studentId}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {new Date(report.date).toLocaleDateString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={report.status}
                              color={statusColors[report.status]}
                              size="small"
                              sx={{ textTransform: 'capitalize' }}
                            />
                          </TableCell>
                          <TableCell>
                            <Stack spacing={0.5}>
                              <Typography variant="body2">
                                {report.timeSpent}/{report.duration} min
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={(report.timeSpent / report.duration) * 100}
                                sx={{ width: 60 }}
                              />
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <Typography variant="body2" fontWeight={600}>
                                {report.violations.length}
                              </Typography>
                              {report.violations.length > 0 && (
                                <Chip
                                  label={`${report.violations.filter(v => v.severity === 'high').length} high`}
                                  color="error"
                                  size="small"
                                />
                              )}
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={report.overallRisk}
                              color={riskColors[report.overallRisk]}
                              size="small"
                              sx={{ textTransform: 'capitalize' }}
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton size="small">
                              <Visibility />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={filteredReports.length}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </CardContent>
          </Card>

          {/* Detailed Report Sample */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Sample Detailed Report
              </Typography>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1">
                    Advanced Mathematics Final - Alice Johnson
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={3}>
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={2}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            Exam Information
                          </Typography>
                          <Stack spacing={1}>
                            <Typography variant="body2">
                              <strong>Duration:</strong> 120 minutes
                            </Typography>
                            <Typography variant="body2">
                              <strong>Time Spent:</strong> 118 minutes
                            </Typography>
                            <Typography variant="body2">
                              <strong>Completion Rate:</strong> 98.3%
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={2}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            Violations Detected
                          </Typography>
                          <Stack spacing={1}>
                            <Chip
                              icon={<Security />}
                              label="Tab Switching (Medium)"
                              color="warning"
                              size="small"
                            />
                            <Typography variant="body2" color="text.secondary">
                              Occurred at 14:23:45 - Student switched tabs briefly
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                    <Alert severity="info">
                      <Typography variant="body2">
                        <strong>Proctorer Notes:</strong> Minor tab switching incident. 
                        Student appeared focused otherwise. Overall exam session was clean 
                        with minimal risk indicators.
                      </Typography>
                    </Alert>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Layout>
  );
}
