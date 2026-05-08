import { useEffect } from "react";
import { FaGithubSquare } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { GiBookAura } from "react-icons/gi";
import { PiBagLight } from "react-icons/pi";
import {
  fetchProfiles,
  selectProfile,
  selectProfileError,
  selectProfileStatus,
} from "../features/profiles/profileSlice";
import {
  fetchPortfolio,
  selectPortfolio,
} from "../features/portfolios/portfolioSlice";
import {
  fetchResume,
  selectResume,
  selectResumeStatus,
} from "../features/resumes/resumeSlice";
import {
  fetchBlog,
  selectBlogs,
  selectBlogsStatus,
} from "../features/blogs/blogSlice";
import {
  fetchSkill,
  selectSkills,
  selectSkillsStatus,
} from "../features/skills/skillSlice";
import {
  fetchCertificate,
  selectCertificate,
  selectCertificateStatus,
} from "../features/certificates/certificateSlice";
import ProfileCard from "../components/Profile/ProfileCard";
import PortfolioCard from "../components/Portfolio/PortfolioCard";
import SkillCard from "../components/Skill/SkillCard";
import ResumeCard from "../components/Resume/ResumeCard";
import BlogCard from "../components/Blog/BlogCard";
import CertificateCard from "../components/Certificate/CertificateCard";
import {
  fetchExperience,
  selectExperience,
  selectExperienceStatus,
} from "../features/experiences/experienceSlice";
import ExperienceCard from "../components/Experience/ExperienceCard";
import { motion } from "framer-motion";

const allInTitle = {
  hidden: { opacity: 0, y: -50 },
  show: { opacity: 1, y: 0 },
};

const allInSubTitle = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
};

const sectionWrap = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const headerAnim = {
  hidden: { opacity: 0, y: -16 },
  show: { opacity: 1, y: 0 },
};

const lineAnim = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1 },
};

const listAnim = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const Home = () => {
  const profiles = useSelector(selectProfile);
  const status = useSelector(selectProfileStatus);
  const error = useSelector(selectProfileError);
  const portfolios = useSelector(selectPortfolio);
  const portfolioStatus = useSelector(selectProfileStatus);
  const resumes = useSelector(selectResume);
  const resumeStatus = useSelector(selectResumeStatus);
  const blogs = useSelector(selectBlogs);
  const blogStatus = useSelector(selectBlogsStatus);
  const skills = useSelector(selectSkills);
  const skillStatus = useSelector(selectSkillsStatus);
  const certificates = useSelector(selectCertificate);
  const certificateStatus = useSelector(selectCertificateStatus);
  const experiences = useSelector(selectExperience);
  const experienceStatus = useSelector(selectExperienceStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      if (status === "idle") dispatch(fetchProfiles());

      if (portfolioStatus === "idle") dispatch(fetchPortfolio());

      if (resumeStatus === "idle") dispatch(fetchResume());

      if (blogStatus === "idle") dispatch(fetchBlog());

      if (skillStatus === "idle") dispatch(fetchSkill());

      if (certificateStatus === "idle") dispatch(fetchCertificate());

      if (experienceStatus === "idle") dispatch(fetchExperience());
    } catch (error) {
      console.log(error);
    }
  }, [
    status,
    portfolioStatus,
    experienceStatus,
    certificateStatus,
    skillStatus,
    blogStatus,
    resumeStatus,
    dispatch,
  ]);

  // console.log(portfolios);
  // console.log(profiles);
  // console.log(status);
  // console.log(error);
  // console.log(resumes);
  // console.log(certificates);
  const foot = [
    { id: 1, Icon: FaGithubSquare, url: "https://github.com/hengthay" },
    { id: 2, Icon: FaTelegramPlane, url: "https://t.me/pachiees" },
    { id: 3, Icon: FaFacebookF, url: "https://web.facebook.com/kim.thai.55501" },
    { id: 4, Icon: FaLinkedinIn, url: "https://www.linkedin.com/in/laov-kimhengthay-047a232b1/" },
    { id: 5, Icon: MdOutlineEmail, url: "mailto:laovkimhengthay@gmail.com" },
  ];

  return (
    <div className="md:p-20 p-6 w-full mx-auto flex flex-col max-w-7xl max-sm:w-100">
      {/* Introduce */}
      <div className="w-full">
        {profiles.length > 0 &&
          profiles.map((profile) => (
            <ProfileCard profile={profile} key={profile.id} />
          ))}

        {status === "loading" && (
          <div className="flex gap-x-2 justify-start items-center mt-20">
            <p className="text-gray-300 font-medium md:text-base text-sm">
              Loading
            </p>
            <p className="w-8 h-8 rounded-full border-2 border-t-transparent border-gray-400 animate-spin"></p>
          </div>
        )}
        {status === "failed" && (
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

      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className="w-full mt-20"
      >
        <ul className="flex justify-center items-center md:justify-start md:items-start md:gap-x-2 gap-x-2">
          {foot.map((item) => (
            <li key={item.id} className="text-white/80">
              <a href={item.url} target="_blank" rel="noreferrer">
                <item.Icon
                  size={28}
                  className="p-1 rounded-full transition-all hover:bg-gray-500 ease-in-out duration-300"
                />
              </a>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Portfolio Start */}
      <div className="w-full flex flex-col md:mt-20 mt-15 space-y-14">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="md:space-y-12 space-y-8"
        >
          <motion.h2
            variants={allInTitle}
            transition={{ duration: 0.5, ease: "easeIn" }}
            className="md:text-4xl text-2xl lg:text-5xl font-bold tracking-wide max-w-3xl"
          >
            What I've done and what I'm doing.
          </motion.h2>
          <motion.p
            variants={allInSubTitle}
            transition={{ duration: 0.5, ease: "easeIn" }}
            className="max-w-2xl text-base text-gray-400 tracking-wide leading-relaxed"
          >
            I've worked on a variety of projects, from simple websites to
            complex web applications. And many of them are open-source. Here are
            a few of my favorites.
          </motion.p>
        </motion.div>
        {
          portfolioStatus === 'succeeded' && portfolios.length > 0 && (
            <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-14 mt-6">
              {portfolios.length > 0 &&
                portfolios.map((port) => (
                  <PortfolioCard port={port} key={port.id} />
                ))}
            </div>
          )
        }
        {portfolioStatus === "loading" && (
          <div className="flex gap-x-2 justify-start items-center mt-5">
            <p className="text-gray-300 font-medium md:text-base text-sm">
              Loading
            </p>
            <p className="w-8 h-8 rounded-full border-2 border-t-transparent border-gray-400 animate-spin"></p>
          </div>
        )}
        {portfolioStatus === "failed" && (
          <div className="flex gap-x-2 justify-start items-center mt-5 bg-slate-900 shadow py-2 px-2 rounded-md w-full">
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
              Failed to get portfolios data. It might be Internal Server Error!
            </p>
          </div>
        )}
      </div>
      {/* Portfolio end */}

      {/* Skill Start */}
      <div className="w-full md:mt-20 mt-15 space-y-14">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="md:space-y-12 space-y-8"
        >
          <motion.h2
            variants={allInTitle}
            transition={{ duration: 0.5, ease: "easeIn" }}
            className="md:text-4xl text-2xl lg:text-5xl font-bold tracking-wide max-w-3xl"
          >
            My Skill
          </motion.h2>
          <motion.p
            variants={allInSubTitle}
            transition={{ duration: 0.5, ease: "easeIn" }}
            className="max-w-xl text-base text-gray-400 tracking-wide leading-relaxed"
          >
            These are the skills I’m currently working with and improving every
            day as I grow as a web developer through real projects and constant
            practice.
          </motion.p>
        </motion.div>

        <div className="w-full space-y-4">
          {skills.length > 0 &&
            skills.map((skill) => <SkillCard skill={skill} key={skill.id} />)}
        </div>
        {skillStatus === "loading" && (
          <div className="flex gap-x-2 justify-start items-center mt-20">
            <p className="text-gray-300 font-medium md:text-base text-sm">
              Loading
            </p>
            <p className="w-8 h-8 rounded-full border-2 border-t-transparent border-gray-400 animate-spin"></p>
          </div>
        )}
        {skillStatus === "failed" && (
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
              Failed to get skills data. It might be Internal Server Error!
            </p>
          </div>
        )}
      </div>
      {/* Skill end */}

      {/* Resume start */}
      <div className="w-full md:mt-20 mt-15 space-y-14">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="md:space-y-12 space-y-8"
        >
          <motion.h2
            variants={allInTitle}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="md:text-4xl text-2xl lg:text-5xl font-bold tracking-wide max-w-3xl"
          >
            My Resume
          </motion.h2>
          <motion.p
            variants={allInSubTitle}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="max-w-xl text-base text-gray-400 tracking-wide leading-relaxed"
          >
            Here is my educational background and works experiences that I have
            been doing, highlighting my qualifications and what I have
            accomplished so far.
          </motion.p>
        </motion.div>
        <motion.div
          variants={sectionWrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full mt-10 relative"
        >
          <motion.div
            variants={headerAnim}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-x-4 relative"
          >
            
            <motion.div
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              className="relative z-10 p-3 rounded-2xl bg-slate-900 border border-yellow-400/40"
            >
              <GiBookAura size={26} className="text-yellow-400" />
            </motion.div>

            <h4 className="text-lg md:text-2xl font-semibold text-white tracking-wide">
              Education
            </h4>
          </motion.div>

          <motion.span
            variants={lineAnim}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            style={{ transformOrigin: "top" }}
            className={`absolute left-5.5 top-14 w-0.5 bg-gray-400/60 ${resumeStatus === "failed" || resumeStatus === "loading" ? "h-15" : "h-full"}`}
          ></motion.span>

          <ul className="mt-10 space-y-10 relative">
            {resumes.length > 0 &&
              resumes.map((resume) => (
                <ResumeCard resume={resume} key={resume.id} />
              ))}
          </ul>

          {resumeStatus === "loading" && (
            <div className="flex gap-x-2 justify-start items-center md:mt-20 mt-25">
              <p className="text-gray-300 font-medium md:text-base text-sm">
                Loading
              </p>
              <p className="w-8 h-8 rounded-full border-2 border-t-transparent border-gray-400 animate-spin"></p>
            </div>
          )}
          {resumeStatus === "failed" && (
            <div className="flex gap-x-2 justify-start items-center md:mt-20 mt-25 bg-slate-900 shadow py-2 px-2 rounded-md w-full">
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
                Failed to get educations data. It might be Internal Server Error!
              </p>
            </div>
          )}
        </motion.div>
      </div>
      {/* Resume end */}

      {/* Experiences start */}
      <motion.div
        variants={sectionWrap}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="w-full mt-20 relative"
      >
        <motion.div
          variants={headerAnim}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-x-4 relative"
        >
          
          <motion.div
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className="relative z-10 p-3 rounded-2xl bg-slate-900 border border-yellow-400/40"
          >
            <PiBagLight size={26} className="text-yellow-400" />
          </motion.div>

          
          <h4 className="text-lg md:text-2xl font-semibold text-white tracking-wide">
            Experiences
          </h4>
        </motion.div>

        
        <motion.span
          variants={lineAnim}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          style={{ transformOrigin: "top" }}
          className={`absolute left-5.5 top-14 w-0.5 bg-gray-400/60 ${experienceStatus === "failed" || experienceStatus === "loading" ? "h-15" : "h-full"}`}
        ></motion.span>

        <ul className="mt-10 space-y-10 relative">
          {experiences.length > 0 &&
            experiences.map((experience) => (
              <ExperienceCard experience={experience} key={experience.id} />
            ))}
        </ul>
        {experienceStatus === "loading" && (
          <div className="flex gap-x-2 justify-start items-center md:mt-20 mt-25">
            <p className="text-gray-300 font-medium md:text-base text-sm">
              Loading
            </p>
            <p className="w-8 h-8 rounded-full border-2 border-t-transparent border-gray-400 animate-spin"></p>
          </div>
        )}
        {experienceStatus === "failed" && (
          <div className="flex gap-x-2 justify-start items-center md:mt-20 mt-25 bg-slate-900 shadow py-2 px-2 rounded-md w-full">
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
              Failed to get experiences data. It might be Internal Server Error!
            </p>
          </div>
        )}
      </motion.div>
      {/* Experiences end */}

      {/* Blog start */}
      <div className="w-full md:mt-20 mt-15">
        <motion.div
          variants={sectionWrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="md:space-y-12 space-y-8"
        >
          <motion.h2
            variants={allInTitle}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="md:text-4xl text-2xl lg:text-5xl font-bold tracking-wide max-w-3xl mt-10"
          >
            What I am learning as a developer.
          </motion.h2>
          <motion.p
            variants={allInSubTitle}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="max-w-xl text-base text-gray-400 tracking-wide leading-relaxed"
          >
            This space is for my learning journey—what I study, what I struggle
            with, and what I learn while becoming a better developer.
          </motion.p>
        </motion.div>
        {
          blogStatus === 'succeeded' && blogs.length > 0 && (
            <div className="w-full mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.length > 0 &&
                blogs.map((blog) => <BlogCard blog={blog} key={blog.id} />)}
            </div>
          )
        }
        {blogStatus === "loading" && (
          <div className="flex gap-x-2 justify-start items-center mt-20">
            <p className="text-gray-300 font-medium md:text-base text-sm">
              Loading
            </p>
            <p className="w-8 h-8 rounded-full border-2 border-t-transparent border-gray-400 animate-spin"></p>
          </div>
        )}
        {blogStatus === "failed" && (
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
              Failed to get blogs data. It might be Internal Server Error!
            </p>
          </div>
        )}
      </div>
      {/* Blog end */}

      {/* Certicate Start */}
      <div className="w-full md:mt-25 mt-20">
        <motion.div
          variants={sectionWrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="md:space-y-12 space-y-8"
        >
          <motion.h2
            variants={allInTitle}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="md:text-4xl text-2xl lg:text-5xl font-bold tracking-wide"
          >
            My Certificates
          </motion.h2>
          <motion.p
            variants={allInSubTitle}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="max-w-xl text-base text-gray-400 tracking-wide leading-relaxed"
          >
            Certifications I’ve earned through continuous learning and
            professional development.
          </motion.p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="relative w-full overflow-hidden mt-14"
        >
          <motion.div
            variants={fade}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-max flex animate-scrollX shrink-0"
          >
            {/* Render twice for seamless loop */}
            {certificates.length > 0 &&
              certificates.map((certificate) => (
                <CertificateCard
                  certificate={certificate}
                  key={`original-${certificate.id}`}
                />
              ))
            }

            {certificates.length > 0 &&
              certificates.map((certificate) => (
                <CertificateCard
                  certificate={certificate}
                  key={`duplicate-${certificate.id}`}
                />
              ))
            }
          </motion.div>
        </motion.div>
        {certificateStatus === "loading" && (
          <div className="flex gap-x-2 justify-start items-center mt-20">
            <p className="text-gray-300 font-medium md:text-base text-sm">
              Loading
            </p>
            <p className="w-8 h-8 rounded-full border-2 border-t-transparent border-gray-400 animate-spin"></p>
          </div>
        )}
        {certificateStatus === "failed" && (
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
              Failed to get certificates data. It might be Internal Server Error!
            </p>
          </div>
        )}
      </div>
      {/* Certicate end */}
    </div>
  );
};

export default Home;
