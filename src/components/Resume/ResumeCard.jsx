import formatDate from "../../helper/formatDate";
import { motion } from "framer-motion";

const ResumeCard = ({ resume }) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ x: 4 }}
      className="relative pl-12 space-y-1.5"
    >
      <motion.span
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="absolute left-4.25 top-1 w-3 h-3 rounded-full bg-cyan-400 before:content-[''] before:ring-4 before:ring-cyan-400/30 before:absolute before:top-0 before:rounded-full before:left-0 before:w-3 before:h-3 before:animate-ping"
      ></motion.span>

      <p className="font-semibold text-white">
        {formatDate(resume.start_date)} -{" "}
        {resume.end_date ? formatDate(resume.end_date) : "Present"}
      </p>

      <p className="text-gray-400 text-sm">{resume.institution}</p>

      {resume.field && <p className="text-gray-400 text-sm">{resume.field}</p>}

      <p className="text-gray-400 text-sm">{resume.degree}</p>
    </motion.li>
  );
};

export default ResumeCard;
