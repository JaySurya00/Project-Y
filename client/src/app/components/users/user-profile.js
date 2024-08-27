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
                    padding: 1.5,
                    minWidth: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    flexShrink: 0, // Ensure the button doesn't shrink too much
                    borderRadius: 2, // Make button corners consistent
                    maxWidth: '240px', // Limit the width to keep it consistent
                    overflow: 'hidden', // Hide any overflow from long text
                }}
            >
                <Avatar sx={{ bgcolor: blue[500], width: 48, height: 48 }}>
                    {user?.currentUser?.username?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
                <ListItemText
                    primary={
                        <Typography variant="body1" sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {`${user?.currentUser.first_name} ${user?.currentUser.last_name}`}
                        </Typography>
                    }
                    secondary={
                        <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'lowercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {user?.currentUser.email}
                        </Typography>
                    }
                />
            </Button>
            <Button
                onClick={handleSignout}
                sx={{
                    textTransform: 'none',
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
