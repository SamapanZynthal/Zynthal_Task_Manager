"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ThemeSelector } from "@/components/theme/ThemeSelector";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/useScroll";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { AuthService } from "@/lib/auth/authService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function Navbar() {
  const { scrolled } = useScroll(10);
  const router = useRouter();
  const authService = AuthService.getInstance();
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const handleLogout = () => {
    authService.logout();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <nav className={cn(
        "mx-auto max-w-7xl",
        "relative rounded-full border",
        "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "transition-all duration-300",
        scrolled ? "shadow-lg" : "shadow-md"
      )}>
        <div className="flex h-14 items-center justify-between px-4">
          <h1 className={cn(
            "font-semibold tracking-tight transition-colors",
            isMobile ? "text-md" : isTablet ? "text-xl" : "text-2xl"
          )}>
            Zynthal
          </h1>
          
          <div className="flex items-center gap-2">
            <ThemeSelector />
            <ThemeToggle />
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleLogout}
              className="h-9 w-9 border transition-colors hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}