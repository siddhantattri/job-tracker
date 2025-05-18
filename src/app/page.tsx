// src\app\page.tsx
'use client';

import Link from 'next/link';
import { Button, Box, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        p: 4,
      }}
    >
      <Typography variant="h4">Welcome to Job Tracker</Typography>
      <Link href="/jobs" passHref legacyBehavior>
        <Button variant="contained" size="large">
          Go to Jobs
        </Button>
      </Link>
    </Box>
  );
}
