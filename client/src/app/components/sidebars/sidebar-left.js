'use client'
import { Box } from "@mui/material";
import UserProfile from "../users/user-profile";
import Tweet from "../tweet/tweet";

const SideBarLeft = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center', gap: 2, px:2, py:1}}>
            <Tweet />
            <Box sx={{ alignSelf: 'flex-start', width: '100%' }}>
                <UserProfile />
            </Box>
        </Box>
    );
};

export default SideBarLeft;
