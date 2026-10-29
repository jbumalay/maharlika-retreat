import { Breadcrumb, type Navigate } from '../components/Layout'
import { InquiryForm } from '../components/InquiryForm'

export function ContactPage({ navigate, query }: { navigate: Navigate; query: URLSearchParams }) {
  return (
    <section className="contact-page section-shell">
      <Breadcrumb navigate={navigate} items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
      <div className="contact-grid">
        <div className="contact-intro">
          <p className="context-line">Stay inquiry</p>
          <h1>Tell us about your stay.</h1>
          <p>Share your preferred dates and a few details. This concept prototype demonstrates an inquiry flow; it does not check live availability or make reservations.</p>
          <div className="contact-note">
            <h2>What happens next?</h2>
            <p>Your entries remain only in this page while it is open. On submission, the prototype shows a sample confirmation and sends nothing.</p>
          </div>
        </div>
        <InquiryForm preselectedRoom={query.get('room') ?? undefined} />
      </div>
    </section>
  )
}
