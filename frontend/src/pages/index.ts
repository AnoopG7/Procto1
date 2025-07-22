// Admin pages
export { AdminDashboard } from './Admin/Dashboard';
export { AdminCreateExam } from './Admin/AdminCreateExam';
export { AdminExamProctor } from './Admin/AdminExamProctor';
export { AdminExamManagement } from './Admin/AdminExamManagement';
export { AdminAnalytics } from './Admin/AdminAnalytics';
export { AdminUserManagement } from './Admin/AdminUserManagement';
export { AdminSystemSettings } from './Admin/AdminSystemSettings';

// Student pages
export { StudentDashboard } from './Student/StudentDashboard';
export { StudentExamSetup } from './Student/StudentExamSetup';
export { StudentExam } from './Student/StudentExam';
export { StudentExamTaking } from './Student/StudentExamTaking';
export { StudentProfile } from './Student/StudentProfile';
export { StudentExamHistory } from './Student/StudentExamHistory';
export { StudentSettings } from './Student/StudentSettings';
export { StudentAnalytics } from './Student/StudentAnalytics';

// Proctorer pages
export { ProctororDashboard } from './Proctorer/ProctororDashboard';
export { ProctororExamPage } from './Proctorer/ProctororExamPage';
export { ProctororExamMonitoring } from './Proctorer/ProctororExamMonitoring';
export { ProctororProfile } from './Proctorer/ProctororProfile';
export { ProctororExamReports } from './Proctorer/ProctororExamReports';
export { ProctororSettings } from './Proctorer/ProctororSettings';
export { ProctororAnalytics } from './Proctorer/ProctororAnalytics';

// Shared/Legacy pages (to be moved/deprecated)
export { Reports } from './Reports';
export { Candidates } from './Candidates';
export { ProfilePage } from './Profile/ProfilePage';
export { SystemSettingsPage } from './System/SystemSettingsPage';
export { HelpPage } from './Public/HelpPage';
export { NotificationsPage } from './Notifications/NotificationsPage';
export { ExamSchedulePage } from './Admin/ExamSchedulePage';

// Login pages
export { default as SignIn } from './Login/Signin';
export { default as SignUp } from './Login/Signup';
export { default as Verify } from './Login/Verify';

// Public pages
export { HomePage } from './Public/HomePage';
export { FAQPage } from './Public/FAQPage';
export { PrivacyPolicyPage } from './Public/PrivacyPolicyPage';
export { ContactPage } from './Public/ContactPage';
export { default as NotFoundPage } from './Public/NotFoundPage';
