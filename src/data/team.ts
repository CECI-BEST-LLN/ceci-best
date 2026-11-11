// Board members. TODO: placeholder content — add real names and photos.
// Put photos in /public/team/ and reference them as "team/name.jpg".

export interface Member {
  name: string
  role: string
  study?: string
  photo?: string
}

export const team: Member[] = [
  { name: 'First Last', role: 'President', study: 'Civil Engineering' },
  { name: 'First Last', role: 'Vice-President', study: 'Computer Science' },
  { name: 'First Last', role: 'Treasurer', study: 'Mechanical Engineering' },
  { name: 'First Last', role: 'Secretary', study: 'Electrical Engineering' },
  { name: 'First Last', role: 'Corporate Relations', study: 'Chemical Engineering' },
  { name: 'First Last', role: 'Public Relations', study: 'Architecture' },
  { name: 'First Last', role: 'Human Resources', study: 'Biomedical Engineering' },
  { name: 'First Last', role: 'IT', study: 'Computer Science' },
]
