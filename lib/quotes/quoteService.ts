import quotes from '@/data/quotes.json';

export class QuoteService {
  private static instance: QuoteService;

  private constructor() {}

  static getInstance(): QuoteService {
    if (!QuoteService.instance) {
      QuoteService.instance = new QuoteService();
    }
    return QuoteService.instance;
  }

  getDailyQuote() {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
    );
    
    const quoteIndex = dayOfYear % quotes.quotes.length;
    return quotes.quotes[quoteIndex];
  }
}