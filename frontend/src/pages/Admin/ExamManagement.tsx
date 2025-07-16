import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Add,
  MoreVert,
  Edit,
  Delete,
  Schedule,
  People,
  PlayArrow,
  Stop,
  Visibility,
  Settings,
} from '@mui/icons-material';
import { Layout } from '../../components/layout';

interface Exam {
  id: string;
  title: string;
  subject: string;
  startDate: string;
  duration: number;
  totalCandidates: number;
  registeredCandidates: number;
  status: 'draft' | 'scheduled' | 'ongoing' | 'completed';
  proctoring: {
    videoMonitoring: boolean;
    screenSharing: boolean;
    browserLock: boolean;
    aiDetection: boolean;
  };
}

interface ExamCardProps {
  exam: Exam;
  onEdit: (exam: Exam) => void;
  onDelete: (examId: string) => void;
  onStart: (examId: string) => void;
  onView: (examId: string) => void;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam, onEdit, onDelete, onStart, onView }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getStatusColor = () => {
    switch (exam.status) {
      case 'draft': return 'default';
      case 'scheduled': return 'warning';
      case 'ongoing': return 'success';
      case 'completed': return 'info';
      default: return 'default';
    }
  };

  const getStatusIcon = () => {
    switch (exam.status) {
      case 'draft': return <Edit />;
      case 'scheduled': return <Schedule />;
      case 'ongoing': return <PlayArrow />;
      case 'completed': return <Stop />;
      default: return <Edit />;
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {exam.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {exam.subject}
              </Typography>
            </Box>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Chip
                icon={getStatusIcon()}
                label={exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                color={getStatusColor()}
                variant="outlined"
                size="small"
              />
              <IconButton size="small" onClick={handleMenuOpen}>
                <MoreVert />
              </IconButton>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Start Date
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {exam.startDate}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Duration
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {exam.duration} hours
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1}>
              <People fontSize="small" />
              <Typography variant="body2">
                {exam.registeredCandidates}/{exam.totalCandidates} registered
              </Typography>
            </Stack>
            
            <Stack direction="row" spacing={1}>
              {exam.proctoring.videoMonitoring && (
                <Chip label="Video" size="small" variant="outlined" />
              )}
              {exam.proctoring.aiDetection && (
                <Chip label="AI" size="small" variant="outlined" />
              )}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1} justifyContent="flex-end">
            {exam.status === 'scheduled' && (
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                size="small"
                onClick={() => onStart(exam.id)}
              >
                Start
              </Button>
            )}
            {exam.status === 'ongoing' && (
              <Button
                variant="contained"
                startIcon={<Visibility />}
                size="small"
                onClick={() => onView(exam.id)}
              >
                Monitor
              </Button>
            )}
            {exam.status === 'completed' && (
              <Button
                variant="outlined"
                startIcon={<Visibility />}
                size="small"
                onClick={() => onView(exam.id)}
              >
                Results
              </Button>
            )}
          </Stack>
        </Stack>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => { onEdit(exam); handleMenuClose(); }}>
          <Edit sx={{ mr: 1 }} fontSize="small" />
          Edit
        </MenuItem>
        <MenuItem onClick={() => { onView(exam.id); handleMenuClose(); }}>
          <Settings sx={{ mr: 1 }} fontSize="small" />
          Settings
        </MenuItem>
        <MenuItem onClick={() => { onDelete(exam.id); handleMenuClose(); }} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1 }} fontSize="small" />
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
};

export const AdminCreateExam: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([
    {
      id: '1',
      title: 'Mathematics Final Exam',
      subject: 'Advanced Mathematics',
      startDate: 'Jul 20, 2025 10:00 AM',
      duration: 2,
      totalCandidates: 50,
      registeredCandidates: 45,
      status: 'scheduled',
      proctoring: {
        videoMonitoring: true,
        screenSharing: true,
        browserLock: true,
        aiDetection: true,
      },
    },
    {
      id: '2',
      title: 'Computer Science Quiz',
      subject: 'Data Structures',
      startDate: 'Jul 22, 2025 2:00 PM',
      duration: 1,
      totalCandidates: 40,
      registeredCandidates: 32,
      status: 'draft',
      proctoring: {
        videoMonitoring: true,
        screenSharing: false,
        browserLock: true,
        aiDetection: false,
      },
    },
    {
      id: '3',
      title: 'Physics Midterm',
      subject: 'Quantum Physics',
      startDate: 'Jul 16, 2025 9:00 AM',
      duration: 1.5,
      totalCandidates: 70,
      registeredCandidates: 67,
      status: 'completed',
      proctoring: {
        videoMonitoring: true,
        screenSharing: true,
        browserLock: true,
        aiDetection: true,
      },
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    startDate: '',
    duration: '',
    totalCandidates: '',
    videoMonitoring: true,
    screenSharing: true,
    browserLock: true,
    aiDetection: false,
  });

  const handleCreateExam = () => {
    setSelectedExam(null);
    setFormData({
      title: '',
      subject: '',
      startDate: '',
      duration: '',
      totalCandidates: '',
      videoMonitoring: true,
      screenSharing: true,
      browserLock: true,
      aiDetection: false,
    });
    setDialogOpen(true);
  };

  const handleEditExam = (exam: Exam) => {
    setSelectedExam(exam);
    setFormData({
      title: exam.title,
      subject: exam.subject,
      startDate: exam.startDate,
      duration: exam.duration.toString(),
      totalCandidates: exam.totalCandidates.toString(),
      videoMonitoring: exam.proctoring.videoMonitoring,
      screenSharing: exam.proctoring.screenSharing,
      browserLock: exam.proctoring.browserLock,
      aiDetection: exam.proctoring.aiDetection,
    });
    setDialogOpen(true);
  };

  const handleSaveExam = () => {
    const examData: Exam = {
      id: selectedExam?.id || Date.now().toString(),
      title: formData.title,
      subject: formData.subject,
      startDate: formData.startDate,
      duration: parseFloat(formData.duration),
      totalCandidates: parseInt(formData.totalCandidates),
      registeredCandidates: selectedExam?.registeredCandidates || 0,
      status: selectedExam?.status || 'draft',
      proctoring: {
        videoMonitoring: formData.videoMonitoring,
        screenSharing: formData.screenSharing,
        browserLock: formData.browserLock,
        aiDetection: formData.aiDetection,
      },
    };

    if (selectedExam) {
      setExams(exams.map(exam => exam.id === selectedExam.id ? examData : exam));
    } else {
      setExams([...exams, examData]);
    }

    setDialogOpen(false);
  };

  const handleDeleteExam = (examId: string) => {
    setExams(exams.filter(exam => exam.id !== examId));
  };

  const handleStartExam = (examId: string) => {
    setExams(exams.map(exam => 
      exam.id === examId ? { ...exam, status: 'ongoing' as const } : exam
    ));
  };

  const handleViewExam = (examId: string) => {
    console.log('View exam:', examId);
  };

  return (
    <Layout title="Procto - Exam Management">
      <Stack spacing={3}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Exam Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Create, schedule, and manage your exams
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreateExam}
            sx={{ minWidth: 140 }}
          >
            Create Exam
          </Button>
        </Stack>

        {/* Stats */}
        <Paper sx={{ p: 3 }}>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3}
            divider={<Box sx={{ width: 1, height: 1, bgcolor: 'divider' }} />}
          >
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold" color="primary.main">
                {exams.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Exams
              </Typography>
            </Box>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold" color="success.main">
                {exams.filter(e => e.status === 'ongoing').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active
              </Typography>
            </Box>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold" color="warning.main">
                {exams.filter(e => e.status === 'scheduled').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Scheduled
              </Typography>
            </Box>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold" color="info.main">
                {exams.reduce((sum, exam) => sum + exam.registeredCandidates, 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Candidates
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Exams List */}
        <Stack spacing={2}>
          {exams.map((exam) => (
            <ExamCard
              key={exam.id}
              exam={exam}
              onEdit={handleEditExam}
              onDelete={handleDeleteExam}
              onStart={handleStartExam}
              onView={handleViewExam}
            />
          ))}
        </Stack>

        {/* Create/Edit Exam Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            {selectedExam ? 'Edit Exam' : 'Create New Exam'}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="Exam Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  fullWidth
                />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="Start Date & Time"
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Duration (hours)"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="Total Candidates"
                  type="number"
                  value={formData.totalCandidates}
                  onChange={(e) => setFormData({ ...formData, totalCandidates: e.target.value })}
                  fullWidth
                />
              </Stack>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Proctoring Settings
                </Typography>
                <Stack spacing={1}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.videoMonitoring}
                        onChange={(e) => setFormData({ ...formData, videoMonitoring: e.target.checked })}
                      />
                    }
                    label="Video Monitoring"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.screenSharing}
                        onChange={(e) => setFormData({ ...formData, screenSharing: e.target.checked })}
                      />
                    }
                    label="Screen Sharing"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.browserLock}
                        onChange={(e) => setFormData({ ...formData, browserLock: e.target.checked })}
                      />
                    }
                    label="Browser Lock"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.aiDetection}
                        onChange={(e) => setFormData({ ...formData, aiDetection: e.target.checked })}
                      />
                    }
                    label="AI Detection"
                  />
                </Stack>
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveExam} variant="contained">
              {selectedExam ? 'Update' : 'Create'} Exam
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Layout>
  );
};
