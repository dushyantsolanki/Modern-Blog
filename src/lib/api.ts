import { Post, Author } from "./types";

/**
 * For client-side requests, use the relative /api path to leverage the Next.js rewrite/proxy.
 * For server-side requests, use the absolute URL to communicate directly with the admin-panel.
 */
// const API_URL = typeof window !== 'undefined' ? '/api' : 'http://localhost:3000/api';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Category {
  name: string;
  slug: string;
  description?: string;
  color?: string;
  imageUrl?: string;
  totalPost?: number;
}

export interface PaginatedPosts {
  posts: Post[];
  pagination: {
    totalPosts: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    hasMore: boolean;
  };
}

export interface PaginatedCategories {
  categories: Category[];
  pagination: {
    totalCategories: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    hasMore: boolean;
  };
}

/**
 * Maps API post data to Frontend Post interface
 */
function mapPost(post: any): Post {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || "",
    category: typeof post.category === 'object' ? post.category?.name : (post.category || "Uncategorized"),
    categoryColor: typeof post.category === 'object' ? post.category?.color : "",
    date: new Date(post.date || post.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }),
    readTime: post.readTime || "5 min read",
    author: {
      name: post.author?.name || "Anonymous",
      avatar: (post.author?.avatar || "").trim(),
      bio: post.author?.bio || "",
      role: post.author?.role || ""
    },
    image: (post.image || "").trim() || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    heroImage: (post.image || "").trim(),
    videoUrl: post.videoUrl,
    content: post.content,
    summaryPoints: post.summaryPoints || [],
    isHero: post.isHero || false,
    isFeatured: post.isFeatured || false
  };
}

/**
 * Fetches paginated posts from the API
 */
export async function getPosts(params: {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  categorySlug?: string;
  authorId?: string;
  status?: string;
} = {}): Promise<PaginatedPosts> {
  const {
    page = 1,
    limit = 10,
    search = "",
    sort = "latest",
    categorySlug = "",
    authorId = "",
    status = "published"
  } = params;

  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
      sort,
      status
    });

    if (categorySlug) queryParams.set("categorySlug", categorySlug);
    if (authorId) queryParams.set("authorId", authorId);

    const url = `${API_URL}/posts?${queryParams.toString()}`;
    console.log(`[API] Fetching posts: ${url}`);

    const response = await fetch(url, { cache: 'force-cache' });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      posts: (data.posts || []).map(mapPost),
      pagination: data.pagination || {
        totalPosts: 0,
        totalPages: 0,
        currentPage: page,
        limit,
        hasMore: false
      }
    };
  } catch (error) {
    console.error("[API] Error in getPosts:", error);
    return {
      posts: [],
      pagination: { totalPosts: 0, totalPages: 0, currentPage: page, limit, hasMore: false }
    };
  }
}

/**
 * Fetches all posts based on status and sort order
 */
export async function getAllPosts(status: string = "published", sort: string = "latest"): Promise<Post[]> {
  try {
    const params = new URLSearchParams({ status, sort });
    const url = `${API_URL}/posts/all?${params.toString()}`;

    console.log(`[API] Fetching all posts: ${url}`);
    const response = await fetch(url, { cache: 'force-cache' });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const posts = await response.json();
    return Array.isArray(posts) ? posts.map(mapPost) : [];
  } catch (error) {
    console.error("[API] Error in getAllPosts:", error);
    return [];
  }
}

/**
 * Fetches a single post by its slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const url = `${API_URL}/posts/slug/${slug}`;
    console.log(`[API] Fetching post by slug: ${slug}`);

    const response = await fetch(url, { cache: 'force-cache' });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data)
    return data.post ? mapPost(data.post) : null;
  } catch (error) {
    console.error("[API] Error in getPostBySlug:", error);
    return null;
  }
}

/**
 * Fetches paginated categories
 */
export async function getCategories(params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sort?: string;
} = {}): Promise<PaginatedCategories> {
  const { page = 1, limit = 12, search = "", status = "active", sort = "name" } = params;

  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
      status,
      sort
    });

    const url = `${API_URL}/categories?${queryParams.toString()}`;
    const response = await fetch(url, { cache: 'force-cache' });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    return {
      categories: data.categories || [],
      pagination: data.pagination
    };
  } catch (error) {
    console.error("[API] Error in getCategories:", error);
    return {
      categories: [],
      pagination: { totalCategories: 0, totalPages: 0, currentPage: page, limit, hasMore: false }
    };
  }
}

/**
 * Fetches all categories
 */
export async function getAllCategories(): Promise<Category[]> {
  try {
    const url = `${API_URL}/categories/all`;
    const response = await fetch(url, { cache: 'force-cache' });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const categories = await response.json();
    return Array.isArray(categories) ? categories : [];
  } catch (error) {
    console.error("[API] Error in getAllCategories:", error);
    return [];
  }
}

export interface ContactMessage {
  senderName: string;
  senderEmail: string;
  subject: string;
  content: string;
}

/**
 * Sends a contact message
 */
export async function sendMessage(message: ContactMessage): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      const data = await response.json();
      return { success: false, error: data.error || `Error ${response.status}` };
    }

    return { success: true };
  } catch (error: any) {
    console.error("[API] Error in sendMessage:", error);
    return { success: false, error: error.message || "Failed to send message" };
  }
}

/**
 * Fetches all active authors
 */
export async function getAuthors(): Promise<Author[]> {
  try {
    const url = `${API_URL}/authors`;
    const response = await fetch(url, { cache: 'force-cache' });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    const authorsArr = Array.isArray(data) ? data : data.authors || [];

    return authorsArr.map((author: any) => ({
      ...author,
      avatar: (author.avatar || "").trim()
    }));
  } catch (error) {
    console.error("[API] Error in getAuthors:", error);
    return [];
  }
}

/**
 * Fetches an author by ID
 */
export async function getAuthorById(id: string): Promise<Author | null> {
  try {
    const response = await fetch(`${API_URL}/authors/${id}`, { cache: 'force-cache' });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const author = await response.json();
    if (author) author.avatar = (author.avatar || "").trim();
    return author;
  } catch (error) {
    console.error("[API] Error in getAuthorById:", error);
    return null;
  }
}

/**
 * Fetches an author by Name (used for SEO-friendly URLs)
 */
export async function getAuthorByName(name: string): Promise<Author | null> {
  try {
    const url = `${API_URL}/authors?name=${encodeURIComponent(name)}`;
    const response = await fetch(url, { cache: 'force-cache' });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const author = await response.json();
    if (author) author.avatar = (author.avatar || "").trim();
    return author;
  } catch (error) {
    console.error("[API] Error in getAuthorByName:", error);
    return null;
  }
}

/**
 * Fetches hero, featured and latest posts for the home page
 */
export async function getHomePosts(): Promise<{
  heroPosts: Post[],
  featuredPosts: Post[],
  latestPosts: Post[]
}> {
  try {
    const url = `${API_URL}/posts/home`;
    const response = await fetch(url, { cache: 'no-store' }); // Home page often needs fresh data

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    return {
      heroPosts: (data.heroPosts || []).map(mapPost),
      featuredPosts: (data.featuredPosts || []).map(mapPost),
      latestPosts: (data.latestPosts || []).map(mapPost)
    };
  } catch (error) {
    console.error("[API] Error in getHomePosts:", error);
    return { heroPosts: [], featuredPosts: [], latestPosts: [] };
  }
}

/**
 * Fetches categories marked for home display
 */
export async function getHomeCategories(): Promise<Category[]> {
  try {
    const url = `${API_URL}/categories/home`;
    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const categories = await response.json();
    return Array.isArray(categories) ? categories : [];
  } catch (error) {
    console.error("[API] Error in getHomeCategories:", error);
    return [];
  }
}
