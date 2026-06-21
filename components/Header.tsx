"use client";

import { MapPin, Bell, BellRing, Activity, Globe, Search, ShieldAlert, Crosshair, Hexagon } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export function Header() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    setCurrentTime(new Date());
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
    
    return () => clearInterval(interval);
  }, []);

  const handleNotificationRequest = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications.");
      return;
    }

    if (Notification.permission === "granted") {
      const n = new Notification("Bharat Monitor Alerts Active", {
        body: "You're all set to receive breaking news updates.",
      });
      n.onclick = () => window.focus();
      return;
    }

    if (Notification.permission !== "denied") {
      const p = await Notification.requestPermission();
      setPermission(p);
      if (p === "granted") {
        const n = new Notification("Bharat Monitor", {
          body: "Breaking news alerts activated!",
        });
        n.onclick = () => window.focus();
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-black font-mono">
      <div className="flex h-14 w-full items-center justify-between px-4">
        
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <Hexagon className="h-5 w-5 text-primary" />
            <span className="font-bold text-lg tracking-widest text-primary drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
              BHARAT_MONITOR
            </span>
          </Link>
          <span className="text-xs text-muted-foreground hidden md:inline-block border border-border px-2 py-0.5 rounded-sm">v2.8.0</span>
          
          <div className="hidden md:flex items-center gap-2 border border-border bg-card px-3 py-1 rounded-sm ml-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-bold text-primary tracking-widest">LIVE</span>
            <span className="text-xs text-muted-foreground ml-2">ASIA_PACIFIC</span>
          </div>
        </div>

        {/* Center Section - Time */}
        <div className="hidden lg:flex flex-col items-center justify-center">
          <div className="text-sm font-bold text-muted-foreground tracking-widest">
            {currentTime ? format(currentTime, "EEE, dd MMM yyyy HH:mm:ss 'IST'") : "SYNCING_TIME..."}
          </div>
          <div className="text-[10px] text-muted-foreground/50 tracking-widest uppercase">Global Situation</div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          
          {/* DEFCON Indicator */}
          <div className="hidden md:flex items-center gap-0 border border-destructive bg-destructive/10 rounded-sm overflow-hidden">
            <div className="bg-destructive px-2 py-1 flex items-center justify-center">
              <ShieldAlert className="h-4 w-4 text-black" />
            </div>
            <div className="px-3 py-1 text-xs font-bold text-destructive tracking-widest bg-black">DEFCON 2</div>
          </div>

          <div className="flex items-center gap-2 border border-border bg-card rounded-sm px-2 py-1">
            <button className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-xs px-2">
              <Search className="h-3 w-3" /> SEARCH
            </button>
            <div className="w-px h-4 bg-border"></div>
            <button 
              onClick={handleNotificationRequest}
              className={`transition-colors flex items-center gap-1 text-xs px-2 ${permission === 'granted' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
              title="Toggle Alerts"
            >
              {permission === 'granted' ? <BellRing className="h-3 w-3 drop-shadow-[0_0_5px_rgba(34,197,94,0.8)]" /> : <Bell className="h-3 w-3" />} ALERTS
            </button>
          </div>

          <button className="bg-primary text-black font-bold text-xs tracking-widest px-4 py-1.5 rounded-sm hover:bg-primary/80 transition-colors shadow-[0_0_10px_rgba(34,197,94,0.3)]">
            AUTHORIZE
          </button>

        </div>
      </div>
    </header>
  );
}
