import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const Blog = () => {
  const { data: posts = [] } = useQuery({
    queryKey: ["public-blog"],
    queryFn: async () => {
      const { data } = await supabase.from("blog_posts").select("*").eq("is_active", true).order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  return (
    <div>
      <section className="relative py-32 bg-card">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary font-heading tracking-[0.3em] text-sm mb-3 uppercase">Stay Updated</p>
            <h1 className="font-heading text-5xl md:text-6xl text-foreground">Our <span className="text-primary">Blog</span></h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          {posts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any, i: number) => (
                <motion.article key={post.id} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card rounded-xl border border-border/50 overflow-hidden group hover:border-primary/30 transition-all">
                  {post.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                    </div>
                    <h3 className="font-heading text-xl text-foreground mb-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.content}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-16">Blog posts coming soon!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
