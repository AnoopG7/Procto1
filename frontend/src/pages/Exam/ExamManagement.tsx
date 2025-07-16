import React, { useState } from 'react';
import {
  Typography,
  Box,
  Stack,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Switch,
  FormControlLabel,
  Grid,
  Fade,
  useTheme,
} from '@mui/material';
import {
  Add,
  TrendingUp,
} from '@mui/icons-material';
import { Layout } from '../../components/layout';
import { ExamCard } from '../../components/exam';
import examsData from '../../data/exams.json';

interface ExamData {
  exams: Array<{
    id: string;
    title: string;
    subject: string;
    startDate: string;
    duration: number;
    totalCandidates: number;
    registeredCandidates: number;
    status: 'draft' | 'scheduled' | 'ongoing' | 'completed';
    instructor: string;
    department: string;
    proctoring: {
      videoMonitoring: boolean;
      screenSharing: boolean;
      browserLock: boolean;
      aiDetection: boolean;
      audioRecording: boolean;
      plagiarismCheck: boolean;
    };
    settings: {
      allowedAttempts: number;
      shuffleQuestions: boolean;
      showResults: boolean;
      passScore: number;
    };
  }>;
  departments: string[];
  examTemplates: Array<{
    id: string;
    name: string;
    duration: number;
    description: string;
  }>;
}

interface ExamFormData {
  title: string;
  subject: string;
  startDate: string;
  duration: string;
  totalCandidates: string;
  instructor: string;
  department: string;
  videoMonitoring: boolean;
  screenSharing: boolean;
  browserLock: boolean;
  aiDetection: boolean;
  audioRecording: boolean;
  plagiarismCheck: boolean;
}

export const ExamManagement: React.FC = () => {
  const theme = useTheme();
  const [data] = useState(examsData as ExamData);
  const [exams, setExams] = useState(data.exams);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<ExamData['exams'][0] | null>(null);
  const [formData, setFormData] = useState<ExamFormData>({
    title: '',
    subject: '',
    startDate: '',
    duration: '',
    totalCandidates: '',
    instructor: '',
    department: '',
    videoMonitoring: true,
    screenSharing: true,
    browserLock: true,
    aiDetection: false,
    audioRecording: false,
    plagiarismCheck: false,
  });

  const handleCreateExam = () => {
    setSelectedExam(null);
    setFormData({
      title: '',
      subject: '',
      startDate: '',
      duration: '',
      totalCandidates: '',
      instructor: '',
      department: '',
      videoMonitoring: true,
      screenSharing: true,
      browserLock: true,
      aiDetection: false,
      audioRecording: false,
      plagiarismCheck: false,
    });
    setDialogOpen(true);
  };

  const handleEditExam = (exam: ExamData['exams'][0]) => {
    setSelectedExam(exam);
    setFormData({
      title: exam.title,
      subject: exam.subject,
      startDate: exam.startDate,
      duration: exam.duration.toString(),
      totalCandidates: exam.totalCandidates.toString(),
      instructor: exam.instructor,
      department: exam.department,
      videoMonitoring: exam.proctoring.videoMonitoring,
      screenSharing: exam.proctoring.screenSharing,
      browserLock: exam.proctoring.browserLock,
      aiDetection: exam.proctoring.aiDetection,
      audioRecording: exam.proctoring.audioRecording,
      plagiarismCheck: exam.proctoring.plagiarismCheck,
    });
    setDialogOpen(true);
  };

  const handleSaveExam = () => {
    const examData = {
      id: selectedExam?.id || Date.now().toString(),
      title: formData.title,
      subject: formData.subject,
      startDate: formData.startDate,
      duration: parseFloat(formData.duration),
      totalCandidates: parseInt(formData.totalCandidates),
      registeredCandidates: selectedExam?.registeredCandidates || 0,
      status: (selectedExam?.status || 'draft') as 'draft' | 'scheduled' | 'ongoing' | 'completed',
      instructor: formData.instructor,
      department: formData.department,
      proctoring: {
        videoMonitoring: formData.videoMonitoring,
        screenSharing: formData.screenSharing,
        browserLock: formData.browserLock,
        aiDetection: formData.aiDetection,
        audioRecording: formData.audioRecording,
        plagiarismCheck: formData.plagiarismCheck,
      },
      settings: selectedExam?.settings || {
        allowedAttempts: 1,
        shuffleQuestions: true,
        showResults: false,
        passScore: 60,
      },
    };

    if (selectedExam) {
      setExams(exams.map(exam => exam.id === selectedExam.id ? examData : exam));
    } else {
      setExams([...exams, examData]);
    }

    setDialogOpen(false);
  };

  const handleStartExam = (examId: string) => {
    setExams(exams.map(exam => 
      exam.id === examId ? { ...exam, status: 'ongoing' as const } : exam
    ));
  };

  const handleViewExam = (examId: string) => {
    console.log('View exam:', examId);
  };

  const activeExams = exams.filter(e => e.status === 'ongoing').length;
  const scheduledExams = exams.filter(e => e.status === 'scheduled').length;
  const completedExams = exams.filter(e => e.status === 'completed').length;
  const totalCandidates = exams.reduce((sum, exam) => sum + exam.registeredCandidates, 0);

  return (
    <Layout title="Procto - Exam Management">
      <Stack spacing={4}>
        {/* Header */}
        <Fade in timeout={500}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography 
                variant="h3" 
                fontWeight="bold"
                sx={{ 
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1
                }}
              >
                Exam Management
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                Create, schedule, and manage your exams
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <TrendingUp color="success" />
                <Typography variant="body2" color="success.main" fontWeight="medium">
                  {activeExams} active exam{activeExams !== 1 ? 's' : ''} running
                </Typography>
              </Stack>
            </Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleCreateExam}
              size="large"
              sx={{ 
                borderRadius: 2,
                px: 3,
                boxShadow: theme.shadows[4],
                '&:hover': { boxShadow: theme.shadows[8] }
              }}
            >
              Create Exam
            </Button>
          </Stack>
        </Fade>

        {/* Stats */}
        <Fade in timeout={800}>
          <Paper 
            sx={{ 
              p: 4,
              background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}08 100%)`,
              borderRadius: 3,
              border: `1px solid ${theme.palette.primary.main}20`
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Overview
            </Typography>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight="bold" color="primary.main">
                    {exams.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Exams
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight="bold" color="success.main">
                    {activeExams}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight="bold" color="warning.main">
                    {scheduledExams}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Scheduled
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight="bold" color="info.main">
                    {completedExams}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completed
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight="bold" color="secondary.main">
                    {totalCandidates}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Candidates
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Fade>

        {/* Exams List */}
        <Fade in timeout={1000}>
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              All Exams ({exams.length})
            </Typography>
            <Grid container spacing={3}>
              {exams.map((exam, index) => (
                <Grid key={exam.id} size={{ xs: 12, md: 6, lg: 4 }}>
                  <Fade in timeout={1000 + index * 200}>
                    <div>
                      <ExamCard
                        exam={{
                          id: exam.id,
                          title: exam.title,
                          subject: exam.subject,
                          startTime: exam.startDate,
                          duration: `${exam.duration} hours`,
                          candidates: exam.registeredCandidates,
                          registeredCandidates: exam.registeredCandidates,
                          totalCandidates: exam.totalCandidates,
                          status: exam.status,
                          instructor: exam.instructor,
                        }}
                        onEdit={() => handleEditExam(exam)}
                        onView={handleViewExam}
                        onStart={handleStartExam}
                        variant="detailed"
                      />
                    </div>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Create/Edit Exam Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            <Typography variant="h5" fontWeight="bold">
              {selectedExam ? 'Edit Exam' : 'Create New Exam'}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Exam Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Instructor"
                    value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    label="Start Date & Time"
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    label="Duration (hours)"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    label="Total Candidates"
                    type="number"
                    value={formData.totalCandidates}
                    onChange={(e) => setFormData({ ...formData, totalCandidates: e.target.value })}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Proctoring Settings
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.videoMonitoring}
                          onChange={(e) => setFormData({ ...formData, videoMonitoring: e.target.checked })}
                        />
                      }
                      label="Video Monitoring"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.screenSharing}
                          onChange={(e) => setFormData({ ...formData, screenSharing: e.target.checked })}
                        />
                      }
                      label="Screen Sharing"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.browserLock}
                          onChange={(e) => setFormData({ ...formData, browserLock: e.target.checked })}
                        />
                      }
                      label="Browser Lock"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.aiDetection}
                          onChange={(e) => setFormData({ ...formData, aiDetection: e.target.checked })}
                        />
                      }
                      label="AI Detection"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.audioRecording}
                          onChange={(e) => setFormData({ ...formData, audioRecording: e.target.checked })}
                        />
                      }
                      label="Audio Recording"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.plagiarismCheck}
                          onChange={(e) => setFormData({ ...formData, plagiarismCheck: e.target.checked })}
                        />
                      }
                      label="Plagiarism Check"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setDialogOpen(false)} size="large">
              Cancel
            </Button>
            <Button 
              onClick={handleSaveExam} 
              variant="contained" 
              size="large"
              sx={{ px: 4 }}
            >
              {selectedExam ? 'Update' : 'Create'} Exam
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Layout>
  );
};
