import { Breadcrumb, ButtonLink, AppLink, ArrowIcon, type Navigate } from '../components/Layout'
import { rooms } from '../data/rooms'

export function RoomsPage({ navigate }: { navigate: Navigate }) {
  return (
    <>
      <section className="page-intro section-shell">
        <Breadcrumb navigate={navigate} items={[{ label: 'Home', href: '/' }, { label: 'Rooms' }]} />
        <div className="page-intro-grid">
          <h1>Find your place to unwind.</h1>
          <p>Each room study is designed for two guests, but each holds the landscape differently. Compare the outlook, footprint, and defining details below.</p>
        </div>
      </section>

      <section className="room-discovery section-shell" aria-label="Room collection">
        {rooms.map((room, index) => (
          <article className="discovery-row" key={room.slug}>
            <div className="discovery-image">
              <img src={room.image} alt={`${room.name}, ${room.shortDescription.toLowerCase()}`} />
              <span>0{index + 1}</span>
            </div>
            <div className="discovery-copy">
              <h2>{room.name}</h2>
              <p>{room.description}</p>
              <dl className="room-specs">
                <div><dt>For</dt><dd>{room.occupancy}</dd></div>
                <div><dt>Space</dt><dd>{room.area}</dd></div>
                <div><dt>Sleep</dt><dd>{room.bedConfiguration}</dd></div>
              </dl>
              <ul>{room.amenities.map((amenity) => <li key={amenity}>{amenity}</li>)}</ul>
              <AppLink href={`/rooms/${room.slug}`} navigate={navigate} className="inline-link">
                View room details <ArrowIcon />
              </AppLink>
            </div>
          </article>
        ))}
      </section>

      <section className="comparison-section section-shell">
        <header className="section-heading split-heading">
          <h2>At a glance.</h2>
          <p>Sample specifications are illustrative and easy to compare. They do not describe an operating property.</p>
        </header>
        <div className="comparison-table-wrap">
          <table>
            <thead>
              <tr><th>Room</th><th>Area</th><th>Bed</th><th>Defining space</th></tr>
            </thead>
            <tbody>
              <tr><th>Garden Suite</th><td>Approx. 38 m²</td><td>King</td><td>Private garden edge</td></tr>
              <tr><th>Canopy Room</th><td>Approx. 30 m²</td><td>Queen</td><td>Canopy outlook</td></tr>
              <tr><th>Open-Air Villa</th><td>Approx. 52 m²</td><td>King</td><td>Deep covered terrace</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="quiet-cta section-shell">
        <h2>Have a room in mind?</h2>
        <p>Share your preferred dates through the demonstration inquiry flow.</p>
        <ButtonLink href="/contact" navigate={navigate}>Plan your stay</ButtonLink>
      </section>
    </>
  )
}
