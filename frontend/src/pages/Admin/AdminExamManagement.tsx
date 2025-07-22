import {
  Typography,
  Container,
  Grid,
  Stack,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Box,
  Divider,
  Alert,
  LinearProgress,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Quiz,
  People,
  Timer,
  Settings,
  Assessment,
  Security,
  PlayArrow,
  Stop,
} from '@mui/icons-material';
import { useState } from 'react';

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
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export function AdminExamManagement() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedExam, setSelectedExam] = useState<typeof exams[0] | null>(null);

  // Mock exam data
  const exams = [
    {
      id: 'EXAM001',
      title: 'Advanced Mathematics Final',
      course: 'MATH 401',
      instructor: 'Dr. Sarah Johnson',
      status: 'active',
      startDate: '2024-01-15',
      duration: 90,
      totalStudents: 24,
      completedStudents: 12,
      averageScore: 78.5,
      violations: 3,
    },
    {
      id: 'EXAM002',
      title: 'Computer Science Midterm',
      course: 'CS 301',
      instructor: 'Prof. Michael Chen',
      status: 'scheduled',
      startDate: '2024-01-20',
      duration: 120,
      totalStudents: 35,
      completedStudents: 0,
      averageScore: null,
      violations: 0,
    },
    {
      id: 'EXAM003',
      title: 'Physics Laboratory Quiz',
      course: 'PHYS 201',
      instructor: 'Dr. Emily Davis',
      status: 'completed',
      startDate: '2024-01-10',
      duration: 60,
      totalStudents: 18,
      completedStudents: 18,
      averageScore: 82.3,
      violations: 1,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'scheduled': return 'info';
      case 'completed': return 'default';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <PlayArrow />;
      case 'scheduled': return <Timer />;
      case 'completed': return <Assessment />;
      case 'cancelled': return <Stop />;
      default: return <Quiz />;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack>
            <Typography variant="h4" fontWeight={600}>
              Exam Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Create, configure, and monitor all examinations
            </Typography>
          </Stack>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setShowCreateDialog(true)}
          >
            Create New Exam
          </Button>
        </Stack>

        {/* Statistics Overview */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <Quiz />
                  </Avatar>
                  <Stack>
                    <Typography variant="h6" fontWeight={600}>
                      {exams.length}
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
                    <PlayArrow />
                  </Avatar>
                  <Stack>
                    <Typography variant="h6" fontWeight={600}>
                      {exams.filter(e => e.status === 'active').length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Exams
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
                    <Typography variant="h6" fontWeight={600}>
                      {exams.reduce((sum, exam) => sum + exam.totalStudents, 0)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Students
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
                    <Security />
                  </Avatar>
                  <Stack>
                    <Typography variant="h6" fontWeight={600}>
                      {exams.reduce((sum, exam) => sum + exam.violations, 0)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Violations
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Main Content */}
        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
              <Tab label="All Exams" />
              <Tab label="Active Exams" />
              <Tab label="Scheduled Exams" />
              <Tab label="Exam Templates" />
            </Tabs>
          </Box>

          <TabPanel value={selectedTab} index={0}>
            {/* All Exams */}
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Exam Details</TableCell>
                    <TableCell>Instructor</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Students</TableCell>
                    <TableCell>Progress</TableCell>
                    <TableCell>Average Score</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {exams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell>
                        <Stack>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {exam.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {exam.course} • {exam.duration} mins
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {exam.startDate}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {exam.instructor}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getStatusIcon(exam.status)}
                          label={exam.status}
                          color={getStatusColor(exam.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {exam.totalStudents} enrolled
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack spacing={1} sx={{ minWidth: 120 }}>
                          <Typography variant="body2">
                            {exam.completedStudents} / {exam.totalStudents}
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={(exam.completedStudents / exam.totalStudents) * 100}
                            color={exam.status === 'completed' ? 'success' : 'primary'}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {exam.averageScore ? `${exam.averageScore}%` : 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            size="small"
                            onClick={() => setSelectedExam(exam)}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSelectedExam(exam);
                              setShowEditDialog(true);
                            }}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <Delete />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          <TabPanel value={selectedTab} index={1}>
            {/* Active Exams */}
            <Grid container spacing={3}>
              {exams.filter(exam => exam.status === 'active').map((exam) => (
                <Grid key={exam.id} size={{ xs: 12, md: 6, lg: 4 }}>
                  <Card>
                    <CardContent>
                      <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                          <Stack sx={{ flex: 1 }}>
                            <Typography variant="h6" fontWeight={600}>
                              {exam.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {exam.course} • {exam.instructor}
                            </Typography>
                          </Stack>
                          <Chip
                            label="Live"
                            color="success"
                            size="small"
                            icon={<PlayArrow />}
                          />
                        </Stack>

                        <Stack spacing={1}>
                          <Stack direction="row" justifyContent="space-between">
                            <Typography variant="body2">Progress</Typography>
                            <Typography variant="body2">
                              {exam.completedStudents} / {exam.totalStudents}
                            </Typography>
                          </Stack>
                          <LinearProgress
                            variant="determinate"
                            value={(exam.completedStudents / exam.totalStudents) * 100}
                            color="success"
                          />
                        </Stack>

                        <Stack direction="row" spacing={2} justifyContent="space-between">
                          <Typography variant="body2">
                            Violations: {exam.violations}
                          </Typography>
                          <Typography variant="body2">
                            Avg: {exam.averageScore}%
                          </Typography>
                        </Stack>

                        <Stack direction="row" spacing={1}>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<Visibility />}
                            fullWidth
                          >
                            Monitor
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Settings />}
                            fullWidth
                          >
                            Settings
                          </Button>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={selectedTab} index={2}>
            {/* Scheduled Exams */}
            <Grid container spacing={3}>
              {exams.filter(exam => exam.status === 'scheduled').map((exam) => (
                <Grid key={exam.id} size={{ xs: 12, md: 6 }}>
                  <Card>
                    <CardContent>
                      <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                          <Stack sx={{ flex: 1 }}>
                            <Typography variant="h6" fontWeight={600}>
                              {exam.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {exam.course} • {exam.instructor}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Scheduled: {exam.startDate}
                            </Typography>
                          </Stack>
                          <Chip
                            label="Scheduled"
                            color="info"
                            size="small"
                            icon={<Timer />}
                          />
                        </Stack>

                        <Stack direction="row" spacing={4}>
                          <Stack>
                            <Typography variant="body2" color="text.secondary">
                              Duration
                            </Typography>
                            <Typography variant="body1" fontWeight={600}>
                              {exam.duration} mins
                            </Typography>
                          </Stack>
                          <Stack>
                            <Typography variant="body2" color="text.secondary">
                              Students
                            </Typography>
                            <Typography variant="body1" fontWeight={600}>
                              {exam.totalStudents}
                            </Typography>
                          </Stack>
                        </Stack>

                        <Stack direction="row" spacing={1}>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<PlayArrow />}
                            fullWidth
                          >
                            Start Exam
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Edit />}
                            fullWidth
                          >
                            Edit
                          </Button>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={selectedTab} index={3}>
            {/* Exam Templates */}
            <Alert severity="info" sx={{ mb: 3 }}>
              Create reusable exam templates to quickly set up new examinations with predefined settings.
            </Alert>
            <Typography variant="h6">
              [Exam Templates - Coming Soon]
            </Typography>
          </TabPanel>
        </Card>

        {/* Create Exam Dialog */}
        <Dialog open={showCreateDialog} onClose={() => setShowCreateDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Create New Exam</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Exam Title"
                placeholder="Enter exam title"
              />
              <Grid container spacing={2}>
                <Grid size={6}>
                  <FormControl fullWidth>
                    <InputLabel>Course</InputLabel>
                    <Select label="Course">
                      <MenuItem value="MATH401">MATH 401</MenuItem>
                      <MenuItem value="CS301">CS 301</MenuItem>
                      <MenuItem value="PHYS201">PHYS 201</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={6}>
                  <FormControl fullWidth>
                    <InputLabel>Instructor</InputLabel>
                    <Select label="Instructor">
                      <MenuItem value="sarah">Dr. Sarah Johnson</MenuItem>
                      <MenuItem value="michael">Prof. Michael Chen</MenuItem>
                      <MenuItem value="emily">Dr. Emily Davis</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="Duration (minutes)"
                    type="number"
                    defaultValue={90}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="Instructions"
                multiline
                rows={3}
                placeholder="Enter exam instructions"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button variant="contained">
              Create Exam
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Exam Dialog */}
        <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Edit Exam</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <Alert severity="info">
                Editing exam: {selectedExam?.title}
              </Alert>
              {/* Edit form would mirror create form with pre-filled values */}
              <Typography variant="body2">
                [Edit exam form - similar to create form but with current values]
              </Typography>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button variant="contained">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Container>
  );
}
