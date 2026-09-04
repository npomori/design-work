import { fieldNotes } from './field-notes'
import { allLocations } from './locations'

export interface IssueOuting {
  location: string
  participants: number
  date: string
}

export interface IssueRecordData {
  issueLabel: string
  locationCount: number
  totalParticipants: number
  outingCount: number
  latestOuting: IssueOuting | null
}

export function getIssueRecord(now = new Date()): IssueRecordData {
  const totalParticipants = fieldNotes.reduce((sum, note) => sum + note.participants, 0)
  const newestNote = [...fieldNotes].sort((a, b) => b.date.localeCompare(a.date))[0]

  return {
    issueLabel: now.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' }),
    locationCount: allLocations.length,
    totalParticipants,
    outingCount: fieldNotes.length,
    latestOuting: newestNote
      ? {
          location: newestNote.location,
          participants: newestNote.participants,
          date: newestNote.date
        }
      : null
  }
}
