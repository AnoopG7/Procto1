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
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
} from '@mui/material';
import {
  Add,
  MoreVert,
  Edit,
  Delete,
  Email,
  Phone,
  School,
  PersonAdd,
  FileUpload,
  Download,
  Search,
  FilterList,
} from '@mui/icons-material';
import { Layout } from '../components/layout';
import candidatesData from '../data/candidates.json';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  studentId: string;
  department: string;
  year: string;
  registeredExams: number;
  completedExams: number;
  averageScore: number;
  status: 'active' | 'inactive' | 'suspended';
  lastActive: string;
}

interface CandidateFormData {
  name: string;
  email: string;
  phone: string;
  studentId: string;
  department: string;
  year: string;
}

export const Candidates: React.FC = () => {
  const [data] = useState(candidatesData);
  const [candidates, setCandidates] = useState<Candidate[]>(data.candidates as Candidate[]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: 'all',
    year: 'all',
    status: 'all',
  });

  const [formData, setFormData] = useState<CandidateFormData>({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    department: '',
    year: '',
  });

  const handleCreateCandidate = () => {
    setSelectedCandidate(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      studentId: '',
      department: '',
      year: '',
    });
    setDialogOpen(true);
  };

  const handleEditCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setFormData({
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      studentId: candidate.studentId,
      department: candidate.department,
      year: candidate.year,
    });
    setDialogOpen(true);
  };

  const handleSaveCandidate = () => {
    const candidateData: Candidate = {
      id: selectedCandidate?.id || Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      studentId: formData.studentId,
      department: formData.department,
      year: formData.year,
      registeredExams: selectedCandidate?.registeredExams || 0,
      completedExams: selectedCandidate?.completedExams || 0,
      averageScore: selectedCandidate?.averageScore || 0,
      status: selectedCandidate?.status || 'active',
      lastActive: selectedCandidate?.lastActive || 'Just now',
    };

    if (selectedCandidate) {
      setCandidates(candidates.map(candidate => 
        candidate.id === selectedCandidate.id ? candidateData : candidate
      ));
    } else {
      setCandidates([...candidates, candidateData]);
    }

    setDialogOpen(false);
  };

  const handleDeleteCandidate = (candidateId: string) => {
    setCandidates(candidates.filter(candidate => candidate.id !== candidateId));
    setAnchorEl({ ...anchorEl, [candidateId]: null });
  };

  const handleMenuOpen = (candidateId: string, event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl({ ...anchorEl, [candidateId]: event.currentTarget });
  };

  const handleMenuClose = (candidateId: string) => {
    setAnchorEl({ ...anchorEl, [candidateId]: null });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'default';
      case 'suspended': return 'error';
      default: return 'default';
    }
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filters.department === 'all' || candidate.department === filters.department;
    const matchesYear = filters.year === 'all' || candidate.year === filters.year;
    const matchesStatus = filters.status === 'all' || candidate.status === filters.status;

    return matchesSearch && matchesDepartment && matchesYear && matchesStatus;
  });

  return (
    <Layout title="Procto - Candidate Management">
      <Stack spacing={3}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Candidate Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage student registrations and profiles
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button startIcon={<FileUpload />} variant="outlined">
              Import
            </Button>
            <Button startIcon={<Download />} variant="outlined">
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleCreateCandidate}
            >
              Add Candidate
            </Button>
          </Stack>
        </Stack>

        {/* Stats */}
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
                {candidates.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Candidates
              </Typography>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold" color="success.main">
                {candidates.filter(c => c.status === 'active').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active
              </Typography>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold" color="warning.main">
                {Math.round(candidates.reduce((sum, c) => sum + c.averageScore, 0) / candidates.length)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average Score
              </Typography>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold" color="info.main">
                {candidates.reduce((sum, c) => sum + c.completedExams, 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Exams Completed
              </Typography>
            </CardContent>
          </Card>
        </Stack>

        {/* Search and Filters */}
        <Paper sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <FilterList />
            <Typography variant="h6" fontWeight="bold">
              Search & Filters
            </Typography>
          </Stack>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{ flex: 2 }}
              size="small"
            />
            
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Department</InputLabel>
              <Select
                value={filters.department}
                label="Department"
                onChange={(e) => setFilters({ ...filters, department: e.target.value })}
              >
                <MenuItem value="all">All Departments</MenuItem>
                <MenuItem value="Computer Science">Computer Science</MenuItem>
                <MenuItem value="Mathematics">Mathematics</MenuItem>
                <MenuItem value="Physics">Physics</MenuItem>
                <MenuItem value="Chemistry">Chemistry</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Year</InputLabel>
              <Select
                value={filters.year}
                label="Year"
                onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              >
                <MenuItem value="all">All Years</MenuItem>
                <MenuItem value="1st Year">1st Year</MenuItem>
                <MenuItem value="2nd Year">2nd Year</MenuItem>
                <MenuItem value="3rd Year">3rd Year</MenuItem>
                <MenuItem value="4th Year">4th Year</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                label="Status"
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="suspended">Suspended</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Paper>

        {/* Candidates Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Candidate</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Academic Info</TableCell>
                <TableCell align="center">Exams</TableCell>
                <TableCell align="center">Average Score</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Last Active</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCandidates.map((candidate) => (
                <TableRow key={candidate.id} hover>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar>{candidate.name.charAt(0)}</Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {candidate.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ID: {candidate.studentId}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Email fontSize="small" color="action" />
                        <Typography variant="body2">{candidate.email}</Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Phone fontSize="small" color="action" />
                        <Typography variant="body2">{candidate.phone}</Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <School fontSize="small" color="action" />
                        <Typography variant="body2">{candidate.department}</Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        {candidate.year}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1" fontWeight="bold">
                      {candidate.completedExams}/{candidate.registeredExams}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" fontWeight="bold" color="primary.main">
                      {candidate.averageScore}%
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={candidate.status}
                      color={getStatusColor(candidate.status) as 'success' | 'default' | 'error'}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" color="text.secondary">
                      {candidate.lastActive}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(candidate.id, e)}
                    >
                      <MoreVert />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl[candidate.id]}
                      open={Boolean(anchorEl[candidate.id])}
                      onClose={() => handleMenuClose(candidate.id)}
                    >
                      <MenuItem onClick={() => {
                        handleEditCandidate(candidate);
                        handleMenuClose(candidate.id);
                      }}>
                        <Edit sx={{ mr: 1 }} fontSize="small" />
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => handleDeleteCandidate(candidate.id)} sx={{ color: 'error.main' }}>
                        <Delete sx={{ mr: 1 }} fontSize="small" />
                        Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add/Edit Candidate Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            <Stack direction="row" alignItems="center" spacing={1}>
              <PersonAdd />
              <Typography variant="h6">
                {selectedCandidate ? 'Edit Candidate' : 'Add New Candidate'}
              </Typography>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  fullWidth
                  required
                />
                <TextField
                  label="Student ID"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  fullWidth
                  required
                />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  fullWidth
                  required
                />
                <TextField
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  fullWidth
                />
              </Stack>

              <Divider />

              <Typography variant="h6" fontWeight="bold">
                Academic Information
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl fullWidth required>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={formData.department}
                    label="Department"
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    <MenuItem value="Computer Science">Computer Science</MenuItem>
                    <MenuItem value="Mathematics">Mathematics</MenuItem>
                    <MenuItem value="Physics">Physics</MenuItem>
                    <MenuItem value="Chemistry">Chemistry</MenuItem>
                    <MenuItem value="Biology">Biology</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth required>
                  <InputLabel>Year</InputLabel>
                  <Select
                    value={formData.year}
                    label="Year"
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  >
                    <MenuItem value="1st Year">1st Year</MenuItem>
                    <MenuItem value="2nd Year">2nd Year</MenuItem>
                    <MenuItem value="3rd Year">3rd Year</MenuItem>
                    <MenuItem value="4th Year">4th Year</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveCandidate} variant="contained">
              {selectedCandidate ? 'Update' : 'Add'} Candidate
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Layout>
  );
};
