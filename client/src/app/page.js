import { Box } from "@mui/system";
import SideBarLeft from "./components/sidebar-left";
import Timeline from "./components/timeline";
import Divider from '@mui/material/Divider';
import SideBarRight from "./components/sidebar-right";



export default function Home() {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box sx={{ flexBasis: '30%', marginRight: '0.5rem' }}><SideBarLeft /></Box>
      <Divider orientation="vertical" flexItem sx={{ height: '100vh', alignSelf: 'stretch' }} />
      <Box sx={{ flexBasis: '40%', flexShrink: 0, minWidth: '25rem' }}><Timeline /></Box>
      <Divider orientation="vertical" flexItem sx={{ height: '100vh', alignSelf: 'stretch' }} />
      <Box sx={{ flexBasis: '30%', marginLeft: '0.5rem' }}><SideBarRight/></Box>
    </Box>
  );
}
