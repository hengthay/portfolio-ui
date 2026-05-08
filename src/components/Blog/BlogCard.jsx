import formatDate from "../../helper/formatDate";
import { motion } from "framer-motion";

const BlogCard = ({ blog }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, }}
      whileInView={{ opacity: 1, y: 0}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      viewport={{ once: true, amount: 0.3 }}
      style={{
        willChange: "transform, opacity",
        // Keeps the layer stable on iOS
        WebkitBackfaceVisibility: "hidden",
      }}
      className="group rounded-2xl overflow-hidden bg-[#0f172a] border border-white/10 hover:border-cyan-500/50 transition-colors duration-300"
      key={blog.id}
    >
      <div className="overflow-hidden">
        <img
          src={`${import.meta.env.VITE_API_URL}/storage/${blog.cover_image}`}
          alt={blog.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          {blog.tags.map((b, index) => (
            <span
              key={index}
              className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
            >
              #{b}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-semibold tracking-wide text-white group-hover:text-cyan-400 transition">
          {blog.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
          {blog.content}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/10 text-sm text-gray-500">
          <span>{formatDate(blog.join_date)}</span>
          <a rel="noreferrer" href="https://www.codecademy.com/catalog" target="_blank">
            <span className="text-cyan-400 group-hover:underline cursor-pointer">
              Read more →
            </span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
