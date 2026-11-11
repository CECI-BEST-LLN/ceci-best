import PageHero from '../components/PageHero.tsx'
import { ExternalIcon } from '../components/Icons.tsx'
import { asset } from '../utils.ts'
import styles from './Pages.module.css'

export default function LouvainLaNeuve() {
  return (
    <>
      <PageHero eyebrow="Our home" title="Louvain-la-Neuve">
        <p>
          A town in French-speaking Belgium, about 30 km south-east of Brussels, built in the 1960s
          after the Catholic University of Leuven split along linguistic lines. Its name means “the
          new Leuven” — and it is now home to more than 19,000 inhabitants.
        </p>
      </PageHero>

      <section className="section">
        <div className={`container ${styles.split}`}>
          <div className={styles.prose}>
            <span className="eyebrow">The city</span>
            <h2>Designed around a campus</h2>
            <p>
              Louvain-la-Neuve was designed around the university. Over the years it grew shops, a
              concert venue and a cinema complex. It is a pedestrian city — the roads run underground
              — mixing modern architecture with nature: an artificial lake and woods all around.
            </p>
          </div>
          <img className={styles.photo} src={asset('images/lln-aerial.webp')} alt="Aerial view of Louvain-la-Neuve" loading="lazy" />
        </div>
      </section>

      <section className="section section--alt">
        <div className={`container ${styles.split} ${styles.splitReverse}`}>
          <div className={styles.prose}>
            <span className="eyebrow">The university</span>
            <h2>UCLouvain & the Louvain School of Engineering</h2>
            <p>
              The Université catholique de Louvain is one of the most renowned universities in
              Belgium. Its engineering faculty, the <strong>Louvain School of Engineering (EPL)</strong>,
              is recognised as a leader in innovation.
            </p>
            <div className={styles.actions}>
              <a href="https://uclouvain.be" target="_blank" rel="noreferrer" className="btn btn--primary">
                uclouvain.be <ExternalIcon width={16} height={16} />
              </a>
            </div>
          </div>
          <img className={styles.photo} src={asset('images/lln-grand-place.webp')} alt="Grand-Place of Louvain-la-Neuve" loading="lazy" />
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.split}`}>
          <div className={styles.prose}>
            <span className="eyebrow">The students</span>
            <h2>A lively student town</h2>
            <p>
              Student projects and associations have flourished in Louvain-la-Neuve, actively
              supported by the university. The town is famous for its student nightlife and hosts the
              <strong> 24h vélo</strong> — the largest student event in Belgium.
            </p>
            <div className={styles.actions}>
              <a href="https://www.olln.be" target="_blank" rel="noreferrer" className="btn btn--primary">
                olln.be <ExternalIcon width={16} height={16} />
              </a>
            </div>
          </div>
          <img className={styles.photo} src={asset('images/lln-terrace.webp')} alt="Terraces in Louvain-la-Neuve at dusk" loading="lazy" />
        </div>
      </section>
    </>
  )
}
