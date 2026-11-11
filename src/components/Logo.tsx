import { asset } from '../utils.ts'

export default function Logo({ height = 44 }: { height?: number }) {
  return (
    <img
      src={asset('images/logo-best-lln.png')}
      alt="BEST Louvain-la-Neuve"
      height={height}
      width={Math.round(height * 2.07)}
      style={{ height, width: 'auto' }}
    />
  )
}
