// Simple illustration placeholder component
import React from 'react';
import { Box } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

interface UploadIllustrationProps {
  hideBackground?: boolean;
  sx?: SxProps<Theme>;
}

export function UploadIllustration({ hideBackground, sx }: UploadIllustrationProps) {
  return (
    <Box
      sx={{
        width: 200,
        height: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: hideBackground ? 'transparent' : 'grey.100',
        borderRadius: 1,
        border: '2px dashed',
        borderColor: 'grey.300',
        ...sx,
      }}
    >
      📁
    </Box>
  );
}
