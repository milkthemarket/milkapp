'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Newspaper, Compass, ArrowRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SlothIcon } from '@/components/sloth-icon';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/explore', label: 'Explore', icon: Compass },
  { href: '/trade', label: 'Trade', icon: ArrowRightLeft },
  { href: '/news', label: 'News', icon: Newspaper },
  { href: '/account', label: 'Account', icon: SlothIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          
          if (item.href === '/trade') {
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground',
                  isActive && 'text-foreground font-bold'
                )}
              >
                <item.icon className="h-8 w-8" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          }

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
