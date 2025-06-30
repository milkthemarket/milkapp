'use client';

import { useState, useMemo } from "react";
import { accountsData, portfolioBreakdownData, watchlistData, historyData } from "@/lib/mock-data";
import { PortfolioChart } from "@/components/portfolio-chart";
import type { Timeframe } from "@/components/portfolio-chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { AreaChart, CandlestickChart, LineChart, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function DashboardPage() {
  const [account, setAccount] = useState("Taxable 5478-8965");
  const [timeframe, setTimeframe] = useState<Timeframe>("1D");
  const [returnType, setReturnType] = useState<'today' | 'total'>('today');
  const [chartType, setChartType] = useState<'line' | 'area' | 'candle'>('line');
  
  const activeAccountData = useMemo(() => {
    return accountsData.find(a => a.name === account)?.data ?? accountsData[0].data;
  }, [account]);

  const activeData = activeAccountData[timeframe];
  
  const { portfolioValue, gainLoss, isPositive } = useMemo(() => {
    if (!activeData || activeData.length === 0) {
        return { portfolioValue: "0.00", gainLoss: { amount: "+0.00", percent: "(+0.00%)", label: "Today", color: "text-muted-foreground" }, isPositive: true };
    }
    const lastValue = activeData[activeData.length - 1].value;
    const firstValue = activeData[0].value;
    const change = lastValue - firstValue;
    const percentageChange = firstValue === 0 ? 0 : (change / firstValue) * 100;
    
    const timeLabels: Record<Timeframe, string> = {
        "1D": "Today",
        "1W": "This Week",
        "1M": "This Month",
        "3M": "3 Months",
        "6M": "6 Months",
        "YTD": "This Year",
        "1Y": "1 Year",
        "5Y": "5 Years",
        "All": "All Time",
    }

    return {
        portfolioValue: lastValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        gainLoss: {
            amount: `${change >= 0 ? '+' : ''}${change.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            percent: `(${(percentageChange >= 0 ? '+' : '')}${percentageChange.toFixed(2)}%)`,
            label: timeLabels[timeframe],
        },
        isPositive: change >= 0,
    }
  }, [activeData, timeframe]);

  const portfolioStats = [
    { label: "Total Holdings", value: "8" },
    { label: "Cash Balance", value: "$1,500.00" },
    { label: "Today's Return", value: "+$200.00 (+2.0%)", color: "text-chart-positive" },
    { label: "Total Return", value: "+$1,650.00 (+19.2%)", color: "text-chart-positive" },
    { label: "Dividend Yield", value: "1.5%" },
    { label: "Avg. Expense Ratio", value: "0.13%" },
    { label: "Biggest Holding", value: "AAPL ($5,100.00)" },
    { label: "Top Performer", value: "NVDA (+5.4%)", color: "text-chart-positive" },
    { label: "Worst Performer", "value": "TSLA (-1.2%)", "color": "text-chart-negative" },
    { "label": "Total Dividends Received (YTD)", "value": "$230.00" },
    { "label": "Number of Trades This Year", "value": "34" },
    { "label": "Unrealized Gains", "value": "+$1,300.00", "color": "text-chart-positive" },
    { "label": "Risk Level", "value": "Medium" },
  ];

  const historyTypeConfig: { [key: string]: { color: string, sign: string } } = {
      Buy: { color: 'text-chart-positive', sign: '+' },
      Sell: { color: 'text-chart-negative', sign: '-' },
      Dividend: { color: 'text-chart-positive', sign: '+' },
      Deposit: { color: 'text-chart-positive', sign: '+' },
      Withdrawal: { color: 'text-chart-negative', sign: '-' },
  };


  return (
    <TooltipProvider>
      <div className="flex-1 space-y-8 p-4 sm:p-6 lg:p-8 min-h-screen w-full">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
              <div className="space-y-1.5 text-left">
                <p className="text-sm text-muted-foreground">Portfolio</p>
                <p className="text-5xl font-bold tracking-tighter text-white">
                  ${portfolioValue}
                </p>
                <p className={cn(
                    "text-lg",
                    isPositive ? 'text-chart-positive' : 'text-chart-negative'
                  )}>
                  {gainLoss.amount} {gainLoss.percent} {gainLoss.label}
                </p>
              </div>
               <Select value={account} onValueChange={setAccount}>
                  <SelectTrigger className="w-auto md:w-[240px]">
                      <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="Taxable 5478-8965">Taxable 5478-8965</SelectItem>
                      <SelectItem value="Roth 3245-7812">Roth 3245-7812</SelectItem>
                      <SelectItem value="Trust 7896-4523">
                          <div className="flex items-center justify-between w-full">
                              <span>Trust 7896-4523</span>
                              <Tooltip>
                                  <TooltipTrigger asChild onClick={(e) => e.stopPropagation()}>
                                      <Shield className="h-4 w-4 text-amber-400 ml-2" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                      <p>Managed by your advisor.</p>
                                  </TooltipContent>
                              </Tooltip>
                          </div>
                      </SelectItem>
                  </SelectContent>
              </Select>
          </div>
          <div>
            <PortfolioChart activeData={activeData} timeframe={timeframe} chartType={chartType} isPositive={isPositive} />
            <div className="flex items-center gap-2 mt-4">
              <Tabs
                value={timeframe}
                onValueChange={(value) => setTimeframe(value as Timeframe)}
                className="w-auto"
              >
                <ScrollArea className="w-full whitespace-nowrap">
                  <TabsList className="inline-flex w-auto justify-start bg-transparent p-0 text-foreground/70 gap-1 [&>[data-state=active]]:bg-transparent [&>[data-state=active]]:text-foreground [&>[data-state=active]]:font-bold [&>[data-state=active]]:shadow-none">
                      <TabsTrigger value="1D" className="px-2 py-1 text-xs uppercase">1D</TabsTrigger>
                      <TabsTrigger value="1W" className="px-2 py-1 text-xs uppercase">1W</TabsTrigger>
                      <TabsTrigger value="1M" className="px-2 py-1 text-xs uppercase">1M</TabsTrigger>
                      <TabsTrigger value="3M" className="px-2 py-1 text-xs uppercase">3M</TabsTrigger>
                      <TabsTrigger value="6M" className="px-2 py-1 text-xs uppercase">6M</TabsTrigger>
                      <TabsTrigger value="YTD" className="px-2 py-1 text-xs uppercase">YTD</TabsTrigger>
                      <TabsTrigger value="1Y" className="px-2 py-1 text-xs uppercase">1Y</TabsTrigger>
                      <TabsTrigger value="5Y" className="px-2 py-1 text-xs uppercase">5Y</TabsTrigger>
                      <TabsTrigger value="All" className="px-2 py-1 text-xs uppercase">MAX</TabsTrigger>
                  </TabsList>
                  <ScrollBar orientation="horizontal" className="invisible" />
                </ScrollArea>
              </Tabs>

              <Separator orientation="vertical" className="h-6" />

              <Tabs
                value={chartType}
                onValueChange={(value) => setChartType(value as 'line' | 'area' | 'candle')}
                className="w-auto"
              >
                <TabsList className="bg-transparent p-0 gap-1">
                  <TabsTrigger value="line" className={cn(
                    "h-8 w-8 p-1 text-muted-foreground rounded-md",
                    "data-[state=active]:bg-muted/50",
                    isPositive && "[&[data-state=active]]:text-chart-positive",
                    !isPositive && "[&[data-state=active]]:text-chart-negative"
                  )}>
                    <LineChart className="h-5 w-5" />
                  </TabsTrigger>
                  <TabsTrigger value="area" className={cn(
                    "h-8 w-8 p-1 text-muted-foreground rounded-md",
                    "data-[state=active]:bg-muted/50",
                     isPositive && "[&[data-state=active]]:text-chart-positive",
                    !isPositive && "[&[data-state=active]]:text-chart-negative"
                  )}>
                    <AreaChart className="h-5 w-5" />
                  </TabsTrigger>
                  <TabsTrigger value="candle" className={cn(
                    "h-8 w-8 p-1 text-muted-foreground rounded-md",
                    "data-[state=active]:bg-muted/50",
                    isPositive && "[&[data-state=active]]:text-chart-positive",
                    !isPositive && "[&[data-state=active]]:text-chart-negative"
                  )}>
                    <CandlestickChart className="h-5 w-5" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 text-white">
           <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold leading-none tracking-tight">Holdings</h2>
                  <Tabs value={returnType} onValueChange={(value) => setReturnType(value as 'today' | 'total')} className="w-auto">
                    <TabsList className="bg-transparent p-0 gap-4 h-auto">
                        <TabsTrigger value="today" className="p-0 text-sm text-muted-foreground rounded-none shadow-none data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:font-bold">Today's Return</TabsTrigger>
                        <TabsTrigger value="total" className="p-0 text-sm text-muted-foreground rounded-none shadow-none data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:font-bold">Total Return</TabsTrigger>
                    </TabsList>
                  </Tabs>
              </div>
              <Accordion type="single" collapsible className="w-full">
                {watchlistData.map((asset) => (
                  <AccordionItem value={asset.symbol} key={asset.symbol} className="border-b border-white/10 last:border-0">
                    <AccordionTrigger className="p-4 w-full text-left hover:no-underline transition-colors hover:bg-white/5 rounded-md">
                        <div className="grid grid-cols-2 items-center gap-4 w-full">
                            <div>
                                <p className="font-bold">{asset.symbol}</p>
                                <p className="text-sm text-muted-foreground">${asset.totalValue.toFixed(2)}</p>
                            </div>
                            <div className="text-right">
                                {returnType === 'today' ? (
                                  <p className={`font-medium ${asset.change >= 0 ? 'text-chart-positive' : 'text-chart-negative'}`}>
                                    {asset.change >= 0 ? '+' : ''}${asset.change.toFixed(2)} ({asset.changePercent.toFixed(2)}%)
                                  </p>
                                ) : (
                                  <p className={`font-medium ${asset.gainLoss >= 0 ? 'text-chart-positive' : 'text-chart-negative'}`}>
                                    {asset.gainLoss >= 0 ? '+' : ''}${asset.gainLoss.toFixed(2)} ({asset.totalGainLossPercent.toFixed(2)}%)
                                  </p>
                                )}
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                        <div className="space-y-4 pt-4 border-t border-white/10">
                            <ul className="space-y-2 text-sm">
                                <li className="flex justify-between">
                                    <span className="text-muted-foreground">% of Portfolio</span>
                                    <span>{asset.portfolioPercentage.toFixed(2)}%</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-muted-foreground">Total Shares</span>
                                    <span>{asset.sharesHeld}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-muted-foreground">Today's Return</span>
                                    <span className={asset.change >= 0 ? 'text-chart-positive' : 'text-chart-negative'}>
                                        {asset.change >= 0 ? '+' : ''}${asset.change.toFixed(2)} ({asset.changePercent.toFixed(2)}%)
                                    </span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-muted-foreground">Total Return</span>
                                    <span className={asset.gainLoss >= 0 ? 'text-chart-positive' : 'text-chart-negative'}>
                                        {asset.gainLoss >= 0 ? '+' : ''}${asset.gainLoss.toFixed(2)} ({asset.totalGainLossPercent.toFixed(2)}%)
                                    </span>
                                </li>
                            </ul>
                            <div className="flex gap-4 pt-2">
                                <Button variant="outline" className="w-full">Buy</Button>
                                <Button variant="outline" className="w-full">Sell</Button>
                            </div>
                        </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
           </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold leading-none tracking-tight">
              Portfolio Stats
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
              {portfolioStats.map((stat) => (
                <li
                  key={stat.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-muted-foreground">{stat.label}</span>
                  <span
                    className={cn(
                      "font-medium text-right",
                      stat.color
                    )}
                  >
                    {stat.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

           <div className="space-y-4">
              <h2 className="text-2xl font-semibold leading-none tracking-tight">Asset Allocation</h2>
              <ul className="space-y-2 text-sm">
                {portfolioBreakdownData.map((assetClass) => (
                  <li key={assetClass.name} className="flex justify-between">
                    <span className="text-muted-foreground">{assetClass.name}</span>
                    <span className="font-medium">{assetClass.percentage}%</span>
                  </li>
                ))}
              </ul>
          </div>

          <div className="space-y-4">
              <h2 className="text-2xl font-semibold leading-none tracking-tight">History</h2>
              <div className="flex flex-col">
                {historyData.map((item) => {
                  const config = historyTypeConfig[item.type];
                  if (!config) return null;
                  const { color, sign } = config;
                  
                  return (
                    <div key={item.id} className="flex items-center justify-between py-4 border-b border-white/10 last:border-0">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-bold">
                              <span className="font-bold">{item.type}</span>
                              {' '}
                              <span>{item.asset}</span>
                          </p>
                          <p className="text-sm text-muted-foreground">
                              {item.details || ''}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${color}`}>
                          {sign}$
                          {item.amount.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
           </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
