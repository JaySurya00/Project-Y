'use client';
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

const FollowUser = () => {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [userFound, setUserFound] = useState(null);
    const [error, setError] = useState(null);

    const handleFollow = async () => {
        setLoading(true);
        setError(null);
        setUserFound(null);

        try {
            const res = await axios.post('/api/follows', { username });
            if (res.data.user) {
                setUserFound(res.data.user);
            } else {
                setError('No user found with that username.');
            }
        } catch (err) {
            setError('Error occurred while trying to follow the user.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 3 }}>
            <TextField
                label="Username"
                variant="outlined"
                size='small'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ width: '300px' }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleFollow}
                sx={{ textTransform: 'none', borderRadius: '20px', px: 4 }}
            >
                {loading ? <CircularProgress size={24} /> : 'Follow'}
            </Button>

            {userFound && (
                <Typography variant="body1" color="success.main">
                    Successfully followed {userFound.first_name} {userFound.last_name} (@{userFound.username})!
                </Typography>
            )}

            {error && (
                <Alert severity="error">{error}</Alert>
            )}
        </Box>
    );
};

export default FollowUser;
