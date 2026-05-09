import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  fetchProfiles,
  selectProfile,
  selectProfileStatus,
} from "../features/profiles/profileSlice";
import AboutCard from "../components/About/AboutCard";
import AboutSkeleton from "../components/Skeleton-Loading/AboutSkeleton";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const About = () => {
  const dispatch = useDispatch();
  const profiles = useSelector(selectProfile);
  const profileStatus = useSelector(selectProfileStatus);

  useEffect(() => {
    if (profileStatus === "idle") dispatch(fetchProfiles());
  }, [profileStatus, dispatch]);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.12 } },
      }}
      className="md:p-20 p-6 w-full mx-auto flex flex-col max-w-7xl "
    >
      {
        profileStatus === 'succeeded' && profiles.length > 0 &&
          profiles.map((profile) => (
            <motion.div
              key={profile.id}
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="transform-gpu"
            >
              <AboutCard profile={profile} />
            </motion.div>
          ))
      }

      {profileStatus === "loading" && (
        <AboutSkeleton />
      )}

      {profileStatus === "failed" && (
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex gap-x-2 justify-start items-center mt-20 bg-slate-900 shadow py-2 px-2 rounded-md w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="shrink-0"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            <rect x="11" y="6" width="2" height="9" fill="red" />
            <circle cx="12" cy="18" r="1.3" fill="red" />
          </svg>
          <p className="text-red-400 font-medium md:text-base text-sm">
            Failed to get profile data. It might be Internal Server Error!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default About;
