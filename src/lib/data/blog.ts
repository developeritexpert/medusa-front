/**
 * Fetch all published blog posts
 */
export async function getPublishedPosts() {
  const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
  const apiKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
  
  try {
    const response = await fetch(`${baseUrl}/store/blog`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": apiKey,
      },
      next: {
        revalidate: 3600, // Revalidate every hour
        tags: ["blog-posts"],
      },
      cache: "no-store", // For development - remove in production
    })

    if (!response.ok) {
      console.error(`Blog fetch failed: ${response.status} ${response.statusText}`)
      return []
    }

    const data = await response.json()
    console.log("✅ Blogs fetched successfully:", data.posts?.length || 0, "posts")
    return data.posts || []
  } catch (error) {
    console.error("❌ Error fetching blog posts:", error)
    return []
  }
}

/**
 * Fetch a single blog post by ID or slug
 */
export async function getBlogPost(idOrSlug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
  
  try {
    const response = await fetch(`${baseUrl}/store/blog/${idOrSlug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 3600,
        tags: [`blog-post-${idOrSlug}`],
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch blog post: ${response.statusText}`)
    }

    const data = await response.json()
    return data.post || null
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

/**
 * Fetch latest blog posts (limited number)
 */
export async function getLatestPosts(limit: number = 3) {
  const posts = await getPublishedPosts()
  return posts.slice(0, limit)
}