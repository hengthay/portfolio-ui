import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchResume,
  selectResume,
  selectResumeError,
  selectResumeStatus,
} from "../features/resumes/resumeSlice";
import formatDate from "../helper/formatDate";
import { GiBookAura } from "react-icons/gi";
import ResumeCard from "../components/Resume/ResumeCard";
import { PiBagLight } from "react-icons/pi";
import ExperienceCard from "../components/Experience/ExperienceCard";
import {
  fetchExperience,
  selectExperience,
  selectExperienceError,
  selectExperienceStatus,
} from "../features/experiences/experienceSlice";
import { motion } from "framer-motion";
import ResumeSkeleton from "../components/Skeleton-Loading/ResumeSkeleton";
import ExperienceSkeleton from "../components/Skeleton-Loading/ExperienceSkeleton";
import ErrorMessage from "../helper/ErrorMessage";

const allInTitle = {
  hidden: { opacity: 0, y: -50 },
  show: { opacity: 1, y: 0 },
};

const allInSubTitle = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const Education = () => {
  const dispatch = useDispatch();
  const resumes = useSelector(selectResume);
  const resumeStatus = useSelector(selectResumeStatus);
  const resumeErrorMessage = useSelector(selectResumeError);
  const experiences = useSelector(selectExperience);
  const experienceStatus = useSelector(selectExperienceStatus);
  const experienceErrorMessage = useSelector(selectExperienceError);

  useEffect(() => {
    if (resumeStatus === "idle") dispatch(fetchResume());

    if (experienceStatus === "idle") dispatch(fetchExperience());
  }, [resumeStatus, experienceStatus, dispatch]);

  return (
    <div className="md:p-20 p-4 w-full mx-auto flex flex-col max-w-7xl">
      <div className="w-full md:mt-20 mt-15 md:space-y-14 space-y-7 md:p-0 p-4">

        <motion.div
          initial="hidden"
          animate="show"
          className="md:space-y-12 space-y-8 md:p-0 p-2"
        >
          <motion.h2
            variants={allInTitle}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="md:text-4xl text-2xl lg:text-5xl font-bold tracking-wide max-w-3xl"
          >
            My Resume
          </motion.h2>
          <motion.p
            variants={allInSubTitle}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-xl text-base text-gray-400 tracking-wide leading-relaxed"
          >
            Here is my educational background and works experiences that I have
            been doing, highlighting my qualifications and what I have
            accomplished so far.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full mt-10 relative"
        >
          <div className="flex items-center md:gap-x-4 gap-x-2 relative">
            {/* Icon */}
            <div className="relative z-10 p-3 rounded-2xl bg-slate-900 border border-yellow-400/40">
              <GiBookAura size={26} className="text-yellow-400" />
            </div>

            {/* Title */}
            <h4 className="text-lg md:text-2xl font-semibold text-white tracking-wide">
              Education
            </h4>
          </div>

          {/* Vertical Line from Icon */}
          <span
            className={`absolute left-5.5 top-14 w-0.5 bg-gray-400/60 ${resumeStatus === "failed" || resumeStatus === "loading" ? "h-15" : "h-full"}`}
          ></span>

          {
            resumeStatus === 'succeeded' && resumes.length > 0 && (
              <ul className="mt-10 space-y-10 relative">
                {resumes.length > 0 &&
                  resumes.map((resume) => (
                    <ResumeCard resume={resume} key={resume.id} />
                  ))}
              </ul>
            )
          }

          {resumeStatus === "loading" && (
            <ResumeSkeleton />
          )}

          {resumeStatus === "failed" && (
            <ErrorMessage message={resumeErrorMessage || "Internal Server Error or Not Found!"}/>
          )}

        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full mt-20 relative"
        >
          <div className="flex items-center md:gap-x-4 gap-x-2 relative">
            {/* Icon */}
            <div className="relative z-10 p-3 rounded-2xl bg-slate-900 border border-yellow-400/40">
              <PiBagLight size={26} className="text-yellow-400" />
            </div>

            {/* Title */}
            <h4 className="text-lg md:text-2xl font-semibold text-white tracking-wide">
              Experiences
            </h4>
          </div>

          {/* Vertical Line from Icon */}
          <span
            className={`absolute left-5.5 top-14 w-0.5 bg-gray-400/60 ${experienceStatus === "failed" || experienceStatus === "loading" ? "h-15" : "h-full"}`}
          ></span>
          
          {
            experienceStatus === 'succeeded' && experiences.length > 0 && (
              <ul className="mt-10 space-y-10 relative">
                {experiences.length > 0 &&
                  experiences.map((experience) => (
                    <ExperienceCard experience={experience} key={experience.id} />
                  ))}
              </ul>
            )
          }

          {experienceStatus === "loading" && (
            <ExperienceSkeleton />
          )}

          {experienceStatus === "failed" && (
            <ErrorMessage message={experienceErrorMessage || "Internal Server Error or Not Found!"}/>
          )}

        </motion.div>
      </div>

    </div>
  );
};

export default Education;
