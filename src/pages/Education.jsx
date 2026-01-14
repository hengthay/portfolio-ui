import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResume, selectResume, selectResumeStatus } from "../features/resumes/resumeSlice";
import formatDate from "../helper/formatDate";

const Education = () => {

  const dispatch = useDispatch();
  const resumes = useSelector(selectResume);
  const resumeStatus = useSelector(selectResumeStatus);

  useEffect(() => {
    if (resumeStatus === "idle") dispatch(fetchResume());
  }, [resumeStatus, dispatch]);

  return (
    <div className="md:p-20 p-6 w-full mx-auto flex flex-col max-w-7xl max-sm:w-100">
      <div className="w-full md:mt-20 mt-15 space-y-14">
        <div className="md:space-y-12 space-y-8">
          <h2 className="md:text-4xl text-2xl lg:text-5xl font-bold tracking-wide max-w-3xl">
            My Resume
          </h2>
          <p className="max-w-xl text-base text-gray-400 tracking-wide leading-relaxed">
            Here is my educational background, highlighting my qualifications
            and what I have accomplished so far.
          </p>
        </div>
        <div className="w-full mt-10">
          <ul className="relative space-y-10 before:content-[''] before:absolute before:top-1 before:bottom-0 before:left-1.25 before:w-0.5 before:bg-slate-400">
            {resumes.length > 0 &&
              resumes.map((resume) => (
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

                  {resume.field && (
                    <p className="text-gray-400 text-sm">{resume.field}</p>
                  )}

                  <p className="text-gray-400 text-sm">{resume.degree}</p>
                </li>
              ))}
          </ul>

          {resumeStatus === "loading" && (
            <div className="flex gap-x-2 justify-start items-center mt-20">
              <p className="text-gray-300 font-medium md:text-base text-sm">
                Loading
              </p>
              <p className="w-8 h-8 rounded-full border-2 border-t-transparent border-gray-400 animate-spin"></p>
            </div>
          )}
          {resumeStatus === "failed" && (
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
    </div>
  );
};

export default Education;
