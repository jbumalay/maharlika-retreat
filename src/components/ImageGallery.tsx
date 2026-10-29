import { useEffect, useRef, useState } from 'react'

export function ImageGallery({ images, label = 'Room image gallery' }: { images: { src: string; alt: string }[]; label?: string }) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const closeButton = useRef<HTMLButtonElement>(null)
  const opener = useRef<HTMLButtonElement>(null)

  function move(direction: number) {
    setActive((value) => (value + direction + images.length) % images.length)
  }

  useEffect(() => {
    if (!lightbox) return
    closeButton.current?.focus()
    function keydown(event: KeyboardEvent) {
      if (event.key === 'Escape') setLightbox(false)
      if (event.key === 'ArrowLeft') move(-1)
      if (event.key === 'ArrowRight') move(1)
    }
    document.body.classList.add('no-scroll')
    window.addEventListener('keydown', keydown)
    return () => {
      document.body.classList.remove('no-scroll')
      window.removeEventListener('keydown', keydown)
      opener.current?.focus()
    }
  }, [lightbox])

  return (
    <section className="gallery" aria-label={label}>
      <div className="gallery-main">
        <button
          ref={opener}
          type="button"
          className="gallery-open"
          onClick={() => setLightbox(true)}
          aria-label={`Open image ${active + 1} in full screen`}
        >
          <img src={images[active].src} alt={images[active].alt} />
          <span>Expand image</span>
        </button>
        <div className="gallery-controls" aria-label="Gallery controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous image">←</button>
          <span>{String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
          <button type="button" onClick={() => move(1)} aria-label="Next image">→</button>
        </div>
      </div>
      <div className="gallery-thumbs">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={index === active ? 'active' : ''}
            aria-label={`Show image ${index + 1}: ${image.alt}`}
            aria-pressed={index === active}
            onClick={() => setActive(index)}
          >
            <img src={image.src} alt="" />
          </button>
        ))}
      </div>
      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Expanded room image">
          <button ref={closeButton} type="button" className="lightbox-close" onClick={() => setLightbox(false)}>
            Close
          </button>
          <img src={images[active].src} alt={images[active].alt} />
          <div className="lightbox-nav">
            <button type="button" onClick={() => move(-1)} aria-label="Previous image">←</button>
            <p>{active + 1} of {images.length}</p>
            <button type="button" onClick={() => move(1)} aria-label="Next image">→</button>
          </div>
        </div>
      )}
    </section>
  )
}
