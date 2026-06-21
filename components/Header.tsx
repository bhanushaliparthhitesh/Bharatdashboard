"use client";

import { MapPin, Bell } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export function Header() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-orange-500 via-white to-green-500 bg-clip-text text-transparent drop-shadow-sm">Bharat Monitor</span>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center text-sm font-medium text-muted-foreground/80 bg-muted/50 px-3 py-1 rounded-full border border-border/50">
            {currentTime ? format(currentTime, "EEEE, dd MMM • HH:mm:ss") : "Loading time..."}
          </div>
          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-primary transition-colors">
              <MapPin className="h-5 w-5" />
            </button>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
