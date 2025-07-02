
export interface NewsArticle {
  headline: string;
  description: string;
  publishedDate: string;
  provider: string;
}

const NEWS_API_KEY = process.env.NEWS_API_KEY;

// Mock data to be used as a fallback if the API call fails or key is missing
function getMockNews(): NewsArticle[] {
  const now = new Date();
  return [
    {
      headline: 'Tesla shares rise after announcing new Gigafactory in Texas',
      description:
        'Tesla Inc. saw a 5% increase in its stock price following the announcement of a new manufacturing plant.',
      // Make this one very recent for testing 'breaking' news feature
      publishedDate: new Date(now.getTime() - 2 * 60 * 1000).toISOString(),
      provider: 'Reuters',
    },
    {
      headline: 'Apple unveils new iPhone with advanced AI features',
      description:
        'Apple Inc. launched its latest iPhone, which includes a new chip designed for on-device artificial intelligence.',
      publishedDate: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
      provider: 'Bloomberg',
    },
    {
      headline:
        'Microsoft closes deal to acquire gaming studio for $10 billion',
      description:
        'Microsoft Corporation has finalized its acquisition of a major video game development studio.',
      publishedDate: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
      provider: 'CNBC',
    },
    {
      headline: 'Market awaits Federal Reserve interest rate decision',
      description:
        'Investors are closely watching for the upcoming announcement from the Federal Reserve, which could impact market volatility.',
      publishedDate: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
      provider: 'The Verge',
    },
    {
      headline: 'Nvidia stock continues to climb on strong AI chip demand',
      description:
        'Nvidia Corporation shares are up again as the demand for their AI-focused GPUs shows no signs of slowing down.',
      publishedDate: new Date(now.getTime() - 10 * 60 * 60 * 1000).toISOString(),
      provider: 'MarketWatch',
    },
  ];
}


/**
 * Fetches recent news articles from a real news API.
 * Falls back to mock data if the API key is not provided or if the fetch fails.
 */
export async function getRecentNews(): Promise<NewsArticle[]> {
  if (!NEWS_API_KEY) {
    console.warn(
      'NewsAPI key not found in .env file. Using mock data as a fallback.'
    );
    return getMockNews();
  }

  // Get yesterday's date in YYYY-MM-DD format to ensure we get recent news.
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 1);
  const from = fromDate.toISOString().split('T')[0];
  
  // A more specific query to get relevant, recent news.
  const query = encodeURIComponent('Tesla OR Apple OR Microsoft OR Nvidia OR Google OR "stock market"');

  // Use the 'everything' endpoint and sort by publishedAt for the latest news
  const url = `https://newsapi.org/v2/everything?q=${query}&from=${from}&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}`;
  
  console.log(`Fetching news from URL: ${url}`);

  try {
    const response = await fetch(url, { cache: 'no-store' }); // Disable caching for fresh news
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`News API error: ${response.status} ${response.statusText} - ${errorBody}`);
    }
    const data = await response.json();

    // Log the raw data for verification
    console.log("Raw News API Response:", JSON.stringify(data, null, 2));

    if (data.status !== 'ok') {
        throw new Error(`News API returned status: ${data.status} - ${data.message || ''}`);
    }
    
    if (!data.articles || data.articles.length === 0) {
        console.warn("News API returned no articles for the current query. Falling back to mock data.");
        return getMockNews();
    }

    // Map and filter articles to fit our NewsArticle interface
    const articles: NewsArticle[] = data.articles
      .map((article: any) => ({
        headline: article.title,
        description: article.description,
        publishedDate: article.publishedAt,
        provider: article.source.name,
      }))
      .filter(
        (article: NewsArticle) => article.headline && article.description && article.publishedDate && article.provider
      );

    return articles;
  } catch (error) {
    console.error('Failed to fetch real news:', error);
    // In case of an API error, fall back to mock data
    console.log('Falling back to mock news data.');
    return getMockNews();
  }
}
