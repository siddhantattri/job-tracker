// src/app/api/jobs/[id]/route.ts
import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { jobs } from '../../../../lib/db/schema'
import { eq } from 'drizzle-orm'

// Helper to extract params.id whether params is Promise or plain object
async function getId(params: unknown): Promise<string> {
  // await Promise.resolve(...) works if params is a Promise or a raw object
  const resolved = await Promise.resolve(params)
  return (resolved as { id: string }).id
}

export async function DELETE(
  _req: Request,
  { params }: { params: unknown }
) {
  const id = await getId(params)
  await db.delete(jobs).where(eq(jobs.id, Number(id)))
  return NextResponse.json({ success: true })
}

export async function GET(
  _req: Request,
  { params }: { params: unknown }
) {
  const id = await getId(params)
  const [job] = await db
    .select()
    .from(jobs)
    .where(eq(jobs.id, Number(id)))
    .limit(1)
  if (!job) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(job)
}

export async function PUT(
  req: Request,
  { params }: { params: unknown }
) {
  const id = await getId(params)
  const body = await req.json()
  const [updated] = await db
    .update(jobs)
    .set({
      company: body.company,
      position: body.position,
      status: body.status,
      dateApplied: body.dateApplied,
    })
    .where(eq(jobs.id, Number(id)))
    .returning()
  if (!updated) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(updated)
}
