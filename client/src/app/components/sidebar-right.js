import { Box, Button, Divider, List, ListItem, ListItemText } from "@mui/material";

export default function SideBarRight() {
    return (
        <Box sx={{ padding: '1rem' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Button variant="text" sx={{ flexGrow: 1 }}>Following</Button>
                <Divider orientation="vertical" flexItem sx={{ margin: '0 1rem' }} />
                <Button variant="text" sx={{ flexGrow: 1 }}>Followers</Button>
            </Box>
            <Divider sx={{ marginBottom: '1rem' }} />
            <Box>
                <List>
                    {['Friend 1', 'Friend 2', 'Friend 3', 'Friend 4', 'Friend 5', 'Friend 6', 'Friend 7'].map((friend, index) => (
                        <ListItem key={index} sx={{ padding: '0.5rem 0' }}>
                            <ListItemText primary={friend} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
}
