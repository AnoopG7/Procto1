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
} from '@mui/material';
import {
  Analytics,
  TrendingUp,
  School,
  Timer,
  Star,
  CheckCircle,
  Warning,
  Assignment,
} from '@mui/icons-material';
import { useState } from 'react';
import { Layout } from '../../components/layout';

export function StudentAnalytics() {
  const [timeRange, setTimeRange] = useState('semester');

  // Mock student performance data
  const performanceData = {
    overallGrade: 87.5,
    totalExams: 12,
    completedExams: 10,
    averageScore: 85.2,
    bestScore: 98,
    improvement: 12.5,
    studyTime: 156, // hours
    strengths: ['Mathematics', 'Physics'],
    weaknesses: ['Chemistry', 'Biology']
  };

  const recentExams = [
    {
      id: 'EXAM001',
      subject: 'Advanced Mathematics',
      date: '2024-12-15',
      score: 92,
      maxScore: 100,
      timeSpent: 118,
      duration: 120,
      grade: 'A-',
      rank: 8
    },
    {
      id: 'EXAM002',
      subject: 'Physics II',
      date: '2024-12-12',
      score: 85,
      maxScore: 100,
      timeSpent: 88,
      duration: 90,
      grade: 'B+',
      rank: 15
    },
    {
      id: 'EXAM003',
      subject: 'Chemistry Lab',
      date: '2024-12-08',
      score: 78,
      maxScore: 100,
      timeSpent: 58,
      duration: 60,
      grade: 'B',
      rank: 22
    }
  ];

  const subjectPerformance = [
    { subject: 'Mathematics', average: 92, trend: 'up', exams: 4 },
    { subject: 'Physics', average: 88, trend: 'up', exams: 3 },
    { subject: 'Chemistry', average: 76, trend: 'down', exams: 3 },
    { subject: 'Biology', average: 82, trend: 'stable', exams: 2 }
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'success.main';
      case 'down': return 'error.main';
      default: return 'warning.main';
    }
  };

  const getGradeColor = (score: number) => {
    if (score >= 90) return 'success';
    if (score >= 80) return 'info';
    if (score >= 70) return 'warning';
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
                  My Performance Analytics
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Track your academic progress and identify areas for improvement
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
                <MenuItem value="month">This Month</MenuItem>
                <MenuItem value="semester">This Semester</MenuItem>
                <MenuItem value="year">This Year</MenuItem>
                <MenuItem value="all">All Time</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {/* Key Metrics */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'success.main' }}>
                      <Star />
                    </Avatar>
                    <Stack>
                      <Typography variant="h4" fontWeight={600}>
                        {performanceData.overallGrade}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Overall Grade
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
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <Assignment />
                    </Avatar>
                    <Stack>
                      <Typography variant="h4" fontWeight={600}>
                        {performanceData.completedExams}/{performanceData.totalExams}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Exams Completed
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
                      <School />
                    </Avatar>
                    <Stack>
                      <Typography variant="h4" fontWeight={600}>
                        {performanceData.averageScore}%
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
                        +{performanceData.improvement}%
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

          <Grid container spacing={4}>
            {/* Subject Performance */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Subject Performance
                  </Typography>
                  <Stack spacing={3}>
                    {subjectPerformance.map((subject) => (
                      <Stack key={subject.subject} spacing={1}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body1" fontWeight={500}>
                            {subject.subject}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="body2" fontWeight={600}>
                              {subject.average}%
                            </Typography>
                            <TrendingUp
                              sx={{
                                fontSize: 16,
                                color: getTrendColor(subject.trend),
                                transform: subject.trend === 'down' ? 'rotate(180deg)' : 'none'
                              }}
                            />
                          </Stack>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={subject.average}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {subject.exams} exams completed
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Study Insights */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Study Insights
                  </Typography>
                  <Stack spacing={3}>
                    <Stack spacing={1}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Timer color="primary" />
                        <Typography variant="body1" fontWeight={500}>
                          Study Time
                        </Typography>
                      </Stack>
                      <Typography variant="h4" fontWeight={600}>
                        {performanceData.studyTime} hours
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        This semester
                      </Typography>
                    </Stack>

                    <Stack spacing={2}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Strengths
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {performanceData.strengths.map((strength) => (
                          <Chip
                            key={strength}
                            label={strength}
                            color="success"
                            size="small"
                            icon={<CheckCircle />}
                          />
                        ))}
                      </Stack>
                    </Stack>

                    <Stack spacing={2}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Areas for Improvement
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {performanceData.weaknesses.map((weakness) => (
                          <Chip
                            key={weakness}
                            label={weakness}
                            color="warning"
                            size="small"
                            icon={<Warning />}
                          />
                        ))}
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Recent Exam Performance */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Recent Exam Performance
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Subject</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Score</TableCell>
                      <TableCell>Grade</TableCell>
                      <TableCell>Time Used</TableCell>
                      <TableCell>Class Rank</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentExams.map((exam) => (
                      <TableRow key={exam.id} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {exam.subject}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {new Date(exam.date).toLocaleDateString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Stack spacing={0.5}>
                            <Typography variant="body2" fontWeight={600}>
                              {exam.score}/{exam.maxScore}
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={(exam.score / exam.maxScore) * 100}
                              sx={{ width: 60, height: 4 }}
                            />
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={exam.grade}
                            color={getGradeColor(exam.score)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {exam.timeSpent}/{exam.duration} min
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            #{exam.rank}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Performance Tips */}
          <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h6" fontWeight={600}>
                  Personalized Study Recommendations
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Focus Areas
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Spend more time on Chemistry and Biology concepts
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Study Schedule
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Increase study time to 15-20 hours per week
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Exam Strategy
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Practice time management - you're using 95% of allotted time
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Layout>
  );
}
