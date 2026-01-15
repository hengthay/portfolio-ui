import React from "react";
import formatDate from "../../helper/formatDate";

const ResumeCard = ({ resume }) => {
  return (
    <li
      key={resume.id}
      className="relative pl-8 space-y-1.5 leading-relaxed tracking-wide"
    >
      <span className="absolute left-0 top-1 w-3 h-3 rounded-full bg-cyan-500"></span>

      <p className="font-semibold">
        {formatDate(resume.start_date)} -{" "}
        {resume.end_date ? formatDate(resume.end_date) : "Present"}
      </p>

      <p className="text-gray-400 text-sm">{resume.institution}</p>

      {resume.field && <p className="text-gray-400 text-sm">{resume.field}</p>}

      <p className="text-gray-400 text-sm">{resume.degree}</p>
    </li>
  );
};

export default ResumeCard;
