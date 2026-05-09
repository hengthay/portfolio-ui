import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PortfolioCard = ({ port }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      viewport={{ once: true, amount: 0.3 }}
      key={port.id}
      style={{
        willChange: "transform, opacity",
        // Keeps the layer stable on iOS
        WebkitBackfaceVisibility: "hidden",
      }}
      className="group rounded-2xl border border-white/10 bg-slate-900/40 shadow-md overflow-hidden
      transition-shadow duration-300 hover:shadow-2xl"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={`${import.meta.env.VITE_API_URL}/storage/${port.image_url}`}
          alt={port.title}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
        />
        <div
          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4"
        >
          <a
            href={`${port.demo_url}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 text-sm rounded-xl bg-cyan-600 text-white hover:bg-cyan-500"
          >
            Live Demo
          </a>
          <a
            href={`${port.github_url}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 text-sm rounded-xl bg-slate-800 text-white border border-white/20 hover:bg-slate-700"
          >
            GitHub
          </a>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <h3 className="text-lg font-semibold text-white">{port.title}</h3>

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
  );
};

export default PortfolioCard;
