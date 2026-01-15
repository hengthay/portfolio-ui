import React from "react";

const SkillCard = ({ skill }) => {
  return (
    <div key={skill.id}>
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
    </div>
  );
};

export default SkillCard;
