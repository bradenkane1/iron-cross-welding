import { type FormEvent, useLayoutEffect, useRef, useState } from 'react'
import { Clock, Mail, Phone, ShieldCheck } from './icons'

const shopServices = [
  'Fences',
  'Custom gates',
  'Truck flatbeds, winch bumpers & racks',
  'Trailers & trailer repairs',
  'Railings, handrails & stairs',
  'Custom steel fabrication',
  'Fire pits & one-off steel builds',
]

const siteServices = [
  '24/7 mobile welding rig',
  'Heavy equipment',
  'Equipment repairs',
  'Farm & agricultural equipment',
  'Rust repair',
]

const work = [
  ['/work/01.webp', 'Pedestrian gate with scrollwork set in a block wall'],
  ['/work/02.webp', 'Side-yard gate with frosted panels'],
  ['/work/03.webp', 'Exterior stair with white railings'],
  ['/work/04.webp', 'Interior stair railing'],
  ['/work/05.webp', 'Arched entry gate'],
  ['/work/06.webp', 'Black vertical-bar fence and gate'],
  ['/work/07.webp', 'Arched driveway gate between stone pillars'],
  ['/work/08.webp', 'Horizontal slat driveway gate'],
  ['/work/09.webp', 'Horizontal slat fence and pedestrian gate'],
  ['/work/10.webp', 'Wood-panel fence with a steel frame'],
  ['/work/11.webp', 'Long black vertical-bar fence'],
  ['/work/12.webp', 'Steel patio cover beside a pool'],
  ['/work/13.webp', 'Steel patio cover running along a house'],
  ['/work/14.webp', 'Corrugated metal patio roof'],
  ['/work/15.webp', 'Decorative double gate with scrollwork'],
  ['/work/16.webp', 'Louvered side gate'],
  ['/work/17.webp', 'Pool fence and gate'],
  ['/work/18.webp', 'Black fence around a new lot'],
  ['/work/19.webp', 'Corrugated metal enclosure'],
  ['/work/20.webp', 'Framed crawl-space access door'],
] as const

const jobTypes = [
  'Fences & gates',
  'Truck, flatbed or trailer',
  'Heavy or farm equipment',
  'Mobile on-site repair',
  'Railings, handrails & stairs',
  'Custom fabrication',
  'Something else',
]

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a className={compact ? 'brand brand-footer' : 'brand'} href="#top">
      <img src="/logo.png" alt="Iron Cross" />
      <span className="brand-name">
        Welding &amp;
        <br />
        Fabrication
      </span>
    </a>
  )
}

function columnsIn(grid: HTMLElement) {
  const style = getComputedStyle(grid)
  const gap = Number.parseFloat(style.gap) || 16
  const basis = Number.parseFloat(style.getPropertyValue('--tile')) || 280
  return Math.max(1, Math.floor((grid.clientWidth + gap) / (basis + gap)))
}

export default function App() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [sent, setSent] = useState(false)
  const [columns, setColumns] = useState(1)
  const [rows, setRows] = useState(2)
  const shown = Math.min(work.length, rows * columns)

  useLayoutEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const measure = () => setColumns(columnsIn(grid))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(grid)
    return () => observer.disconnect()
  }, [])

  function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const files = form.querySelector<HTMLInputElement>('input[type="file"]')?.files
    const fileNames = files?.length ? [...files].map((file) => file.name).join(', ') : ''
    const lines = [
      `Name: ${String(data.get('name') || '')}`,
      `Phone: ${String(data.get('phone') || '')}`,
      `Email: ${String(data.get('email') || '')}`,
      `Type of job: ${String(data.get('category') || '')}`,
      '',
      String(data.get('details') || ''),
    ]
    if (fileNames) lines.push('', `Photos to attach: ${fileNames}`)
    const subject = `Quote request: ${String(data.get('category') || 'Welding job')}`
    window.location.href = `mailto:theironcrosswelding@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
    setSent(true)
  }

  return (
    <main id="top">
      <header>
        <div className="wrap header-bar">
          <Logo />
          <nav aria-label="Main">
            <a href="#work">Our work</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a className="nav-phone" href="tel:9493293012">
              <Phone size={18} />
              (949) 329-3012
            </a>
            <a className="button button-small" href="#quote">
              Get a quote
            </a>
          </nav>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title">
              Custom welding & metal
              <br />
              fabrication
            </h1>
            <p className="lead">
              Professional welding and custom metal fabrication based in Orange County, California. Certified for
              high-strength structural welding, fences, custom gates, trucks, trailers, heavy equipment, and 24/7
              mobile field repairs.
            </p>
            <ul className="hero-points">
              <li>Fences & custom gates</li>
              <li>Trucks, flatbeds & bumpers</li>
              <li>Trailers & repairs</li>
              <li>Heavy equipment & rust repair</li>
            </ul>
            <div className="hero-actions">
              <a className="button" href="#quote">
                Get a free quote
              </a>
              <a className="button button-outline" href="tel:9493293012">
                Call (949) 329-3012
              </a>
            </div>
          </div>
          <aside className="hero-card" aria-label="Orange County mobile and shop">
            <p className="hero-card-kicker">
              <ShieldCheck size={16} />
              Certified welder
            </p>
            <p className="hero-card-title">Orange County mobile & shop</p>
            <dl className="hero-card-rows">
              <div>
                <dt>Certification</dt>
                <dd>LA City & AWS D1.1</dd>
              </div>
              <div>
                <dt>Mobile rig</dt>
                <dd>24/7 field dispatch</dd>
              </div>
              <div>
                <dt>Direct phone</dt>
                <dd>
                  <a href="tel:9493293012">(949) 329-3012</a>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <div className="stripe" aria-hidden="true" />

      <section className="section" id="work" aria-labelledby="work-title">
        <div className="wrap">
          <div className="split-heading">
            <h2 id="work-title">Recent work</h2>
            <p>
              Custom fabrication, mobile field welding, gates and structural repairs, from one-off builds to jobs
              that had to be fixed before morning.
            </p>
          </div>
          <div className="work-grid" ref={gridRef}>
            {work.slice(0, shown).map(([src, alt]) => (
              <img key={src} src={src} alt={alt} />
            ))}
          </div>
          {shown < work.length && (
            <button className="button button-outline load-more" type="button" onClick={() => setRows((count) => count + 2)}>
              Load more
            </button>
          )}
        </div>
      </section>

      <section className="section services" id="services" aria-labelledby="services-title">
        <div className="wrap">
          <div className="section-intro">
            <h2 id="services-title">What we weld</h2>
            <p>Serving Orange County and surrounding areas. Some jobs come to the shop, some need us on site.</p>
          </div>
          <div className="service-columns">
            <div>
              <h3>Built in the shop</h3>
              <ul>
                {shopServices.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Done on your site, day or night</h3>
              <ul>
                {siteServices.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
              <div className="callout">
                <strong>Don&apos;t see your job here?</strong>
                <p>If it&apos;s steel, it&apos;s worth a call. Describe what you need and we&apos;ll tell you straight whether we can do it.</p>
                <a className="button" href="tel:9493293012">
                  Call or text (949) 329-3012
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="about" aria-labelledby="about-title">
        <div className="wrap about-grid">
          <div className="about-photo">
            <img src="/owner.jpg?v=4" alt="Owner welding in the shop, wearing an Iron Cross helmet" />
          </div>
          <div className="about-copy">
            <h2 id="about-title">Built on faith and doing it right</h2>
            <p className="about-lead">
              Iron Cross is a proud Christian-based business built on faith, honest work and uncompromising integrity.
            </p>
            <p>Every project gets genuine pride in the workmanship, and every client is treated with respect and transparency.</p>
            <p>
              I&apos;m LA City Certified and AWS D1.1 Structural Steel Certified, so every weld is made to meet rigorous
              structural testing standards and inspection requirements.
            </p>
            <p>
              From automated driveway gates and security fences to heavy equipment repairs, truck flatbeds and 24/7
              emergency mobile welding, every job is built to take heavy use and made to last.
            </p>
            <div className="about-links">
              <a href="tel:9493293012">(949) 329-3012</a>
              <a href="mailto:theironcrosswelding@gmail.com">theironcrosswelding@gmail.com</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section quote" id="quote" aria-labelledby="quote-title">
        <div className="wrap quote-grid">
          <div>
            <h2 id="quote-title">Get a quote</h2>
            <p>Send the details and a few photos if you have them, or call and talk it through.</p>
            <a className="quote-phone" href="tel:9493293012">
              (949) 329-3012
            </a>
            <div className="quote-actions">
              <a className="button" href="tel:9493293012">
                Call now
              </a>
              <a className="button button-outline" href="sms:9493293012">
                Send a text
              </a>
            </div>
            <div className="icon-line">
              <Clock size={22} />
              <p>
                Monday to Saturday, 7:00 AM to 6:00 PM
                <br />
                24/7 emergency mobile dispatch
              </p>
            </div>
            <div className="icon-line">
              <Mail size={22} />
              <a href="mailto:theironcrosswelding@gmail.com">theironcrosswelding@gmail.com</a>
            </div>
          </div>

          <form className="quote-form" onSubmit={submitQuote}>
            <div className="form-row">
              <label>
                Your name
                <input name="name" autoComplete="name" required placeholder="John Smith" />
              </label>
              <label>
                Phone
                <input name="phone" type="tel" autoComplete="tel" placeholder="(949) 555-0199" />
              </label>
            </div>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" placeholder="john@example.com" />
            </label>
            <label>
              Type of job
              <select name="category" defaultValue={jobTypes[0]}>
                {jobTypes.map((job) => (
                  <option key={job}>{job}</option>
                ))}
              </select>
            </label>
            <label>
              Project details
              <textarea
                name="details"
                rows={5}
                placeholder="Dimensions, material, timeframe, or where the mobile rig should go."
              />
            </label>
            <label>
              Photos of the job
              <input name="photos" type="file" accept="image/*" multiple />
            </label>
            <button className="button button-submit" type="submit">
              Send quote request
            </button>
            <p className="form-note">
              {sent
                ? 'Your email app should open with this request. Attach the photos there, then send it. For emergencies, call instead.'
                : 'We usually reply the same day. For emergencies, call instead.'}
            </p>
          </form>
        </div>
      </section>

      <footer>
        <div className="wrap footer-top">
          <Logo compact />
          <div className="footer-columns">
            <nav aria-label="Footer">
              <a href="#work">Our work</a>
              <a href="#services">Services</a>
              <a href="#about">About</a>
              <a href="#quote">Get a quote</a>
            </nav>
            <div className="footer-contact">
              <a href="tel:9493293012">(949) 329-3012</a>
              <a href="mailto:theironcrosswelding@gmail.com">theironcrosswelding@gmail.com</a>
              <span>Orange County and surrounding areas</span>
              <span>Shop and 24/7 mobile dispatch</span>
            </div>
          </div>
        </div>
        <div className="wrap footer-note">© 2026 Iron Cross Welding & Fabrication, Orange County, CA</div>
      </footer>
    </main>
  )
}
