import { AuthForm } from '@/components/auth/AuthForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - Task Master',
  description: 'Login to your Task Master account',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted">
      <AuthForm type="login" />
    </main>
  );
}