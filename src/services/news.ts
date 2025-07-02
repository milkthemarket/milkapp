export interface NewsArticle {
  headline: string;
  description: string;
  publishedDate: string;
  provider: string;
}

// Mock data to simulate fetching from a news API
const mockNewsData: NewsArticle[] = [
  {
    headline: 'Tesla shares rise after announcing new Gigafactory in Texas',
    description:
      'Tesla Inc. saw a 5% increase in its stock price following the announcement of a new manufacturing plant.',
    publishedDate: '2024-08-15T14:00:00Z',
    provider: 'Reuters',
  },
  {
    headline: 'Apple unveils new iPhone with advanced AI features',
    description:
      'Apple Inc. launched its latest iPhone, which includes a new chip designed for on-device artificial intelligence.',
    publishedDate: '2024-08-15T12:30:00Z',
    provider: 'Bloomberg',
  },
  {
    headline:
      'Microsoft closes deal to acquire gaming studio for $10 billion',
    description:
      'Microsoft Corporation has finalized its acquisition of a major video game development studio.',
    publishedDate: '2024-08-15T11:00:00Z',
    provider: 'CNBC',
  },
  {
    headline: 'Market awaits Federal Reserve interest rate decision',
    description:
      'Investors are closely watching for the upcoming announcement from the Federal Reserve, which could impact market volatility.',
    publishedDate: '2024-08-15T10:00:00Z',
    provider: 'The Verge',
  },
  {
    headline: 'Nvidia stock continues to climb on strong AI chip demand',
    description:
      'Nvidia Corporation shares are up again as the demand for their AI-focused GPUs shows no signs of slowing down.',
    publishedDate: '2024-08-14T18:00:00Z',
    provider: 'MarketWatch',
  },
];

/**
 * Fetches recent news articles from a simulated external API.
 */
export async function getRecentNews(): Promise<NewsArticle[]> {
  // In a real application, this would be a call to a service like NewsAPI.org
  return Promise.resolve(mockNewsData);
}
