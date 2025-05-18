// src\app\jobs\JobsTable.tsx
'use client';

import React from 'react';
import { Job, useJobs } from '../../context/JobsContext';
import { useRouter } from 'next/navigation';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Typography
} from '@mui/material';

export default function JobsTable() {
  const router = useRouter();
  const {
    filteredJobs,
    loading,
    error,
    deleteJob,
    search,
    statusFilter,
    sortField,
    sortOrder,
    setSearch,
    setStatusFilter,
    setSortField,
    setSortOrder,
  } = useJobs();

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    await deleteJob(id);
  };

  // const handleSortFieldChange = (e: SelectChangeEvent<keyof Job>) => {
  //   setSortField(e.target.value);
  // };
  
  const handleEdit = (id: number) => {
    router.push(`/jobs/${id}/edit`);
  };

  // 1) Loading & error
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>
        {error}
      </Typography>
    );
  }

  // 2) Render filters + table
  return (
    
    
    <Box sx={{ px: 2 }}>
      {/* Filter & Sort */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center',
          mb: 3,
        }}
      >
        <TextField
          label="Search"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="applied">Applied</MenuItem>
            <MenuItem value="interview">Interview</MenuItem>
            <MenuItem value="offer">Offer</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            label="Sort By"
            value={sortField}
            onChange={e => setSortField(e.target.value as keyof Job)}
          >
            <MenuItem value="company">Company</MenuItem>
            <MenuItem value="position">Position</MenuItem>
            <MenuItem value="status">Status</MenuItem>
            <MenuItem value="dateApplied">Date Applied</MenuItem>
          </Select>
        </FormControl>

        <Button
          size="small"
          variant="outlined"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
        </Button>
      </Box>

      {/* Table */}
      <Box sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date Applied</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.position}</TableCell>
                  <TableCell>{job.status}</TableCell>
                  <TableCell>{job.dateApplied}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleEdit(job.id)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(job.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No jobs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Box>
    
  
  );
}
