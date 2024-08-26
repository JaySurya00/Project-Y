'use client'
import { Avatar, Box, ListItemText, Typography } from '@mui/material';
import { useUserContext } from '../context/userContext';
import { blue } from '@mui/material/colors';

const Profile = () => {
    const { user, loading } = useUserContext();

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: blue[500], width: 40, height: 40 }}>
                {user?.currentUser?.username?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
            <ListItemText
                primary={`${user.currentUser.first_name} ${user.currentUser.last_name}`}
                secondary={
                <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'lowercase' }}>
                    {user.currentUser.email}
                </Typography>}
            />
            {/* <Typography variant="h8" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                {user?.currentUser
                    ? `${user.currentUser.first_name} ${user.currentUser.last_name}`
                    : 'User'}
            </Typography> */}

        </Box >
    );
};

export default Profile;
