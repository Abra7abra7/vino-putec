export interface AvailableDate {
  id: string;
  date: string; // ISO date string
  startTime: string;
  endTime?: string;
  maxCapacity: number;
  bookedCount: number;
}

export interface BookableExperience {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  priceDisplay: string;
  capacity: string;
  includes: string[];
  image: string;
  availableDates: AvailableDate[];
}

// Generate dates for the next 30 days
const generateDates = (maxCapacity: number): AvailableDate[] => {
  const dates: AvailableDate[] = [];
  const today = new Date();
  
  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Skip dates that fall on Mondays (winery closed)
    if (date.getDay() === 1) continue;
    
    // Morning session
    if (date.getDay() !== 0) { // No morning sessions on Sundays
      dates.push({
        id: `date-${date.toISOString().split('T')[0]}-am`,
        date: date.toISOString().split('T')[0],
        startTime: '10:00',
        endTime: '12:00',
        maxCapacity,
        bookedCount: Math.floor(Math.random() * 3) // Random initial bookings
      });
    }
    
    // Afternoon session
    dates.push({
      id: `date-${date.toISOString().split('T')[0]}-pm`,
      date: date.toISOString().split('T')[0],
      startTime: '15:00',
      endTime: '17:00',
      maxCapacity,
      bookedCount: Math.floor(Math.random() * 3) // Random initial bookings
    });
  }
  
  return dates;
};

export const bookableExperiences: BookableExperience[] = [
  {
    id: "premium-tasting",
    title: "Premium Tasting",
    description: "Discover our finest wines in an intimate setting guided by our expert sommeliers.",
    duration: "90 minutes",
    price: 75,
    priceDisplay: "€75 per person",
    capacity: "2-8 guests",
    includes: ["Guided tasting of 5 premium wines", "Artisanal cheese pairing", "Souvenir Putec crystal wine glass"],
    image: "/images/event.png",
    availableDates: generateDates(8)
  },
  {
    id: "vineyard-tour",
    title: "Vineyard & Cellar Tour",
    description: "Experience the journey from vine to bottle with a comprehensive tour of our estate.",
    duration: "2 hours",
    price: 95,
    priceDisplay: "€95 per person",
    capacity: "2-12 guests",
    includes: ["Guided vineyard tour", "Barrel cellar visit", "Tasting of 4 reserve wines", "Gourmet tapas"],
    image: "/images/event2.png",
    availableDates: generateDates(12)
  },
  {
    id: "winemaker-experience",
    title: "Winemaker Experience",
    description: "Work alongside our head winemaker for a day, experiencing the art of winemaking firsthand.",
    duration: "6 hours",
    price: 350,
    priceDisplay: "€350 per person",
    capacity: "1-4 guests",
    includes: ["Hands-on winemaking activities", "Private cellar tour", "Barrel tasting session", "Gourmet lunch with wine pairings", "Custom blended bottle to take home"],
    image: "/images/event3.png",
    availableDates: generateDates(4)
  },
  {
    id: "private-dinner",
    title: "Private Cellar Dinner",
    description: "Indulge in an exclusive dining experience in our historic underground cellar.",
    duration: "3 hours",
    price: 250,
    priceDisplay: "€250 per person",
    capacity: "2-10 guests",
    includes: ["Five-course gourmet meal", "Wine pairing with each course", "Private sommelier service", "Cellar tour", "Commemorative gift"],
    image: "/images/event4.png",
    availableDates: generateDates(10)
  }
];

export const getExperienceById = (id: string): BookableExperience | undefined => {
  return bookableExperiences.find(experience => experience.id === id);
};

export const getAvailableDateById = (experienceId: string, dateId: string): AvailableDate | undefined => {
  const experience = getExperienceById(experienceId);
  if (!experience) return undefined;
  
  return experience.availableDates.find(date => date.id === dateId);
};
