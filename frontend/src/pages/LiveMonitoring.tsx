import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Button,
  Avatar,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  LinearProgress,
  Switch,
  FormControlLabel,
  Paper,
  Divider,
} from '@mui/material';
import {
  Videocam,
  VideocamOff,
  Mic,
  MicOff,
  Warning,
  CheckCircle,
  Error,
  Person,
  ScreenShare,
  FullscreenExit,
  Flag,
  Block,
  VolumeUp,
} from '@mui/icons-material';
import { Layout } from '../components/layout';
import monitoringData from '../data/monitoring.json';

interface Candidate {
  id: string;
  name: string;
  email: string;
  status: 'connected' | 'disconnected' | 'suspicious' | 'flagged';
  videoEnabled: boolean;
  audioEnabled: boolean;
  screenSharing: boolean;
  warnings: number;
  lastActivity: string;
  suspiciousActivity: string[];
}

interface CandidateCardProps {
  candidate: Candidate;
  onViewDetails: (candidate: Candidate) => void;
  onFlag: (candidateId: string) => void;
  onBlock: (candidateId: string) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onViewDetails, onFlag, onBlock }) => {
  const getStatusColor = () => {
    switch (candidate.status) {
      case 'connected': return 'success';
      case 'disconnected': return 'default';
      case 'suspicious': return 'warning';
      case 'flagged': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = () => {
    switch (candidate.status) {
      case 'connected': return <CheckCircle />;
      case 'disconnected': return <Error />;
      case 'suspicious': return <Warning />;
      case 'flagged': return <Flag />;
      default: return <Person />;
    }
  };

  return (
    <Card sx={{ 
      border: candidate.status === 'flagged' ? 2 : 1, 
      borderColor: candidate.status === 'flagged' ? 'error.main' : 'divider' 
    }}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: `${getStatusColor()}.main` }}>
              {candidate.name.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {candidate.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {candidate.email}
              </Typography>
            </Box>
            <Chip
              icon={getStatusIcon()}
              label={candidate.status}
              color={getStatusColor()}
              variant="outlined"
              size="small"
            />
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton 
              size="small" 
              color={candidate.videoEnabled ? 'primary' : 'default'}
            >
              {candidate.videoEnabled ? <Videocam /> : <VideocamOff />}
            </IconButton>
            <IconButton 
              size="small" 
              color={candidate.audioEnabled ? 'primary' : 'default'}
            >
              {candidate.audioEnabled ? <Mic /> : <MicOff />}
            </IconButton>
            <IconButton 
              size="small" 
              color={candidate.screenSharing ? 'primary' : 'default'}
            >
              <ScreenShare />
            </IconButton>
            
            {candidate.warnings > 0 && (
              <Chip 
                label={`${candidate.warnings} warnings`} 
                color="warning" 
                size="small" 
                variant="outlined"
              />
            )}
          </Stack>

          {candidate.suspiciousActivity.length > 0 && (
            <Alert severity="warning" sx={{ fontSize: '0.75rem' }}>
              Latest: {candidate.suspiciousActivity[candidate.suspiciousActivity.length - 1]}
            </Alert>
          )}

          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => onViewDetails(candidate)}
              sx={{ flex: 1 }}
            >
              View Details
            </Button>
            <IconButton 
              size="small" 
              color="warning"
              onClick={() => onFlag(candidate.id)}
            >
              <Flag />
            </IconButton>
            <IconButton 
              size="small" 
              color="error"
              onClick={() => onBlock(candidate.id)}
            >
              <Block />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export const LiveMonitoring: React.FC = () => {
  const [data] = useState(monitoringData);
  const [candidates, setCandidates] = useState<Candidate[]>(data.candidates as Candidate[]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [autoFlag, setAutoFlag] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);

  const examInfo = data.currentExam;

  const handleViewDetails = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setDetailsDialogOpen(true);
  };

  const handleFlag = (candidateId: string) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === candidateId 
        ? { ...candidate, status: 'flagged' as const, warnings: candidate.warnings + 1 }
        : candidate
    ));
  };

  const handleBlock = (candidateId: string) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === candidateId 
        ? { ...candidate, status: 'disconnected' as const }
        : candidate
    ));
  };

  const connectedCount = candidates.filter(c => c.status === 'connected').length;
  const suspiciousCount = candidates.filter(c => c.status === 'suspicious').length;
  const flaggedCount = candidates.filter(c => c.status === 'flagged').length;

  return (
    <Layout title="Procto - Live Monitoring">
      <Stack spacing={3}>
        {/* Header */}
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Live Monitoring
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Real-time monitoring of exam session: {examInfo.title}
          </Typography>
        </Box>

        {/* Exam Status */}
        <Paper sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight="bold">
                {examInfo.title}
              </Typography>
              <Chip 
                label="LIVE" 
                color="error" 
                variant="filled"
                sx={{ fontWeight: 'bold' }}
              />
            </Stack>

            <Stack direction="row" spacing={4} alignItems="center">
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Time Remaining:
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary.main">
                  {examInfo.timeRemaining}
                </Typography>
              </Stack>
              
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Active:
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {examInfo.activeCandidates}/{examInfo.totalCandidates}
                </Typography>
              </Stack>
            </Stack>

            <Box>
              <LinearProgress 
                variant="determinate" 
                value={examInfo.progress} 
                sx={{ height: 8, borderRadius: 4 }}
              />
              <Typography variant="caption" color="text.secondary">
                {examInfo.progress}% Complete
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Statistics */}
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
              <Typography variant="h4" fontWeight="bold" color="success.main">
                {connectedCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Connected
              </Typography>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold" color="warning.main">
                {suspiciousCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Suspicious
              </Typography>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold" color="error.main">
                {flaggedCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Flagged
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold" color="info.main">
                {candidates.reduce((sum, c) => sum + c.warnings, 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Warnings
              </Typography>
            </CardContent>
          </Card>
        </Stack>

        {/* Monitoring Controls */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Monitoring Controls
          </Typography>
          <Stack direction="row" spacing={3} alignItems="center">
            <FormControlLabel
              control={
                <Switch
                  checked={autoFlag}
                  onChange={(e) => setAutoFlag(e.target.checked)}
                />
              }
              label="Auto-flag suspicious behavior"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={soundAlerts}
                  onChange={(e) => setSoundAlerts(e.target.checked)}
                />
              }
              label="Sound alerts"
            />
            <Button
              variant="outlined"
              startIcon={<VolumeUp />}
              size="small"
            >
              Announce
            </Button>
            <Button
              variant="outlined"
              startIcon={<FullscreenExit />}
              size="small"
            >
              Full Screen View
            </Button>
          </Stack>
        </Paper>

        {/* Candidates Grid */}
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Candidates ({candidates.length})
          </Typography>
          <Stack spacing={2}>
            {candidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onViewDetails={handleViewDetails}
                onFlag={handleFlag}
                onBlock={handleBlock}
              />
            ))}
          </Stack>
        </Box>

        {/* Candidate Details Dialog */}
        <Dialog 
          open={detailsDialogOpen} 
          onClose={() => setDetailsDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            Candidate Details: {selectedCandidate?.name}
          </DialogTitle>
          <DialogContent>
            {selectedCandidate && (
              <Stack spacing={3}>
                <Stack direction="row" spacing={2}>
                  <Avatar sx={{ width: 64, height: 64 }}>
                    {selectedCandidate.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">
                      {selectedCandidate.name}
                    </Typography>
                    <Typography color="text.secondary">
                      {selectedCandidate.email}
                    </Typography>
                    <Chip
                      label={selectedCandidate.status}
                      color={selectedCandidate.status === 'connected' ? 'success' : 
                             selectedCandidate.status === 'suspicious' ? 'warning' : 'error'}
                      size="small"
                    />
                  </Box>
                </Stack>

                <Divider />

                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Technical Status
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Chip
                      icon={selectedCandidate.videoEnabled ? <Videocam /> : <VideocamOff />}
                      label={selectedCandidate.videoEnabled ? 'Video On' : 'Video Off'}
                      color={selectedCandidate.videoEnabled ? 'success' : 'error'}
                      variant="outlined"
                    />
                    <Chip
                      icon={selectedCandidate.audioEnabled ? <Mic /> : <MicOff />}
                      label={selectedCandidate.audioEnabled ? 'Audio On' : 'Audio Off'}
                      color={selectedCandidate.audioEnabled ? 'success' : 'error'}
                      variant="outlined"
                    />
                    <Chip
                      icon={<ScreenShare />}
                      label={selectedCandidate.screenSharing ? 'Screen Shared' : 'Screen Not Shared'}
                      color={selectedCandidate.screenSharing ? 'success' : 'error'}
                      variant="outlined"
                    />
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Warnings ({selectedCandidate.warnings})
                  </Typography>
                  {selectedCandidate.suspiciousActivity.length > 0 ? (
                    <Stack spacing={1}>
                      {selectedCandidate.suspiciousActivity.map((activity, index) => (
                        <Alert key={index} severity="warning" sx={{ fontSize: '0.875rem' }}>
                          {activity}
                        </Alert>
                      ))}
                    </Stack>
                  ) : (
                    <Typography color="text.secondary">
                      No suspicious activity detected
                    </Typography>
                  )}
                </Box>

                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Last Activity
                  </Typography>
                  <Typography>
                    {selectedCandidate.lastActivity}
                  </Typography>
                </Box>
              </Stack>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDetailsDialogOpen(false)}>
              Close
            </Button>
            <Button 
              onClick={() => handleFlag(selectedCandidate?.id || '')}
              color="warning"
              variant="outlined"
            >
              Flag Candidate
            </Button>
            <Button 
              onClick={() => handleBlock(selectedCandidate?.id || '')}
              color="error"
              variant="contained"
            >
              Block Candidate
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Layout>
  );
};
