export interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
  };
  twitter?: {
    title?: string;
    description?: string;
    image?: string;
    cardType?: 'summary' | 'summary_large_image';
  };
  robots?: {
    index: boolean;
    follow: boolean;
  };
  structuredData?: any; // JSON-LD schema
}
