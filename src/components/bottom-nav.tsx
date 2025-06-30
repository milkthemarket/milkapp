'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Newspaper, ArrowRightLeft, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/news', label: 'News', icon: Newspaper },
  { href: '/trade', label: 'Trade', icon: ArrowRightLeft },
  { href: '/alerts', label: 'Alerts', icon: Bell },
  { href: '/account', label: 'Account', icon: User },
];

export default function BottomNav() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // On the server, and on the initial client render, render a static version
  // of the nav bar to prevent a hydration mismatch.
  if (!isClient) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <item.icon className="h-6 w-6" strokeWidth={2} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    );
  }

  // After the component has mounted on the client, render the dynamic version.
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around">
        {navItems.map((item) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const pathname = usePathname();
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-foreground',
                isActive && 'text-foreground font-bold'
              )}
            >
              <item.icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
