'use client';

import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const newsData = [
    {
      id: 1,
      timeAgo: '1 minute ago',
      symbol: 'TSLA',
      iconBgColor: '#E82127',
      headline: 'Tesla shares slump as deliveries miss estimates for the fourth quarter',
      provider: 'Reuters',
    },
    {
      id: 2,
      timeAgo: '5 minutes ago',
      symbol: 'AAPL',
      iconBgColor: '#555555',
      headline: 'Apple Vision Pro sets launch date for February 2nd, pre-orders to open soon',
      provider: 'Bloomberg',
    },
    {
      id: 3,
      timeAgo: '15 minutes ago',
      symbol: 'MSFT',
      iconBgColor: '#00A4EF',
      headline: 'Microsoft to invest $2.9 billion in Japan for AI and cloud infrastructure expansion',
      provider: 'CNBC',
    },
    {
      id: 4,
      timeAgo: '30 minutes ago',
      symbol: 'GOOGL',
      iconBgColor: '#4285F4',
      headline: 'Google announces new AI features for its Workspace suite to compete with Microsoft Copilot',
      provider: 'The Verge',
    },
    {
      id: 5,
      timeAgo: '1 hour ago',
      symbol: 'AMZN',
      iconBgColor: '#FF9900',
      headline: 'Amazon\'s AWS unit announces price cuts for several key cloud services',
      provider: 'TechCrunch',
    },
    {
        id: 6,
        timeAgo: '2 hours ago',
        symbol: 'NVDA',
        iconBgColor: '#76B900',
        headline: 'Nvidia unveils new line of GPUs targeted at AI professionals and researchers',
        provider: 'MarketWatch',
    },
    {
        id: 7,
        timeAgo: '3 hours ago',
        symbol: 'META',
        iconBgColor: '#1877F2',
        headline: 'Meta to roll out new privacy features for Facebook and Instagram users in Europe',
        provider: 'Reuters',
    }
];

const filters = [
  { name: "Watchlist", hasDropdown: true },
  { name: "Symbol", hasDropdown: true },
  { name: "Market", hasDropdown: true },
  { name: "Corporate activity", hasDropdown: true },
  { name: "Economics", hasDropdown: true },
  { name: "Region", hasDropdown: true },
  { name: "Provider", hasDropdown: true },
  { name: "Priority", hasDropdown: true },
];

const FilterButton = ({ filter }: { filter: { name: string, hasDropdown: boolean } }) => {
    const buttonContent = (
        <Button variant="outline" className="h-8 rounded-full px-4 text-xs font-normal text-muted-foreground hover:text-foreground hover:bg-muted/50 whitespace-nowrap">
            {filter.name}
            {filter.hasDropdown && <ChevronDown className="ml-2 h-4 w-4" />}
        </Button>
    );

    if (filter.hasDropdown) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {buttonContent}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuLabel>{filter.name} Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem>Option 1</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>Option 2</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Option 3</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    return buttonContent;
};

export default function NewsPage() {
    return (
        <div className="flex-1 space-y-6 p-4 sm:p-6 bg-background text-foreground">
            {/* Header */}
            <div className="flex justify-between items-center">
                 <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-0 h-auto text-3xl font-bold -ml-1">
                            Full feed
                            <ChevronDown className="ml-2 h-6 w-6" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem>Full feed</DropdownMenuItem>
                            <DropdownMenuItem>Watchlist feed</DropdownMenuItem>
                            <DropdownMenuItem>Portfolio feed</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Filters */}
            <ScrollArea className="w-full">
                <div className="flex gap-2 pb-4">
                    {filters.map((filter) => (
                        <FilterButton key={filter.name} filter={filter} />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" className="invisible" />
            </ScrollArea>

            {/* News Table (Desktop) */}
            <div className="hidden md:block border-t border-border/50">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-b-0">
                            <TableHead className="w-[150px] font-bold text-foreground h-10">Time</TableHead>
                            <TableHead className="w-[120px] font-bold text-foreground h-10">Symbol</TableHead>
                            <TableHead className="font-bold text-foreground h-10">Headline</TableHead>
                            <TableHead className="text-right w-[150px] font-bold text-foreground h-10">Provider</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {newsData.map((item) => (
                            <TableRow key={item.id} className="border-border/50">
                                <TableCell className="text-muted-foreground text-xs">{item.timeAgo}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6 text-xs">
                                            <AvatarFallback style={{ backgroundColor: item.iconBgColor }} className="text-white font-bold border-0">
                                                {item.symbol.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="font-bold text-sm">{item.symbol}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="max-w-sm lg:max-w-md xl:max-w-lg">
                                    <Link href="#" className="font-medium hover:underline truncate block">{item.headline}</Link>
                                </TableCell>
                                <TableCell className="text-right text-muted-foreground text-xs">{item.provider}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            
            {/* News List (Mobile) */}
            <div className="md:hidden border-t border-border/50">
              <div className="divide-y divide-border/50">
                {newsData.map((item) => (
                  <div key={item.id} className="py-4">
                    <div className="flex items-center gap-3 mb-2">
                        <Avatar className="h-6 w-6 text-xs">
                            <AvatarFallback style={{ backgroundColor: item.iconBgColor }} className="text-white font-bold border-0">
                                {item.symbol.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <span className="font-bold text-sm">{item.symbol}</span>
                        <span className="text-muted-foreground text-xs ml-auto">{item.timeAgo}</span>
                    </div>
                    <Link href="#" className="font-medium hover:underline text-sm leading-tight block mb-1.5">{item.headline}</Link>
                    <p className="text-muted-foreground text-xs">{item.provider}</p>
                  </div>
                ))}
              </div>
            </div>
        </div>
    );
}
