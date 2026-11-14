import type { Partner } from '../data/partners.ts'
import { asset } from '../utils.ts'

/** Partner logo, or its name in text when no logo file is available yet. */
export default function PartnerLogo({ partner }: { partner: Partner }) {
  return partner.logo ? (
    <img
      src={asset(partner.logo)}
      alt={partner.name}
      loading="lazy"
      decoding="async"
      style={partner.darkLogo ? { background: 'var(--c-primary-darker)', padding: '0.6rem 1rem', borderRadius: 10 } : undefined}
    />
  ) : (
    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--c-primary-darker)', textAlign: 'center' }}>
      {partner.name}
    </span>
  )
}
