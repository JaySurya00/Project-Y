'use client';
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Avatar, CircularProgress, Alert, Button } from '@mui/material';
import axios from 'axios';

const Followees = () => {
    const [followees, setFollowees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getFollowees = async () => {
            try {
                const res = await axios.get('/api/follows/followees');
                console.log(res.data);
                setFollowees(res.data.followees);
            } catch (err) {
                setError('Failed to load followees.');
            } finally {
                setLoading(false);
            }
        };
        getFollowees();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            {followees.map((followee) => (
                <Card
                    key={followee.id}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 2,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: 2,
                        transition: 'transform 0.2s',
                        '&:hover': {
                            transform: 'scale(1.02)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                        },
                    }}
                >
                    <Avatar
                        sx={{
                            bgcolor: 'primary.main',
                            mr: 2,
                            width: 56,
                            height: 56
                        }}
                    >
                        {followee.first_name.charAt(0).toUpperCase()}
                    </Avatar>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                            {followee.first_name} {followee.last_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            @{followee.username}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {followee.email}
                        </Typography>
                    </CardContent>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => console.log(followee.username)}
                        sx={{
                            textTransform: 'none',
                            borderRadius: '20px',
                            px: 3,
                            py: 1,
                            borderColor: 'secondary.main',
                            '&:hover': {
                                backgroundColor: 'secondary.light',
                                borderColor: 'secondary.dark',
                            },
                        }}
                    >
                        Unfollow
                    </Button>
                </Card>
            ))}
        </Box>
    );
};

export default Followees;
