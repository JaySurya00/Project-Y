import { Box, Button, Divider } from "@mui/material"


export default function SideBarRight() {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="text">Following</Button>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Button variant="text">Followers</Button>
            </Box>
            <Divider orientation="horizontal" variant="middle" flexItem />
            <Box>
                <p>Friend 1</p>
                <p>Friend 2</p>
                <p>Friend 3</p>
                <p>Friend 4</p>
                <p>Friend 5</p>
                <p>Friend 6</p>
                <p>Friend 7</p>
            </Box>
        </>
    )
}