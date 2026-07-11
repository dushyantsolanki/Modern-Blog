import { getAboutPageData } from "@/lib/api"
import { AboutClient } from "./about-client"

export const revalidate = 60 // Revalidate every 60 seconds

export default async function AboutPage() {
  const data = await getAboutPageData()
  return <AboutClient data={data} />
}
