'use client'
import { Box, Button, Typography } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import Person2Icon from '@mui/icons-material/Person2';
import Post from "./post";

const SideBarLeft = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pl: 4, pt: 4 }}>
            <Button 
                startIcon={<HomeOutlinedIcon />} 
                sx={{ 
                    justifyContent: 'flex-start', 
                    textTransform: 'none', 
                    fontWeight: 'bold', 
                    color: 'text.primary', 
                    '&:hover': { backgroundColor: 'action.hover' } 
                }}
            >
                Home
            </Button>
            <Button 
                startIcon={<SearchOutlinedIcon />} 
                sx={{ 
                    justifyContent: 'flex-start', 
                    textTransform: 'none', 
                    fontWeight: 'bold', 
                    color: 'text.primary', 
                    '&:hover': { backgroundColor: 'action.hover' } 
                }}
            >
                Explore
            </Button>
            <Button 
                startIcon={<MessageOutlinedIcon />} 
                sx={{ 
                    justifyContent: 'flex-start', 
                    textTransform: 'none', 
                    fontWeight: 'bold', 
                    color: 'text.primary', 
                    '&:hover': { backgroundColor: 'action.hover' } 
                }}
            >
                Message
            </Button>
            <Button 
                startIcon={<Person2Icon />} 
                sx={{ 
                    justifyContent: 'flex-start', 
                    textTransform: 'none', 
                    fontWeight: 'bold', 
                    color: 'text.primary', 
                    '&:hover': { backgroundColor: 'action.hover' } 
                }}
            >
                Profile
            </Button>
            <Box sx={{ mt: 4 }}>
                <Post />
            </Box>
        </Box>
    )
}

export default SideBarLeft;
