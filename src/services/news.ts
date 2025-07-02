
export interface NewsArticle {
  headline: string;
  description: string;
  publishedDate: string;
  provider: string;
}

const EVENT_REGISTRY_API_KEY = process.env.EVENT_REGISTRY_API_KEY;

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
 * Fetches recent news articles from the Event Registry API.
 * Falls back to mock data if the API key is not provided or if the fetch fails.
 */
export async function getRecentNews(): Promise<NewsArticle[]> {
  if (!EVENT_REGISTRY_API_KEY) {
    console.warn(
      'Event Registry API key not found in .env file. Using mock data as a fallback.'
    );
    return getMockNews();
  }

  const url = "https://eventregistry.org/api/v1/article/getArticles";
  const requestBody = {
      "query": {
          "$query": {
              "$or": [
                  { "sourceUri": "benzinga.com" },
                  { "sourceUri": "seekingalpha.com" },
                  { "sourceUri": "bloomberg.com" },
                  { "sourceUri": "reuters.com" },
                  { "sourceUri": "cnbc.com" },
                  { "sourceUri": "finance.yahoo.com" },
                  { "sourceUri": "wsj.com" },
                  { "sourceUri": "ft.com" },
                  { "sourceUri": "investing.com" },
                  { "sourceUri": "marketwatch.com" }
              ]
          },
          "$filter": {
              "forceMaxDataTimeWindow": "31"
          }
      },
      "resultType": "articles",
      "articlesSortBy": "date",
      "articlesCount": 100,
      "apiKey": EVENT_REGISTRY_API_KEY
  };

  console.log(`Fetching news from Event Registry: ${url}`);
  console.log(`Request body: ${JSON.stringify(requestBody, null, 2)}`);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      cache: 'no-store', // Disable caching for fresh news
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Event Registry API error: ${response.status} ${response.statusText} - ${errorBody}`);
    }
    const data = await response.json();

    // Log the raw data for verification
    console.log("Raw Event Registry API Response:", JSON.stringify(data, null, 2));

    if (!data.articles || !data.articles.results || data.articles.results.length === 0) {
        console.warn("Event Registry API returned no articles for the current query. Falling back to mock data.");
        return getMockNews();
    }

    // Map and filter articles to fit our NewsArticle interface
    const articles: NewsArticle[] = data.articles.results
      .map((article: any) => ({
        headline: article.title,
        description: article.body,
        publishedDate: article.dateTimePub,
        provider: article.source.title,
      }))
      .filter(
        (article: NewsArticle) => article.headline && article.description && article.publishedDate && article.provider
      );

    return articles;
  } catch (error) {
    console.error('Failed to fetch real news from Event Registry:', error);
    // In case of an API error, fall back to mock data
    console.log('Falling back to mock news data.');
    return getMockNews();
  }
}
