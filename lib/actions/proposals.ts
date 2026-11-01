'use server'

import { sql } from '@/lib/db'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function submitProposal(formData: FormData) {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) throw new Error('Unauthorized')

  const job_id = formData.get('job_id') as string
  const cover_letter = formData.get('cover_letter') as string
  const proposed_rate = parseFloat(formData.get('proposed_rate') as string)
  const currency = formData.get('currency') as string

  if (cover_letter.length < 50) {
    throw new Error('Cover letter must be at least 50 characters.')
  }

  try {
    await sql`
      INSERT INTO proposals (job_id, freelancer_id, cover_letter, proposed_rate, currency)
      VALUES (${job_id}, ${session.user.id}, ${cover_letter}, ${proposed_rate}, ${currency}::currency_type)
    `
  } catch (error: any) {
    if (error.code === '23505') { // Unique violation
      throw new Error('You have already applied to this job.')
    }
    throw new Error('Failed to submit proposal.')
  }

  revalidatePath('/dashboard/proposals')
  revalidatePath(`/jobs`)
}

export async function updateProposalStatus(proposalId: string, status: 'shortlisted' | 'accepted' | 'declined') {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) throw new Error('Unauthorized')

  // Verify the user owns the job this proposal belongs to
  const proposals = await sql`
    SELECT p.id FROM proposals p
    JOIN jobs j ON p.job_id = j.id
    WHERE p.id = ${proposalId} AND j.client_id = ${session.user.id}
  `

  if (proposals.length === 0) throw new Error('Unauthorized')

  await sql`UPDATE proposals SET status = ${status}::proposal_status WHERE id = ${proposalId}`
  
  revalidatePath('/dashboard/jobs')
  revalidatePath(`/dashboard/jobs/${proposals[0].job_id}`)
}