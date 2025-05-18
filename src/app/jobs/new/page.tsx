// src\app\jobs\new\page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

export default function NewJobPage() {
  const router = useRouter();
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('');
  const [dateApplied, setDateApplied] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company, position, status, dateApplied }),
    });
    if (res.ok) {
      
      router.push('/jobs');
      
    } else {
      alert('Failed to create job');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h5">Create New Job</Typography>

      <TextField
        label="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />

      <TextField
        label="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        required
      />

      <FormControl required>
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="applied">Applied</MenuItem>
          <MenuItem value="interview">Interview</MenuItem>
          <MenuItem value="offer">Offer</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Date Applied"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={dateApplied}
        onChange={(e) => setDateApplied(e.target.value)}
        required
      />

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button type="submit" variant="contained">
          Create
        </Button>
        <Button variant="outlined" onClick={() => router.push('/jobs')}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
