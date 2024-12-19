"use client";

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <Image
        src="/images/zynthal-logo.png"
        alt="Zynthal"
        width={120}
        height={32}
        className="h-8 w-auto"
        priority
      />
    </Link>
  );
}