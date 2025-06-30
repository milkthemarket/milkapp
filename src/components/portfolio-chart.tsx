'use client'

import { Area, Line, ComposedChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useMemo } from "react"
import { format, parseISO } from "date-fns";

export type Timeframe = "1D" | "1W" | "1M" | "3M" | "6M" | "YTD" | "1Y" | "5Y" | "All";

export type ChartDataPoint = {
  time: string;
  value: number;
};

interface PortfolioChartProps {
  activeData: ChartDataPoint[];
  timeframe: Timeframe;
  chartType: 'line' | 'area' | 'candle';
  isPositive: boolean;
}

export function PortfolioChart({ activeData, timeframe, chartType, isPositive }: PortfolioChartProps) {
  
  const chartColor = useMemo(() => isPositive ? "hsl(var(--chart-positive))" : "hsl(var(--chart-negative))", [isPositive]);
  const gradientColor = useMemo(() => isPositive ? "var(--color-positive)" : "var(--color-negative)", [isPositive]);

  const tickFormatter = (date: string) => {
    switch (timeframe) {
      case "1D":
        return format(parseISO(date), "HH:mm");
      case "1W":
      case "1M":
        return format(parseISO(date), "MMM d");
      case "3M":
      case "6M":
      case "YTD":
      case "1Y":
         return format(parseISO(date), "MMM");
      case "5Y":
      case "All":
        return format(parseISO(date), "yyyy");
      default:
        return format(parseISO(date), "MMM d");
    }
  };

  return (
      <ChartContainer 
        config={{
            value: {
                label: "Value",
            },
            positive: {
                label: "Positive",
                color: "hsl(var(--chart-positive))"
            },
            negative: {
                label: "Negative",
                color: "hsl(var(--chart-negative))"
            }
        }} 
        className="h-[250px] w-full"
    >
        <ComposedChart
            accessibilityLayer
            data={activeData}
            margin={{
                left: 0,
                right: 0,
                top: 5,
                bottom: 0,
            }}
        >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsla(var(--border)/0.5)" />
            <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={tickFormatter}
                style={{ fontSize: '12px' }}
            />
            <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                orientation="right"
                tickFormatter={(value) => `$${(Number(value) / 1000)}k`}
                style={{ fontSize: '12px' }}
            />
            <ChartTooltip
                cursor={{stroke: "hsl(var(--foreground))", strokeWidth: 1, strokeDasharray: "3 3"}}
                content={<ChartTooltipContent 
                    indicator={chartType === 'line' ? 'dot' : 'line'} 
                    formatter={(value, name) => (
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">{format(parseISO(name as string), "MMM d, yyyy, HH:mm")}</span>
                        <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value as number)}</span>
                      </div>
                    )}
                    labelFormatter={(_, payload) => payload?.[0]?.payload.time}
                    />
                }
            />
            <defs>
                <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                        offset="5%"
                        stopColor={gradientColor}
                        stopOpacity={0.8}
                    />
                    <stop
                        offset="95%"
                        stopColor={gradientColor}
                        stopOpacity={0.1}
                    />
                </linearGradient>
            </defs>
            {chartType === 'area' && (
                <Area
                    dataKey="value"
                    type="natural"
                    fill="url(#fillValue)"
                    stroke={chartColor}
                    strokeWidth={2}
                    dot={false}
                />
            )}
            {(chartType === 'line' || chartType === 'candle') && (
                 <Line
                    dataKey="value"
                    type="natural"
                    stroke={chartColor}
                    strokeWidth={2}
                    dot={false}
                />
            )}
        </ComposedChart>
    </ChartContainer>
  )
}
