
'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { portfolioDistributionData } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const data = portfolioDistributionData;
const totalAssets = data.length;

export function PortfolioDistribution() {
  const [activeTab, setActiveTab] = useState('asset-types');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold leading-none tracking-tight">Portfolio distribution</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-transparent p-0 justify-start gap-4 border-b border-white/10 rounded-none h-auto">
          <TabsTrigger value="asset-types" className="px-3 py-1.5 text-sm font-medium text-muted-foreground rounded-full data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:shadow-none">
            Asset types
          </TabsTrigger>
          <TabsTrigger value="sectors" className="px-3 py-1.5 text-sm font-medium text-muted-foreground rounded-full data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:shadow-none">
            Sectors
          </TabsTrigger>
        </TabsList>
        <TabsContent value="asset-types" className="mt-6">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Donut Chart */}
            <div className="relative w-full md:w-1/2 h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="100%"
                    dataKey="value"
                    stroke="none"
                    labelLine={false}
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      percent,
                      index,
                    }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);

                      return (
                        <text
                          x={x}
                          y={y}
                          fill="white"
                          textAnchor={x > cx ? 'start' : 'end'}
                          dominantBaseline="central"
                          className="text-xs"
                        >
                          {`${(percent * 100).toFixed(0)}% ${data[index].name}`}
                        </text>
                      );
                    }}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-4xl font-bold">{totalAssets}</p>
                <p className="text-sm text-muted-foreground">Total assets</p>
              </div>
            </div>

            {/* Breakdown Table */}
            <div className="w-full md:w-1/2 space-y-4">
               <div className="text-xs text-muted-foreground grid grid-cols-4 gap-4 px-4">
                   <span>Asset type</span>
                   <span className="text-left">Holding value</span>
                   <span className="text-left">Allocation</span>
                   <span className="text-right">Unrealized gain</span>
               </div>
               <div className="space-y-2">
                {data.map((item) => (
                    <div key={item.name} className="grid grid-cols-4 gap-4 items-center text-sm p-4 rounded-md bg-white/5">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                            <span>{item.name}</span>
                        </div>
                        <div className="font-semibold">
                            ${item.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <div>{item.allocation}%</div>
                        <div className={cn(
                            "text-right font-medium",
                            item.gain >= 0 ? 'text-chart-positive' : 'text-chart-negative'
                        )}>
                            {item.gain >= 0 ? '+' : ''}${item.gain.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>
                ))}
               </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="sectors">
          <div className="text-center text-muted-foreground py-16">Sectors view is not implemented yet.</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
