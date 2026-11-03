export type EventCategory = 
  | 'All' 
  | 'Technology' 
  | 'Music' 
  | 'Workshops' 
  | 'Cultural' 
  | 'Sports' 
  | 'Community';

export interface EventScheduleItem {
  time: string;
  activity: string;
  speaker?: string;
}

export interface EventItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  fullDescription: string;
  category: Exclude<EventCategory, 'All'>;
  date: string; // 'YYYY-MM-DD'
  displayDate: string; // 'Nov 14, 2026'
  time: string;
  venue: string;
  address: string;
  city: string;
  price: string;
  capacity: number;
  spotsRemaining: number;
  image: string;
  aspectRatio?: string;
  featured?: boolean;
  curatorNote?: string;
  schedule?: EventScheduleItem[];
  tags: string[];
  organizer: string;
}

export interface RegistrationRecord {
  id: string;
  eventId: string;
  eventTitle: string;
  eventCategory: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  eventCity: string;
  fullName: string;
  email: string;
  phone: string;
  ticketCount: number;
  notes?: string;
  registeredAt: string;
  referenceCode: string;
}

