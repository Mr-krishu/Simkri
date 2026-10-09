import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, CalendarDays, Check, ChevronLeft, ChevronRight, Copy, Heart, MapPin, Menu, Navigation, Sparkles, X } from 'lucide-react'

// Wedding information lives here for easy customization.
const WEDDING = {
  bride: 'Simran Jabbal',
  groom: 'Krishna Kant',
  date: '2026-12-09',
  sikhStart: '10:00 AM',
  sikhEnd: '11:00 AM',
  hinduStart: '4:00 PM onwards',
  venue: 'Sohi Banquet · Palm Resorts',
  city: 'Zirakpur, Punjab',
  maps: 'https://maps.app.goo.gl/qiJkp7jzQPvAgXLP7?g_st=iw',
  groomFather: 'Nandlal Prasad Gupta',
  groomMother: 'Mithila Gupta',
  brideFather: 'Late Tejinder Singh Jabbal',
  brideMother: 'Surinder Kaur Jabbal',
}

const PRE_WEDDING_EVENTS = [
  {
    name: 'Jagoo',
    date: 'SUNDAY · 06 DECEMBER 2026',
    time: '5:00 PM onwards',
    icon: '✧',
    description: 'An evening of music, light, laughter and joyful celebrations.',
  },
  {
    name: 'Mehndi',
    date: 'MONDAY · 07 DECEMBER 2026',
    time: '11:00 AM',
    icon: '❀',
    description: 'Henna, heartfelt moments and festive colours with the people we love.',
  },
  {
    name: 'Haldi',
    date: 'MONDAY · 07 DECEMBER 2026',
    time: '5:00 PM',
    icon: '☀',
    description: 'Golden hues, happy blessings and sunshine before our big day.',
  },
] as const

// These rituals belong specifically to the groom's family.
// Their times and venues have not been confirmed yet.
const GROOM_SIDE_EVENTS = [
  {
    name: 'Matkor (Matikora)',
    date: 'FRIDAY · 04 DECEMBER 2026',
    time: 'Time to be confirmed',
    icon: '✦',
    description: 'The auspicious digging of soil to prepare the wedding altar (vedi).',
  },
  {
    name: 'Haldi (Ubtan)',
    date: 'SATURDAY · 05 DECEMBER 2026',
    time: 'Time to be confirmed',
    icon: '☀',
    description: 'Applying turmeric paste to the bride and groom for a radiant glow and blessings.',
  },
  {
    name: 'Aama Mahua',
    date: 'SATURDAY · 05 DECEMBER 2026',
    time: 'Time to be confirmed',
    icon: '❀',
    description: 'A beautiful ritual in which the mother symbolically marries mango and mahua trees to seek nature\'s blessings for her child.',
  },
  {
    name: 'Mehndi',
    date: 'SUNDAY · 06 DECEMBER 2026',
    time: 'Time to be confirmed',
    icon: '❧',
    description: 'Celebrating the art of mehndi with beautiful henna designs on the bride\'s hands and feet.',
  },
] as const

const COUPLE_PHOTOS = [
  { src: '/photos/staircase-candid.webp', alt: 'Simran and Krishna sharing a playful moment on a staircase', caption: 'The moments between the moments' },
  { src: '/photos/scenic-traditions.webp', alt: 'Simran and Krishna together in traditional outfits outdoors', caption: 'Our adventures, together' },
  { src: '/photos/floral-celebration.webp', alt: 'Simran and Krishna standing before colourful floral decorations', caption: 'Every celebration is better with you' },
  { src: '/photos/everyday-moments.webp', alt: 'A smiling casual selfie of Simran and Krishna', caption: 'The everyday magic' },
  { src: '/photos/golden-hour.webp', alt: 'Simran and Krishna sharing a candid moment outside', caption: 'Wherever life takes us' },
  { src: '/photos/garden-day.webp', alt: 'Simran and Krishna smiling in a green garden', caption: 'A thousand happy memories' },
  { src: '/photos/festive-evening.webp', alt: 'Simran and Krishna together in festive clothing', caption: 'A love worth celebrating' },
] as const

const TARGET = new Date('2026-12-09T10:00:00+05:30').getTime()

function getRemaining() {
  const delta = Math.max(0, TARGET - Date.now())
  return {
    days: Math.floor(delta / 86_400_000),
    hours: Math.floor((delta / 3_600_000) % 24),
    minutes: Math.floor((delta / 60_000) % 60),
    seconds: Math.floor((delta / 1_000) % 60),
  }
}

function FlowerDivider({ light = false }: { light?: boolean }) {
  return (
    <div className={`flower-divider ${light ? 'flower-divider-light' : ''}`} aria-hidden="true">
      <span />
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path d="M15 3C10 8 10 12 15 15C20 12 20 8 15 3ZM15 27C10 22 10 18 15 15C20 18 20 22 15 27ZM3 15C8 10 12 10 15 15C12 20 8 20 3 15ZM27 15C22 10 18 10 15 15C18 20 22 20 27 15Z" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="15" cy="15" r="3" fill="currentColor" />
      </svg>
      <span />
    </div>
  )
}

function FloralCorner({ flip = false }: { flip?: boolean }) {
  return (
    <svg className={`floral-corner ${flip ? 'floral-corner-flip' : ''}`} viewBox="0 0 240 260" fill="none" aria-hidden="true">
      <path d="M0 220C87 229 104 170 104 117C104 63 138 26 227 20" stroke="currentColor" strokeWidth="1.8" />
      <path d="M54 220C75 199 92 191 115 196C91 206 88 215 54 220ZM85 182C63 171 57 151 55 132C79 146 87 165 85 182ZM104 132C128 121 145 104 157 80C131 91 111 100 104 132ZM131 67C112 58 107 36 108 20C123 37 130 50 131 67ZM175 35C190 45 212 45 228 38C204 28 188 25 175 35Z" fill="currentColor" fillOpacity=".14" stroke="currentColor" strokeWidth="1.2" />
      <g stroke="currentColor" strokeWidth="1.4"><path d="M96 150Q80 130 84 113Q102 115 104 141Z"/><path d="M119 106Q114 84 128 73Q141 92 126 107Z"/><path d="M153 45Q149 23 164 11Q178 25 162 46Z"/></g>
      <circle cx="101" cy="118" r="4" fill="currentColor" /><circle cx="159" cy="46" r="3" fill="currentColor" />
    </svg>
  )
}

function Lotus({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 90" className={className} aria-hidden="true" fill="none">
      <path d="M48 70C24 55 24 29 48 5C72 29 72 55 48 70Z" fill="#efd5a5" stroke="#ae7549" strokeWidth="2" />
      <path d="M48 70C21 69 9 47 13 25C35 33 47 46 48 70Z" fill="#f8e5c5" stroke="#ae7549" strokeWidth="2" />
      <path d="M48 70C75 69 87 47 83 25C61 33 49 46 48 70Z" fill="#f8e5c5" stroke="#ae7549" strokeWidth="2" />
      <path d="M48 72C25 86 7 69 4 50C26 50 41 57 48 72Z" fill="#d7a86f" stroke="#ae7549" strokeWidth="2" />
      <path d="M48 72C71 86 89 69 92 50C70 50 55 57 48 72Z" fill="#d7a86f" stroke="#ae7549" strokeWidth="2" />
      <path d="M21 82C41 89 55 89 75 82" stroke="#ae7549" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function SectionHeading({ eyebrow, title, subtitle, light = false }: { eyebrow: string; title: string; subtitle?: string; light?: boolean }) {
  return (
    <motion.div className={`section-heading ${light ? 'section-heading-light' : ''}`} initial={{ opacity: 0, y: 23 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: .65 }}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <FlowerDivider light={light} />
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </motion.div>
  )
}

function Countdown() {
  const [remaining, setRemaining] = useState(getRemaining)
  useEffect(() => {
    const interval = window.setInterval(() => setRemaining(getRemaining()), 1000)
    return () => window.clearInterval(interval)
  }, [])

  const units = [
    { label: 'days', value: remaining.days },
    { label: 'hours', value: remaining.hours },
    { label: 'minutes', value: remaining.minutes },
    { label: 'seconds', value: remaining.seconds },
  ]

  return (
    <div className="countdown" role="timer" aria-label="Time until the Sikh wedding ceremony, 9 December 2026, 10 AM Indian Standard Time">
      {units.map((unit) => (
        <div className="countdown-item" key={unit.label}>
          <span className="countdown-number">{String(unit.value).padStart(2, '0')}</span>
          <span className="countdown-label">{unit.label}</span>
        </div>
      ))}
    </div>
  )
}

function GatewayHero() {
  const container = useRef<HTMLElement>(null)
  const [fusionLoaded, setFusionLoaded] = useState(false)
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] })
  const gatewayScale = useTransform(scrollYProgress, [0, .47, .86], [1, 1.27, 1.62])
  const leftX = useTransform(scrollYProgress, [.43, .9], ['0%', '-67%'])
  const rightX = useTransform(scrollYProgress, [.43, .9], ['0%', '67%'])
  const titleOpacity = useTransform(scrollYProgress, [0, .29, .5], [1, 1, 0])
  const titleY = useTransform(scrollYProgress, [0, .6], [0, -100])
  const revealOpacity = useTransform(scrollYProgress, [.53, .82], [0, 1])
  const skyOpacity = useTransform(scrollYProgress, [.6, .96], [1, .25])
  const fusionScale = useTransform(scrollYProgress, [0, .48, .9], [1, 1.08, 1.19])
  const fusionOpacity = useTransform(scrollYProgress, [.38, .82], [1, 0])

  return (
    <section className="hero-scroll" id="home" ref={container} aria-label="Wedding invitation introduction">
      <div className={`hero-sticky ${fusionLoaded ? 'fusion-loaded' : ''}`}>
        <motion.div className="sky-layer" style={{ opacity: skyOpacity }}>
          <span className="sky-sun" />
          <span className="cloud cloud-one" /><span className="cloud cloud-two" /><span className="cloud cloud-three" />
          <span className="sky-bird bird-one">⌁</span><span className="sky-bird bird-two">⌁</span>
        </motion.div>
        <motion.div className="hero-reveal" style={{ opacity: revealOpacity }}>
          <div className="reveal-ring"><Heart size={28} strokeWidth={1.2}/></div>
          <p className="reveal-eyebrow">WELCOME TO OUR CELEBRATION</p>
          <p className="reveal-title">A new chapter begins</p>
        </motion.div>
        <motion.div className="hero-copy" style={{ opacity: titleOpacity, y: titleY }}>
          <div className="hero-top-rule"><span /> A CELEBRATION OF LOVE <span /></div>
          <p className="hero-invitation">With the blessings of our families</p>
          <h1><span>Simran</span><i>&amp;</i><span>Krishna</span></h1>
          <p className="hero-date">WEDNESDAY <b>·</b> 09 DECEMBER 2026</p>
          <p className="hero-tagline">Two hearts. Two traditions. One forever.</p>
        </motion.div>
        <div className="gateway-wrap" aria-hidden="true">
          <motion.img src="/gateway.svg" alt="" className="gateway gateway-left" style={{ x: leftX, scale: gatewayScale }} />
          <motion.img src="/gateway.svg" alt="" className="gateway gateway-right" style={{ x: rightX, scale: gatewayScale }} />
        </div>
        <motion.div className="fusion-hero-art" style={{ scale: fusionScale, opacity: fusionOpacity }} aria-hidden="true">
          <picture>
            <source media="(max-width: 670px)" srcSet="/fusion-wedding-mobile.png" type="image/png" />
            <img src="/fusion-wedding-hero.webp" alt="" loading="eager" onLoad={() => setFusionLoaded(true)} />
          </picture>
        </motion.div>
        <motion.a href="#invitation" className="scroll-cue" style={{ opacity: titleOpacity }} aria-label="Scroll down to wedding invitation">
          <span>SCROLL TO ENTER</span><ArrowDown size={16} strokeWidth={1.5}/>
        </motion.a>
        <div className="hero-grain" aria-hidden="true" />
      </div>
    </section>
  )
}

type Lantern = { id: number; left: number; duration: number; delay: number; tilt: number; scale: number }

function WishLanterns() {
  const [lanterns, setLanterns] = useState<Lantern[]>([])
  const [wishCount, setWishCount] = useState(0)
  const counter = useRef(0)

  const release = () => {
    const next = Array.from({ length: 7 }, (_, i) => ({
      id: counter.current++,
      left: 12 + ((i * 19 + Math.floor(Math.random() * 10)) % 75),
      duration: 6.8 + Math.random() * 3,
      delay: i * .24,
      tilt: (Math.random() - .5) * 100,
      scale: .72 + Math.random() * .55,
    }))
    setLanterns((previous) => [...previous, ...next])
    setWishCount((n) => n + 1)
  }

  return (
    <section className="wishes-section" id="wishes">
      <div className="wishes-stars" aria-hidden="true" />
      <div className="wish-lantern-zone" aria-hidden="true">
        <AnimatePresence>
          {lanterns.map((lantern) => (
            <motion.div
              key={lantern.id}
              className="floating-lantern"
              style={{ left: `${lantern.left}%`, scale: lantern.scale }}
              initial={{ y: '105vh', x: 0, opacity: 0, rotate: -5 }}
              animate={{ y: '-45vh', x: lantern.tilt, opacity: [0, 1, 1, 1, 0], rotate: 9 }}
              exit={{ opacity: 0 }}
              transition={{ duration: lantern.duration, delay: lantern.delay, ease: 'linear' }}
              onAnimationComplete={() => setLanterns((prev) => prev.filter((item) => item.id !== lantern.id))}
            >
              <div className="lantern-top" /><div className="lantern-body"><div className="lantern-fire" /></div><div className="lantern-bottom" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="section-container wish-content">
        <div className="wish-symbol" aria-hidden="true">✧</div>
        <SectionHeading eyebrow="A LITTLE MAGIC" title="Send us your blessings" subtitle="Every love story is brighter with the warmth of those who share it. Release a lantern to send a little light into our new beginning." light />
        <button className="button button-light" onClick={release} type="button"><Sparkles size={17} /> Release a lantern <ArrowUpRight size={17}/></button>
        <p className="wish-helper" aria-live="polite">{wishCount ? `${wishCount} ${wishCount === 1 ? 'wish' : 'wishes'} released with love ✨` : 'Tap to fill the sky with light'}</p>
      </div>
      <div className="wishes-horizon" aria-hidden="true" />
    </section>
  )
}

function getIcsContent() {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const location = WEDDING.venue.replace(/[,;\\]/g, '\\$&')
  const uidBase = 'simran-krishna-20261209-wedding'
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Simran and Krishna//Wedding Invitation//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VEVENT', `UID:jagoo-${uidBase}@invitation`, `DTSTAMP:${stamp}`, 'DTSTART:20261206T113000Z',
    'SUMMARY:Simran & Krishna - Bride-side Jagoo', 'DESCRIPTION:Bride-side Jagoo begins at 5:00 PM IST onwards. Venue to be confirmed.', 'END:VEVENT',
    'BEGIN:VEVENT', `UID:mehndi-${uidBase}@invitation`, `DTSTAMP:${stamp}`, 'DTSTART:20261207T053000Z',
    'SUMMARY:Simran & Krishna - Bride-side Mehndi', 'DESCRIPTION:Bride-side Mehndi begins at 11:00 AM IST. Venue to be confirmed.', 'END:VEVENT',
    'BEGIN:VEVENT', `UID:haldi-${uidBase}@invitation`, `DTSTAMP:${stamp}`, 'DTSTART:20261207T113000Z',
    'SUMMARY:Simran & Krishna - Bride-side Haldi', 'DESCRIPTION:Bride-side Haldi begins at 5:00 PM IST. Venue to be confirmed.', 'END:VEVENT',
    'BEGIN:VEVENT', `UID:sikh-${uidBase}@invitation`, `DTSTAMP:${stamp}`, 'DTSTART:20261209T043000Z', 'DTEND:20261209T053000Z',
    'SUMMARY:Simran & Krishna - Sikh Wedding', `LOCATION:${location}`, 'DESCRIPTION:Sikh wedding ceremony from 10:00 AM to 11:00 AM IST. See invitation for venue map.', 'END:VEVENT',
    'BEGIN:VEVENT', `UID:hindu-${uidBase}@invitation`, `DTSTAMP:${stamp}`, 'DTSTART:20261209T103000Z',
    'SUMMARY:Simran & Krishna - Hindu Wedding', `LOCATION:${location}`, 'DESCRIPTION:Hindu wedding begins at 4:00 PM IST onwards. See invitation for venue map.', 'END:VEVENT',
    'END:VCALENDAR', '',
  ].join('\r\n')
}

function saveCalendar() {
  const data = new Blob([getIcsContent()], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(data)
  const a = document.createElement('a')
  a.href = url
  a.download = 'Simran-and-Krishna-Wedding-09-Dec-2026.ics'
  document.body.append(a)
  a.click()
  a.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function CoupleGallery() {
  const [activeIndex, setActiveIndex] = useState(0)
  const goToPhoto = (index: number) =>
    setActiveIndex((index + COUPLE_PHOTOS.length) % COUPLE_PHOTOS.length)
  const photo = COUPLE_PHOTOS[activeIndex]

  return (
    <section className="photo-gallery-section section-padding" id="our-moments">
      <div className="section-container">
        <SectionHeading eyebrow="SIMRAN & KRISHNA" title="Our little moments"
          subtitle="Seven favourite memories, one beautiful journey together." />
        <div className="couple-carousel" role="region" aria-roledescription="carousel" aria-label="Our seven couple photographs">
          <div className="couple-carousel-stage">
            <button className="couple-carousel-arrow couple-carousel-arrow-left" type="button"
              onClick={() => goToPhoto(activeIndex - 1)} aria-label="Previous photo">
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure className="couple-carousel-slide" key={photo.src}
                initial={{ opacity: 0, x: 45, scale: .98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -45, scale: .98 }}
                transition={{ duration: .32, ease: 'easeOut' }}
                drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={.16}
                style={{ touchAction: 'pan-y' }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -65) goToPhoto(activeIndex + 1)
                  else if (info.offset.x > 65) goToPhoto(activeIndex - 1)
                }}>
                <div className="couple-carousel-image">
                  <img src={photo.src} alt={photo.alt} draggable={false}
                    onError={(event) => { event.currentTarget.style.display = 'none' }} />
                  <span className="couple-photo-fallback" aria-hidden="true">S <i>&amp;</i> K</span>
                </div>
                <figcaption aria-live="polite">
                  <span className="couple-carousel-caption">{photo.caption}</span>
                  <span className="couple-carousel-count">{activeIndex + 1} / {COUPLE_PHOTOS.length}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
            <button className="couple-carousel-arrow couple-carousel-arrow-right" type="button"
              onClick={() => goToPhoto(activeIndex + 1)} aria-label="Next photo">
              <ChevronRight size={24} aria-hidden="true" />
            </button>
          </div>
          <div className="couple-carousel-dots" aria-label="Choose a photo">
            {COUPLE_PHOTOS.map((item, index) => (
              <button type="button" key={item.src}
                className={`couple-carousel-dot ${index === activeIndex ? 'is-active' : ''}`}
                aria-label={`Show photo ${index + 1} of ${COUPLE_PHOTOS.length}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                onClick={() => goToPhoto(index)} />
            ))}
          </div>
          <p className="couple-carousel-hint">Use the arrows or swipe to explore our memories</p>
        </div>
      </div>
    </section>
  )
}

function GroomSideFunctions() {
  return (
    <section className="groom-section section-padding" id="groom-traditions">
      <div className="section-container">
        <SectionHeading eyebrow="GROOM'S FAMILY · 04–06 DECEMBER 2026" title="Groom-side functions"
          subtitle="Honouring Krishna's family's beautiful traditions before the wedding day." />
        <div className="groom-events-grid">
          {GROOM_SIDE_EVENTS.map((event, index) => (
            <motion.article className="groom-event-card" key={event.name}
              initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .2 }} transition={{ duration: .55, delay: index * .07 }}>
              <span className="groom-event-icon" aria-hidden="true">{event.icon}</span>
              <p className="groom-event-date">{event.date}</p>
              <h3>{event.name}</h3>
              <p className="groom-event-time">{event.time}</p>
              <div className="groom-event-rule" />
              <p className="groom-event-description">{event.description}</p>
            </motion.article>
          ))}
        </div>
        <p className="groom-event-note">Times and locations for the groom-side functions will be shared once confirmed.</p>
      </div>
    </section>
  )
}

function Ceremonies() {
  return (
    <section id="celebrations" className="ceremonies-section section-padding">
      <FloralCorner />
      <div className="section-container">
        <SectionHeading eyebrow="A CELEBRATION OF LOVE & TRADITIONS" title="Our wedding festivities" subtitle="From cherished family traditions to joyful celebrations, leading to our forever." />
        <div className="prewedding-header" id="bride-traditions">
          <p className="eyebrow">BRIDE'S FAMILY · 06 & 07 DECEMBER 2026</p>
          <h3>Bride-side functions</h3>
        </div>
        <div className="prewedding-grid">
          {PRE_WEDDING_EVENTS.map((event, index) => (
            <motion.article
              className="prewedding-card"
              key={event.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .2 }}
              transition={{ duration: .55, delay: index * .1 }}
            >
              <span className="prewedding-icon" aria-hidden="true">{event.icon}</span>
              <p className="prewedding-date">{event.date}</p>
              <h4>{event.name}</h4>
              <p className="prewedding-time">{event.time}</p>
              <span className="prewedding-divider" />
              <p className="prewedding-description">{event.description}</p>
            </motion.article>
          ))}
        </div>
        <div className="wedding-day-heading">
          <p className="eyebrow">THE WEDDING DAY</p>
          <h3>Two traditions, one forever</h3>
        </div>
        <div className="ceremony-intro-date"><span className="line" /> WEDNESDAY, 09 DECEMBER 2026 <span className="line" /></div>
        <div className="ceremony-grid">
          <motion.article className="ceremony-card sikh-card" initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: .2}} transition={{duration: .6}}>
            <div className="card-decoration" aria-hidden="true"><span>ੴ</span></div>
            <div className="ceremony-card-content">
              <p className="ceremony-number">CEREMONY ONE <span>✦</span> MORNING</p>
              <h3>Anand Karaj</h3>
              <p className="ceremony-subtitle">The Sikh wedding ceremony</p>
              <span className="ceremony-divider" />
              <p className="ceremony-clock">10:00 <span>–</span> 11:00 <small>AM</small></p>
              <p className="ceremony-description">A sacred beginning, blessed with love, faith and the togetherness of our families.</p>
              <div className="ceremony-bottom"><span>09 DECEMBER 2026</span><span>ੴ</span></div>
            </div>
          </motion.article>
          <motion.article className="ceremony-card hindu-card" initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: .2}} transition={{duration: .6, delay: .13}}>
            <div className="card-decoration" aria-hidden="true"><span>ॐ</span></div>
            <div className="ceremony-card-content">
              <p className="ceremony-number">CEREMONY TWO <span>✦</span> EVENING</p>
              <h3>Hindu Wedding</h3>
              <p className="ceremony-subtitle">The wedding rituals & pheras</p>
              <span className="ceremony-divider" />
              <p className="ceremony-clock">4:00 <small>PM onwards</small></p>
              <p className="ceremony-description">With sacred vows and the blessings of our loved ones, our forever continues.</p>
              <div className="ceremony-bottom"><span>09 DECEMBER 2026</span><span>ॐ</span></div>
            </div>
          </motion.article>
        </div>
        <p className="ceremony-footnote">We would be honoured to have you join us for both ceremonies and share in our joy.</p>
      </div>
      <FloralCorner flip />
    </section>
  )
}

function Invitation() {
  return (
    <section id="invitation" className="invitation-section section-padding">
      <div className="invitation-backdrop" aria-hidden="true"><div className="thin-arch thin-arch-one" /><div className="thin-arch thin-arch-two" /></div>
      <div className="section-container invitation-content">
        <motion.div className="invite-crest" initial={{opacity: 0, scale: .8}} whileInView={{opacity: 1, scale: 1}} viewport={{once: true}} transition={{duration: .8}}><span>S</span><b>&amp;</b><span>K</span></motion.div>
        <SectionHeading eyebrow="WITH FULL HEARTS & OPEN ARMS" title="A wedding, a blessing, a beginning" subtitle="Two families, two cherished traditions, and a beautiful new chapter. We warmly invite you to celebrate the union of" />
        <div className="couple-names"><span>{WEDDING.bride}</span><i>&amp;</i><span>{WEDDING.groom}</span></div>
        <p className="invite-date-label">ON THE NINTH DAY OF DECEMBER · TWO THOUSAND TWENTY-SIX</p>
        <div className="family-panel">
          <div className="family-side">
            <p className="eyebrow">WITH BLESSINGS FROM THE BRIDE'S FAMILY</p>
            <p className="family-names">{WEDDING.brideFather}</p>
            <p className="family-amp">&amp;</p>
            <p className="family-names">{WEDDING.brideMother}</p>
          </div>
          <div className="family-center" aria-hidden="true"><Lotus className="family-lotus" /></div>
          <div className="family-side">
            <p className="eyebrow">WITH BLESSINGS FROM THE GROOM'S FAMILY</p>
            <p className="family-names">{WEDDING.groomFather}</p>
            <p className="family-amp">&amp;</p>
            <p className="family-names">{WEDDING.groomMother}</p>
          </div>
        </div>
        <div className="countdown-wrapper"><p className="eyebrow">COUNTING DOWN TO OUR SPECIAL DAY</p><Countdown /></div>
      </div>
    </section>
  )
}

function Interlude() {
  return (
    <section className="interlude-section" aria-label="Love and togetherness">
      <div className="interlude-overlay" />
      <div className="interlude-illustration" aria-hidden="true">
        <div className="interlude-arch"><div className="mini-arch-interior"><Lotus className="mini-lotus" /></div></div>
      </div>
      <motion.div className="interlude-copy" initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:.75}}>
        <p>CELEBRATING THE BEAUTY OF TOGETHERNESS</p>
        <h2>Two traditions,<br/><em>one beautiful forever.</em></h2>
        <FlowerDivider light />
      </motion.div>
    </section>
  )
}

function Venue() {
  return (
    <section className="venue-section section-padding" id="venue">
      <div className="section-container">
        <SectionHeading eyebrow="WHERE WE BEGIN OUR FOREVER" title="Find your way to us" subtitle="Your presence will make our celebration complete." />
        <div className="venue-card">
          <div className="venue-illustration" aria-hidden="true">
            <div className="venue-sun" />
            <div className="venue-wind-line line-one"/><div className="venue-wind-line line-two" />
            <div className="venue-building">
              <div className="venue-building-dome" />
              <div className="venue-building-roof" />
              <div className="venue-building-walls"><span/><span/><span/></div>
              <div className="venue-building-steps" />
            </div>
            <div className="venue-plant plant-left"><span/><span/><span/></div>
            <div className="venue-plant plant-right"><span/><span/><span/></div>
            <p>TOGETHER IS A BEAUTIFUL PLACE TO BE</p>
          </div>
          <div className="venue-details">
            <span className="venue-icon"><MapPin size={23} strokeWidth={1.4}/></span>
            <p className="eyebrow">THE WEDDING VENUE</p>
            <h3>Sohi Banquet<br/><em>Palm Resorts</em></h3>
            <p className="venue-city">{WEDDING.city}</p>
            <div className="venue-hairline" />
            <p className="venue-time">Wednesday, 09 December 2026</p>
            <p className="venue-times-small">Sikh ceremony: 10–11 AM &nbsp; · &nbsp; Hindu ceremony: 4 PM onwards</p>
            <a className="button button-primary" href={WEDDING.maps} target="_blank" rel="noopener noreferrer"><Navigation size={17} /> Open in Google Maps <ArrowUpRight size={17}/></a>
            <p className="venue-map-note">Opens the location link supplied by the couple.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function FooterInvitation() {
  const [feedback, setFeedback] = useState('')
  const reset = () => window.setTimeout(() => setFeedback(''), 2800)

  const share = async () => {
    const message = `Celebrate with Simran Jabbal & Krishna Kant! Groom-side: Matkor (4 Dec), Haldi and Aama Mahua (5 Dec), Mehndi (6 Dec); times to be confirmed. Bride-side: Jagoo (6 Dec, 5 PM onwards), Mehndi (7 Dec, 11 AM), Haldi (7 Dec, 5 PM). Wedding: 9 Dec 2026, Sohi Banquet · Palm Resorts. ${window.location.href}`
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Simran & Krishna — Wedding Invitation', text: message, url: window.location.href })
        return
      }
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(message)
      } else {
        const input = document.createElement('textarea')
        input.value = message
        input.style.position = 'fixed'
        input.style.opacity = '0'
        document.body.append(input)
        input.select()
        if (!document.execCommand('copy')) throw new Error('Could not copy')
        input.remove()
      }
      setFeedback('Invitation copied!')
      reset()
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setFeedback('Use your browser’s share option')
      reset()
    }
  }

  const copyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(window.location.href)
      } else {
        const input = document.createElement('textarea')
        input.value = window.location.href
        document.body.append(input)
        input.select()
        if (!document.execCommand('copy')) throw new Error('Could not copy')
        input.remove()
      }
      setFeedback('Link copied!')
    } catch {
      setFeedback('Please copy the link from your address bar')
    }
    reset()
  }

  return (
    <footer className="footer-section" id="save-the-date">
      <div className="footer-petals" aria-hidden="true">❦</div>
      <div className="footer-content section-container">
        <Lotus className="footer-lotus" />
        <p className="eyebrow">SAVE THE DATE</p>
        <h2>We cannot wait<br/><em>to celebrate with you.</em></h2>
        <div className="footer-monogram">Simran <i>&amp;</i> Krishna</div>
        <p className="footer-date">09 · 12 · 2026</p>
        <p className="footer-place">SOHI BANQUET · PALM RESORTS</p>
        <div className="footer-actions">
          <button className="button button-primary" onClick={saveCalendar} type="button"><CalendarDays size={18} /> Add to calendar</button>
          <button className="button button-outline" onClick={share} type="button"><Heart size={17} /> Share invitation</button>
          <button className="button button-quiet" onClick={copyLink} type="button"><Copy size={16} /> Copy link</button>
        </div>
        <p className="footer-feedback" role="status" aria-live="polite">{feedback && <><Check size={15}/> {feedback}</>}</p>
        <div className="footer-bottom"><FlowerDivider light /><p>WITH LOVE, FROM OUR FAMILIES TO YOURS</p><small>Made with love for 09 December 2026</small></div>
      </div>
    </footer>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    { href: '#invitation', label: 'Our invitation' },
    { href: '#our-moments', label: 'Our moments' },
    { href: '#groom-traditions', label: 'Groom-side functions' },
    { href: '#bride-traditions', label: 'Bride-side functions' },
    { href: '#celebrations', label: 'Wedding day' },
    { href: '#venue', label: 'The venue' },
    { href: '#wishes', label: 'Send blessings' },
  ]
  return (
    <header className="site-header">
      <a href="#home" className="header-mark" aria-label="Simran and Krishna, back to top">S <span>♡</span> K</a>
      <nav className={`header-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Primary navigation">
        {links.map((link) => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
        <a className="header-rsvp" href="#save-the-date" onClick={() => setMenuOpen(false)}>SAVE THE DATE <ArrowUpRight size={13}/></a>
      </nav>
      <button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22}/> : <Menu size={22}/>}</button>
    </header>
  )
}

function App() {
  return (
    <div className="site-shell">
      <Header />
      <GatewayHero />
      <main>
        <Invitation />
        <CoupleGallery />
        <GroomSideFunctions />
        <Ceremonies />
        <Interlude />
        <WishLanterns />
        <Venue />
      </main>
      <FooterInvitation />
      <div className="visually-hidden">{WEDDING.bride} and {WEDDING.groom} invite you to their wedding on {WEDDING.date}.</div>
    </div>
  )
}

export default App
