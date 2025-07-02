
'use server';
/**
 * @fileOverview A flow for fetching news articles and identifying stock tickers.
 *
 * - fetchNews - A function that fetches news and enriches it with ticker symbols.
 */

import { ai } from '@/ai/genkit';
import { getRecentNews } from '@/services/news';
import { z } from 'zod';
import {
  FetchNewsOutputSchema,
  NewsArticleSchema,
  type EnrichedNewsArticle,
} from './types';

export type { EnrichedNewsArticle } from './types';

// Define a tool that the AI can use to fetch news. This abstracts the data source.
const getNewsArticlesTool = ai.defineTool(
  {
    name: 'getNewsArticles',
    description: 'Retrieves a list of recent news articles.',
    inputSchema: z.void(),
    outputSchema: z.array(NewsArticleSchema),
  },
  async () => {
    // This calls our mock service, but could easily call a real API.
    return await getRecentNews();
  }
);

// Define the AI prompt.
const newsTickerPrompt = ai.definePrompt({
  name: 'newsTickerPrompt',
  // Provide the tool to the prompt, so the AI knows it can use it.
  tools: [getNewsArticlesTool],
  // Instruct the AI on how to process the data from the tool.
  system: `You are a financial news analyst. Your task is to fetch recent news articles using the provided tool, perform sentiment analysis on each headline, and identify the stock ticker for the primary company mentioned.

Sentiment should be classified as 'Positive', 'Negative', or 'Neutral'.

Use the following mapping to determine the ticker symbol:
- Tesla, Inc. or Tesla -> TSLA
- Apple Inc. or Apple -> AAPL
- Microsoft Corporation or Microsoft -> MSFT
- Nvidia Corporation or Nvidia -> NVDA
- Google LLC or Alphabet -> GOOGL

If an article does not mention any of these companies, the ticker should be null.
Return the full list of articles, each with its identified ticker symbol and sentiment. Preserve the provider information.
`,
  output: {
    schema: FetchNewsOutputSchema,
  },
});

// Define the main flow.
const fetchNewsFlow = ai.defineFlow(
  {
    name: 'fetchNewsFlow',
    inputSchema: z.void(),
    outputSchema: FetchNewsOutputSchema,
  },
  async () => {
    const { output } = await newsTickerPrompt();
    return output || [];
  }
);

/**
 * Fetches and processes news articles to include their relevant stock tickers.
 * @returns A promise that resolves to an array of enriched news articles.
 */
export async function fetchNews(): Promise<EnrichedNewsArticle[]> {
  return fetchNewsFlow();
}
