import React, { useState } from 'react';
import {
  Typography,
  Button,
  Link,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  Stack,
  Paper,
  Box,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign up:', { firstName, lastName, email, password });
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
              Sign Up
            </Typography>
            
            <Typography variant="body2" textAlign="center" color="text.secondary">
              Get started with Procto
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    label="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Stack>

                <TextField
                  fullWidth
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ mt: 3 }}
                >
                  Create Account
                </Button>
              </Stack>
            </form>

            <Typography variant="body2" textAlign="center">
              Already have an account?{' '}
              <Link href="/signin" underline="hover">
                Sign in
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}
