import {
  Typography,
  Container,
  Grid,
  Stack,
  Card,
  CardContent,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import {
  Schedule,
  Add,
  Edit,
  Delete,
  Visibility,
  CalendarToday,
  AccessTime,
  People,
  Assessment,
  Filter,
  Search,
  Event,
} from '@mui/icons-material';
import { Layout } from '../../components/layout';

export function ExamSchedulePage() {
  const scheduledExams = [
    {
      id: 1,
      title: 'Mathematics Final Exam',
      course: 'MATH 101',
      instructor: 'Dr. Smith',
      date: '2024-01-25',
      time: '09:00 AM',
      duration: '3 hours',
      students: 156,
      status: 'Scheduled',
      room: 'Online'
    },
    {
      id: 2,
      title: 'Physics Midterm',
      course: 'PHYS 201',
      instructor: 'Prof. Johnson',
      date: '2024-01-26',
      time: '02:00 PM',
      duration: '2 hours',
      students: 89,
      status: 'Scheduled',
      room: 'Online'
    },
    {
      id: 3,
      title: 'Chemistry Lab Test',
      course: 'CHEM 301',
      instructor: 'Dr. Williams',
      date: '2024-01-27',
      time: '10:00 AM',
      duration: '1.5 hours',
      students: 67,
      status: 'Draft',
      room: 'Online'
    },
    {
      id: 4,
      title: 'Biology Assessment',
      course: 'BIO 101',
      instructor: 'Prof. Brown',
      date: '2024-01-28',
      time: '01:00 PM',
      duration: '2.5 hours',
      students: 123,
      status: 'Published',
      room: 'Online'
    },
    {
      id: 5,
      title: 'Computer Science Quiz',
      course: 'CS 102',
      instructor: 'Dr. Davis',
      date: '2024-01-24',
      time: '11:00 AM',
      duration: '1 hour',
      students: 95,
      status: 'In Progress',
      room: 'Online'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'info';
      case 'Published': return 'success';
      case 'Draft': return 'warning';
      case 'In Progress': return 'primary';
      case 'Completed': return 'default';
      default: return 'default';
    }
  };

  const upcomingExams = scheduledExams.filter(exam => 
    new Date(exam.date) >= new Date() && exam.status !== 'Draft'
  ).slice(0, 3);

  return (
    <Layout title="Exam Schedule">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* Header */}
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} spacing={2}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Exam Schedule
            </Typography>
            <Button variant="contained" startIcon={<Add />}>
              Schedule New Exam
            </Button>
          </Stack>

          {/* Quick Overview */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card>
                <CardContent>
                  <Stack spacing={2} alignItems="center" textAlign="center">
                    <Event color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="h5" fontWeight={600}>
                      12
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Exams This Week
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card>
                <CardContent>
                  <Stack spacing={2} alignItems="center" textAlign="center">
                    <Schedule color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="h5" fontWeight={600}>
                      3
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Exams Today
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card>
                <CardContent>
                  <Stack spacing={2} alignItems="center" textAlign="center">
                    <People color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="h5" fontWeight={600}>
                      530
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Students Enrolled
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card>
                <CardContent>
                  <Stack spacing={2} alignItems="center" textAlign="center">
                    <Assessment color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="h5" fontWeight={600}>
                      8
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Courses
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            {/* Main Schedule Table */}
            <Grid size={{ xs: 12, lg: 8 }}>
              <Card>
                <CardContent>
                  <Stack spacing={3}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} spacing={2}>
                      <Typography variant="h6">All Scheduled Exams</Typography>
                      <Stack direction="row" spacing={2}>
                        <TextField
                          size="small"
                          placeholder="Search exams..."
                          InputProps={{
                            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                          }}
                        />
                        <Button variant="outlined" startIcon={<Filter />}>
                          Filter
                        </Button>
                      </Stack>
                    </Stack>

                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Exam Details</TableCell>
                            <TableCell align="center">Date & Time</TableCell>
                            <TableCell align="center">Duration</TableCell>
                            <TableCell align="center">Students</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {scheduledExams.map((exam) => (
                            <TableRow key={exam.id}>
                              <TableCell>
                                <Stack spacing={0.5}>
                                  <Typography variant="subtitle2" fontWeight={600}>
                                    {exam.title}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {exam.course} • {exam.instructor}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Stack spacing={0.5} alignItems="center">
                                  <Typography variant="body2" fontWeight={500}>
                                    {exam.date}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {exam.time}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="body2">{exam.duration}</Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Chip
                                  label={exam.students}
                                  size="small"
                                  variant="outlined"
                                  color="primary"
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Chip
                                  label={exam.status}
                                  size="small"
                                  color={getStatusColor(exam.status) as 'info' | 'success' | 'warning' | 'primary' | 'default'}
                                  variant="outlined"
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Stack direction="row" justifyContent="center" spacing={0.5}>
                                  <IconButton size="small" color="primary">
                                    <Visibility />
                                  </IconButton>
                                  <IconButton size="small" color="info">
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
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Sidebar */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <Stack spacing={3}>
                {/* Quick Actions */}
                <Card>
                  <CardContent>
                    <Stack spacing={3}>
                      <Typography variant="h6">Quick Actions</Typography>
                      <Stack spacing={2}>
                        <Button
                          variant="outlined"
                          startIcon={<Add />}
                          fullWidth
                        >
                          Schedule New Exam
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<CalendarToday />}
                          fullWidth
                        >
                          View Calendar
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<Assessment />}
                          fullWidth
                        >
                          Exam Templates
                        </Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>

                {/* Upcoming Exams */}
                <Card>
                  <CardContent>
                    <Stack spacing={3}>
                      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTime color="primary" />
                        Upcoming Exams
                      </Typography>
                      
                      <Stack spacing={2}>
                        {upcomingExams.map((exam) => (
                          <Card key={exam.id} variant="outlined">
                            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                              <Stack spacing={1}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                  {exam.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {exam.course}
                                </Typography>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                  <Typography variant="caption" color="text.secondary">
                                    {exam.date} at {exam.time}
                                  </Typography>
                                  <Chip
                                    label={exam.status}
                                    size="small"
                                    color={getStatusColor(exam.status) as 'info' | 'success' | 'warning' | 'primary' | 'default'}
                                    variant="outlined"
                                  />
                                </Stack>
                              </Stack>
                            </CardContent>
                          </Card>
                        ))}
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>

                {/* Filters */}
                <Card>
                  <CardContent>
                    <Stack spacing={3}>
                      <Typography variant="h6">Filter Options</Typography>
                      
                      <Stack spacing={2}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Course</InputLabel>
                          <Select label="Course" defaultValue="">
                            <MenuItem value="">All Courses</MenuItem>
                            <MenuItem value="MATH">Mathematics</MenuItem>
                            <MenuItem value="PHYS">Physics</MenuItem>
                            <MenuItem value="CHEM">Chemistry</MenuItem>
                            <MenuItem value="BIO">Biology</MenuItem>
                            <MenuItem value="CS">Computer Science</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth size="small">
                          <InputLabel>Status</InputLabel>
                          <Select label="Status" defaultValue="">
                            <MenuItem value="">All Status</MenuItem>
                            <MenuItem value="Draft">Draft</MenuItem>
                            <MenuItem value="Scheduled">Scheduled</MenuItem>
                            <MenuItem value="Published">Published</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth size="small">
                          <InputLabel>Instructor</InputLabel>
                          <Select label="Instructor" defaultValue="">
                            <MenuItem value="">All Instructors</MenuItem>
                            <MenuItem value="Smith">Dr. Smith</MenuItem>
                            <MenuItem value="Johnson">Prof. Johnson</MenuItem>
                            <MenuItem value="Williams">Dr. Williams</MenuItem>
                            <MenuItem value="Brown">Prof. Brown</MenuItem>
                            <MenuItem value="Davis">Dr. Davis</MenuItem>
                          </Select>
                        </FormControl>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Layout>
  );
}
