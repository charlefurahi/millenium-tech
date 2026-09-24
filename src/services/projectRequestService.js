import { supabase } from './supabaseClient'

/**
 * Submit a customer project/idea request straight to Supabase.
 * Returns the created record, including its reference_number (e.g.
 * "MT-2026-0001") and status ("NEW"), on success. Works identically for
 * a guest or a logged-in customer — see database/supabase_schema.sql for how
 * submitted_by gets set automatically, and how status/priority/
 * assigned_to/internal_notes are locked to their defaults regardless of
 * what's sent here.
 *
 * Throws an Error with a `.fieldErrors` object (field -> message) when
 * basic client-side validation fails, so the form can show inline
 * messages instead of a generic failure.
 */
export async function submitProjectRequest(payload) {
  const fieldErrors = {}
  if (!payload.name || !payload.name.trim()) {
    fieldErrors.name = 'Please tell us your name.'
  }
  if (!payload.phone || payload.phone.trim().length < 7) {
    fieldErrors.phone = 'Please provide a valid phone or WhatsApp number so the team can reach you.'
  }
  if (!payload.problem_description || payload.problem_description.trim().length < 10) {
    fieldErrors.problem_description = 'Please describe the problem or idea in a bit more detail.'
  }
  if (Object.keys(fieldErrors).length) {
    const validationError = new Error('Please check the highlighted fields and try again.')
    validationError.fieldErrors = fieldErrors
    throw validationError
  }

  const { data, error } = await supabase
    .from('project_requests')
    .insert({
      name: payload.name.trim(),
      phone: payload.phone.trim(),
      email: payload.email || '',
      organization: payload.organization || '',
      project_type: payload.project_type || 'OTHER',
      problem_description: payload.problem_description.trim(),
      desired_solution: payload.desired_solution || '',
      target_users: payload.target_users || '',
      current_approach: payload.current_approach || '',
      budget_range: payload.budget_range || '',
      timeline: payload.timeline || '',
      additional_information: payload.additional_information || '',
      related_product: payload.related_product || ''
    })
    .select()
    .single()

  if (error) {
    const genericError = new Error(
      'We could not send your request right now. Please check your connection and try again, or reach us on WhatsApp.'
    )
    genericError.cause = error
    throw genericError
  }
  return data
}
