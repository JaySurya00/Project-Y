'use client';
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Avatar, CircularProgress, Alert, Button } from '@mui/material';
import axios from 'axios';

const YouMayKnow = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const res = await axios.get('/api/follows/youmayknow');
                setSuggestions(res.data.youMayKnow);
            } catch (err) {
                setError('Failed to load suggestions.');
            } finally {
                setLoading(false);
            }
        };
        fetchSuggestions();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (suggestions.length === 0) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6" color="text.secondary">
                    No suggestions available.
                </Typography>
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            {suggestions.map((person) => (
                <Card
                    key={person.id}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 1,
                        borderRadius: 1,
                    }}
                >
                    <Avatar
                        sx={{
                            bgcolor: 'primary.main',
                            mr: 2,
                            width: 40,
                            height: 40
                        }}
                    >
                        {person.first_name.charAt(0).toUpperCase()}
                    </Avatar>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography variant="h8" component="div" sx={{ fontWeight: 'bold' }}>
                            {person.first_name} {person.last_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            @{person.username}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {person.email}
                        </Typography>
                    </CardContent>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => console.log(`Follow ${person.username}`)}
                        sx={{
                            textTransform: 'none',
                            borderRadius: '20px',
                            px: 3,
                            py: 1,
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            },
                        }}
                    >
                        Follow
                    </Button>
                </Card>
            ))}
        </Box>
    );
};

export default YouMayKnow;
