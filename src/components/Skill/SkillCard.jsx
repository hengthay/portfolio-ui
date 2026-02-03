import { motion } from "framer-motion";
const SkillCard = ({ skill }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeIn" }}
      viewport={{ once: true, amount: 0.3 }}
      key={skill.id}
    >
      <div className="flex justify-between text-sm text-gray-400 space-y-2">
        <span className="text-gray-400">{skill.name}</span>
        <span className="text-yellow-400 font-semibold">{skill.level}%</span>
      </div>

      {/* Ruler line */}
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-400 rounded-full"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </motion.div>
  );
};

export default SkillCard;
