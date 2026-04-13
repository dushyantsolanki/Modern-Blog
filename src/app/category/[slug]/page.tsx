import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CategoryContent } from "./CategoryContent"
import { getAllCategories } from "@/lib/api"
import { DirectionalTransition } from "@/components/view-transition/directional-transition"
import type { Metadata } from "next"

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getAllCategories();
  const category = categories.find(c => c.slug === slug);
  const categoryName = category?.name || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');

  return {
    title: `${categoryName} | Insight Blog`,
    description: category?.description || `Explore compiled insights and expert perspectives on ${categoryName}.`,
    openGraph: {
      title: `${categoryName} | Insight Blog`,
      description: category?.description || `Explore compiled insights and expert perspectives on ${categoryName}.`,
      images: category?.imageUrl ? [{ url: category.imageUrl }] : [],
    },
  };
}

export default async function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const categories = await getAllCategories();
  const category = categories.find(c => c.slug === slug);
  const categoryName = category?.name || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');

  return (
    <DirectionalTransition>
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <CategoryContent
          categorySlug={slug}
          categoryName={categoryName}
        />
        <Footer />
      </div>
    </DirectionalTransition>
  )
}
