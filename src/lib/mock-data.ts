import type { Timeframe, ChartDataPoint } from "@/components/portfolio-chart";

function generateChartData(base: number, points: number, volatility: number, trend: number): ChartDataPoint[] {
    const data: ChartDataPoint[] = [];
    let value = base;
    for (let i = 0; i < points; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (points - i));
        value += (Math.random() - 0.5) * volatility + trend;
        if(value < 0) value = 0;
        data.push({ time: date.toISOString(), value: value });
    }
    return data;
}

const account1Data: Record<Timeframe, ChartDataPoint[]> = {
    "1D": generateChartData(10100, 24, 50, 0.5),
    "1W": generateChartData(10000, 7 * 24, 20, 0.2),
    "1M": generateChartData(9500, 30 * 24, 15, 0.1),
    "3M": generateChartData(8500, 90 * 24, 25, 0.05),
    "6M": generateChartData(8000, 180 * 24, 30, 0.04),
    "YTD": generateChartData(7500, 200 * 24, 35, 0.06), // Assuming 200 days passed in the year
    "1Y": generateChartData(7000, 365 * 24, 22, 0.03),
    "5Y": generateChartData(5000, 5 * 365 * 24, 40, 0.01),
    "All": generateChartData(4500, 6 * 365 * 24, 45, 0.01),
};

const account2Data: Record<Timeframe, ChartDataPoint[]> = {
    "1D": generateChartData(50500, 24, 100, -0.2),
    "1W": generateChartData(51000, 7 * 24, 80, -0.1),
    "1M": generateChartData(52000, 30 * 24, 60, 0.05),
    "3M": generateChartData(48000, 90 * 24, 120, 0.08),
    "6M": generateChartData(45000, 180 * 24, 150, 0.07),
    "YTD": generateChartData(42000, 200 * 24, 180, 0.09),
    "1Y": generateChartData(38000, 365 * 24, 130, 0.06),
    "5Y": generateChartData(25000, 5 * 365 * 24, 200, 0.03),
    "All": generateChartData(20000, 8 * 365 * 24, 220, 0.025),
};

const account3Data: Record<Timeframe, ChartDataPoint[]> = {
    "1D": generateChartData(250100, 24, 200, 0.1),
    "1W": generateChartData(250000, 7 * 24, 150, 0.05),
    "1M": generateChartData(248000, 30 * 24, 120, 0.08),
    "3M": generateChartData(240000, 90 * 24, 250, 0.06),
    "6M": generateChartData(230000, 180 * 24, 300, 0.05),
    "YTD": generateChartData(220000, 200 * 24, 350, 0.07),
    "1Y": generateChartData(200000, 365 * 24, 280, 0.04),
    "5Y": generateChartData(150000, 5 * 365 * 24, 400, 0.02),
    "All": generateChartData(120000, 10 * 365 * 24, 450, 0.015),
};


export const accountsData = [
    { name: "Taxable 5478-8965", data: account1Data },
    { name: "Roth 3245-7812", data: account2Data },
    { name: "Trust 7896-4523", data: account3Data },
]

export const portfolioBreakdownData = [
  { name: 'U.S. Large Cap', percentage: 40 },
  { name: 'U.S. Mid Cap', percentage: 15 },
  { name: 'U.S. Small Cap', percentage: 5 },
  { name: 'International Developed', percentage: 25 },
  { name: 'International Emerging', percentage: 10 },
  { name: 'Bonds', percentage: 5 },
];

export const watchlistData = [
  { symbol: 'AAPL', totalValue: 5100.00, change: 12.50, changePercent: 2.5, gainLoss: 450.00, totalGainLossPercent: 9.7, portfolioPercentage: 25.5, sharesHeld: 30 },
  { symbol: 'NVDA', totalValue: 4200.00, change: 50.10, changePercent: 5.4, gainLoss: 800.00, totalGainLossPercent: 23.5, portfolioPercentage: 21.0, sharesHeld: 10 },
  { symbol: 'TSLA', totalValue: 2800.00, change: -25.00, changePercent: -1.2, gainLoss: -150.00, totalGainLossPercent: -5.1, portfolioPercentage: 14.0, sharesHeld: 15 },
  { symbol: 'VTI', totalValue: 6400.00, change: 8.20, changePercent: 0.8, gainLoss: 550.00, totalGainLossPercent: 9.4, portfolioPercentage: 32.0, sharesHeld: 25 },
  { symbol: 'VXUS', totalValue: 1500.00, change: 2.30, changePercent: 0.5, gainLoss: 50.00, totalGainLossPercent: 3.4, portfolioPercentage: 7.5, sharesHeld: 28 },
];

export const historyData = [
    { id: 1, type: 'Buy', asset: 'NVDA', details: '10 shares @ $415.00', amount: 4150.00, date: '2 days ago' },
    { id: 2, type: 'Sell', asset: 'TSLA', details: '5 shares @ $265.00', amount: 1325.00, date: '5 days ago' },
    { id: 3, type: 'Dividend', asset: 'AAPL', details: 'Q3 Dividend', amount: 7.20, date: '1 week ago' },
    { id: 4, type: 'Deposit', asset: 'USD', details: 'Bank Transfer', amount: 5000.00, date: '2 weeks ago' },
    { id: 5, type: 'Withdrawal', asset: 'USD', details: 'Bank Transfer', amount: 2000.00, date: '3 weeks ago' },
];
