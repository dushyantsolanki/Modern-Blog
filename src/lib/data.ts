export interface Author {
  id: string;
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
  date: string;
  readTime: string;
  author: { name: string; avatar: string };
  image: string;
  heroImage?: string;
  videoUrl?: string;
  content?: string;
}

export const authors: Author[] = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    role: "Founder & Editor-in-Chief",
    bio: "Former tech journalist at Wired. 10 years covering the intersection of technology and creativity. Passionate about AI, design systems, and the future of work.",
    avatar: "",
    gradient: "from-indigo-500 to-pink-500",
    location: "San Francisco, CA",
    joined: "June 2022",
    postCount: 42,
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      website: "#",
    }
  },
  {
    id: "marcus-lee",
    name: "Marcus Lee",
    role: "Senior Writer",
    bio: "Productivity expert and former startup CTO. Writes about systems, frameworks, and working smarter. Believes that the right tools can unlock human potential.",
    avatar: "",
    gradient: "from-emerald-500 to-cyan-500",
    location: "London, UK",
    joined: "August 2022",
    postCount: 35,
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      website: "#",
    }
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    role: "Sustainability Editor",
    bio: "Environmental scientist turned tech writer. Passionate about sustainable technology and green innovation. Exploring how tech can solve global challenges.",
    avatar: "",
    gradient: "from-orange-500 to-amber-500",
    location: "Bangalore, India",
    joined: "October 2022",
    postCount: 28,
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      website: "#",
    }
  },
  {
    id: "alex-rivera",
    name: "Alex Rivera",
    role: "Design Lead",
    bio: "Digital designer and creative strategist. Writes about visual rhythm, typography, and user experience. Obsessed with detail and craft.",
    avatar: "",
    gradient: "from-slate-700 to-slate-500",
    location: "Berlin, DE",
    joined: "December 2022",
    postCount: 22,
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      website: "#",
    }
  }
]

export const posts: Post[] = [
  {
    slug: "future-of-ai-in-creative-work",
    title: "The Future of AI in Creative Work",
    excerpt: "Artificial intelligence is reshaping how we approach design, writing, and art. Here's a practical look at what's changing and how to stay ahead of the curve.",
    category: "Technology",
    date: "Mar 28, 2026",
    readTime: "8 min read",
    author: { name: "Sarah Chen", avatar: "" },
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1632&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    videoUrl: "https://stream.mux.com/BV3YZtogl89mg9VcNBhhnHm02Y34zI1nlMuMQfAbl3dM/highest.mp4",
  },
  {
    slug: "productivity-frameworks-2026",
    title: "10 Productivity Frameworks That Actually Work in 2026",
    excerpt: "Forget hustle culture. These evidence-based methods genuinely help you do meaningful work without burning out.",
    category: "Productivity",
    date: "Mar 25, 2026",
    readTime: "6 min read",
    author: { name: "Marcus Lee", avatar: "" },
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1472&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=2670&auto=format&fit=crop",
    videoUrl: "https://stream.mux.com/BV3YZtogl89mg9VcNBhhnHm02Y34zI1nlMuMQfAbl3dM/highest.mp4",
  },
  {
    slug: "sustainable-tech-stack-startups",
    title: "Building a Sustainable Tech Stack for Startups",
    excerpt: "Why choosing the right technologies early can reduce your carbon footprint and save millions in infrastructure costs.",
    category: "Sustainability",
    date: "Mar 22, 2026",
    readTime: "5 min read",
    author: { name: "Priya Sharma", avatar: "" },
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1470&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
  },
  {
    slug: "art-of-creative-constraints",
    title: "The Art of Creative Constraints: Less is More",
    excerpt: "How embracing limitations can unlock your most innovative work. Lessons from artists, engineers, and entrepreneurs.",
    category: "Creativity",
    date: "Mar 20, 2026",
    readTime: "7 min read",
    author: { name: "Alex Rivera", avatar: "" },
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1470&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
  },
];
