export type Difficulty = 'Easy' | 'Easy-Moderate' | 'Moderate' | 'Moderate-Challenging' | 'Challenging' | 'Demanding';

export type DestinationType = 'Hill Fort' | 'Mountain Summit' | 'Canyon & Valley' | 'Waterfall & Nature';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  marathiName?: string;
  tagline: string;
  type: DestinationType;
  district: string;
  region: string;
  elevation: string;
  trailDistance: string;
  duration: string;
  difficulty: Difficulty;
  bestSeason: string;
  baseVillage: string;
  coordinates?: string;
  image: string;
  fallbackImage?: string;
  imageAlt: string;
  overview: string;
  historicalSignificance: string;
  trailRouteDetails: string;
  preparationAdvice: string[];
  safetyGuidelines: string[];
  faqs: FAQItem[];
  relatedDestinationSlugs: string[];
  relatedBlogSlugs: string[];
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  category: 'Guides' | 'Safety' | 'Heritage' | 'Seasonal' | 'Preparation';
  readTime: string;
  publishDate: string;
  author: string;
  image: string;
  fallbackImage?: string;
  imageAlt: string;
  excerpt: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      level?: 'h2' | 'h3';
      body: string[];
      listItems?: string[];
      tipBox?: string;
    }[];
    conclusion: string;
  };
  faqs: FAQItem[];
  relatedDestinationSlugs: string[];
  relatedBlogSlugs: string[];
}
