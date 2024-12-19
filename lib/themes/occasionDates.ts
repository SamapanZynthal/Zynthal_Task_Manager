import { Occasion } from '@/types/occasion';

export const occasions: Occasion[] = [
  {
    id: 'christmas',
    name: 'Christmas',
    theme: 'christmas',
    dates: [
      { month: 12, day: 25, durationDays: 9 } // 5 days before and 4 days after
    ]
  },
  {
    id: 'easter',
    name: 'Easter',
    theme: 'easter',
    dates: [
      // Easter date varies, will be calculated dynamically
      { month: 4, day: 9, durationDays: 9 } // Example date for 2023
    ]
  },
  {
    id: 'eid-ul-fitr',
    name: 'Eid ul-Fitr',
    theme: 'eid',
    dates: [
      // Eid dates vary based on lunar calendar
      { month: 4, day: 21, durationDays: 9 } // Example date for 2023
    ]
  },
  {
    id: 'eid-uz-zuha',
    name: 'Eid uz-Zuha',
    theme: 'eid',
    dates: [
      // Varies based on lunar calendar
      { month: 6, day: 28, durationDays: 9 } // Example date for 2023
    ]
  },
  {
    id: 'diwali',
    name: 'Diwali',
    theme: 'diwali',
    dates: [
      // Varies based on lunar calendar
      { month: 11, day: 12, durationDays: 9 } // Example date for 2023
    ]
  },
  {
    id: 'navratri',
    name: 'Navratri',
    theme: 'navratri',
    dates: [
      // Varies based on lunar calendar
      { month: 10, day: 15, durationDays: 9 } // Example date for 2023
    ]
  }
];