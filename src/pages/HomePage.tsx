import { rooms } from '../data/rooms'
import { AppLink, ArrowIcon, ButtonLink, type Navigate } from '../components/Layout'

export function HomePage({ navigate }: { navigate: Navigate }) {
  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <p className="context-line">An imagined tropical retreat</p>
          <h1>Find your own kind of quiet.</h1>
          <p>A slower kind of escape, shaped by warm light, natural textures, and the ease of being somewhere else.</p>
          <div className="hero-actions">
            <ButtonLink href="/rooms" navigate={navigate}>Explore the rooms</ButtonLink>
            <ButtonLink href="/contact" navigate={navigate} variant="secondary">Plan your stay</ButtonLink>
          </div>
        </div>
        <div className="hero-frame">
          <img src="/images/hero.jpg" alt="Low tropical villa framed by dense trees and a still pool" />
          <aside className="hero-panel">
            <p>Casa Amihan</p>
            <div>
              <span>Three room studies</span>
              <span>An imagined coastal setting</span>
              <span>Inquiries, not instant booking</span>
            </div>
            <AppLink href="/rooms/garden-suite" navigate={navigate}>
              Begin with the Garden Suite <ArrowIcon />
            </AppLink>
          </aside>
        </div>
      </section>

      <section className="story-section section-shell">
        <div className="story-images">
          <img src="/images/garden-path.jpg" alt="Narrow path enclosed by layered tropical planting" loading="lazy" />
          <img src="/images/interior-detail.jpg" alt="Simple timber chair beside an open garden view" loading="lazy" />
        </div>
        <div className="story-copy">
          <p className="context-line">The idea</p>
          <h2>Space to arrive. Time to unwind.</h2>
          <p>Casa Amihan imagines the kind of place where architecture recedes and the day opens up. Rooms sit low in the landscape. Doors stay open to shifting light, garden sound, and warm air.</p>
          <p>Nothing here is presented as a real service. It is a study in how a small coastal retreat might feel: tactile, generous, and close to the elements.</p>
        </div>
      </section>

      <section className="rooms-preview section-shell">
        <header className="section-heading split-heading">
          <h2>Stay a little closer to nature.</h2>
          <p>Three distinct ways to settle in, each with an illustrative footprint and a different relationship to the landscape.</p>
        </header>
        <div className="room-list">
          {rooms.map((room, index) => (
            <article className="room-card" key={room.slug}>
              <AppLink
                href={`/rooms/${room.slug}`}
                navigate={navigate}
                className="room-image-link"
                aria-label={`View ${room.name} details`}
              >
                <img src={room.image} alt="" loading="lazy" />
              </AppLink>
              <div className="room-card-copy">
                <p className="room-number">0{index + 1}</p>
                <h3>{room.name}</h3>
                <p>{room.shortDescription}</p>
                <div className="room-meta">
                  <span>{room.occupancy}</span>
                  <span>{room.area}</span>
                </div>
                <ul>{room.amenities.slice(0, 3).map((amenity) => <li key={amenity}>{amenity}</li>)}</ul>
                <AppLink href={`/rooms/${room.slug}`} navigate={navigate} className="inline-link">
                  Explore this room <ArrowIcon />
                </AppLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experiences" className="rhythm-section">
        <div className="section-shell">
          <header className="section-heading">
            <p className="context-line">A day at Casa Amihan</p>
            <h2>Let the day find its own rhythm.</h2>
          </header>
          <div className="rhythm-grid">
            <article>
              <p className="time-mark">Morning</p>
              <h3>Wake with the garden</h3>
              <p>Filtered light, doors open, and nowhere urgent to be. The morning belongs to the room and the landscape around it.</p>
            </article>
            <article>
              <img src="/images/water-courtyard.jpg" alt="Modern tropical courtyard with water and planting" loading="lazy" />
            </article>
            <article>
              <p className="time-mark">Afternoon</p>
              <h3>Follow the shade</h3>
              <p>Move between a cool interior, a covered terrace, and the path toward the water. These are atmosphere studies, not listed services.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="destination-section section-shell">
        <div className="destination-image">
          <img src="/images/coast.jpg" alt="Green Philippine shoreline meeting calm blue water" loading="lazy" />
        </div>
        <div className="destination-copy">
          <h2>Closer to the elements.</h2>
          <p>The imagined setting is somewhere between garden and coast, where humid air, dense green, and the horizon set the pace. No exact island or journey is implied.</p>
        </div>
      </section>

      <section className="inquiry-band section-shell">
        <div>
          <p className="context-line">Plan slowly</p>
          <h2>Your next pause starts here.</h2>
        </div>
        <p>Tell us a little about the stay you have in mind.</p>
        <ButtonLink href="/contact" navigate={navigate} variant="light">Make an inquiry</ButtonLink>
      </section>
    </>
  )
}
