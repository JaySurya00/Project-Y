'use client';
import * as React from 'react';
import { Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Snackbar } from '@mui/material';
import useRequest from '../hooks/use-request';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../context/userContext';

export default function SignIn() {
    const [response, setResponse] = React.useState(null);
    const [errorOpen, setErrorOpen] = React.useState(false);
    const { getUser } = useUserContext(); // Fetch user context

    const router = useRouter();

    const { doRequest, errors } = useRequest({
        url: '/api/users/signin/',
        method: 'post',
        onSuccess: (data) => {
            setResponse(data);
        },
        onError: () => {
            setErrorOpen(true); // Open error Snackbar on sign-in failure
        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const userId = data.get('userId');
        await doRequest({ email, userId });
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
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            variant="outlined"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="userId"
                            label="userId"
                            id="userId"
                            variant="outlined"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Recover
                        </Button>
                    </Box>
                </Box>
                {errors && errors} {/* Display request errors if any */}
                {response && response}
            </Container>
        </>
    );
}
