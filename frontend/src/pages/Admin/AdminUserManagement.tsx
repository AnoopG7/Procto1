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
  Menu,
  MenuList,
  MenuItem as MenuItemComponent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Tabs,
  Tab,
} from '@mui/material';
import {
  People,
  PersonAdd,
  Search,
  FilterList,
  MoreVert,
  Edit,
  Delete,
  Block,
  CheckCircle,
  Cancel,
  School,
  AdminPanelSettings,
  Security,
  Download,
  Upload,
} from '@mui/icons-material';
import { useState } from 'react';
import { Layout } from '../../components/layout';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'proctorer' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  joinDate: string;
  institution: string;
  avatar?: string;
  examsCompleted?: number;
  examsProctored?: number;
}

export function AdminUserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Mock user data
  const users: User[] = [
    {
      id: 'U001',
      name: 'Alice Johnson',
      email: 'alice.johnson@university.edu',
      role: 'student',
      status: 'active',
      lastLogin: '2024-12-16',
      joinDate: '2024-09-01',
      institution: 'University of Technology',
      examsCompleted: 12
    },
    {
      id: 'U002',
      name: 'Dr. Robert Smith',
      email: 'r.smith@university.edu',
      role: 'proctorer',
      status: 'active',
      lastLogin: '2024-12-15',
      joinDate: '2024-08-15',
      institution: 'University of Technology',
      examsProctored: 45
    },
    {
      id: 'U003',
      name: 'Sarah Williams',
      email: 's.williams@admin.edu',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-12-16',
      joinDate: '2024-07-01',
      institution: 'University of Technology'
    },
    {
      id: 'U004',
      name: 'Michael Brown',
      email: 'm.brown@university.edu',
      role: 'student',
      status: 'suspended',
      lastLogin: '2024-12-10',
      joinDate: '2024-09-15',
      institution: 'University of Technology',
      examsCompleted: 8
    },
    {
      id: 'U005',
      name: 'Dr. Emily Davis',
      email: 'e.davis@university.edu',
      role: 'proctorer',
      status: 'inactive',
      lastLogin: '2024-12-01',
      joinDate: '2024-08-20',
      institution: 'University of Technology',
      examsProctored: 23
    }
  ];

  const roleColors = {
    student: 'primary',
    proctorer: 'secondary',
    admin: 'warning'
  } as const;

  const statusColors = {
    active: 'success',
    inactive: 'default',
    suspended: 'error'
  } as const;

  const roleIcons = {
    student: School,
    proctorer: Security,
    admin: AdminPanelSettings
  };

  const statusIcons = {
    active: CheckCircle,
    inactive: Cancel,
    suspended: Block
  };

  const stats = {
    total: users.length,
    students: users.filter(u => u.role === 'student').length,
    proctorers: users.filter(u => u.role === 'proctorer').length,
    admins: users.filter(u => u.role === 'admin').length,
    active: users.filter(u => u.status === 'active').length
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const tabContent = [
    { label: 'All Users', value: 'all' },
    { label: 'Students', value: 'student' },
    { label: 'Proctorers', value: 'proctorer' },
    { label: 'Admins', value: 'admin' }
  ];

  return (
    <Layout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <People />
              </Avatar>
              <Stack>
                <Typography variant="h4" fontWeight={600}>
                  User Management
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Manage students, proctorers, and administrators
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<Upload />}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                Import
              </Button>
              <Button
                variant="contained"
                startIcon={<PersonAdd />}
                onClick={() => setOpenDialog(true)}
              >
                Add User
              </Button>
            </Stack>
          </Stack>

          {/* Stats Cards */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <People />
                    </Avatar>
                    <Stack>
                      <Typography variant="h4" fontWeight={600}>
                        {stats.total}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Total Users
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
                      <School />
                    </Avatar>
                    <Stack>
                      <Typography variant="h4" fontWeight={600}>
                        {stats.students}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Students
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
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                      <Security />
                    </Avatar>
                    <Stack>
                      <Typography variant="h4" fontWeight={600}>
                        {stats.proctorers}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Proctorers
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
                      <AdminPanelSettings />
                    </Avatar>
                    <Stack>
                      <Typography variant="h4" fontWeight={600}>
                        {stats.admins}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Admins
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
                        {stats.active}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Active Users
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Filters and Tabs */}
          <Card>
            <CardContent>
              <Stack spacing={3}>
                {/* Role Tabs */}
                <Tabs
                  value={selectedTab}
                  onChange={(_, newValue) => {
                    setSelectedTab(newValue);
                    setRoleFilter(tabContent[newValue].value);
                  }}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {tabContent.map((tab) => (
                    <Tab key={tab.value} label={tab.label} />
                  ))}
                </Tabs>

                {/* Search and Filters */}
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
                  <TextField
                    placeholder="Search users..."
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
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                    <MenuItem value="suspended">Suspended</MenuItem>
                  </TextField>
                  <Button
                    variant="outlined"
                    startIcon={<FilterList />}
                    sx={{ ml: 'auto' }}
                  >
                    More Filters
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Download />}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardContent sx={{ p: 0 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Institution</TableCell>
                      <TableCell>Last Login</TableCell>
                      <TableCell>Activity</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((user) => {
                        const RoleIcon = roleIcons[user.role];
                        const StatusIcon = statusIcons[user.status];
                        return (
                          <TableRow key={user.id} hover>
                            <TableCell>
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar src={user.avatar}>
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </Avatar>
                                <Stack>
                                  <Typography variant="subtitle2" fontWeight={600}>
                                    {user.name}
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {user.email}
                                  </Typography>
                                </Stack>
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Chip
                                icon={<RoleIcon />}
                                label={user.role}
                                color={roleColors[user.role]}
                                size="small"
                                sx={{ textTransform: 'capitalize' }}
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                icon={<StatusIcon />}
                                label={user.status}
                                color={statusColors[user.status]}
                                size="small"
                                sx={{ textTransform: 'capitalize' }}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {user.institution}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {new Date(user.lastLogin).toLocaleDateString()}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {user.role === 'student' && user.examsCompleted !== undefined && (
                                <Typography variant="body2">
                                  {user.examsCompleted} exams completed
                                </Typography>
                              )}
                              {user.role === 'proctorer' && user.examsProctored !== undefined && (
                                <Typography variant="body2">
                                  {user.examsProctored} exams proctored
                                </Typography>
                              )}
                              {user.role === 'admin' && (
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                  Administrator
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell>
                              <IconButton
                                size="small"
                                onClick={handleMenuClick}
                              >
                                <MoreVert />
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
                count={filteredUsers.length}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
                rowsPerPageOptions={[5, 10, 25, 50]}
              />
            </CardContent>
          </Card>
        </Stack>

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuList>
            <MenuItemComponent onClick={handleMenuClose}>
              <Edit sx={{ mr: 1 }} /> Edit User
            </MenuItemComponent>
            <MenuItemComponent onClick={handleMenuClose}>
              <Block sx={{ mr: 1 }} /> Suspend User
            </MenuItemComponent>
            <MenuItemComponent onClick={handleMenuClose} sx={{ color: 'error.main' }}>
              <Delete sx={{ mr: 1 }} /> Delete User
            </MenuItemComponent>
          </MenuList>
        </Menu>

        {/* Add User Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <TextField fullWidth label="Full Name" />
              <TextField fullWidth label="Email Address" type="email" />
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select label="Role">
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="proctorer">Proctorer</MenuItem>
                  <MenuItem value="admin">Administrator</MenuItem>
                </Select>
              </FormControl>
              <TextField fullWidth label="Institution" />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setOpenDialog(false)}>
              Add User
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
}
