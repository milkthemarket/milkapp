
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

export const accountsData = [
    { name: "Individual", data: account1Data },
    { name: "Roth", data: account2Data },
]

export const portfolioDistributionData = [
  { name: 'Fund', value: 8800.00, allocation: 88, gain: 1200.00, color: '#4338CA' },
  { name: 'Stock', value: 1200.00, allocation: 12, gain: -150.00, color: '#6D28D9' },
  { name: 'Bonds', value: 1000.00, allocation: 10, gain: 50.00, color: '#8B5CF6' },
  { name: 'Cash', value: 500.00, allocation: 5, gain: 0.00, color: '#A78BFA' },
  { name: 'Crypto', value: 1500.00, allocation: 15, gain: 300.00, color: '#C4B5FD' },
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

export const topGainersData = [
  { ticker: 'UPST', name: 'Upstart Holdings', price: 35.60, change: 8.90, changePercent: 33.33 },
  { ticker: 'AFRM', name: 'Affirm Holdings', price: 49.88, change: 10.11, changePercent: 25.42 },
  { ticker: 'COIN', name: 'Coinbase Global', price: 175.21, change: 25.71, changePercent: 17.20 },
  { ticker: 'RBLX', name: 'Roblox Corp', price: 45.15, change: 5.45, changePercent: 13.76 },
  { ticker: 'AI', name: 'C3.ai, Inc.', price: 33.10, change: 3.50, changePercent: 11.82 },
  { ticker: 'SOFI', name: 'SoFi Technologies', price: 8.54, change: 0.82, changePercent: 10.62 },
];

export const topLosersData = [
  { ticker: 'PFE', name: 'Pfizer Inc.', price: 28.55, change: -3.85, changePercent: -11.88 },
  { ticker: 'NIO', name: 'NIO Inc.', price: 7.78, change: -0.92, changePercent: -10.57 },
  { ticker: 'CHPT', name: 'ChargePoint Holdings', price: 2.15, change: -0.23, changePercent: -9.66 },
  { ticker: 'PLUG', name: 'Plug Power Inc.', price: 4.01, change: -0.42, changePercent: -9.48 },
  { ticker: 'XPEV', name: 'XPeng Inc.', price: 15.02, change: -1.45, changePercent: -8.80 },
  { ticker: 'LCID', name: 'Lucid Group, Inc.', price: 4.45, change: -0.40, changePercent: -8.25 },
];

export const mostActiveData = [
  { ticker: 'TSLA', name: 'Tesla, Inc.', price: 177.29, volume: '150.5M' },
  { ticker: 'AAPL', name: 'Apple Inc.', price: 192.53, volume: '120.2M' },
  { ticker: 'AMZN', name: 'Amazon.com, Inc.', price: 185.07, volume: '110.8M' },
  { ticker: 'NVDA', name: 'NVIDIA Corporation', price: 903.67, volume: '98.7M' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', price: 139.81, volume: '85.4M' },
  { ticker: 'MSFT', name: 'Microsoft Corporation', price: 427.56, volume: '76.1M' },
];
