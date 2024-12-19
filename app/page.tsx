import dynamic from 'next/dynamic';
import { DailyQuote } from '@/components/quotes/DailyQuote';
import { WelcomeHeader } from '@/components/layout/WelcomeHeader';

// Dynamically import TodoList with ssr disabled to prevent hydration issues
const TodoList = dynamic(() => import('@/components/todo/TodoList'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-4 md:p-8 transition-colors">
      <div className="mx-auto max-w-3xl">
        <WelcomeHeader />

        <div className="mb-8">
          <DailyQuote />
        </div>

        <TodoList />
      </div>
    </main>
  );
}