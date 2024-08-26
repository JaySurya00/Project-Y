'use client'
import { Avatar, Box, ListItemText, Typography, Button } from '@mui/material';
import { useUserContext } from '@/app/context/userContext';
import { blue } from '@mui/material/colors';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const UserProfile = () => {
    const { user, loading } = useUserContext();

    if (loading) {
        return <Typography variant="body1" color="text.secondary">Loading...</Typography>;
    }

    const router = useRouter();

    const handleProfileClick = () => {
        router.push(`/users/${user.currentUser.username}`);
    }

    const handleSignout = async () => {
        await axios.post('/api/users/signout');
        router.push('/'); // Redirect to home page or login page after signout
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, padding: 1.5 }}>
            <Button 
                onClick={handleProfileClick} 
                sx={{ 
                    textTransform: 'none', 
                    padding: 2, 
                    minWidth: 0, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2 
                }}
            >
                <Avatar sx={{ bgcolor: blue[500], width: 48, height: 48 }}>
                    {user?.currentUser?.username?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
                <ListItemText
                    primary={
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {`${user?.currentUser.first_name} ${user?.currentUser.last_name}`}
                        </Typography>
                    }
                    secondary={
                        <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'lowercase' }}>
                            {user?.currentUser.email}
                        </Typography>
                    }
                />
            </Button>
            <Button 
                onClick={handleSignout} 
                sx={{ 
                    textTransform: 'none', 
                    minWidth: 'auto', 
                    padding: '0.5rem 1rem', 
                    bgcolor: 'error.main', 
                    color: 'white', 
                    '&:hover': {
                        bgcolor: 'error.dark',
                    },
                    borderRadius: 2 
                }}
            >
                Sign Out
            </Button>
        </Box>
    );
};

export default UserProfile;
