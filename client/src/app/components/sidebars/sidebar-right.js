'use client'
import { Box, TextField, Typography } from "@mui/material";
import YouMayKnow from "../users/you-may-know";
import FollowUser from "../users/follow-user";

const SideBarRight = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: 'center', gap: 2, px: 2, py: 1 }}>
            <FollowUser />
            <Box>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
                    You May Know
                </Typography>
                <YouMayKnow />
            </Box>

        </Box>

    );
};

export default SideBarRight;
