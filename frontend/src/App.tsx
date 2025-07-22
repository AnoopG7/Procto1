import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import { 
  // Admin pages
  AdminDashboard,
  AdminCreateExam,
  AdminExamProctor,
  AdminExamManagement,
  AdminAnalytics,
  AdminUserManagement,
  AdminSystemSettings,
  // Student pages
  StudentDashboard,
  StudentExamSetup,
  StudentExam,
  StudentExamTaking,
  StudentProfile,
  StudentExamHistory,
  StudentSettings,
  StudentAnalytics,
  // Proctorer pages
  ProctororDashboard,
  ProctororExamPage,
  ProctororExamMonitoring,
  ProctororProfile,
  ProctororExamReports,
  ProctororSettings,
  ProctororAnalytics,
  // Public pages
  HomePage,
  FAQPage,
  PrivacyPolicyPage,
  ContactPage,
  // Legacy/Shared pages
  Reports, 
  Candidates,
  ProfilePage,
  SystemSettingsPage,
  HelpPage,
  NotificationsPage,
  ExamSchedulePage,
  // Auth pages
  SignIn,
  SignUp,
  Verify,
  NotFoundPage
} from './pages';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify" element={<Verify />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/exams" element={<AdminCreateExam />} />
          <Route path="/admin/exam-management" element={<AdminExamManagement />} />
          <Route path="/admin/monitoring" element={<AdminExamProctor />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/users" element={<AdminUserManagement />} />
          <Route path="/admin/settings" element={<AdminSystemSettings />} />
          <Route path="/admin/schedule" element={<ExamSchedulePage />} />
          
          {/* Student routes */}
          <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/exam-setup" element={<StudentExamSetup />} />
          <Route path="/student/exam/:id" element={<StudentExam />} />
          <Route path="/student/exam-taking/:id" element={<StudentExamTaking />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/history" element={<StudentExamHistory />} />
          <Route path="/student/settings" element={<StudentSettings />} />
          <Route path="/student/analytics" element={<StudentAnalytics />} />
          
          {/* Proctorer routes */}
          <Route path="/proctorer" element={<Navigate to="/proctorer/dashboard" replace />} />
          <Route path="/proctorer/dashboard" element={<ProctororDashboard />} />
          <Route path="/proctorer/exam/:id" element={<ProctororExamPage />} />
          <Route path="/proctorer/monitoring/:id" element={<ProctororExamMonitoring />} />
          <Route path="/proctorer/profile" element={<ProctororProfile />} />
          <Route path="/proctorer/reports" element={<ProctororExamReports />} />
          <Route path="/proctorer/settings" element={<ProctororSettings />} />
          <Route path="/proctorer/analytics" element={<ProctororAnalytics />} />
          
          {/* Legacy routes - redirect to appropriate role-based routes */}
          <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/exams" element={<Navigate to="/admin/exams" replace />} />
          <Route path="/monitoring" element={<Navigate to="/admin/monitoring" replace />} />
          <Route path="/analytics" element={<Navigate to="/admin/analytics" replace />} />
          
          {/* Shared routes */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SystemSettingsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          
          {/* 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
