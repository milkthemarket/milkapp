
'use client';

import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus, Bell } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

type Sentiment = 'Positive' | 'Negative' | 'Neutral';

interface NewsItem {
  id: number;
  timeAgo: string;
  symbol: string;
  headline: string;
  provider: string;
  sentiment: Sentiment;
}

const newsData: NewsItem[] = [
    {
      id: 1,
      timeAgo: '1 Min.',
      symbol: 'TSLA',
      headline: 'Tesla shares slump as deliveries miss estimates for the fourth quarter',
      provider: 'Reuters',
      sentiment: 'Negative',
    },
    {
      id: 2,
      timeAgo: '5 Min.',
      symbol: 'AAPL',
      headline: 'Apple Vision Pro sets launch date for February 2nd, pre-orders to open soon',
      provider: 'Bloomberg',
      sentiment: 'Positive',
    },
    {
      id: 3,
      timeAgo: '15 Min.',
      symbol: 'MSFT',
      headline: 'Microsoft to invest $2.9 billion in Japan for AI and cloud infrastructure expansion',
      provider: 'CNBC',
      sentiment: 'Positive',
    },
    {
      id: 4,
      timeAgo: '30 Min.',
      symbol: 'GOOGL',
      headline: 'Google announces new AI features for its Workspace suite to compete with Microsoft Copilot',
      provider: 'The Verge',
      sentiment: 'Neutral',
    },
    {
      id: 5,
      timeAgo: '1 H.',
      symbol: 'AMZN',
      headline: 'Amazon\'s AWS unit announces price cuts for several key cloud services',
      provider: 'TechCrunch',
      sentiment: 'Positive',
    },
    {
        id: 6,
        timeAgo: '2 H.',
        symbol: 'NVDA',
        headline: 'Nvidia unveils new line of GPUs targeted at AI professionals and researchers',
        provider: 'MarketWatch',
        sentiment: 'Positive',
    },
    {
        id: 7,
        timeAgo: '3 H.',
        symbol: 'META',
        headline: 'Meta to roll out new privacy features for Facebook and Instagram users in Europe',
        provider: 'Reuters',
        sentiment: 'Neutral',
    }
];

const alertsData = [
    { id: 1, asset: 'BTC', condition: 'moves > 5%', active: true },
    { id: 2, asset: 'ETH', condition: 'is above $4,000', active: true },
    { id: 3, asset: 'DOGE', condition: 'is below $0.10', active: false },
    { id: 4, asset: 'News', condition: 'for TSLA', active: true },
];

const filters = [
  { name: "Watchlist", hasDropdown: true },
  { name: "Symbol", hasDropdown: true },
  { name: "Market", hasDropdown: true },
  { name: "Corporate activity", hasDropdown: true },
  { name: "Region", hasDropdown: true },
  { name: "Provider", hasDropdown: true },
  { name: "Priority", hasDropdown: true },
];

const sentimentBadgeClasses: Record<Sentiment, string> = {
    Positive: 'bg-green-900/50 text-green-400 border border-green-400/30',
    Negative: 'bg-red-900/50 text-red-400 border border-red-400/30',
    Neutral: 'bg-muted/50 text-muted-foreground border border-muted-foreground/30',
};

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
        <div className="flex-1 p-4 sm:p-6 bg-background text-foreground">
            <Tabs defaultValue="full-feed" className="w-full space-y-6">
                <div className="flex justify-between items-center">
                     <h1 className="text-3xl font-bold">News</h1>
                    <TabsList className="bg-muted p-1 rounded-full h-auto text-sm">
                        <TabsTrigger value="full-feed" className="px-3 py-1 rounded-full shadow-none data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Full Feed</TabsTrigger>
                        <TabsTrigger value="my-alerts" className="px-3 py-1 rounded-full shadow-none data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">My Alerts</TabsTrigger>
                    </TabsList>
                </div>
                
                <TabsContent value="full-feed" className="mt-0 space-y-6">
                    {/* Filters */}
                    <div className="flex flex-wrap gap-2">
                        {filters.map((filter) => (
                            <FilterButton key={filter.name} filter={filter} />
                        ))}
                    </div>

                    {/* News List */}
                    <div className="border-t border-border/50">
                      {/* Desktop Headers */}
                      <div className="hidden md:flex items-center gap-x-4 p-4 border-b border-border/50 font-semibold text-sm text-muted-foreground">
                          <span className="w-16">Time</span>
                          <span className="w-20">Symbol</span>
                          <span className="flex-1">Headline</span>
                          <span className="w-24 text-center">Sentiment</span>
                          <span className="w-24 text-center">Provider</span>
                          <span className="w-8 text-center">Alerts</span>
                      </div>
                      <div className="divide-y divide-border/50">
                        {newsData.map((item) => (
                          <div key={item.id}>
                            {/* Mobile View */}
                            <div className="p-4 space-y-2 md:hidden">
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-muted-foreground">{item.timeAgo}</span>
                                        <span className="font-bold">{item.symbol}</span>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground -mr-2">
                                        <Bell className="h-5 w-5" />
                                    </Button>
                                </div>
                                <Link href="#" className="font-medium hover:underline text-base leading-snug block">{item.headline}</Link>
                                <div className="flex items-center justify-between pt-1">
                                    <Badge
                                        className={cn(
                                            'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
                                            sentimentBadgeClasses[item.sentiment]
                                        )}
                                        variant="outline"
                                    >
                                        {item.sentiment}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">{item.provider}</span>
                                </div>
                            </div>
                            {/* Desktop View */}
                            <div className="hidden md:flex items-center gap-x-4 p-4">
                                <span className="text-muted-foreground text-sm whitespace-nowrap w-16">{item.timeAgo}</span>
                                <span className="font-bold text-sm w-20">{item.symbol}</span>
                                <Link href="#" className="font-medium hover:underline text-base leading-snug truncate flex-1">
                                    {item.headline}
                                </Link>
                                <div className="w-24 flex justify-center">
                                    <Badge
                                        className={cn(
                                            'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
                                            sentimentBadgeClasses[item.sentiment]
                                        )}
                                        variant="outline"
                                    >
                                        {item.sentiment}
                                    </Badge>
                                </div>
                                <span className="text-sm text-muted-foreground w-24 text-center">{item.provider}</span>
                                <div className="w-8 flex justify-center">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                        <Bell className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                </TabsContent>

                <TabsContent value="my-alerts" className="mt-0">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold tracking-tight">Manage Alerts</h2>
                        <Button variant="outline">
                            <Plus className="mr-2 h-4 w-4" />
                            New Alert
                        </Button>
                    </div>
                    <Card className="mt-4 bg-card">
                        <CardContent className="p-0">
                            <ul className="divide-y divide-border">
                                {alertsData.map((alert) => (
                                    <li key={alert.id} className="flex items-center justify-between p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-muted p-3 rounded-full">
                                                <Bell className="h-5 w-5 text-foreground" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">{alert.asset} {alert.condition}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {alert.active ? "Active" : "Inactive"}
                                                </p>
                                            </div>
                                        </div>
                                        <Switch defaultChecked={alert.active} className="data-[state=checked]:bg-muted-foreground" />
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
