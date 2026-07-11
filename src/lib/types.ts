export interface Author {
  _id: string;
  slug?: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  gradient: string;
  location: string;
  joined: string;
  postCount: number;
  social: {
    twitter: string;
    linkedin: string;
    github: string;
    website: string;
  };
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
    bio?: string;
    role?: string;
  };
  image: string;
  heroImage?: string;
  videoUrl?: string;
  audioUrl?: string;
  content?: string;
  summaryPoints?: string[];
  views?: number;
  avgTime?: string;
  isHero: boolean;
  isFeatured: boolean;
  seo?: {
    focusKeyword?: string;
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
  };
}
