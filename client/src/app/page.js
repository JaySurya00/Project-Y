'use client';
import * as React from 'react';
import { Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Snackbar } from '@mui/material';
import useRequest from './hooks/use-request';
import { useRouter } from 'next/navigation';
import { useUserContext } from './context/userContext';

export default function SignIn() {
  const [open, setOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const { getUser } = useUserContext(); // Fetch user context

  const router = useRouter();

  const { doRequest, errors } = useRequest({
    url: '/api/users/signin/',
    method: 'post',
    onSuccess: () => {
      getUser(); // Update user context after sign-in
      setOpen(true); // Open success Snackbar
      setTimeout(() => {
        router.push('/home'); // Redirect to home after 1 second
      }, 1000);
    },
    onError: () => {
      setErrorOpen(true); // Open error Snackbar on sign-in failure
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    await doRequest({ username, password });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Welcome To miniX
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="outlined"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" color="secondary">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2" color="secondary">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {errors && errors} {/* Display request errors if any */}
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message="Signin Complete"
      />
      <Snackbar
        open={errorOpen}
        autoHideDuration={3000}
        onClose={() => setErrorOpen(false)}
        message="Signin Failed"
      />
    </>
  );
}
