// src/app/api/jobs/route.ts
import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { jobs } from '../../../lib/db/schema';
import {  desc } from 'drizzle-orm';
// GET /api/jobs
export async function GET() {
  const allJobs = await db.select().from(jobs).orderBy(desc(jobs.createdAt));
  return NextResponse.json(allJobs);
}

// POST /api/jobs
export async function POST(request: Request) {
  const { company, position, status, dateApplied } = await request.json();

  if (!company || !position || !status || !dateApplied) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  const [newJob] = await db
    .insert(jobs)
    .values({ company, position, status, dateApplied })
    .returning();

  return NextResponse.json(newJob, { status: 201 });
}
