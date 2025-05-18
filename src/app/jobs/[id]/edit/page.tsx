// src/app/jobs/[id]/edit/page.tsx

import { redirect, notFound } from 'next/navigation'
import { db } from '../../../../lib/db'
import { jobs } from '../../../../lib/db/schema'
import EditJobForm, { Job } from './EditJobForm'
import {eq} from 'drizzle-orm'

// Optionally force fresh SSR every time:
// export const dynamic = 'force-dynamic';

interface Params {
  id: string
}

export default async function EditJobPage(
  context: { params: Promise<Params> }   // <- note: params is now a Promise
) {
  // 1) Await the params, then pull out id
  const { id } = await context.params
  const jobId = Number(id)

  // 2) Validate
  if (isNaN(jobId)) {
    return redirect('/jobs')
  }

  // 3) Fetch from DB
  const [jobRow] = await db
    .select()
    .from(jobs)
    .where(eq(jobs.id, jobId))
    .limit(1)

  if (!jobRow) {
    // Render Next.js 404 or redirect home
    notFound()
    // —or— return redirect('/jobs')
  }

  // 4) Shape the data and render the client form
  const initialJob: Job = {
    id: jobRow.id,
    company: jobRow.company,
    position: jobRow.position,
    status: jobRow.status,
    dateApplied: jobRow.dateApplied,
  }

  return <EditJobForm initialJob={initialJob} />
}
