import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#2e7d32',
        color: 'white',
        py: 2,
        textAlign: 'center',
        mt: 'auto'
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Tag-Along Events. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;