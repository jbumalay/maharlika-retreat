import { Breadcrumb, ButtonLink, AppLink, ArrowIcon, type Navigate } from '../components/Layout'
import { ImageGallery } from '../components/ImageGallery'
import { rooms } from '../data/rooms'

export function RoomDetailPage({ navigate, slug }: { navigate: Navigate; slug: string }) {
  const room = rooms.find((room) => room.slug === slug)

  if (!room) {
    return (
      <section className="not-found section-shell">
        <p className="context-line">404</p>
        <h1>This room leads away from the garden.</h1>
        <ButtonLink href="/rooms" navigate={navigate}>Return to rooms</ButtonLink>
      </section>
    )
  }

  const otherRooms = rooms.filter((candidate) => candidate.slug !== slug)

  return (
    <>
      <section className="room-detail-intro section-shell">
        <Breadcrumb
          navigate={navigate}
          items={[
            { label: 'Home', href: '/' },
            { label: 'Rooms', href: '/rooms' },
            { label: room.name },
          ]}
        />
        <div className="room-detail-title">
          <div>
            <p className="context-line">{room.name}</p>
            <h1>{room.shortDescription}</h1>
          </div>
          <div>
            <p>{room.description}</p>
            <ButtonLink href={`/contact?room=${room.slug}`} navigate={navigate}>
              Inquire about this room
            </ButtonLink>
          </div>
        </div>
      </section>

      <div className="section-shell">
        <ImageGallery images={room.gallery} label={`${room.name} image gallery`} />
      </div>

      <section className="room-facts section-shell">
        <div className="fact-lead">
          <p className="context-line">The essentials</p>
          <h2>Simple comforts, thoughtfully placed.</h2>
        </div>
        <dl>
          <div><dt>Occupancy</dt><dd>{room.occupancy}</dd></div>
          <div><dt>Room area</dt><dd>{room.area}</dd></div>
          <div><dt>Bed</dt><dd>{room.bedConfiguration}</dd></div>
          <div><dt>Setting</dt><dd>{room.designNotes}</dd></div>
        </dl>
      </section>

      <section className="room-story section-shell">
        <div className="room-story-image">
          <img src={room.image} alt={room.gallery[0]?.alt ?? room.name} loading="lazy" />
        </div>
        <div className="room-story-copy">
          <p className="context-line">Room story</p>
          <h2>Made around the view outside.</h2>
          <p>{room.description}</p>
          <p>{room.designNotes}</p>
          <h3>Sample amenities</h3>
          <ul>{room.amenities.map((amenity) => <li key={amenity}>{amenity}</li>)}</ul>
        </div>
      </section>

      <section className="practical-section section-shell">
        <h2>Good to know.</h2>
        <div>
          <article><h3>About the details</h3><p>All specifications and amenities shown are illustrative content for this fictional concept.</p></article>
          <article><h3>About availability</h3><p>This prototype does not check dates, show rates, or hold inventory.</p></article>
          <article><h3>About your inquiry</h3><p>The form demonstrates a client-side flow. It does not send or store your details externally.</p></article>
        </div>
      </section>

      <section className="related-section section-shell">
        <header className="section-heading split-heading">
          <h2>Other ways to stay.</h2>
          <AppLink href="/rooms" navigate={navigate} className="inline-link">Compare all rooms <ArrowIcon /></AppLink>
        </header>
        <div className="related-grid">
          {otherRooms.map((room) => (
            <article key={room.slug}>
              <img src={room.image} alt="" loading="lazy" />
              <div><h3>{room.name}</h3><p>{room.shortDescription}</p></div>
              <AppLink href={`/contact?room=${room.slug}`} navigate={navigate} aria-label={`Inquire about ${room.name}`}><ArrowIcon /></AppLink>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
