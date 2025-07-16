import {
  Typography,
  Container,
  Stack,
  Card,
  CardContent,
  Box,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  Alert,
} from '@mui/material';
import {
  Security,
  Shield,
  Lock,
  Policy,
  Update,
} from '@mui/icons-material';

export function PrivacyPolicyPage() {
  const lastUpdated = 'December 15, 2024';

  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: Policy,
      content: [
        {
          subtitle: 'Personal Information',
          text: 'We collect personal information you provide when creating an account, including name, email address, institutional affiliation, and profile information.'
        },
        {
          subtitle: 'Exam Data',
          text: 'During proctored exams, we collect video recordings, audio recordings, screen captures, keystroke patterns, and behavioral analytics to ensure exam integrity.'
        },
        {
          subtitle: 'Technical Information',
          text: 'We automatically collect device information, browser type, IP address, and usage patterns to improve our services and ensure security.'
        }
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: Shield,
      content: [
        {
          subtitle: 'Exam Proctoring',
          text: 'Collected data is used to monitor exam sessions, detect potential violations, and maintain academic integrity.'
        },
        {
          subtitle: 'Service Improvement',
          text: 'We analyze usage patterns to improve our platform, develop new features, and enhance user experience.'
        },
        {
          subtitle: 'Communication',
          text: 'We use contact information to send important updates, support responses, and service notifications.'
        }
      ]
    },
    {
      id: 'data-sharing',
      title: 'Information Sharing',
      icon: Security,
      content: [
        {
          subtitle: 'Educational Institutions',
          text: 'Exam results and proctoring reports are shared with your educational institution or exam administrator as required.'
        },
        {
          subtitle: 'Service Providers',
          text: 'We may share data with trusted third-party service providers who assist in delivering our services, subject to strict confidentiality agreements.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose information when required by law, court order, or to protect our rights and safety.'
        }
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Lock,
      content: [
        {
          subtitle: 'Encryption',
          text: 'All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption standards.'
        },
        {
          subtitle: 'Access Controls',
          text: 'We implement strict access controls, multi-factor authentication, and regular security audits to protect your data.'
        },
        {
          subtitle: 'Data Centers',
          text: 'Our data is stored in SOC 2 Type II certified data centers with physical and network security measures.'
        }
      ]
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      icon: Update,
      content: [
        {
          subtitle: 'Exam Recordings',
          text: 'Video and audio recordings are retained for 90 days by default, or as specified by your institution\'s policy.'
        },
        {
          subtitle: 'Account Data',
          text: 'Personal account information is retained while your account is active and for a reasonable period thereafter.'
        },
        {
          subtitle: 'Analytics Data',
          text: 'Aggregated and anonymized analytics data may be retained for service improvement purposes.'
        }
      ]
    }
  ];

  const rights = [
    'Access and review your personal information',
    'Request correction of inaccurate data',
    'Request deletion of your data (subject to legal and contractual obligations)',
    'Object to processing of your data',
    'Request data portability',
    'Withdraw consent where processing is based on consent'
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Stack spacing={4} textAlign="center">
            <Typography variant="h2" fontWeight={600}>
              Privacy Policy
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </Typography>
            <Chip
              label={`Last updated: ${lastUpdated}`}
              sx={{ bgcolor: 'white', color: 'primary.main', fontWeight: 600, mx: 'auto' }}
            />
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack spacing={6}>
          {/* Overview Alert */}
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            <Typography variant="body1">
              This Privacy Policy explains how Procto collects, uses, and protects your information 
              when you use our online proctoring services. By using our platform, you agree to the 
              collection and use of information in accordance with this policy.
            </Typography>
          </Alert>

          {/* Main Sections */}
          {sections.map((section) => (
            <Card key={section.id} sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={3}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex'
                      }}
                    >
                      <section.icon />
                    </Box>
                    <Typography variant="h4" fontWeight={600}>
                      {section.title}
                    </Typography>
                  </Stack>

                  <Stack spacing={3}>
                    {section.content.map((item, itemIndex) => (
                      <Box key={itemIndex}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                          {item.subtitle}
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.7, color: 'text.secondary' }}>
                          {item.text}
                        </Typography>
                        {itemIndex < section.content.length - 1 && (
                          <Divider sx={{ mt: 2 }} />
                        )}
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}

          {/* Your Rights Section */}
          <Card sx={{ borderRadius: 2 }}>
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={3}>
                <Typography variant="h4" fontWeight={600}>
                  Your Rights
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.7, color: 'text.secondary' }}>
                  Depending on your location, you may have certain rights regarding your personal information:
                </Typography>
                <List>
                  {rights.map((right, index) => (
                    <ListItem key={index} sx={{ pl: 0 }}>
                      <ListItemText
                        primary={right}
                        sx={{
                          '& .MuiListItemText-primary': {
                            fontWeight: 500
                          }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
                <Alert severity="info">
                  <Typography variant="body2">
                    To exercise any of these rights, please contact us at privacy@procto.com. 
                    We will respond to your request within 30 days.
                  </Typography>
                </Alert>
              </Stack>
            </CardContent>
          </Card>

          {/* Cookies Section */}
          <Card sx={{ borderRadius: 2 }}>
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={3}>
                <Typography variant="h4" fontWeight={600}>
                  Cookies and Tracking
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.7, color: 'text.secondary' }}>
                  We use cookies and similar tracking technologies to enhance your experience, 
                  analyze usage patterns, and maintain security. Essential cookies are necessary 
                  for the platform to function, while optional cookies help us improve our services.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.7, color: 'text.secondary' }}>
                  You can control cookie preferences through your browser settings, though disabling 
                  essential cookies may affect platform functionality.
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card sx={{ bgcolor: 'grey.50', borderRadius: 2 }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Stack spacing={3}>
                <Typography variant="h5" fontWeight={600}>
                  Questions About This Policy?
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  If you have any questions about this Privacy Policy or our data practices, 
                  please contact our Privacy Team.
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2">
                    <strong>Email:</strong> privacy@procto.com
                  </Typography>
                  <Typography variant="body2">
                    <strong>Address:</strong> 123 Privacy Street, Data City, DC 12345
                  </Typography>
                  <Typography variant="body2">
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {/* Updates Notice */}
          <Alert severity="warning" sx={{ borderRadius: 2 }}>
            <Typography variant="body1">
              <strong>Policy Updates:</strong> We may update this Privacy Policy from time to time. 
              We will notify you of any material changes by posting the new policy on this page 
              and updating the "last updated" date. Continued use of our services after changes 
              constitutes acceptance of the updated policy.
            </Typography>
          </Alert>
        </Stack>
      </Container>
    </Box>
  );
}
