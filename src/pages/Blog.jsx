import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlog,
  selectBlogs,
  selectBlogsError,
  selectBlogsStatus,
} from "../features/blogs/blogSlice";
import formatDate from "../helper/formatDate";
import { motion } from "framer-motion";
import BlogSkeleton from "../components/Skeleton-Loading/BlogSkeleton";
import ErrorMessage from "../helper/ErrorMessage";

const allInTitle = {
  hidden: { opacity: 0, y: -50 },
  show: { opacity: 1, y: 0 },
};

const allInSubTitle = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
};

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const Blog = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(selectBlogs);
  const blogStatus = useSelector(selectBlogsStatus);
  const blogErrorMessage = useSelector(selectBlogsError);

  useEffect(() => {
    if (blogStatus === "idle") dispatch(fetchBlog());
  }, [blogStatus, dispatch]);

  return (
    <div className="md:p-20 p-6 w-full mx-auto flex flex-col max-w-7xl">
      <div className="w-full md:mt-20 mt-15 md:p-0 p-4">
        <div className="md:space-y-12 space-y-8">
          <motion.h2
            variants={allInTitle}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="md:text-4xl text-2xl lg:text-5xl font-bold tracking-wide max-w-3xl"
          >
            What I am learning as a developer.
          </motion.h2>
          <motion.p
            variants={allInSubTitle}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-xl text-base text-gray-400 tracking-wide leading-relaxed"
          >
            This space is for my learning journey—what I study, what I struggle
            with, and what I learn while becoming a better developer.
          </motion.p>
        </div>

        {
          blogStatus === 'succeeded' && blogs.length > 0 && (
            <motion.div
              initial="hidden"
              animate="show"
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
            >
              {blogs.length > 0 &&
                blogs?.map((blog) => (
                  <motion.div
                    variants={reveal}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="group rounded-2xl overflow-hidden bg-[#0f172a] border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
                    key={blog.id}
                  >
                    <div className="overflow-hidden">
                      <img
                        src={`${import.meta.env.VITE_API_URL}/storage/${
                          blog?.cover_image
                        }`}
                        alt={blog?.title}
                        className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {blog.tags?.map((b, index) => (
                          <span
                            key={index}
                            className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                          >
                            #{b}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-xl font-semibold tracking-wide text-white group-hover:text-cyan-400 transition">
                        {blog?.title}
                      </h3>

                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-5">
                        {blog?.content}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10 text-sm text-gray-500">
                        <span className="font-medium text-slate-400">Published Log</span>
                        {
                          blog?.join_date && (
                            <span>{formatDate(blog.join_date)}</span>
                          )
                        }
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          )
        }

        {blogStatus === "loading" && (
          <BlogSkeleton />
        )}

        {blogStatus === "failed" && (
          <ErrorMessage message={blogErrorMessage || "Internal Server Error or Not Found!"}/>
        )}
        
      </div>
    </div>
  );
};

export default Blog;
