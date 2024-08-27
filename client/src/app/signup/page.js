'use client'
import { Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Snackbar, Alert } from '@mui/material';
import useRequest from '../hooks/use-request';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUserContext } from '../context/userContext';

export default function SignUp() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const {getUser}= useUserContext();

    const { doRequest, errors } = useRequest({
        url: '/api/users/',
        method: 'POST',
        onSuccess: async() => {
            setOpen(true);
            await getUser();
            setTimeout(() => {
                router.push('/home');
            }, 1000);
        },
        onError: () => {
            setErrorOpen(true);
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const first_name = data.get('first_name');
        const last_name = data.get('last_name');
        const username = data.get('username');
        const email = data.get('email');
        const password = data.get('password');

        await doRequest({ first_name, last_name, username, email, password });
    };

    return (
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
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="first_name"
                                required
                                fullWidth
                                id="first_name"
                                label="First Name"
                                autoFocus
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="last_name"
                                label="Last Name"
                                name="last_name"
                                autoComplete="family-name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {errors && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {errors}
                </Alert>
            )}
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message="Signup Complete"
            />
            <Snackbar
                open={errorOpen}
                autoHideDuration={3000}
                onClose={() => setErrorOpen(false)}
                message="Signup Failed"
            />
        </Container>
    );
}
