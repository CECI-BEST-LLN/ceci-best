import type { Partner } from '../data/partners.ts'
import { asset } from '../utils.ts'

/** Partner logo, or its name in text when no logo file is available yet. */
export default function PartnerLogo({ partner }: { partner: Partner }) {
  return partner.logo ? (
    <img src={asset(partner.logo)} alt={partner.name} loading="lazy" decoding="async" />
  ) : (
    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--c-primary-darker)', textAlign: 'center' }}>
      {partner.name}
    </span>
  )
}
