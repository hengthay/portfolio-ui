import { useEffect } from "react";
import { FaGithubSquare } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
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
import formatDate from "../helper/formatDate";
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
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      if (status === "idle") dispatch(fetchProfiles());

      if (portfolioStatus === "idle") dispatch(fetchPortfolio());

      if (resumeStatus === "idle") dispatch(fetchResume());

      if (blogStatus === "idle") dispatch(fetchBlog());

      if (skillStatus === "idle") dispatch(fetchSkill());

      if (certificateStatus === "idle") dispatch(fetchCertificate());
    } catch (error) {
      console.log(error);
    }
  }, [status, portfolioStatus, dispatch]);

  // console.log(portfolios);
  // console.log(profiles);
  // console.log(status);
  // console.log(error);
  // console.log(resumes);
  const foot = [
    { id: 1, Icon: FaGithubSquare, url: "https://github.com/yourusername" },
    { id: 2, Icon: FaTelegramPlane, url: "https://t.me/yourusername" },
    { id: 3, Icon: FaFacebookF, url: "https://facebook.com/yourprofile" },
    { id: 4, Icon: FaDiscord, url: "https://discord.gg/yourinvite" },
    { id: 5, Icon: MdOutlineEmail, url: "mailto:youremail@gmail.com" },
  ];

  return (
    <div className="md:p-20 p-6 w-full mx-auto flex flex-col max-w-7xl max-sm:w-100">
      {/* Introduce */}
      <div className="w-full">
        {profiles.length > 0 &&
          profiles.map((profile) => (
            <div key={profile.id} className="mt-8 space-y-14">
              <div>
                <h1 className="md:text-5xl text-3xl lg:text-6xl font-bold tracking-wide">
                  Hi, I'm {profile.name}
                </h1>
              </div>
              <div className="md:space-y-6 space-y-8">
                <p className="max-w-sm font-semibold md:text-2xl text-xl text-gray-300">
                  {profile.introduce}
                </p>
                <p className="max-w-xl text-base text-gray-400">
                  {profile.bio}
                </p>
              </div>
            </div>
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
      <div className="w-full mt-20">
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
      </div>

      {/* Portfolio Start */}
      <div className="w-full flex flex-col mt-25 space-y-14">
        <div className="md:space-y-12 space-y-8">
          <h2 className="md:text-4xl text-2xl lg:text-5xl font-bold tracking-wide max-w-3xl">
            What I've done and what I'm doing.
          </h2>
          <p className="max-w-2xl text-base text-gray-400 tracking-wide leading-relaxed">
            I've worked on a variety of projects, from simple websites to
            complex web applications. And many of them are open-source. Here are
            a few of my favorites.
          </p>
        </div>

        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-14 mt-6">
          {portfolios.length > 0 &&
            (portfolios.map((port) => (
              <div
                key={port.id}
                className="group rounded-2xl border border-white/10 bg-slate-900/40 shadow-md overflow-hidden
                  transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/storage/${
                      port.image_url
                    }`}
                    alt={port.title}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
                      transition flex items-center justify-center gap-4"
                  >
                    <a
                      href={`${port.demo_url}`}
                      target="_blank"
                      className="px-4 py-2 text-sm rounded-xl bg-cyan-600 text-white hover:bg-cyan-500"
                    >
                      Live Demo
                    </a>
                    <a
                      href={`${port.github_url}`}
                      target="_blank"
                      className="px-4 py-2 text-sm rounded-xl bg-slate-800 text-white border border-white/20 hover:bg-slate-700"
                    >
                      GitHub
                    </a>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    {port.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {port.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {port.technologies?.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )))}
        </div>
        {portfolioStatus === "loading" && (
          <div className="flex gap-x-2 justify-start items-center mt-20">
            <p className="text-gray-300 font-medium md:text-base text-sm">
              Loading
            </p>
            <p className="w-8 h-8 rounded-full border-2 border-t-transparent border-gray-400 animate-spin"></p>
          </div>
        )}
        {portfolioStatus === "failed" && (
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
      {/* Portfolio end */}

      {/* Skill Start */}
      <div className="w-full md:mt-20 mt-15 space-y-14">
        <div className="md:space-y-12 space-y-8">
          <h2 className="md:text-4xl text-2xl lg:text-5xl font-bold tracking-wide max-w-3xl">
            My Skill
          </h2>
          <p className="max-w-xl text-base text-gray-400 tracking-wide leading-relaxed">
            These are the skills I’m currently working with and improving every
            day as I grow as a web developer through real projects and constant
            practice.
          </p>
        </div>

        <div className="w-full space-y-4">
          {skills.length > 0 &&
            skills.map((skill) => (
              <div key={skill.id}>
                <div className="flex justify-between text-sm text-gray-400 space-y-2">
                  <span className="text-gray-400">{skill.name}</span>
                  <span className="text-yellow-400 font-semibold">
                    {skill.level}%
                  </span>
                </div>

                {/* Ruler line */}
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
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
              Failed to get profile data. It might be Internal Server Error!
            </p>
          </div>
        )}
      </div>
      {/* Skill end */}

      {/* Resume start */}
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
      {/* Resume end */}
      
      {/* Blog start */}
      <div className="w-full md:mt-20 mt-15">
        <div className="md:space-y-12 space-y-8">
          <h2 className="md:text-4xl text-2xl lg:text-5xl font-bold tracking-wide max-w-3xl">
            What I am learning as a developer.
          </h2>
          <p className="max-w-xl text-base text-gray-400 tracking-wide leading-relaxed">
            This space is for my learning journey—what I study, what I
            struggle with, and what I learn while becoming a better developer.
          </p>
        </div>
        <div className="w-full mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.length > 0 &&
            blogs.map((blog) => (
              <div
                className="group rounded-2xl overflow-hidden bg-[#0f172a] border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
                key={blog.id}
              >
                <div className="overflow-hidden">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/storage/${
                      blog.cover_image
                    }`}
                    alt={blog.title}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((b, index) => (
                      <span
                        key={index}
                        className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      >
                        #{b}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold tracking-wide text-white group-hover:text-cyan-400 transition">
                    {blog.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {blog.content}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10 text-sm text-gray-500">
                    <span>{formatDate(blog.join_date)}</span>
                    <a href="#" target="_blank">
                      <span className="text-cyan-400 group-hover:underline cursor-pointer">
                        Read more →
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
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
              Failed to get profile data. It might be Internal Server Error!
            </p>
          </div>
        )}
      </div>
      {/* Blog end */}
      
      {/* Certicate Start */}
      <div className="w-full md:mt-25 mt-20 space-y-14">
        <div className="space-y-4">
          <h2 className="md:text-4xl text-2xl lg:text-5xl font-bold tracking-wide">
            My Certificates
          </h2>
          <p className="max-w-xl text-base text-gray-400 tracking-wide leading-relaxed">
            Certifications I’ve earned through continuous learning and
            professional development.
          </p>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="w-full flex animate-scrollX">
            {certificates.length > 0 &&
              certificates.map((certificate) => (
                <div
                  className="group w-65 shrink-0 rounded-2xl border border-white/10 bg-[#0f172a] overflow-hidden"
                  key={certificate.id}
                >
                  <div className="overflow-hidden">
                    <img
                      src={`${import.meta.env.VITE_API_URL}/storage/${
                        certificate.image
                      }`}
                      alt={certificate.title}
                      className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-4 space-y-1">
                    <h3 className="text-white font-semibold">
                      {certificate.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Issued by {certificate.issuer}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
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
              Failed to get profile data. It might be Internal Server Error!
            </p>
          </div>
        )}
      </div>
      {/* Certicate end */}
    </div>
  );
};

export default Home;
