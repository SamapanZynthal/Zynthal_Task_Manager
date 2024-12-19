"use client";

import { AuthService } from "@/lib/auth/authService";

export function WelcomeHeader() {
  const authService = AuthService.getInstance();
  const user = authService.getCurrentUser();

  return (
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight mb-2">
        {user?.name}, Welcome Back
      </h1>
      <p className="text-muted-foreground">
        Organize your day, achieve your goals
      </p>
    </div>
  );
}