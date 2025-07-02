'use client'

import { Area, Line, ComposedChart, CartesianGrid, XAxis, YAxis, TooltipProps } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"
import { useMemo } from "react"
import { format, parseISO } from "date-fns";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

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
        className="h-[350px] w-full"
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
                tick={false}
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
                content={({ active, payload }: TooltipProps<ValueType, NameType>) => {
                    if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                            <div className="rounded-lg border bg-popover p-2 text-popover-foreground shadow-sm">
                                <div className="grid grid-cols-1 gap-1.5">
                                     <span className="text-sm text-muted-foreground">
                                        {format(parseISO(data.time), "MMM d, yyyy, HH:mm")}
                                     </span>
                                    <span className="font-bold">
                                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.value)}
                                    </span>
                                </div>
                            </div>
                        );
                    }
                    return null;
                }}
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
