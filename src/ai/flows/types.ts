
import { z } from 'zod';

export const NewsArticleSchema = z.object({
  headline: z.string(),
  description: z.string(),
  publishedDate: z.string().datetime(),
  provider: z.string(),
});

export const EnrichedNewsArticleSchema = NewsArticleSchema.extend({
  ticker: z
    .string()
    .nullable()
    .describe('The stock ticker for the primary company mentioned.'),
  sentiment: z
    .enum(['Positive', 'Negative', 'Neutral'])
    .describe('The sentiment of the article headline (Positive, Negative, or Neutral).'),
});
export type EnrichedNewsArticle = z.infer<typeof EnrichedNewsArticleSchema>;

export const FetchNewsOutputSchema = z.array(EnrichedNewsArticleSchema);
