// src\app\jobs\page.tsx


'use client';

import JobsTable from './JobsTable';
// import { JobsProvider } from '../../context/JobsContext';
import Link from 'next/link';
import { Box, Button, Typography } from '@mui/material';

export default function JobsPage() {
  return (
    //  <JobsProvider>
      <Box sx={{ p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <Typography variant="h4">My Jobs</Typography>
          <Link href="/jobs/new" passHref legacyBehavior>
            <Button variant="contained">Add New Job</Button>
          </Link>
        </Box>

        <JobsTable />
      </Box>
    // </JobsProvider>
  );
}
