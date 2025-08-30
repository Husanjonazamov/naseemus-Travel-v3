import { Button } from "@/components/ui/button"

const blogPosts = [
  {
    id: 1,
    title: "ENJOY THE FLAVOURS OF CROATIA",
    description:
      "Croatia offers a vast range of cuisine, with dishes varying from region to region. Wherever your travels take you, local and seasonal specialities are sure to form a memorable part of your holiday, so here are some must-tries.",
    image: "/croatian-coast.png",
    buttonText: "Read more",
  },
  {
    id: 2,
    title: "TOP TIPS FOR TRAVELLING SOLO",
    description:
      "Take a look at our top ten tips to make sure your solo adventure is one to remember for the right reasons.",
    image: "/boat-trip-fun.png",
    buttonText: "Read More",
  },
  {
    id: 3,
    title: "TRAVELS WITH JANET ELLIS",
    description:
      "Author and broadcaster, Janet Ellis joined us for Experience South Africa. Here's her thoughts on her first holiday with Just You.",
    image: "/colorful-street-art-mural-people.png",
    buttonText: "Read more",
  },
]

export function BlogSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-600 mb-12">READ OUR BLOGS</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-video">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-500 mb-4">{post.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">{post.description}</p>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md">
                  {post.buttonText}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
