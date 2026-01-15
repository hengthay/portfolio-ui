import React from "react";
import formatDate from "../../helper/formatDate";

const ResumeCard = ({ resume }) => {
  return (
    <li className="relative pl-12 space-y-1.5">
      <span className="absolute left-4.25 top-1 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-400/20"></span>

      <p className="font-semibold text-white">
        {formatDate(resume.start_date)} -{" "}
        {resume.end_date ? formatDate(resume.end_date) : "Present"}
      </p>

      <p className="text-gray-400 text-sm">
        {resume.institution}
      </p>

      {resume.field && <p className="text-gray-400 text-sm">{resume.field}</p>}

      <p className="text-gray-400 text-sm">
        {resume.degree}
      </p>
    </li>
  );
};

export default ResumeCard;
