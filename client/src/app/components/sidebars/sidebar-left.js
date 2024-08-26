'use client'
import { Box } from "@mui/material";
import UserProfile from "../users/user-profile";
import HomeButton from "../buttons/buttonHome";
import Tweet from "../tweet";

const SideBarLeft = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center', gap: 2, px:2, py:1}}>
            <HomeButton />
            <Tweet />
            <Box sx={{ alignSelf: 'flex-start', width: '100%' }}>
                <UserProfile />
            </Box>
        </Box>
    );
};

export default SideBarLeft;
