import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPortfolio,
  selectPortfolio,
  selectPortfolioStatus,
} from "../features/portfolios/portfolioSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

const Project = () => {
  const [selectType, setSelectType] = useState("All");
  const dispatch = useDispatch();
  const portfolios = useSelector(selectPortfolio);
  const portfolioStatus = useSelector(selectPortfolioStatus);

  const portfoliosType = ["All", "Frontend", "Backend", "Full-Stack"];

  useEffect(() => {
    if (portfolioStatus === "idle") dispatch(fetchPortfolio());
  }, [portfolioStatus, dispatch]);

  const filteredPortfolio = portfolios.filter((portfolio) => {
    return selectType === "All" ? portfolio : portfolio.category === selectType;
  });

  return (
    <div className="md:p-20 p-6 w-full mx-auto flex flex-col max-w-7xl max-sm:w-100">
      <div className="w-full flex flex-col mt-25 space-y-14">
        <div className="md:space-y-12 space-y-8">
          <motion.h2
            variants={allInTitle}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="md:text-4xl text-2xl lg:text-5xl font-bold tracking-wide max-w-3xl"
          >
            What I've done and what I'm doing.
          </motion.h2>
          <motion.p
            variants={allInSubTitle}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-2xl text-base text-gray-400 tracking-wide leading-relaxed"
          >
            I've worked on a variety of projects, from simple websites to
            complex web applications. And many of them are open-source. Here are
            a few of my favorites.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
          className="w-full flex flex-wrap justify-start items-center gap-4"
        >
          {portfoliosType.map((type, index) => (
            <span
              onClick={() => setSelectType(type)}
              className={`px-4 py-1.5 rounded-md transition-colors ease-linear duration-200 cursor-pointer text-white ${selectType === type ? "bg-blue-800" : "bg-slate-800/80 hover:bg-slate-900"}`}
              key={index}
            >
              {type}
            </span>
          ))}
        </motion.div>
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-14 mt-6"
        >
          {portfolios.length > 0 &&
            filteredPortfolio.map((port) => (
              <motion.div
                variants={reveal}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                key={port.id}
                className="group rounded-2xl border border-white/10 bg-slate-900/40 shadow-md overflow-hidden
                  transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/storage/${
                      port.image_url
                    }`}
                    alt={port.title}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
                      transition flex items-center justify-center gap-4"
                  >
                    <a
                      href={`${port.demo_url}`}
                      target="_blank"
                      className="px-4 py-2 text-sm rounded-xl bg-cyan-600 text-white hover:bg-cyan-500"
                    >
                      Live Demo
                    </a>
                    <a
                      href={`${port.github_url}`}
                      target="_blank"
                      className="px-4 py-2 text-sm rounded-xl bg-slate-800 text-white border border-white/20 hover:bg-slate-700"
                    >
                      GitHub
                    </a>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    {port.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {port.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {port.technologies?.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-end items-center my-2">
                    <Link to={`/portfolio/${port.id}`} className="w-30 p-2 text-center rounded-xl bg-slate-800 hover:bg-slate-900 transition-all ease-in-out border-0 outline-1 outline-gray-400 duration-300 hover:outline-cyan-400 mt-1">
                      View
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>
        {portfolioStatus === "loading" && (
          <div className="flex gap-x-2 justify-start items-center mt-20">
            <p className="text-gray-300 font-medium md:text-base text-sm">
              Loading
            </p>
            <p className="w-8 h-8 rounded-full border-2 border-t-transparent border-gray-400 animate-spin"></p>
          </div>
        )}
        {portfolioStatus === "failed" && (
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

export default Project;
