import React, { useState } from 'react';
import {
  Typography,
  Button,
  Link,
  Container,
  TextField,
  Stack,
  Paper,
  Box,
} from '@mui/material';

export default function VerifyPage() {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Verify code:', code);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: '100%',
            maxWidth: 400,
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h4" textAlign="center">
              Verify Your Email
            </Typography>
            
            <Typography variant="body2" textAlign="center" color="text.secondary">
              We sent a verification code to your email
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Verification Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  placeholder="Enter 6-digit code"
                  inputProps={{
                    maxLength: 6,
                    style: { textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem' }
                  }}
                />

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ mt: 3 }}
                >
                  Verify Email
                </Button>
              </Stack>
            </form>

            <Typography variant="body2" textAlign="center">
              Didn't receive the code?{' '}
              <Link href="#" underline="hover">
                Resend
              </Link>
            </Typography>
            
            <Typography variant="body2" textAlign="center">
              <Link href="/signin" underline="hover">
                Back to sign in
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}
