// // src/app/api/jobs/[id]/route.ts
// import { NextRequest, NextResponse } from 'next/server'
// import { db } from '../../../../lib/db'
// import { jobs } from '../../../../lib/db/schema'
// import { eq } from 'drizzle-orm'

// // Helper to extract params.id whether params is Promise or plain object
// // async function getId(params: unknown): Promise<string> {
// //   // await Promise.resolve(...) works if params is a Promise or a raw object
// //   const resolved = await Promise.resolve(params)
// //   return (resolved as { id: string }).id
// // }

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }      // ← now correctly typed
// ) {
//   const id = Number(params.id)
//   const [job] = await db
//     .select()
//     .from(jobs)
//     .where(eq(jobs.id, id))
//     .limit(1)

//   if (!job) {
//     return NextResponse.json({ error: 'Not found' }, { status: 404 })
//   }
//   return NextResponse.json(job)
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }      // ← same here
// ) {
//   const id = Number(params.id)
//   await db.delete(jobs).where(eq(jobs.id, id))
//   return NextResponse.json({ success: true })
// }

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }      // ← and here
// ) {
//   const id = Number(params.id)
//   const body = await req.json()
//   const [updated] = await db
//     .update(jobs)
//     .set({
//       company: body.company,
//       position: body.position,
//       status: body.status,
//       dateApplied: body.dateApplied,
//     })
//     .where(eq(jobs.id, id))
//     .returning()

//   if (!updated) {
//     return NextResponse.json({ error: 'Not found' }, { status: 404 })
//   }
//   return NextResponse.json(updated)
// }


// src/app/api/jobs/[id]/route.ts// src/app/api/jobs/[id]/route.ts
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { jobs } from '../../../../lib/db/schema'
import { eq } from 'drizzle-orm'



import { GetCallerIdentityCommand, STSClient } from '@aws-sdk/client-sts'

// fire-and-forget identity check
;(async () => {
  try {
    const sts = new STSClient({})
    const res = await sts.send(new GetCallerIdentityCommand({}))
    console.log('🔍 Lambda is running as:', res)
  } catch (e) {
    console.error('🔍 Failed to get caller identity:', e)
  }
})()




// GET /api/jobs/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // Next.js 15+: params is a Promise
) {
  const { id } = await params                // now id is typed string
  const jobId = Number(id)

  const [job] = await db
    .select()
    .from(jobs)
    .where(eq(jobs.id, jobId))
    .limit(1)

  if (!job) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(job)
}

// DELETE /api/jobs/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const jobId = Number(id)

  await db.delete(jobs).where(eq(jobs.id, jobId))
  return NextResponse.json({ success: true })
}

// PUT /api/jobs/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const jobId = Number(id)

  const body = await request.json()
  const [updated] = await db
    .update(jobs)
    .set({
      company: body.company,
      position: body.position,
      status: body.status,
      dateApplied: body.dateApplied,
    })
    .where(eq(jobs.id, jobId))
    .returning()

  if (!updated) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(updated)
}
