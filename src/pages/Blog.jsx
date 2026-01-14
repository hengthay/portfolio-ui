import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlog, selectBlogs, selectBlogsStatus } from "../features/blogs/blogSlice";
import formatDate from "../helper/formatDate";

const Blog = () => {

  const dispatch = useDispatch();
  const blogs = useSelector(selectBlogs);
  const blogStatus = useSelector(selectBlogsStatus);

  useEffect(() => {
    if (blogStatus === "idle") dispatch(fetchBlog());
  }, [blogStatus, dispatch]);


  return (
    <div className="md:p-20 p-6 w-full mx-auto flex flex-col max-w-7xl max-sm:w-100">
      <div className="w-full md:mt-20 mt-15">
        <div className="md:space-y-12 space-y-8">
          <h2 className="md:text-4xl text-2xl lg:text-5xl font-bold tracking-wide max-w-3xl">
            What I am learning as a developer.
          </h2>
          <p className="max-w-xl text-base text-gray-400 tracking-wide leading-relaxed">
            This space is for my learning journey—what I study, what I struggle
            with, and what I learn while becoming a better developer.
          </p>
        </div>
        <div className="w-full mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.length > 0 &&
            blogs.map((blog) => (
              <div
                className="group rounded-2xl overflow-hidden bg-[#0f172a] border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
                key={blog.id}
              >
                <div className="overflow-hidden">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/storage/${
                      blog.cover_image
                    }`}
                    alt={blog.title}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
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
                    <a href="#" target="_blank">
                      <span className="text-cyan-400 group-hover:underline cursor-pointer">
                        Read more →
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {blogStatus === "loading" && (
          <div className="flex gap-x-2 justify-start items-center mt-20">
            <p className="text-gray-300 font-medium md:text-base text-sm">
              Loading
            </p>
            <p className="w-8 h-8 rounded-full border-2 border-t-transparent border-gray-400 animate-spin"></p>
          </div>
        )}
        {blogStatus === "failed" && (
          <div className="flex gap-x-2 justify-start items-center mt-20 bg-slate-900 shadow py-2 px-2 rounded-md w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="shrink-0"
            >
              {/* Circle */}
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />

              {/* Exclamation line */}
              <rect x="11" y="6" width="2" height="9" fill="red" />

              {/* Exclamation dot */}
              <circle cx="12" cy="18" r="1.3" fill="red" />
            </svg>
            <p className="text-red-400 font-medium md:text-base text-sm">
              Failed to get profile data. It might be Internal Server Error!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
