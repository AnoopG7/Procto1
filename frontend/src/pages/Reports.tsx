import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Alert,
} from '@mui/material';
import {
  Download,
  Visibility,
  Warning,
  CheckCircle,
  Error,
  Flag,
  Assessment,
  FilterList,
  Print,
  Share,
} from '@mui/icons-material';
import { Layout } from '../components/layout';
import reportsData from '../data/reports.json';

interface ExamReport {
  id: string;
  examTitle: string;
  subject: string;
  date: string;
  duration: string;
  totalCandidates: number;
  completedCandidates: number;
  averageScore: number;
  violations: number;
  status: 'completed' | 'ongoing' | 'cancelled';
}

interface CandidateResult {
  id: string;
  name: string;
  email: string;
  score: number;
  timeSpent: string;
  violations: number;
  status: 'completed' | 'incomplete' | 'disqualified';
  lastSeen: string;
  suspiciousActivities: string[];
}

interface ReportDetailsProps {
  examId: string;
  onClose: () => void;
}

const ReportDetails: React.FC<ReportDetailsProps> = ({ onClose }) => {
  const candidateResults: CandidateResult[] = reportsData.candidateResults as CandidateResult[];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle color="success" />;
      case 'incomplete': return <Warning color="warning" />;
      case 'disqualified': return <Error color="error" />;
      default: return <Error />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'incomplete': return 'warning';
      case 'disqualified': return 'error';
      default: return 'default';
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Exam Report Details</Typography>
          <Stack direction="row" spacing={1}>
            <Button startIcon={<Print />} size="small">Print</Button>
            <Button startIcon={<Download />} size="small">Export</Button>
          </Stack>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          {/* Summary Cards */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2}
            sx={{ 
              '& > *': { 
                flex: { xs: 'none', sm: 1 } 
              } 
            }}
          >
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="primary.main">
                  {candidateResults.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Candidates
                </Typography>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="success.main">
                  {candidateResults.filter(c => c.status === 'completed').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed
                </Typography>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="warning.main">
                  {Math.round(candidateResults.reduce((sum, c) => sum + c.score, 0) / candidateResults.length)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average Score
                </Typography>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="error.main">
                  {candidateResults.reduce((sum, c) => sum + c.violations, 0)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Violations
                </Typography>
              </CardContent>
            </Card>
          </Stack>

          {/* Candidate Results Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Candidate</TableCell>
                  <TableCell align="center">Score</TableCell>
                  <TableCell align="center">Time Spent</TableCell>
                  <TableCell align="center">Violations</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {candidateResults.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar>{candidate.name.charAt(0)}</Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {candidate.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {candidate.email}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" fontWeight="bold">
                        {candidate.score}%
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {candidate.timeSpent}
                    </TableCell>
                    <TableCell align="center">
                      {candidate.violations > 0 ? (
                        <Chip
                          icon={<Warning />}
                          label={candidate.violations}
                          color="warning"
                          size="small"
                        />
                      ) : (
                        <Chip
                          icon={<CheckCircle />}
                          label="0"
                          color="success"
                          size="small"
                        />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        icon={getStatusIcon(candidate.status)}
                        label={candidate.status}
                        color={getStatusColor(candidate.status) as 'success' | 'warning' | 'error' | 'default'}
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Violations Summary */}
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Violations Summary
            </Typography>
            <Stack spacing={1}>
              <Alert severity="warning">
                2 candidates had multiple browser tabs detected
              </Alert>
              <Alert severity="error">
                1 candidate was disqualified for camera violations
              </Alert>
              <Alert severity="info">
                No network connectivity issues detected
              </Alert>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export const Reports: React.FC = () => {
  const [data] = useState(reportsData);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'last30days',
    subject: 'all',
  });

  const examReports: ExamReport[] = data.examReports as ExamReport[];

  const handleViewReport = (examId: string) => {
    setSelectedExamId(examId);
  };

  const handleCloseReport = () => {
    setSelectedExamId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'ongoing': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle />;
      case 'ongoing': return <Assessment />;
      case 'cancelled': return <Error />;
      default: return <Assessment />;
    }
  };

  return (
    <Layout title="Procto - Reports & Analytics">
      <Stack spacing={3}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Reports & Analytics
            </Typography>
            <Typography variant="body1" color="text.secondary">
              View exam reports, candidate performance, and violation summaries
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button startIcon={<Download />} variant="outlined">
              Export All
            </Button>
            <Button startIcon={<Share />} variant="outlined">
              Share Reports
            </Button>
          </Stack>
        </Stack>

        {/* Summary Statistics */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={3}
          sx={{ 
            '& > *': { 
              flex: { xs: 'none', sm: 1 } 
            } 
          }}
        >
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold" color="primary.main">
                {examReports.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Exams
              </Typography>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold" color="success.main">
                {examReports.reduce((sum, exam) => sum + exam.completedCandidates, 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Candidates
              </Typography>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold" color="warning.main">
                {Math.round(examReports.reduce((sum, exam) => sum + exam.averageScore, 0) / examReports.length)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average Score
              </Typography>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold" color="error.main">
                {examReports.reduce((sum, exam) => sum + exam.violations, 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Violations
              </Typography>
            </CardContent>
          </Card>
        </Stack>

        {/* Filters */}
        <Paper sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <FilterList />
            <Typography variant="h6" fontWeight="bold">
              Filters
            </Typography>
          </Stack>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                label="Status"
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="ongoing">Ongoing</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Date Range</InputLabel>
              <Select
                value={filters.dateRange}
                label="Date Range"
                onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
              >
                <MenuItem value="last7days">Last 7 days</MenuItem>
                <MenuItem value="last30days">Last 30 days</MenuItem>
                <MenuItem value="last3months">Last 3 months</MenuItem>
                <MenuItem value="lastyear">Last year</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Subject</InputLabel>
              <Select
                value={filters.subject}
                label="Subject"
                onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
              >
                <MenuItem value="all">All Subjects</MenuItem>
                <MenuItem value="mathematics">Mathematics</MenuItem>
                <MenuItem value="physics">Physics</MenuItem>
                <MenuItem value="computer-science">Computer Science</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              size="small"
              placeholder="Search exams..."
              sx={{ minWidth: 200 }}
            />
          </Stack>
        </Paper>

        {/* Reports Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Exam Details</TableCell>
                <TableCell align="center">Candidates</TableCell>
                <TableCell align="center">Completion Rate</TableCell>
                <TableCell align="center">Average Score</TableCell>
                <TableCell align="center">Violations</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {examReports.map((exam) => (
                <TableRow key={exam.id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {exam.examTitle}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {exam.subject} • {exam.date} • {exam.duration}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">
                      {exam.completedCandidates}/{exam.totalCandidates}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box>
                      <Typography variant="body1" fontWeight="bold">
                        {Math.round((exam.completedCandidates / exam.totalCandidates) * 100)}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(exam.completedCandidates / exam.totalCandidates) * 100}
                        sx={{ mt: 0.5, width: 80 }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" fontWeight="bold">
                      {exam.averageScore}%
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {exam.violations > 0 ? (
                      <Chip
                        icon={<Flag />}
                        label={exam.violations}
                        color="error"
                        size="small"
                      />
                    ) : (
                      <Chip
                        icon={<CheckCircle />}
                        label="0"
                        color="success"
                        size="small"
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      icon={getStatusIcon(exam.status)}
                      label={exam.status}
                      color={getStatusColor(exam.status) as 'success' | 'warning' | 'error' | 'default'}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" justifyContent="center" spacing={1}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleViewReport(exam.id)}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton size="small">
                        <Download />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Report Details Dialog */}
        {selectedExamId && (
          <ReportDetails
            examId={selectedExamId}
            onClose={handleCloseReport}
          />
        )}
      </Stack>
    </Layout>
  );
};
