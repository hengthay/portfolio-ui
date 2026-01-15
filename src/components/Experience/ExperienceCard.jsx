import React from "react";
import formatDate from "../../helper/formatDate";

const ExperienceCard = ({ experience }) => {
  return (
    <li
      className="relative pl-12 space-y-1.5"
      key={experience.id}
    >
      <span className="absolute left-4.25 top-1 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-400/20"></span>
      <div className="flex justify-between items-center">
        <h4 className="text-base font-semibold leading-relaxed tracking-wide">
          {experience.position}
        </h4>
        <p className="md:text-base text-sm text-gray-400 leading-relaxed tracking-wide">
          {formatDate(experience.start_date)} - {experience.end_date ? formatDate(experience.end_date) : "Present"}
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
    </li>
  );
};

export default ExperienceCard;
