// src\app\jobs\[id]\edit\EditJobForm.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

export interface Job {
  id: number;
  company: string;
  position: string;
  status: string;
  dateApplied: string;
}

interface EditJobFormProps {
  initialJob: Job;
}

export default function EditJobForm({ initialJob }: EditJobFormProps) {
  const router = useRouter();

  const [exists, setExists] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);
  const [company, setCompany] = useState(initialJob.company);
  const [position, setPosition] = useState(initialJob.position);
  const [status, setStatus] = useState(initialJob.status);
  const [dateApplied, setDateApplied] = useState(initialJob.dateApplied);

  useEffect(() => {
    fetch(`/api/jobs/${initialJob.id}`)
      .then((res) => {
        if (res.ok) setExists(true);
        else {
          setExists(false);
          router.replace('/jobs');
        }
      })
      .catch(() => {
        setExists(false);
        router.replace('/jobs');
      });
  }, [initialJob.id, router]);

  if (exists === null) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (exists === false) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/jobs/${initialJob.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company, position, status, dateApplied }),
    });
    setSaving(false);
    if (res.ok) router.push('/jobs');
    else {
      const err = await res.json();
      alert(`Error: ${err.error}`);
    }
  };

  if (saving) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

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
      <Typography variant="h5">Edit Job</Typography>

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
          Save
        </Button>
        <Button variant="outlined" onClick={() => router.push('/jobs')}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
