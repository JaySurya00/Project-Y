'use client';
import axios from 'axios'; // Ensure Axios is imported
import { useState } from "react";
import { Box, Button, Modal, Typography, TextField, IconButton, Snackbar, Alert } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import useRequest from "../../hooks/use-request"; // Optionally use your custom hook

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
    minHeight: 300, // Ensure consistent height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
};

export default function Tweet() {
    const [modalOpen, setModalOpen] = useState(false);
    const [tweetText, setTweetText] = useState("");
    const [tweetImage, setTweetImage] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [alertMessage, setAlertMessage] = useState('Tweeted successfully!');

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const handleImageUpload = (event) => {
        setTweetImage(event.target.files[0]); // Set the file directly
    };

    const handleRemoveImage = () => {
        setTweetImage(null); // Clear the image
    };

    const handleTweetTweet = async () => {
        try {
            const formData = new FormData();
            formData.append('body', tweetText);
            if (tweetImage) {
                formData.append('image', tweetImage);
            }
            await axios.post('/api/tweets', formData);
            setAlertSeverity('success');
            setAlertMessage('Tweeted successfully!');
            setSnackbarOpen(true); // Show snackbar on success
            setTweetText("");
            setTweetImage(null);
            handleModalClose();
        } catch (err) {
            setAlertSeverity('error');
            setAlertMessage('Failed to tweet. Please try again.');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => setSnackbarOpen(false);

    return (
        <>
            <Button
                variant="contained"
                onClick={handleModalOpen}
                sx={{ textTransform: 'none' }}
            >
                Tweet
            </Button>
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
                    {tweetImage && (
                        <Box sx={{ mt: 2, position: 'relative' }}>
                            <img 
                                src={URL.createObjectURL(tweetImage)} 
                                alt="Tweet preview" 
                                style={{ 
                                    width: '200px', 
                                    height: '200px', 
                                    borderRadius: '8px', 
                                    objectFit: 'cover' 
                                }} 
                            />
                            <IconButton
                                onClick={handleRemoveImage}
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                                    color: 'white',
                                    borderRadius: '50%',
                                    p: 0.5,
                                    '&:hover': {
                                        bgcolor: 'rgba(0, 0, 0, 0.7)',
                                    },
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <IconButton component="label" sx={{ color: 'text.secondary' }}>
                            <ImageIcon />
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageUpload}
                            />
                        </IconButton>
                        <Button
                            variant="contained"
                            onClick={handleTweetTweet}
                            sx={{ textTransform: 'none' }}
                        >
                            Tweet
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={alertSeverity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
