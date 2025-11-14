import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  slug?: string
  excerpt?: string
  content?: string
  image?: string
  author?: string
  published_at?: string
  category?: string
}

interface BlogSectionProps {
  posts: BlogPost[]
}

export default function BlogSection({ posts }: BlogSectionProps) {
  // Don't render if no posts
  if (!posts || posts.length === 0) {
    return null
  }

  // Take only first 3 posts
  const displayPosts = posts.slice(0, 3)

  return (
    <section className="px-[20px] md:px-[30px] lg:px-[50px] py-[50px]">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 gap-[20px]">
          <h2 className="text-lg md:text-2xl lg:text-4xl font-bold text-right">
            מידע וטיפים מהמומחים שלנו
          </h2>
          <Link href="/blog" className="text-sm text-right hover:text-[#0A90C8] transition-colors">
            <span>צפה בכל המאמרים ←</span>
          </Link>
        </div>

        {/* Blog Posts Grid */}
        <div className="flex md:flex-row flex-col gap-[20px]">
          {displayPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug || post.id}`}
              className="group overflow-hidden duration-400 rounded-[20px] cursor-pointer basis-[33%]"
            >
              <div 
                className="group-hover:scale-[1.05] duration-400 bg-cover bg-center h-[250px] md:h-[300px] rounded-[20px] relative flex items-end p-[30px]"
                style={{
                  backgroundImage: post.image 
                    ? `url(${post.image})` 
                    : `url('/img/blg${(displayPosts.indexOf(post) % 3) + 1}.png')`
                }}
              >
                {/* Gradient Overlay */}
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#00000000] to-[#000000] rounded-[20px]" />
                
                {/* Content */}
                <div className="relative z-[1] w-full">
                  {/* Category Badge */}
                  {post.category && (
                    <span className="inline-block bg-[#0A90C8] text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      {post.category}
                    </span>
                  )}
                  
                  {/* Title */}
                  <h5 className="text-[#fff] font-semibold text-base md:text-lg line-clamp-2">
                    {post.title}
                  </h5>
                  
                  {/* Date */}
                  {post.published_at && (
                    <p className="text-gray-300 text-xs mt-2">
                      {new Date(post.published_at).toLocaleDateString('he-IL', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}