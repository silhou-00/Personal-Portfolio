import type { MetadataRoute } from 'next';

/* Crawlers that exist to collect text for training corpora or to answer
   questions by reproducing page content. Search engines are deliberately NOT
   in this list - a portfolio wants to be findable.
 *
 * Google-Extended and Applebot-Extended are training-only tokens: blocking
 * them does not remove the site from Google Search or Siri results.
 *
 * This file is a request, not a control. It is honoured by operators who
 * choose to honour it and ignored by everyone else, so it belongs alongside
 * the decisions below about what the page publishes in the first place. */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'FacebookBot',
  'CCBot',
  'PerplexityBot',
  'Perplexity-User',
  'Bytespider',
  'Amazonbot',
  'cohere-ai',
  'cohere-training-data-crawler',
  'Diffbot',
  'ImagesiftBot',
  'Omgilibot',
  'Timpibot',
  'YouBot',
  'AI2Bot',
  'Kangaroo Bot',
  'PanguBot',
  'Webzio-Extended',
  'Scrapy',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, disallow: '/' })),
      /* The resume carries a phone number and a home city, so it is kept out
         of search results. Note what this does and does not do: a compliant
         crawler will skip it, but the file stays publicly fetchable by anyone
         who has the URL. robots.txt is a request, not access control. */
      { userAgent: '*', allow: '/', disallow: ['/portfolio/'] },
    ],
    sitemap: 'https://matportfolio.vercel.app/sitemap.xml',
    host: 'https://matportfolio.vercel.app',
  };
}
