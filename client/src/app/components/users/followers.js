'use client';
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Avatar, CircularProgress, Alert, Button } from '@mui/material';
import axios from 'axios';

const Followers = () => {
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getFollowers = async () => {
            try {
                const res = await axios.get('/api/follows/followers');
                console.log(res.data);
                setFollowers(res.data.followers);
            } catch (err) {
                setError('Failed to load followees.');
            } finally {
                setLoading(false);
            }
        };
        getFollowers();
    }, []);

    const removeFollower= async(username)=>{
        try {
            const res = await axios.post('/api/follows/remove', { username });
            // Update the UI by removing the unfollowed user from the list
            setFollowers((prevFollowers) => prevFollowers.filter(follower => follower.username !== username));
        } catch (err) {
            console.error('Failed to unfollow the user:', err);
            // Optionally, you can set an error state to display a message to the user
            setError('Failed to unfollow the user.');
        }
    }

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
            {followers.map((follower) => (
                <Card
                    key={follower.id}
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
                        {follower.first_name.charAt(0).toUpperCase()}
                    </Avatar>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                            {follower.first_name} {follower.last_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            @{follower.username}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {follower.email}
                        </Typography>
                    </CardContent>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => removeFollower(follower.username)}
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
                        Remove
                    </Button>
                </Card>
            ))}
        </Box>
    );
};

export default Followers;
