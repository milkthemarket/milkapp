'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Newspaper, Compass, ArrowRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SlothIcon } from '@/components/sloth-icon';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/explore', label: 'Explore', icon: Compass },
  { href: '/trade', label: 'Trade', icon: ArrowRightLeft },
  { href: '/news', label: 'News', icon: Newspaper },
  { href: '/account', label: 'Account', icon: SlothIcon },
];

const SpeedBump = () => (
    <svg
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[160%] h-4 text-border/50"
      viewBox="0 0 375 16"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 15 C0 15, 147.5 15, 147.5 15 C167.5 0, 207.5 0, 227.5 15 C227.5 15, 375 15, 375 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
);


export default function BottomNav() {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a placeholder on the server to avoid hydration errors
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-[999] h-24 bg-background/80 backdrop-blur-sm">
            <div className="mx-auto flex h-full max-w-md items-end justify-around pb-4" />
        </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[999] h-24 bg-background/80 backdrop-blur-sm">
      <SpeedBump />
      <div className="mx-auto flex h-full max-w-md items-end justify-around pb-4">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          
          if (item.href === '/trade') {
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center text-muted-foreground transition-colors hover:text-foreground',
                   'w-1/5 h-full pt-2',
                  isActive && 'text-primary'
                )}
              >
                <item.icon className="h-10 w-10" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-base font-medium">{item.label}</span>
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-foreground',
                'w-1/5 h-full pt-2',
                isActive && 'text-primary'
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
