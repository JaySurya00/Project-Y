import { Box } from "@mui/system";
import SideBarLeft from "../components/sidebar-left";
import Timeline from "../components/timeline";
import Divider from '@mui/material/Divider';
import SideBarRight from "../components/sidebar-right";

export default function Home() {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", height: '100vh' }}>
      <Box 
        sx={{ 
          flexBasis: { xs: '25%', md: '20%' }, 
          p: 2, 
          borderRight: '1px solid', 
          borderColor: 'divider',
          minWidth: { xs: '15rem', md: '20rem' },
          backgroundColor: 'background.paper'
        }}>
        <SideBarLeft />
      </Box>
      <Box 
        sx={{ 
          flexBasis: { xs: '50%', md: '60%' }, 
          p: 2, 
          flexGrow: 1, 
          backgroundColor: 'background.default',
          minWidth: { xs: '20rem', md: '35rem' }
        }}>
        <Timeline />
      </Box>
      <Box 
        sx={{ 
          flexBasis: { xs: '25%', md: '20%' }, 
          p: 2, 
          borderLeft: '1px solid', 
          borderColor: 'divider',
          minWidth: { xs: '15rem', md: '20rem' },
          backgroundColor: 'background.paper'
        }}>
        <SideBarRight />
      </Box>
    </Box>
  );
}
