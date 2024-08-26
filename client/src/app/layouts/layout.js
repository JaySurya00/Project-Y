import { Box, Divider } from '@mui/material';
import SideBarLeft from '../components/sidebars/sidebar-left';
import SideBarRight from '../components/sidebars/sidebar-right';

export default function Home({children}) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, // Defines three columns layout
        height: '100vh',
        gap: 2, // Adjust gap between columns if needed
        p: 2
      }}
    >
      <Box
        sx={{
          gridColumn: { xs: '1 / -1', md: '1 / 2' }, // Adjusts column span for different screen sizes
          backgroundColor: 'background.paper',
          paddingLeft: 10,
        }}
      >
        <SideBarLeft />
      </Box>

      <Box
        sx={{
          gridColumn: { xs: '1 / -1', md: '2 / 3' }, // Adjusts column span for different screen sizes
          backgroundColor: 'background.default',
          paddingX: 2, // Adds horizontal padding
          borderLeft: '1px solid', // Adds left border
          borderRight: '1px solid', // Adds right border
          borderColor: 'divider', // Border color
        }}
      >
        {children}
      </Box>

      <Box
        sx={{
          gridColumn: { xs: '1 / -1', md: '3 / 4' }, // Adjusts column span for different screen sizes
          backgroundColor: 'background.paper',
          paddingRight: 10,
        }}
      >
        {/* Empty sidebar or additional content */}
        <SideBarRight />
      </Box>
    </Box>
  );
}
