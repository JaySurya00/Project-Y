'use client'
import { useState } from "react";
import { Box, Button, Modal, Typography, TextField, IconButton } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';

const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Post() {
    const [modalOpen, setModalOpen] = useState(false);
    const [tweetText, setTweetText] = useState("");
    const [tweetImage, setTweetImage] = useState(null);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const handleImageUpload = (event) => {
        setTweetImage(URL.createObjectURL(event.target.files[0]));
    };

    const handlePostTweet = () => {
        // Here you can handle the tweet submission logic
        console.log("Tweet:", tweetText);
        console.log("Image URL:", tweetImage);
        // Clear inputs after posting
        setTweetText("");
        setTweetImage(null);
        handleModalClose();
    };

    return (
        <>
            <Button variant="contained" onClick={handleModalOpen}>Post</Button>
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create a Tweet
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        placeholder="What's happening?"
                        value={tweetText}
                        onChange={(e) => setTweetText(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <IconButton component="label">
                            <ImageIcon />
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageUpload}
                            />
                        </IconButton>
                        <Button variant="contained" onClick={handlePostTweet}>Tweet</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
