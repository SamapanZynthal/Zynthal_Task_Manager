interface PriorityKeywords {
  words: string[];
  message: string;
}

const PRIORITY_KEYWORDS: Record<string, PriorityKeywords> = {
  high: {
    words: ['urgent', 'asap', 'immediately', 'critical', 'emergency', 'deadline'],
    message: 'This task contains urgent keywords',
  },
  medium: {
    words: ['soon', 'next week', 'important', 'priority', 'needed'],
    message: 'This task seems moderately important',
  },
  low: {
    words: [],
    message: 'No urgency indicators found',
  },
};

export function getPrioritySuggestion(text: string): string {
  const words = text.toLowerCase();
  
  for (const [priority, { words: keywords, message }] of Object.entries(PRIORITY_KEYWORDS)) {
    if (keywords.some(keyword => words.includes(keyword))) {
      return `Suggested Priority: ${priority.charAt(0).toUpperCase() + priority.slice(1)} - ${message}`;
    }
  }
  
  return `Suggested Priority: Low - ${PRIORITY_KEYWORDS.low.message}`;
}