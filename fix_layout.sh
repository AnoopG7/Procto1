#!/bin/bash

# Script to remove Layout imports and wrappers from all files

FILES=(
  "src/pages/Reports.tsx"
  "src/pages/Schedule/ExamSchedulePage.tsx"
  "src/pages/Student/StudentProfile.tsx"
  "src/pages/Student/StudentExamHistory.tsx"
  "src/pages/Student/StudentExamSetup.tsx"
  "src/pages/Student/StudentDashboard.tsx"
  "src/pages/Student/StudentSettings.tsx"
  "src/pages/Student/StudentAnalytics.tsx"
  "src/pages/Admin/AdminCreateExam.tsx"
  "src/pages/Admin/AdminExamProctor.tsx"
  "src/pages/Admin/AnalyticsPage.tsx"
  "src/pages/Admin/ExamSchedulePage.tsx"
  "src/pages/Admin/AdminUserManagement.tsx"
  "src/pages/Admin/AdminSystemSettings.tsx"
  "src/pages/Admin/ExamManagement.tsx"
  "src/pages/Admin/AdminDashboard.tsx"
  "src/pages/System/SystemSettingsPage.tsx"
  "src/pages/Profile/ProfilePage.tsx"
  "src/pages/Proctorer/ProctororExamReports.tsx"
  "src/pages/Proctorer/ProctororAnalytics.tsx"
  "src/pages/Proctorer/ProctororProfile.tsx"
  "src/pages/Proctorer/ProctororSettings.tsx"
  "src/pages/Proctorer/ProctororDashboard.tsx"
  "src/pages/Proctorer/ProctororExamPage.tsx"
  "src/pages/Exam/ExamManagement.tsx"
  "src/pages/LiveMonitoring.tsx"
  "src/pages/Notifications/NotificationsPage.tsx"
  "src/pages/Help/HelpPage.tsx"
  "src/pages/Analytics/AnalyticsPage.tsx"
)

for file in "${FILES[@]}"; do
  echo "Processing $file..."
  
  # Remove Layout imports
  sed -i '' '/import.*Layout.*from.*components\/layout/d' "$file"
  
  # Replace Layout wrapper with div/fragment
  sed -i '' 's/<Layout[^>]*>/<>/g' "$file"
  sed -i '' 's/<LayoutWithoutSidebar[^>]*>/<>/g' "$file"
  sed -i '' 's/<\/Layout>/<\/>/g' "$file"
  sed -i '' 's/<\/LayoutWithoutSidebar>/<\/>/g' "$file"
  
  echo "Processed $file"
done

echo "All files processed!"
