import {
  Typography,
  Container,
  Grid,
  Stack,
  Card,
  CardContent,
  Chip,
  Button,
  IconButton,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  History,
  Search,
  FilterList,
  Download,
  Visibility,
  CheckCircle,
  Cancel,
  Schedule,
  Assessment,
  TrendingUp,
  School,
} from '@mui/icons-material';
import { useState } from 'react';
import { Layout } from '../../components/layout';

export function StudentExamHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Mock exam history data
  const examHistory = [
    {
      id: 'EXAM001',
      title: 'Advanced Mathematics Final',
      subject: 'Mathematics',
      date: '2024-12-15',
      duration: 120,
      status: 'completed',
      score: 85,
      maxScore: 100,
      grade: 'B+',
      proctored: true,
      violations: 0,
      timeSpent: 115
    },
    {
      id: 'EXAM002',
      title: 'Physics Midterm Examination',
      subject: 'Physics',
      date: '2024-12-10',
      duration: 90,
      status: 'completed',
      score: 92,
      maxScore: 100,
      grade: 'A-',
      proctored: true,
      violations: 1,
      timeSpent: 88
    },
    {
      id: 'EXAM003',
      title: 'Chemistry Lab Assessment',
      subject: 'Chemistry',
      date: '2024-12-05',
      duration: 60,
      status: 'completed',
      score: 78,
      maxScore: 100,
      grade: 'B',
      proctored: false,
      violations: 0,
      timeSpent: 58
    },
    {
      id: 'EXAM004',
      title: 'English Literature Essay',
      subject: 'English',
      date: '2024-11-28',
      duration: 150,
      status: 'incomplete',
      score: 0,
      maxScore: 100,
      grade: 'N/A',
      proctored: true,
      violations: 0,
      timeSpent: 45
    },
    {
      id: 'EXAM005',
      title: 'Biology Quiz Series',
      subject: 'Biology',
      date: '2024-11-20',
      duration: 45,
      status: 'completed',
      score: 95,
      maxScore: 100,
      grade: 'A',
      proctored: true,
      violations: 0,
      timeSpent: 42
    }
  ];

  const statusColors = {
    completed: 'success',
    incomplete: 'error',
    in_progress: 'warning',
    scheduled: 'info'
  } as const;

  const statusIcons = {
    completed: CheckCircle,
    incomplete: Cancel,
    in_progress: Schedule,
    scheduled: Schedule
  };

  const filteredExams = examHistory.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || exam.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const averageScore = examHistory
    .filter(e => e.status === 'completed')
    .reduce((acc, e) => acc + e.score, 0) / examHistory.filter(e => e.status === 'completed').length;

  const completedExams = examHistory.filter(e => e.status === 'completed').length;
  const totalExams = examHistory.length;

  return (
    <Layout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <History />
              </Avatar>
              <Stack>
                <Typography variant="h4" fontWeight={600}>
                  Exam History
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View your complete examination history and performance analytics
                </Typography>
              </Stack>
            </Stack>
            <Button
              variant="outlined"
              startIcon={<Download />}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              Export Report
            </Button>
          </Stack>

          {/* Stats Cards */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <School />
                    </Avatar>
                    <Stack>
                      <Typography variant="h4" fontWeight={600}>
                        {totalExams}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Exams
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
                      <CheckCircle />
                    </Avatar>
                    <Stack>
                      <Typography variant="h4" fontWeight={600}>
                        {completedExams}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Completed
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
                      <Assessment />
                    </Avatar>
                    <Stack>
                      <Typography variant="h4" fontWeight={600}>
                        {averageScore.toFixed(1)}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Average Score
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
                      <TrendingUp />
                    </Avatar>
                    <Stack>
                      <Typography variant="h4" fontWeight={600}>
                        +12%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Improvement
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
                  placeholder="Search exams..."
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
                  <MenuItem value="incomplete">Incomplete</MenuItem>
                  <MenuItem value="in_progress">In Progress</MenuItem>
                  <MenuItem value="scheduled">Scheduled</MenuItem>
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

          {/* Exam History Table */}
          <Card>
            <CardContent sx={{ p: 0 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Exam Details</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Score</TableCell>
                      <TableCell>Grade</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Proctored</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredExams
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((exam) => {
                        const StatusIcon = statusIcons[exam.status as keyof typeof statusIcons];
                        return (
                          <TableRow key={exam.id} hover>
                            <TableCell>
                              <Stack spacing={0.5}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                  {exam.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {exam.subject} • {exam.id}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {new Date(exam.date).toLocaleDateString()}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                icon={<StatusIcon />}
                                label={exam.status.replace('_', ' ')}
                                color={statusColors[exam.status as keyof typeof statusColors]}
                                size="small"
                                sx={{ textTransform: 'capitalize' }}
                              />
                            </TableCell>
                            <TableCell>
                              {exam.status === 'completed' ? (
                                <Stack spacing={0.5}>
                                  <Typography variant="body2" fontWeight={600}>
                                    {exam.score}/{exam.maxScore}
                                  </Typography>
                                  <LinearProgress
                                    variant="determinate"
                                    value={(exam.score / exam.maxScore) * 100}
                                    sx={{ width: 60 }}
                                  />
                                </Stack>
                              ) : (
                                <Typography variant="body2" color="text.secondary">
                                  —
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell>
                              {exam.grade !== 'N/A' ? (
                                <Chip
                                  label={exam.grade}
                                  color={exam.score >= 90 ? 'success' : exam.score >= 80 ? 'info' : 'warning'}
                                  size="small"
                                />
                              ) : (
                                <Typography variant="body2" color="text.secondary">
                                  —
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {exam.timeSpent ? `${exam.timeSpent}/${exam.duration}` : `${exam.duration}`} min
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <Chip
                                  label={exam.proctored ? 'Yes' : 'No'}
                                  color={exam.proctored ? 'success' : 'default'}
                                  size="small"
                                />
                                {exam.violations > 0 && (
                                  <Chip
                                    label={`${exam.violations} violation${exam.violations > 1 ? 's' : ''}`}
                                    color="error"
                                    size="small"
                                  />
                                )}
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <IconButton size="small">
                                <Visibility />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={filteredExams.length}
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
        </Stack>
      </Container>
    </Layout>
  );
}
