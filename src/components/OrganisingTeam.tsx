import { Link } from 'react-router'
import { currentBoard, membersWithRoles, type Board, type Role } from '../data/boards/index.ts'
import Avatar from './Avatar.tsx'
import styles from './OrganisingTeam.module.css'

interface Props {
  board: Board | undefined
  roles: Role[]
}

/** "Organised by" credits for a past edition, taken from the board in office at the time. */
export default function OrganisingTeam({ board, roles }: Props) {
  // The current board already appears in the contact block.
  if (!board || board === currentBoard) return null
  const members = membersWithRoles(roles, board)
  if (members.length === 0) return null

  return (
    <div className={styles.team}>
      <p className={styles.title}>
        Organised by the board{' '}
        <Link to={`/board/${board.years}`}>
          {board.name} ({board.years})
        </Link>
      </p>
      <ul className={styles.list}>
        {members.map((m) => (
          <li key={m.slug + m.role}>
            <Avatar name={m.name} photo={m.photo} size={44} />
            <span>
              <strong>{m.name}</strong>
              <small>{m.role}</small>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
