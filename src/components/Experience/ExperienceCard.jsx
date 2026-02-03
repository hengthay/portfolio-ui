import formatDate from "../../helper/formatDate";
import { motion } from "framer-motion";

const ExperienceCard = ({ experience }) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ x: 4 }}
      className="relative pl-12 space-y-1.5"
      key={experience.id}
    >
      <motion.span
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="absolute left-4.25 top-1 w-3 h-3 rounded-full bg-cyan-400 before:content-[''] before:ring-4 before:ring-cyan-400/30 before:absolute before:top-0 before:rounded-full before:left-0 before:w-3 before:h-3 before:animate-ping"
      ></motion.span>
      <div className="flex justify-between items-center">
        <h4 className="text-base font-semibold leading-relaxed tracking-wide">
          {experience.position}
        </h4>
        <p className="md:text-base text-sm text-gray-400 leading-relaxed tracking-wide">
          {formatDate(experience.start_date)} -{" "}
          {experience.end_date ? formatDate(experience.end_date) : "Present"}
        </p>
      </div>
      <div className="w-full">
        <h6 className="text-sm text-gray-400 leading-relaxed tracking-wide">
          {experience.company}
        </h6>
        <p className="text-sm text-gray-400 leading-relaxed tracking-wide md:max-w-md max-w-sm">
          {experience.description}
        </p>
      </div>
    </motion.li>
  );
};

export default ExperienceCard;
