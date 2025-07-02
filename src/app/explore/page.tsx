
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { topGainersData, topLosersData, mostActiveData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react";

const filters = [
    { name: "All Markets", hasDropdown: true },
    { name: "Market Cap", hasDropdown: true },
    { name: "Sector", hasDropdown: true },
    { name: "Volume", hasDropdown: true },
];

const FilterButton = ({ filter }: { filter: { name:string, hasDropdown: boolean } }) => {
    return (
        <Button variant="outline" className="h-8 rounded-full px-4 text-xs font-normal text-muted-foreground hover:text-foreground hover:bg-muted/50 whitespace-nowrap">
            {filter.name}
            {filter.hasDropdown && <ChevronDown className="ml-2 h-4 w-4" />}
        </Button>
    );
};


const MarketMoversTable = ({ data, type }: { data: any[], type: 'gainers' | 'losers' }) => {
    const isGainer = type === 'gainers';
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent border-b-border/50">
                        <TableHead>Symbol</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">% Change</TableHead>
                        <TableHead className="text-right">52W High</TableHead>
                        <TableHead className="text-right">52W Low</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((stock) => (
                        <TableRow key={stock.ticker} className="cursor-pointer border-b-border/50">
                            <TableCell className="font-bold">{stock.ticker}</TableCell>
                            <TableCell className="text-muted-foreground truncate max-w-[120px]">{stock.name}</TableCell>
                            <TableCell className={cn(
                                "text-right font-medium",
                                stock.price >= stock.fiftyTwoWeekHigh && "text-chart-positive",
                                stock.price <= stock.fiftyTwoWeekLow && "text-chart-negative"
                            )}>
                                ${stock.price.toFixed(2)}
                            </TableCell>
                            <TableCell className={cn(
                                "text-right font-bold flex justify-end items-center gap-1",
                                isGainer ? 'text-chart-positive' : 'text-chart-negative'
                            )}>
                                {isGainer ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                                {stock.changePercent.toFixed(2)}%
                            </TableCell>
                            <TableCell className="text-right font-medium">${stock.fiftyTwoWeekHigh.toFixed(2)}</TableCell>
                            <TableCell className="text-right font-medium">${stock.fiftyTwoWeekLow.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

const MostActiveTable = ({ data }: { data: any[] }) => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent border-b-border/50">
                        <TableHead>Symbol</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Volume</TableHead>
                        <TableHead className="text-right">52W High</TableHead>
                        <TableHead className="text-right">52W Low</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((stock) => (
                        <TableRow key={stock.ticker} className="cursor-pointer border-b-border/50">
                            <TableCell className="font-bold">{stock.ticker}</TableCell>
                            <TableCell className="text-muted-foreground truncate max-w-[120px]">{stock.name}</TableCell>
                            <TableCell className={cn(
                                "text-right font-medium",
                                stock.price >= stock.fiftyTwoWeekHigh && "text-chart-positive",
                                stock.price <= stock.fiftyTwoWeekLow && "text-chart-negative"
                            )}>
                                ${stock.price.toFixed(2)}
                            </TableCell>
                            <TableCell className="text-right font-medium">
                                {stock.volume}
                            </TableCell>
                            <TableCell className="text-right font-medium">${stock.fiftyTwoWeekHigh.toFixed(2)}</TableCell>
                            <TableCell className="text-right font-medium">${stock.fiftyTwoWeekLow.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default function ExplorePage() {
    return (
        <div className="flex-1 space-y-6 p-4 sm:p-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight">Explore Markets</h1>
                <p className="text-muted-foreground">Discover top moving stocks.</p>
            </div>

            <Tabs defaultValue="gainers" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                    <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
                    <TabsTrigger value="losers">Top Losers</TabsTrigger>
                </TabsList>
                <TabsContent value="gainers" className="mt-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {filters.map((filter) => (
                            <FilterButton key={filter.name} filter={filter} />
                        ))}
                    </div>
                    <MarketMoversTable data={topGainersData} type="gainers" />
                    <div className="mt-4 flex justify-center">
                        <Button variant="outline">View More</Button>
                    </div>
                </TabsContent>
                <TabsContent value="losers" className="mt-6">
                     <div className="flex flex-wrap gap-2 mb-4">
                        {filters.map((filter) => (
                            <FilterButton key={filter.name} filter={filter} />
                        ))}
                    </div>
                    <MarketMoversTable data={topLosersData} type="losers" />
                    <div className="mt-4 flex justify-center">
                        <Button variant="outline">View More</Button>
                    </div>
                </TabsContent>
            </Tabs>

            <div className="space-y-4 pt-6">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight">Most Active</h2>
                    <p className="text-muted-foreground">Stocks with the highest trading volume.</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {filters.map((filter) => (
                        <FilterButton key={filter.name} filter={filter} />
                    ))}
                </div>
                <MostActiveTable data={mostActiveData} />
                <div className="mt-4 flex justify-center">
                    <Button variant="outline">View More</Button>
                </div>
            </div>
        </div>
    );
}
