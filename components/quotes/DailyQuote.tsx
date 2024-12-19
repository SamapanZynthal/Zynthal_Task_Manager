"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { QuoteService } from '@/lib/quotes/quoteService';
import { cn } from '@/lib/utils';

export function DailyQuote() {
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(null);

  useEffect(() => {
    const quoteService = QuoteService.getInstance();
    setQuote(quoteService.getDailyQuote());
  }, []);

  if (!quote) return null;

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <blockquote className={cn(
          "space-y-2 border-l-4 border-primary/50 pl-4",
          "transition-colors duration-200"
        )}>
          <p className="text-lg font-medium italic text-card-foreground">
            "{quote.text}"
          </p>
          <footer className="text-sm text-muted-foreground">
            — {quote.author}
          </footer>
        </blockquote>
      </CardContent>
    </Card>
  );
}