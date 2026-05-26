export const MOCK_USER = {
  name: 'Sarah Chen',
  email: 'sarah.chen@gmail.com',
  initials: 'SC',
}

export const MOCK_TRIPS = [
  {
    id: '1',
    name: 'Tokyo',
    destination: 'Tokyo',
    country: 'Japan',
    startDate: '2026-07-14',
    endDate: '2026-07-22',
    nights: 8,
    type: 'Solo',
    status: 'upcoming' as const,
    progress: 65,
    cover: 'linear-gradient(160deg, #0d1b35 0%, #0a2a3a 50%, #081e2e 100%)',
  },
  {
    id: '2',
    name: 'Lisbon',
    destination: 'Lisbon',
    country: 'Portugal',
    startDate: '2026-09-04',
    endDate: '2026-09-10',
    nights: 6,
    type: 'Solo',
    status: 'upcoming' as const,
    progress: 18,
    cover: 'linear-gradient(160deg, #1a2a0a 0%, #2a3a10 50%, #1e2e0d 100%)',
  },
  {
    id: '3',
    name: 'Reykjavík',
    destination: 'Reykjavík',
    country: 'Iceland',
    startDate: '2026-11-18',
    endDate: '2026-11-24',
    nights: 6,
    type: 'Solo',
    status: 'upcoming' as const,
    progress: 8,
    cover: 'linear-gradient(160deg, #0a1520 0%, #0d2030 50%, #081825 100%)',
  },
  {
    id: '4',
    name: 'Marrakech',
    destination: 'Marrakech',
    country: 'Morocco',
    startDate: '2026-03-12',
    endDate: '2026-03-20',
    nights: 8,
    type: 'Solo',
    status: 'completed' as const,
    progress: 100,
    cover: 'linear-gradient(160deg, #2a1005 0%, #3a1a08 50%, #2e1506 100%)',
  },
  {
    id: '5',
    name: 'Mexico City',
    destination: 'Mexico City',
    country: 'Mexico',
    startDate: '2026-01-08',
    endDate: '2026-01-14',
    nights: 6,
    type: 'Solo',
    status: 'completed' as const,
    progress: 100,
    cover: 'linear-gradient(160deg, #1a0a25 0%, #250f35 50%, #1e0c2e 100%)',
  },
]

export const MOCK_ALERTS = [
  { id: '1', severity: 'error' as const,   title: 'Hotel not booked',                  trip: 'Tokyo', detail: 'Kyoto nights unconfirmed',       date: '2026-07-14' },
  { id: '2', severity: 'warning' as const, title: 'Passport near expiring',             trip: null,    detail: 'Expires in 6 months',            date: '2026-11-18' },
  { id: '3', severity: 'error' as const,   title: 'Flight not booked',                 trip: 'Tokyo', detail: 'Return leg missing',             date: '2026-07-14' },
  { id: '4', severity: 'warning' as const, title: 'JR Pass activates after arrival',   trip: 'Tokyo', detail: 'Double-check activation window', date: '2026-07-14' },
]

// ── Trip detail data (Tokyo, id=1) ────────────────────────────────────────

export type ActivityType = 'flight' | 'transit' | 'hotel' | 'attraction' | 'food' | 'rail' | 'activity'

export interface Activity {
  id: string
  time: string
  type: ActivityType
  title: string
  detail: string
  location: string | null
  doc: string | null
  aiDrafted: boolean
}

export interface ItineraryDay {
  dayNum: number
  date: string
  label: string
  activities: Activity[]
}

export const MOCK_ITINERARY: ItineraryDay[] = [
  {
    dayNum: 1, date: '2026-07-14', label: 'Tuesday, July 14',
    activities: [
      { id: 'a1', time: '14:35', type: 'flight',     aiDrafted: false, title: 'Arrive at Haneda Airport',    detail: 'JL001 from SFO · Terminal 3 · 11h 25m',       location: 'HND · Tokyo',    doc: 'JAL-eticket.pdf' },
      { id: 'a2', time: '16:20', type: 'transit',    aiDrafted: true,  title: 'Limousine bus to Shinjuku',   detail: 'Pre-paid round trip · drops at hotel',         location: 'TCAT → Shinjuku', doc: null },
      { id: 'a3', time: '18:00', type: 'hotel',      aiDrafted: false, title: 'Check in – Hotel Niwa Tokyo', detail: 'Deluxe twin · 7 nights · ¥164,300',            location: null,              doc: null },
    ],
  },
  {
    dayNum: 2, date: '2026-07-15', label: 'Wednesday, July 15',
    activities: [
      { id: 'a4', time: '09:00', type: 'attraction', aiDrafted: false, title: 'Senso-ji at opening',         detail: 'Beat the crowds; Nakamise-dori on the way out', location: null, doc: null },
      { id: 'a5', time: '12:30', type: 'food',       aiDrafted: false, title: 'Lunch – Daikokuya tempura',   detail: 'Cash only · queue ~20 min',                    location: null, doc: null },
      { id: 'a6', time: '15:00', type: 'attraction', aiDrafted: true,  title: 'TeamLab Planets',             detail: 'Timed entry: 15:00 slot · barefoot exhibit',   location: null, doc: 'TeamLab-ticket.pdf' },
    ],
  },
  {
    dayNum: 3, date: '2026-07-16', label: 'Thursday, July 16',
    activities: [
      { id: 'a7', time: '10:00', type: 'attraction', aiDrafted: true,  title: 'Shibuya Crossing + Scramble', detail: 'Best before 11am; Mag\'s Park for the view',    location: 'Shibuya', doc: null },
      { id: 'a8', time: '14:00', type: 'food',       aiDrafted: true,  title: 'Ichiran Ramen',               detail: 'Solo booth ramen · 20 min queue expected',     location: null, doc: null },
      { id: 'a9', time: '17:30', type: 'attraction', aiDrafted: true,  title: 'Meiji Shrine',                detail: 'Forested walk; closes at sunset',               location: 'Harajuku', doc: null },
    ],
  },
]

export type BookingStatus = 'booked' | 'pending' | 'paid'
export type BookingType  = 'flight' | 'hotel' | 'rail' | 'transit' | 'activity'

export interface Booking {
  id: string
  type: BookingType
  title: string
  detail: string
  doc: string | null
  date: string
  price: number | null
  status: BookingStatus
}

export const MOCK_BOOKINGS: Booking[] = [
  { id: 'bk1', type: 'flight',   title: 'SFO → HND',                   detail: 'Japan Airlines · JL001',          doc: 'JAL-eticket.pdf',       date: '2026-07-14', price: 1247, status: 'booked' },
  { id: 'bk2', type: 'flight',   title: 'HND → SFO',                   detail: 'Japan Airlines · JL002 (return)', doc: 'JAL-eticket.pdf',       date: '2026-07-22', price: null, status: 'booked' },
  { id: 'bk3', type: 'hotel',    title: 'Hotel Niwa Tokyo · 7 nights', detail: 'Booking.com · Deluxe twin',       doc: 'Niwa-confirmation.pdf', date: '2026-07-14', price: 1095, status: 'booked' },
  { id: 'bk4', type: 'hotel',    title: 'Kyoto guesthouse · 2 nights', detail: 'Direct booking',                  doc: null,                    date: '2026-07-20', price: null, status: 'pending' },
  { id: 'bk5', type: 'rail',     title: 'JR Pass · 7 day',             detail: 'Japan Rail Pass',                 doc: 'JR-pass-voucher.pdf',  date: '2026-07-14', price: 420,  status: 'paid' },
  { id: 'bk6', type: 'transit',  title: 'Limousine bus · round trip',  detail: 'Airport to Shinjuku, pre-paid',   doc: null,                    date: '2026-07-14', price: 29,   status: 'paid' },
  { id: 'bk7', type: 'activity', title: 'TeamLab Planets',             detail: 'Timed entry · barefoot exhibit',  doc: 'TeamLab-ticket.pdf',   date: '2026-07-15', price: 32,   status: 'paid' },
  { id: 'bk8', type: 'activity', title: 'Odaiba day pass',             detail: 'Transport included',              doc: null,                    date: '2026-07-17', price: null, status: 'pending' },
]

export const MOCK_EXPENSES = {
  budget: 4200,
  spent: 1637,
  transactionCount: 15,
  daysWithActivity: 5,
  avgPerDay: 327,
  budgetPerDay: 467,
  categories: [
    { name: 'Accommodation', amount: 1095, color: '#8b5cf6' },
    { name: 'Food',          amount: 211,  color: '#f05535' },
    { name: 'Shopping',      amount: 128,  color: '#22c55e' },
    { name: 'Activities',    amount: 73,   color: '#f59e0b' },
    { name: 'Transport',     amount: 71,   color: '#06b6d4' },
    { name: 'Other',         amount: 59,   color: '#666666' },
  ],
  daily: [
    { label: 'Jul 14', amount: 1235 },
    { label: 'Jul 15', amount: 85 },
    { label: 'Jul 16', amount: 110 },
    { label: 'Jul 17', amount: 43 },
    { label: 'Jul 18', amount: 92 },
    { label: 'Jul 19', amount: 38 },
    { label: 'Jul 20', amount: 24 },
    { label: 'Jul 21', amount: 10 },
    { label: 'Jul 22', amount: 0 },
  ],
}

export interface UserDoc {
  id: string
  category: 'ID' | 'Health' | 'Reference'
  name: string
  format: 'PDF' | 'PNG' | 'JPG'
  size: string
  color: string
}

export const MOCK_USER_DOCS: UserDoc[] = [
  { id: 'ud1', category: 'ID',        name: 'Passport.png',           format: 'PNG', size: '1.2 MB', color: '#f05535' },
  { id: 'ud2', category: 'ID',        name: 'Driver-license.png',     format: 'PNG', size: '840 KB', color: '#06b6d4' },
  { id: 'ud3', category: 'Health',    name: 'Vaccination-record.pdf', format: 'PDF', size: '224 KB', color: '#22c55e' },
  { id: 'ud4', category: 'Reference', name: 'Travel-CC-benefits.pdf', format: 'PDF', size: '156 KB', color: '#8b5cf6' },
  { id: 'ud5', category: 'Reference', name: 'Emergency-contacts.pdf', format: 'PDF', size: '48 KB',  color: '#f59e0b' },
]

export const MOCK_TRIP_DOCS = [
  { id: 'td1', category: 'Flight',   name: 'JAL-eticket.pdf',       format: 'PDF', size: '284 KB', color: '#06b6d4' },
  { id: 'td2', category: 'Hotel',    name: 'Niwa-confirmation.pdf', format: 'PDF', size: '112 KB', color: '#8b5cf6' },
  { id: 'td3', category: 'Train',    name: 'JR-pass-voucher.pdf',   format: 'PDF', size: '96 KB',  color: '#22c55e' },
  { id: 'td4', category: 'Activity', name: 'TeamLab-ticket.pdf',    format: 'PDF', size: '78 KB',  color: '#f59e0b' },
]

// ── Helpers ───────────────────────────────────────────────────────────────

export function daysUntil(dateStr: string): number {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const target = new Date(dateStr)
  return Math.ceil((target.getTime() - now.getTime()) / 86_400_000)
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function formatDateRange(start: string, end: string): string {
  const s = new Date(start)
  const e = new Date(end)
  const sStr = s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()
  const eStr = sameMonth
    ? `${e.getDate()}, ${e.getFullYear()}`
    : e.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return `${sStr}–${eStr}`
}

export function greeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}
