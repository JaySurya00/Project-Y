'use client'
import { Box, Button } from '@mui/material';
import SideBarLeft from '../components/sidebars/sidebar-left';
import SideBarRight from '../components/sidebars/sidebar-right';
import { useState } from 'react';
import Followees from '../components/users/followees';
import Followers from '../components/users/followers';

export default function Home({ children }) {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <Box>
      {/* Header Section with Tabs */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        {/* Tabs */}
        {/* Simplified styling and used consistent heights to avoid shifts */}
        <Button
          variant={activeTab === null ? 'contained' : 'outlined'}
          color={activeTab === null ? 'primary' : 'secondary'}
          onClick={() => setActiveTab(null)}
          sx={{
            textTransform: 'none',
            mx: 1,
            py: 1,
            px: 3,
            borderRadius: '20px',
            boxShadow: activeTab === null ? '0 3px 5px rgba(0, 0, 0, 0.2)' : 'none',
            '&:hover': {
              backgroundColor: activeTab === null ? 'primary.dark' : 'secondary.light',
            },
          }}
        >
          My Feeds
        </Button>
        <Button
          variant={activeTab === 'following' ? 'contained' : 'outlined'}
          color={activeTab === 'following' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('following')}
          sx={{
            textTransform: 'none',
            mx: 1,
            py: 1,
            px: 3,
            borderRadius: '20px',
            boxShadow: activeTab === 'following' ? '0 3px 5px rgba(0, 0, 0, 0.2)' : 'none',
            '&:hover': {
              backgroundColor: activeTab === 'following' ? 'primary.dark' : 'secondary.light',
            },
          }}
        >
          Following
        </Button>
        <Button
          variant={activeTab === 'followers' ? 'contained' : 'outlined'}
          color={activeTab === 'followers' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('followers')}
          sx={{
            textTransform: 'none',
            mx: 1,
            py: 1,
            px: 3,
            borderRadius: '20px',
            boxShadow: activeTab === 'followers' ? '0 3px 5px rgba(0, 0, 0, 0.2)' : 'none',
            '&:hover': {
              backgroundColor: activeTab === 'followers' ? 'primary.dark' : 'secondary.light',
            },
          }}
        >
          Followers
        </Button>
      </Box>

      {/* Main Content Section */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr',
          gap: 2,
          height: 'calc(100vh - 100px)',
          minHeight: '500px', // Ensure a minimum height to reduce layout shift
        }}
      >
        <Box
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 1,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            gap: 2,
          }}
        >
          <SideBarLeft />
        </Box>

        <Box
          sx={{
            backgroundColor: 'background.default',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            borderLeft: '1px solid',
            borderRight: '1px solid',
            borderColor: 'divider',
            flex: 2,
            minHeight: '300px', // Set a min-height to reduce shifts
          }}
        >
          {activeTab === null && children}
          {activeTab === 'following' && <Followees />}
          {activeTab === 'followers' && <Followers />}
        </Box>

        <Box
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 1,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            gap: 2,
          }}
        >
          <SideBarRight />
        </Box>
      </Box>
    </Box>
  );
}
