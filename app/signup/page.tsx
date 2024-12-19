import { AuthForm } from '@/components/auth/AuthForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Task Master',
  description: 'Create your Task Master account',
};

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted">
      <AuthForm type="signup" />
    </main>
  );
}