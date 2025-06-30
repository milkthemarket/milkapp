import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const newsItems = [
    { id: 1, title: "Market Hits All-Time High Amidst Tech Rally", source: "MarketWatch", time: "2h ago", image: "https://placehold.co/600x400.png", hint: "market chart" },
    { id: 2, title: "Crypto Regulation: What to Expect in 2024", source: "CoinDesk", time: "5h ago", image: "https://placehold.co/600x400.png", hint: "cryptocurrency code" },
    { id: 3, title: "Federal Reserve Hints at Pausing Interest Rate Hikes", source: "Reuters", time: "1d ago", image: "https://placehold.co/600x400.png", hint: "government building" },
    { id: 4, title: "The Rise of AI Stocks: Are They Overvalued?", source: "Bloomberg", time: "2d ago", image: "https://placehold.co/600x400.png", hint: "artificial intelligence" },
    { id: 5, title: "Ethereum's Next Big Upgrade: What Investors Need to Know", source: "Decrypt", time: "3d ago", image: "https://placehold.co/600x400.png", hint: "ethereum logo" },
];

export default function NewsPage() {
    return (
        <div className="flex-1 space-y-4 p-4 sm:p-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight">News</h1>
                <p className="text-muted-foreground">Latest market news and headlines.</p>
            </div>
            <div className="space-y-4">
                {newsItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden shadow-md hover:shadow-primary/20 transition-shadow">
                        <div className="md:flex">
                             <div className="md:shrink-0">
                                <Image 
                                    width={400} height={400} 
                                    className="h-48 w-full object-cover md:h-full md:w-48" 
                                    src={item.image} 
                                    alt={item.title} 
                                    data-ai-hint={item.hint}
                                />
                            </div>
                            <div className="p-6 flex flex-col justify-center">
                                <CardHeader className="p-0">
                                    <CardTitle className="text-lg">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 pt-2">
                                    <CardDescription>{item.source} &middot; {item.time}</CardDescription>
                                </CardContent>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
