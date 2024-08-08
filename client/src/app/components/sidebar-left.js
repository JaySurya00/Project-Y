'use client'
import { Box, Button, Modal, Typography } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import Person2Icon from '@mui/icons-material/Person2';
import User from "./user";
import Post from "./post";



const SideBarLeft = () => {

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", paddingLeft: '5rem', paddingTop: '3rem' }}>
            <Button><HomeOutlinedIcon />Home</Button>
            <Button><SearchOutlinedIcon />Explore</Button>
            <Button><MessageOutlinedIcon />Message</Button>
            <Button><Person2Icon />Profile</Button>
            <Post/>
            <User />
        </Box>

    )
}

export default SideBarLeft;