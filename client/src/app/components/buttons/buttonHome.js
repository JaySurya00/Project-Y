import { Button } from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useRouter } from "next/navigation";

const HomeButton = () => {
    const router = useRouter();

    const handleHomeClick = () => {
        router.push('/home');
    };

    return (
        <Button
            onClick={handleHomeClick}
            startIcon={<HomeOutlinedIcon />}
            sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                padding: '6px 16px',
                display:'flex',
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                    backgroundColor: 'primary.dark',
                },
            }}
        >
            Home
        </Button>
    );
};

export default HomeButton;
