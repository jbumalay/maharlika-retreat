export type Room = {
  slug: string
  name: string
  shortDescription: string
  description: string
  image: string
  gallery: { src: string; alt: string }[]
  occupancy: string
  area: string
  bedConfiguration: string
  amenities: string[]
  designNotes: string
}

export const rooms: Room[] = [
  {
    slug: 'garden-suite',
    name: 'Garden Suite',
    shortDescription: 'A sheltered room opening directly onto a pocket of tropical green.',
    description:
      'Warm timber, filtered daylight, and a private garden edge shape a room made for unhurried mornings.',
    image: '/images/garden-room.jpg',
    gallery: [
      { src: '/images/garden-room.jpg', alt: 'Warm, open room looking into dense tropical planting' },
      { src: '/images/garden-exterior.jpg', alt: 'Small retreat structure nestled among mature trees' },
      { src: '/images/interior-detail.jpg', alt: 'Timber chair and simple interior detail beside a garden window' },
      { src: '/images/garden-light.jpg', alt: 'Sunlight at the end of a shaded garden passage' },
    ],
    occupancy: 'Up to 2 guests',
    area: 'Approx. 38 m²',
    bedConfiguration: 'One king bed',
    amenities: ['Private garden edge', 'Covered outdoor seat', 'Rain shower', 'Ceiling fan'],
    designNotes: 'Low, tactile materials keep the room visually connected to the garden.',
  },
  {
    slug: 'canopy-room',
    name: 'Canopy Room',
    shortDescription: 'A compact, elevated room with greenery held close to every window.',
    description:
      'The smallest room in the collection pairs a quiet footprint with broad garden views and soft natural light.',
    image: '/images/canopy-room.jpg',
    gallery: [{ src: '/images/canopy-room.jpg', alt: 'Plant-filled room with warm natural finishes' }],
    occupancy: 'Up to 2 guests',
    area: 'Approx. 30 m²',
    bedConfiguration: 'One queen bed',
    amenities: ['Canopy outlook', 'Writing ledge', 'Rain shower', 'Ceiling fan'],
    designNotes: 'An efficient room for guests who plan to spend most of the day outdoors.',
  },
  {
    slug: 'open-air-villa',
    name: 'Open-Air Villa',
    shortDescription: 'The most generous stay, arranged around a breezy covered terrace.',
    description:
      'Indoor and outdoor space meet beneath a deep roof, with long views and room to settle in for a slower stay.',
    image: '/images/open-air-villa.jpg',
    gallery: [{ src: '/images/open-air-villa.jpg', alt: 'Thatched tropical house overlooking the sea' }],
    occupancy: 'Up to 2 guests',
    area: 'Approx. 52 m²',
    bedConfiguration: 'One king bed',
    amenities: ['Covered terrace', 'Outdoor daybed', 'Rain shower', 'Ceiling fan'],
    designNotes: 'A deep roof and open sides frame the horizon while protecting the living space.',
  },
]

export const gardenSuite = rooms[0]
