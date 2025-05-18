// src\context\JobsContext.tsx

'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
  useEffect,
} from 'react';

export interface Job {
  id: number;
  company: string;
  position: string;
  status: string;
  dateApplied: string;
  createdAt: string;
  updatedAt: string;
}

interface JobsContextType {
  jobs: Job[];
  filteredJobs: Job[];
  loading: boolean;
  error: string | null;
  fetchJobs: () => Promise<void>;
  addJob: (input: Omit<Job, 'id'|'createdAt'|'updatedAt'>) => Promise<void>;
  updateJob: (job: Job) => Promise<void>;
  deleteJob: (id: number) => Promise<void>;
  // filter/sort state:
  search: string;
  statusFilter: string;
  sortField: keyof Job;
  sortOrder: 'asc' | 'desc';
  setSearch: (s: string) => void;
  setStatusFilter: (s: string) => void;
  setSortField: (f: keyof Job) => void;
  setSortOrder: (o: 'asc'|'desc') => void;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export function JobsProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Filter & sort state
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [sortField, setSortField] = useState<keyof Job>('company');
  const [sortOrder, setSortOrder] = useState<'asc'|'desc'>('asc');

  // 1) Stable fetchJobs
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/jobs');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Job[] = await res.json();
      setJobs(data);
    } catch (e: unknown) {
      // If it really is an Error, use its message; otherwise stringify
      const message =
        e instanceof Error ? e.message : String(e);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2) CRUD ops (also stable)
  const addJob = useCallback(
    async (input: Omit<Job, 'id'|'createdAt'|'updatedAt'>) => {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      const newJob: Job = await res.json();
      setJobs((prev) => [newJob, ...prev]);
    },
    []
  );
  const updateJob = useCallback(
    async (job: Job) => {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job),
      });
      const updated: Job = await res.json();
      setJobs((prev) =>
        prev.map((j) => (j.id === updated.id ? updated : j))
      );
    },
    []
  );
  const deleteJob = useCallback(
    async (id: number) => {
      await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
      setJobs((prev) => prev.filter((j) => j.id !== id));
    },
    []
  );

  // 3) Derive filtered & sorted list
  // Derive filtered & sorted list
const filteredJobs = useMemo(() => {
    let result = [...jobs];
  
    // 1) Text search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (j) =>
          j.company.toLowerCase().includes(q) ||
          j.position.toLowerCase().includes(q)
      );
    }
  
    // 2) Status filter (case-insensitive)
    if (statusFilter) {
      const sf = statusFilter.trim().toLowerCase();
      result = result.filter((j) =>
        j.status.trim().toLowerCase() === sf
      );
    }
  
    // 3) Sort
    result.sort((a, b) => {
      const aVal = String(a[sortField]).toLowerCase();
      const bVal = String(b[sortField]).toLowerCase();
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  
    return result;
  }, [jobs, search, statusFilter, sortField, sortOrder]);
  

  // 4) Initial load once
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <JobsContext.Provider
      value={{
        jobs,
        filteredJobs,
        loading,
        error,
        fetchJobs,
        addJob,
        updateJob,
        deleteJob,
        search,
        statusFilter,
        sortField,
        sortOrder,
        setSearch,
        setStatusFilter,
        setSortField,
        setSortOrder,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  const ctx = useContext(JobsContext);
  if (!ctx) throw new Error('useJobs must be used within JobsProvider');
  return ctx;
}
