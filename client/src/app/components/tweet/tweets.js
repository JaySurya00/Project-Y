import React from 'react';
import Image from 'next/image';

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  CardMedia,
  Box
} from '@mui/material';
import { blue } from '@mui/material/colors';

const Tweets = ({ tweet }) => {
  const { _id, username, body, media_file_url, created_at } = tweet;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card sx={{ margin: 'auto', bgcolor: 'background.paper' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }}>
            {username.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={username}
        subheader={formatDate(created_at)}
      />
      <CardContent>
        <Typography variant="body1" color="textPrimary">
          {body}
        </Typography>
      </CardContent>
      {media_file_url && (
        <Box sx={{marginLeft: 4}}>
          <Image
            src={media_file_url}
            height={500}
            width={500}
            objectFit="cover" // Handle how the image should fit within its container
            alt="Tweet media"
          />
        </Box>
      )}
    </Card>
  );
};


export default Tweets;
