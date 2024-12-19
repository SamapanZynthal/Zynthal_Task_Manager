import { occasions } from './occasionDates';
import { christmasTheme, easterTheme, eidTheme, diwaliTheme, navratriTheme } from './occasionThemes';
import { OccasionTheme } from '@/types/occasion';

export class OccasionManager {
  private static instance: OccasionManager;
  private occasionThemes: Map<string, OccasionTheme>;

  private constructor() {
    this.occasionThemes = new Map([
      ['christmas', christmasTheme],
      ['easter', easterTheme],
      ['eid', eidTheme],
      ['diwali', diwaliTheme],
      ['navratri', navratriTheme],
    ]);
  }

  static getInstance(): OccasionManager {
    if (!OccasionManager.instance) {
      OccasionManager.instance = new OccasionManager();
    }
    return OccasionManager.instance;
  }

  getCurrentOccasion(): { occasion: string; theme: OccasionTheme } | null {
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // JavaScript months are 0-based
    const currentDay = today.getDate();

    for (const occasion of occasions) {
      for (const date of occasion.dates) {
        const startDate = new Date(today.getFullYear(), date.month - 1, date.day - 5);
        const endDate = new Date(today.getFullYear(), date.month - 1, date.day + 4);
        
        if (today >= startDate && today <= endDate) {
          const theme = this.occasionThemes.get(occasion.theme);
          if (theme) {
            return { occasion: occasion.name, theme };
          }
        }
      }
    }

    return null;
  }

  getTheme(themeName: string): OccasionTheme | undefined {
    return this.occasionThemes.get(themeName);
  }
}