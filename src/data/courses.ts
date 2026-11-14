import type { ExternalLink } from './types.ts'

export interface CourseEdition {
  /** URL segment: /summer-course/<year> */
  year: string
  /** Course theme, if announced */
  theme?: string
  teacher?: string
  intro?: string[]
  /** Documents & forms for participants */
  resources: ExternalLink[]
  /** Path inside /public */
  photo?: string
}

// Newest first.
export const courseEditions: CourseEdition[] = [
  {
    year: '2026',
    theme: 'Giving shape to the unknown: Machine design and rapid prototyping',
    teacher: 'Prof. Renaud Ronsse',
    intro: [
      'This year, 20 international students will analyse the needs of a client, conceptualise a solution and rapidly prototype it — guided by a university-level course taught by Prof. Renaud Ronsse.',
      "Between lectures and workshops, participants will also discover Belgium and Louvain-la-Neuve. This page will be updated with the latest information about the course.",
    ],
    resources: [
      { label: 'BCS Schedule 2026', href: 'https://drive.google.com/file/d/1qGuHjns-PJkOKvgfcnu9qGMgsM1GDD0v/view?usp=sharing' },
      { label: 'Survival guide 2026', href: 'https://drive.google.com/file/d/1-zxkm_tn0A8rr6peVfyosNv19gMN-qFC/view?usp=drive_link' },
      { label: 'Syllabus & pre-materials', href: 'https://drive.google.com/file/d/1baMfXxCJwRS2wH324HY39mLOt3GPZsXr/view?usp=sharing' },
      {
        label: 'Expectations form',
        href: 'https://docs.google.com/forms/d/e/1FAIpQLSfgh9Ag9zByMlSEXd-YDLEINPHwYat48YQUu1AJ1FeceDUeig/viewform?usp=header',
      },
      {
        label: 'Participant information form',
        href: 'https://docs.google.com/forms/d/e/1FAIpQLSfxleKq2pHbD2zVVy1gcl9_kFFRAywl-x9_efKB0PBfkqgGcg/viewform',
      },
      { label: 'Code of conduct', href: 'https://drive.google.com/file/d/1f2hGj4DZqcEjm7C4RglfsFeR1W_-RgdS/view?usp=sharing' },
      { label: 'Complaints form', href: 'https://forms.gle/ACFjkCGqKsZmEgKTA' },
    ],
    photo: 'images/bcs-2026-group.webp',
  },
  {
    year: '2025',
    resources: [
      { label: 'Survival guide 2025', href: 'https://drive.usercontent.google.com/uc?id=1EvOn9JN7ZXf0QQgcJUdpgoOzbXmf_Npl&export=download' },
      { label: 'BCS Schedule 2025', href: 'https://drive.google.com/file/d/1ZbGJuSk6jMpS5cF8FvZq_ubZ5Jiy6vPv/view?usp=download' },
    ],
    photo: 'images/bcs-2025-group.webp',
  },
  {
    year: '2024',
    resources: [
      { label: 'Survival guide 2024', href: 'https://drive.usercontent.google.com/uc?id=1djfBNPxBv-Ot1hruniAokzfAzYkZKgVV&export=download' },
      { label: 'BCS Schedule 2024', href: 'https://drive.usercontent.google.com/uc?id=10tQyGp3vSs-LhatYvHcPl9e2yB8fQSah&export=download' },
    ],
  },
]
