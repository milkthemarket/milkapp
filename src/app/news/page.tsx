
'use client';

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronDown, Plus, Bell, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import ClientOnly from "@/components/client-only";
import { fetchNews } from "@/ai/flows/fetch-news-flow";
import { type EnrichedNewsArticle } from "@/ai/flows/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

type Sentiment = 'Positive' | 'Negative' | 'Neutral';

const alertsData = [
    { id: 1, asset: 'BTC', condition: 'moves > 5%', active: true },
    { id: 2, asset: 'ETH', condition: 'is above $4,000', active: true },
    { id: 3, asset: 'DOGE', condition: 'is below $0.10', active: false },
    { id: 4, asset: 'News', condition: 'for TSLA', active: true },
];

const marketFilters = ['Stocks', 'ETFs', 'Crypto', 'Forex', 'Indices', 'Futures', 'Options', 'Government bonds', 'Corporate bonds', 'Economy'];


const sentimentBadgeClasses: Record<Sentiment, string> = {
    Positive: 'bg-green-900/50 text-green-400 border border-green-400/30',
    Negative: 'bg-red-900/50 text-red-400 border border-red-400/30',
    Neutral: 'bg-muted/50 text-muted-foreground border border-muted-foreground/30',
};

function formatTimeAgo(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = [
        { label: 'y', seconds: 31536000 },
        { label: 'mo', seconds: 2592000 },
        { label: 'd', seconds: 86400 },
        { label: 'h', seconds: 3600 },
        { label: 'm', seconds: 60 },
        { label: 's', seconds: 1 }
    ];

    if (seconds < 5) return 'Just now';

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count}${interval.label}`;
        }
    }
    return 'Just now';
}

function isBreakingNews(dateString: string): boolean {
    if (!dateString) return false;
    const articleDate = new Date(dateString);
    const now = new Date();
    // 5 minutes in milliseconds
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    return articleDate > fiveMinutesAgo;
}

function NewsSkeleton() {
    return (
        <div className="divide-y divide-border/50">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="p-4 space-y-2 md:grid md:grid-cols-[auto_auto_1fr_auto_auto_auto] md:items-center md:gap-x-4 md:space-y-0">
                    <div className="md:hidden">
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-baseline gap-2">
                                <Skeleton className="h-4 w-12" />
                                <Skeleton className="h-5 w-16" />
                            </div>
                            <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                        <Skeleton className="h-5 w-full mt-2" />
                        <div className="flex items-center justify-between pt-2">
                            <Skeleton className="h-6 w-24 rounded-full" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    </div>
                    <div className="hidden md:grid grid-cols-subgrid col-span-6 items-center">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 flex-1" />
                        <div className="w-24 flex justify-center">
                            <Skeleton className="h-6 w-24 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-24" />
                        <div className="w-8 flex justify-center">
                            <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function NewsPage() {
    const [articles, setArticles] = useState<EnrichedNewsArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedNews, setSelectedNews] = useState<EnrichedNewsArticle | null>(null);
    const [sources, setSources] = useState<string[]>([]);
    const [selectedSource, setSelectedSource] = useState<string>('all');
    const [selectedMarket, setSelectedMarket] = useState<string>('Stocks');
    const [isFlashing, setIsFlashing] = useState(false);

    useEffect(() => {
        const loadNews = async () => {
            try {
                const news = await fetchNews();
                const sortedNews = news.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
                
                setArticles(prevArticles => {
                    if (prevArticles.length > 0 && sortedNews.length > 0 && sortedNews[0].publishedDate !== prevArticles[0].publishedDate) {
                        setIsFlashing(true);
                    }
                    return sortedNews;
                });
                
                const uniqueSources = [...new Set(news.map(a => a.provider))].sort();
                setSources(uniqueSources);

            } catch (error) {
                console.error("Failed to fetch news:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadNews();
        const intervalId = setInterval(loadNews, 60000); 
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (isFlashing) {
            const timer = setTimeout(() => setIsFlashing(false), 800); // Animation is 0.4s * 2
            return () => clearTimeout(timer);
        }
    }, [isFlashing]);

    const filteredArticles = useMemo(() => {
        return articles
            .filter(article => selectedSource === 'all' || article.provider === selectedSource)
            .filter(() => {
                // Mock filtering for markets as we don't have this data yet
                if (selectedMarket === 'Stocks') return true;
                return false;
            });
    }, [articles, selectedSource, selectedMarket]);

    return (
        <ClientOnly>
            <div className="flex-1 p-4 sm:p-6 bg-background text-foreground">
                <Tabs defaultValue="news" className="w-full space-y-6">
                    <div className={cn(
                        "flex flex-wrap items-center justify-between gap-4 transition-colors duration-200 rounded-full",
                         isFlashing && "animate-flash-white"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <h1 className="text-3xl font-bold">News</h1>
                            <TabsList className="bg-muted p-1 rounded-full h-auto text-sm">
                                <TabsTrigger value="news" className="px-3 py-1 rounded-full shadow-none data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">News</TabsTrigger>
                                <TabsTrigger value="alerts" className="px-3 py-1 rounded-full shadow-none data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Alerts</TabsTrigger>
                            </TabsList>
                        </div>
                        <div className="relative w-full sm:w-auto sm:max-w-xs">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search symbol..."
                                className="pl-10 h-9 w-full rounded-full bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                        </div>
                    </div>
                    
                    <TabsContent value="news" className="mt-0 space-y-6">
                        <div className="flex flex-wrap gap-2 items-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="h-8 rounded-full px-4 text-xs font-normal text-muted-foreground hover:text-foreground hover:bg-muted/50 whitespace-nowrap">
                                        Source: {selectedSource === 'all' ? 'All' : selectedSource}
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuLabel>Filter by Source</DropdownMenuLabel>
                                    <DropdownMenuRadioGroup value={selectedSource} onValueChange={setSelectedSource}>
                                        <DropdownMenuRadioItem value="all">All Sources</DropdownMenuRadioItem>
                                        {sources.map(source => (
                                            <DropdownMenuRadioItem key={source} value={source}>{source}</DropdownMenuRadioItem>
                                        ))}
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="h-8 rounded-full px-4 text-xs font-normal text-muted-foreground hover:text-foreground hover:bg-muted/50 whitespace-nowrap">
                                        Market: {selectedMarket}
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuLabel>Filter by Market</DropdownMenuLabel>
                                    <DropdownMenuRadioGroup value={selectedMarket} onValueChange={setSelectedMarket}>
                                        {marketFilters.map(market => (
                                            <DropdownMenuRadioItem key={market} value={market}>{market}</DropdownMenuRadioItem>
                                        ))}
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
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
                        {isLoading ? <NewsSkeleton /> : (
                            <div className="divide-y divide-border/50">
                                {filteredArticles.map((item, index) => (
                                <div key={index} onClick={() => setSelectedNews(item)} className="cursor-pointer hover:bg-muted/30">
                                    <div className="p-4 space-y-2 md:hidden">
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-muted-foreground">{formatTimeAgo(item.publishedDate)}</span>
                                                <span className="font-bold">{item.ticker}</span>
                                            </div>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground -mr-2">
                                                <Bell className="h-5 w-5" />
                                            </Button>
                                        </div>
                                        <div className="font-medium text-base leading-snug block">
                                            {isBreakingNews(item.publishedDate) && (
                                                <Badge variant="outline" className="mr-2 border-chart-negative text-chart-negative font-bold">
                                                    BREAKING
                                                </Badge>
                                            )}
                                            {item.headline}
                                        </div>
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
                                        <span className="text-muted-foreground text-sm whitespace-nowrap w-16">{formatTimeAgo(item.publishedDate)}</span>
                                        <span className="font-bold text-sm w-20">{item.ticker}</span>
                                        <div className="font-medium text-base leading-snug truncate flex-1 items-center flex">
                                            {isBreakingNews(item.publishedDate) && (
                                                <Badge variant="outline" className="mr-2 border-chart-negative text-chart-negative font-bold">
                                                    BREAKING
                                                </Badge>
                                            )}
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
                        )}
                        </div>
                    </TabsContent>

                    <TabsContent value="alerts" className="mt-0">
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
                    <DialogContent className="bg-card/95 border-none shadow-none max-w-2xl text-foreground p-6 sm:p-8">
                        {selectedNews && (
                            <div className="flex flex-col gap-4">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl lg:text-3xl font-bold leading-tight">{selectedNews.headline}</DialogTitle>
                                </DialogHeader>
                                <div className="flex items-center gap-4 py-2 border-b border-t border-border/50">
                                    <Badge variant="secondary" className="font-bold text-base py-1 px-3">{selectedNews.ticker}</Badge>
                                </div>
                                <div className="text-muted-foreground leading-relaxed max-h-[50vh] overflow-y-auto pr-2">
                                    {selectedNews.description}
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
