'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CandlestickChart, ArrowRightLeft, ClipboardList, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/explore', label: 'Investing', icon: CandlestickChart },
  { href: '/trade', label: 'Transact', icon: ArrowRightLeft },
  { href: '/news', label: 'Planning', icon: ClipboardList },
  { href: '/account', label: 'Discover', icon: Compass },
];

export default function BottomNav() {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a placeholder on the server to avoid hydration errors
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-[999] h-20 border-t border-border/50 bg-background">
            <div className="mx-auto flex h-full max-w-md items-center justify-around" />
        </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[999] h-20 border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-md items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex h-full w-1/5 flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-foreground',
                isActive && 'font-bold text-foreground'
              )}
            >
              <item.icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
