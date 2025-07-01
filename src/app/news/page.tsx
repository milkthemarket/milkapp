
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronDown, Plus, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import ClientOnly from "@/components/client-only";

type Sentiment = 'Positive' | 'Negative' | 'Neutral';

interface NewsItem {
  id: number;
  timeAgo: string;
  symbol: string;
  headline: string;
  provider: string;
  sentiment: Sentiment;
  price: number;
  change: number;
  changePercent: number;
  content: string;
}

const newsData: NewsItem[] = [
    {
      id: 1,
      timeAgo: '1 Min.',
      symbol: 'TSLA',
      headline: 'Tesla shares slump as deliveries miss estimates for the fourth quarter',
      provider: 'Reuters',
      sentiment: 'Negative',
      price: 177.29,
      change: -5.43,
      changePercent: -2.98,
      content: 'Tesla Inc shares fell on Tuesday after the electric vehicle maker missed Wall Street estimates for fourth-quarter deliveries, as it battled a slowing market and navigated production hurdles for its new Cybertruck. The company handed over 484,507 vehicles in the last three months of the year, up 11.4% from the prior quarter, but still behind analysts\' average estimate of 483,173, according to LSEG data. The miss comes after a period of aggressive price cuts by Tesla to woo buyers, which have squeezed its margins and raised investor concerns.'
    },
    {
      id: 2,
      timeAgo: '5 Min.',
      symbol: 'AAPL',
      headline: 'Apple Vision Pro sets launch date for February 2nd, pre-orders to open soon',
      provider: 'Bloomberg',
      sentiment: 'Positive',
      price: 192.53,
      change: 2.77,
      changePercent: 1.46,
      content: 'Apple announced that its highly anticipated Vision Pro mixed-reality headset will be available in the U.S. starting February 2nd. Pre-orders for the $3,499 device will begin on January 19th. The launch marks Apple\'s most significant new product category since the Apple Watch in 2015 and is expected to heat up the nascent spatial computing market.'
    },
    {
      id: 3,
      timeAgo: '15 Min.',
      symbol: 'MSFT',
      headline: 'Microsoft to invest $2.9 billion in Japan for AI and cloud infrastructure expansion',
      provider: 'CNBC',
      sentiment: 'Positive',
      price: 427.56,
      change: 1.12,
      changePercent: 0.26,
      content: 'Microsoft is set to make its largest-ever investment in Japan, pledging $2.9 billion over the next two years to expand its hyperscale cloud computing and AI infrastructure. The investment aims to meet the growing demand for AI services and to support Japan\'s goal of becoming a leader in the digital economy.'
    },
    {
      id: 4,
      timeAgo: '30 Min.',
      symbol: 'GOOGL',
      headline: 'Google announces new AI features for its Workspace suite to compete with Microsoft Copilot',
      provider: 'The Verge',
      sentiment: 'Neutral',
      price: 139.81,
      change: 0.45,
      changePercent: 0.32,
      content: 'Google has rolled out a new set of generative AI features for its Workspace suite, including tools in Docs, Sheets, and Slides. The move is a direct response to Microsoft\'s Copilot, as the two tech giants vie for dominance in the enterprise productivity software market. The new features will be available to all Workspace customers on a rolling basis.'
    },
    {
      id: 5,
      timeAgo: '1 H.',
      symbol: 'AMZN',
      headline: 'Amazon\'s AWS unit announces price cuts for several key cloud services',
      provider: 'TechCrunch',
      sentiment: 'Positive',
      price: 185.07,
      change: 1.98,
      changePercent: 1.08,
      content: 'Amazon Web Services (AWS), the cloud computing division of Amazon, announced significant price reductions for several of its popular services, including S3 storage and EC2 compute instances. The move is seen as an effort to maintain its market leadership amid increasing competition from Microsoft Azure and Google Cloud.'
    },
    {
        id: 6,
        timeAgo: '2 H.',
        symbol: 'NVDA',
        headline: 'Nvidia unveils new line of GPUs targeted at AI professionals and researchers',
        provider: 'MarketWatch',
        sentiment: 'Positive',
        price: 903.67,
        change: 12.33,
        changePercent: 1.38,
        content: 'Nvidia today took the wraps off its latest generation of graphics processing units (GPUs), the RTX 50-series, with a strong focus on artificial intelligence applications. The new chips promise substantial performance gains for machine learning workloads, a move aimed at solidifying Nvidia\'s dominance in the AI hardware market.'
    },
    {
        id: 7,
        timeAgo: '3 H.',
        symbol: 'META',
        headline: 'Meta to roll out new privacy features for Facebook and Instagram users in Europe',
        provider: 'Reuters',
        sentiment: 'Neutral',
        price: 321.78,
        change: -0.89,
        changePercent: -0.28,
        content: 'In response to regulatory pressure in the European Union, Meta Platforms announced it will be introducing new privacy controls for Facebook and Instagram users in the region. The changes will give users more granular control over how their data is used for targeted advertising, though it remains to be seen if the changes will satisfy EU regulators.'
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
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

    return (
        <ClientOnly>
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
                        <div className="flex flex-wrap gap-2">
                            {filters.map((filter) => (
                                <FilterButton key={filter.name} filter={filter} />
                            ))}
                        </div>

                        <div className="border-t border-border/50">
                        <div className="hidden md:grid grid-cols-[auto_auto_1fr_auto_auto_auto] items-center gap-x-4 p-4 border-b border-border/50 font-semibold text-sm text-muted-foreground">
                            <span>Time</span>
                            <span>Symbol</span>
                            <span>Headline</span>
                            <span className="text-center">Sentiment</span>
                            <span className="text-center">Provider</span>
                            <span className="text-center">Alerts</span>
                        </div>
                        <div className="divide-y divide-border/50">
                            {newsData.map((item) => (
                            <div key={item.id} onClick={() => setSelectedNews(item)} className="cursor-pointer hover:bg-muted/30">
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
                                    <div className="font-medium text-base leading-snug block">{item.headline}</div>
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
                                <div className="hidden md:grid grid-cols-[auto_auto_1fr_auto_auto_auto] items-center gap-x-4 p-4">
                                    <span className="text-muted-foreground text-sm whitespace-nowrap w-16">{item.timeAgo}</span>
                                    <span className="font-bold text-sm w-20">{item.symbol}</span>
                                    <div className="font-medium text-base leading-snug truncate flex-1">
                                        {item.headline}
                                    </div>
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
                <Dialog open={!!selectedNews} onOpenChange={(isOpen) => !isOpen && setSelectedNews(null)}>
                    <DialogContent className="bg-card/80 border-none shadow-none max-w-2xl text-foreground p-6 sm:p-8">
                        {selectedNews && (
                            <div className="flex flex-col gap-4">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl lg:text-3xl font-bold leading-tight">{selectedNews.headline}</DialogTitle>
                                </DialogHeader>
                                <div className="flex items-center gap-4 py-2 border-b border-t border-border/50">
                                    <Badge variant="secondary" className="font-bold text-base py-1 px-3">{selectedNews.symbol}</Badge>
                                    <div className="text-xl font-semibold">
                                        ${selectedNews.price.toFixed(2)}
                                    </div>
                                    <div className={cn(
                                        "text-base font-medium flex items-center gap-1",
                                        selectedNews.change >= 0 ? 'text-chart-positive' : 'text-chart-negative'
                                    )}>
                                        {selectedNews.change >= 0 ? '▲' : '▼'}
                                        <span>{selectedNews.change >= 0 ? '+' : ''}{selectedNews.change.toFixed(2)}</span>
                                        <span>({selectedNews.change >= 0 ? '+' : ''}{selectedNews.changePercent.toFixed(2)}%)</span>
                                    </div>
                                </div>
                                <div className="text-muted-foreground leading-relaxed max-h-[50vh] overflow-y-auto pr-2">
                                    {selectedNews.content}
                                </div>
                                <DialogFooter className="!justify-end mt-4">
                                    <Button variant="outline" onClick={() => setSelectedNews(null)}>Close</Button>
                                </DialogFooter>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </ClientOnly>
    );
}
