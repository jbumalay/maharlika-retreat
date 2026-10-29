import { useRef, useState, type FormEvent } from 'react'
import { rooms } from '../data/rooms'

type FormValues = {
  name: string
  email: string
  phone: string
  arrival: string
  departure: string
  guests: string
  room: string
  message: string
  privacy: boolean
}

const initialValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  arrival: '',
  departure: '',
  guests: '2',
  room: '',
  message: '',
  privacy: false,
}

export function InquiryForm({ preselectedRoom }: { preselectedRoom?: string }) {
  const [values, setValues] = useState<FormValues>({ ...initialValues, room: preselectedRoom ?? '' })
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({})
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'failure'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  function validate() {
    const next: typeof errors = {}
    if (!values.name.trim()) next.name = 'Enter your full name.'
    if (!values.email.trim()) next.email = 'Enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email address.'
    if (!values.arrival) next.arrival = 'Choose an arrival date.'
    if (!values.departure) next.departure = 'Choose a departure date.'
    if (values.arrival && values.departure && values.departure <= values.arrival) next.departure = 'Departure must be after arrival.'
    if (!values.guests || Number(values.guests) < 1 || Number(values.guests) > 2) next.guests = 'Choose one or two guests.'
    if (!values.room) next.room = 'Choose a preferred room.'
    if (!values.privacy) next.privacy = 'Confirm that you understand this is a demo.'
    return next
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    if (state === 'submitting') return
    const nextErrors = validate()
    setErrors(nextErrors)
    const firstError = Object.keys(nextErrors)[0] as keyof FormValues | undefined
    if (firstError) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus())
      return
    }
    setState('submitting')
    window.setTimeout(() => setState('success'), 700)
  }

  function reset() {
    setValues({ ...initialValues, room: preselectedRoom ?? '' })
    setErrors({})
    setState('idle')
  }

  if (state === 'success') {
    const selected = rooms.find((room) => room.slug === values.room)
    return (
      <section className="form-success" aria-live="polite">
        <p className="success-mark" aria-hidden="true">✓</p>
        <h2>Your stay idea is noted.</h2>
        <p>Your demo inquiry has been recorded in this prototype. No reservation has been made and no message has been sent to a real hotel.</p>
        <dl>
          <div><dt>Preferred room</dt><dd>{selected?.name}</dd></div>
          <div><dt>Dates</dt><dd>{values.arrival} to {values.departure}</dd></div>
          <div><dt>Guests</dt><dd>{values.guests}</dd></div>
        </dl>
        <button type="button" className="button button--primary" onClick={reset}>Start a new inquiry</button>
      </section>
    )
  }

  return (
    <form ref={formRef} className="inquiry-form" noValidate onSubmit={submit}>
      <div className="form-row">
        <FormField label="Full name" name="name" error={errors.name} required>
          <input id="name" name="name" autoComplete="name" value={values.name} onChange={(event) => update('name', event.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
        </FormField>
        <FormField label="Email" name="email" error={errors.email} required>
          <input id="email" type="email" name="email" autoComplete="email" inputMode="email" value={values.email} onChange={(event) => update('email', event.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
        </FormField>
      </div>
      <FormField label="Phone" name="phone" hint="Optional">
        <input id="phone" type="tel" name="phone" autoComplete="tel" value={values.phone} onChange={(event) => update('phone', event.target.value)} />
      </FormField>
      <div className="form-row">
        <FormField label="Arrival" name="arrival" error={errors.arrival} required>
          <input id="arrival" type="date" name="arrival" value={values.arrival} onChange={(event) => update('arrival', event.target.value)} aria-invalid={!!errors.arrival} aria-describedby={errors.arrival ? 'arrival-error' : undefined} />
        </FormField>
        <FormField label="Departure" name="departure" error={errors.departure} required>
          <input id="departure" type="date" name="departure" min={values.arrival || undefined} value={values.departure} onChange={(event) => update('departure', event.target.value)} aria-invalid={!!errors.departure} aria-describedby={errors.departure ? 'departure-error' : undefined} />
        </FormField>
      </div>
      <div className="form-row">
        <FormField label="Guests" name="guests" error={errors.guests} required>
          <select id="guests" name="guests" value={values.guests} onChange={(event) => update('guests', event.target.value)} aria-invalid={!!errors.guests}>
            <option value="1">1 guest</option>
            <option value="2">2 guests</option>
          </select>
        </FormField>
        <FormField label="Preferred room" name="room" error={errors.room} required>
          <select id="room" name="room" value={values.room} onChange={(event) => update('room', event.target.value)} aria-invalid={!!errors.room}>
            <option value="">Choose a room</option>
            {rooms.map((room) => <option key={room.slug} value={room.slug}>{room.name}</option>)}
          </select>
        </FormField>
      </div>
      <FormField label="A little more about your stay" name="message" hint="Optional">
        <textarea id="message" name="message" rows={5} value={values.message} onChange={(event) => update('message', event.target.value)} />
      </FormField>
      <div className="check-field">
        <input id="privacy" type="checkbox" name="privacy" checked={values.privacy} onChange={(event) => update('privacy', event.target.checked)} aria-invalid={!!errors.privacy} aria-describedby={errors.privacy ? 'privacy-error' : undefined} />
        <label htmlFor="privacy">I understand this is a fictional prototype and no real inquiry will be sent.</label>
        {errors.privacy && <p id="privacy-error" className="field-error">{errors.privacy}</p>}
      </div>
      {state === 'failure' && (
        <div className="form-feedback" role="alert">
          <strong>The demo could not finish.</strong> Your details remain here. Please try again.
        </div>
      )}
      <button type="submit" className="button button--primary submit-button" disabled={state === 'submitting'} aria-busy={state === 'submitting'}>
        {state === 'submitting' ? 'Recording demo inquiry…' : state === 'failure' ? 'Try again' : 'Send inquiry'}
      </button>
      <p className="form-disclosure">This form stores details only in the current page state and sends nothing externally.</p>
    </form>
  )
}

function FormField({
  label,
  name,
  error,
  hint,
  required,
  children,
}: {
  label: string
  name: string
  error?: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      {hint && <span className="field-hint">{hint}</span>}
      {children}
      {error && <p id={`${name}-error`} className="field-error">{error}</p>}
    </div>
  )
}
