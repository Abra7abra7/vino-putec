import { AvailableDate } from './bookable-experiences';

export interface BookableEvent {
  id: string;
  title: string;
  description: string;
  capacity: string;
  price: number;
  priceDisplay: string;
  bestFor: string[];
  image: string;
  availableDates: AvailableDate[];
}

// Generate dates for the next 60 days (events are typically booked further in advance)
const generateEventDates = (maxCapacity: number): AvailableDate[] => {
  const dates: AvailableDate[] = [];
  const today = new Date();
  
  for (let i = 14; i <= 90; i += 2) { // Start 2 weeks out, events every other day
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Skip dates that fall on Mondays (venue closed for maintenance)
    if (date.getDay() === 1) continue;
    
    // Events typically have one time slot per day
    dates.push({
      id: `date-${date.toISOString().split('T')[0]}`,
      date: date.toISOString().split('T')[0],
      startTime: '18:00',
      endTime: '23:00',
      maxCapacity,
      bookedCount: Math.floor(Math.random() * 5) // Random initial bookings
    });
  }
  
  return dates;
};

export const bookableEvents: BookableEvent[] = [
  {
    id: "barrel-hall",
    title: "The Barrel Hall",
    description: "Our grand barrel hall provides a dramatic backdrop for elegant receptions and gala dinners, surrounded by rows of aging oak barrels.",
    capacity: "Up to 120 guests",
    price: 3500,
    priceDisplay: "€3,500 base price",
    bestFor: ["Gala dinners", "Corporate events", "Wine launch parties"],
    image: "/images/white1.png",
    availableDates: generateEventDates(120)
  },
  {
    id: "private-cellar",
    title: "The Private Cellar",
    description: "An intimate underground space with stone walls and vaulted ceilings dating back to the 19th century, perfect for exclusive gatherings.",
    capacity: "Up to 30 guests",
    price: 1200,
    priceDisplay: "€1,200 base price",
    bestFor: ["Private dinners", "Wine tastings", "Intimate celebrations"],
    image: "/images/wine.png",
    availableDates: generateEventDates(30)
  },
  {
    id: "vineyard-terrace",
    title: "The Vineyard Terrace",
    description: "An elegant outdoor space overlooking our vineyards, offering breathtaking views of the Ribera del Duero landscape.",
    capacity: "Up to 150 guests",
    price: 4000,
    priceDisplay: "€4,000 base price",
    bestFor: ["Wedding receptions", "Sunset cocktail events", "Summer parties"],
    image: "/images/wine4.png",
    availableDates: generateEventDates(150)
  },
  {
    id: "tasting-room",
    title: "The Tasting Room",
    description: "A sophisticated space with floor-to-ceiling windows offering panoramic views of the vineyards, ideal for daytime events.",
    capacity: "Up to 50 guests",
    price: 1800,
    priceDisplay: "€1,800 base price",
    bestFor: ["Business meetings", "Educational seminars", "Wine masterclasses"],
    image: "/images/botle2.png",
    availableDates: generateEventDates(50)
  }
];

export const getEventById = (id: string): BookableEvent | undefined => {
  return bookableEvents.find(event => event.id === id);
};

export const getEventAvailableDateById = (eventId: string, dateId: string): AvailableDate | undefined => {
  const event = getEventById(eventId);
  if (!event) return undefined;
  
  return event.availableDates.find(date => date.id === dateId);
};
