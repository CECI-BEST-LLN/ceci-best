import { defineBoard } from './define.ts'

// Photos: src/assets/boards/2025-2026/<firstname-lastname>.webp + group.webp
export default defineBoard({
  years: '2025-2026',
  name: 'Philippe EtcheBEST',
  members: [
    { name: 'Lena Aroud', role: 'President' },
    { name: 'Constan Colinet', role: 'Secretary' },
    { name: 'Edouard Packo', role: 'Treasurer' },
    { name: 'Elodie Ozzano', role: 'FR Responsible' },
    { name: 'Marie Gilot', role: 'HR Responsible' },
    { name: 'Lizzy Nguyen', role: 'PR Responsible' },
    { name: 'Maxime Lapaille', role: 'Competitions Coordinator' },
    { name: 'Alexander Dimitrov', role: 'BCS Main Organiser' },
    { name: 'Simon "Greg" Garot', role: 'Vivaldi' },
    { name: 'Mateo Desmette', role: 'IT Responsible' },
  ],
})
