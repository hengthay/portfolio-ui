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
import ErrorMessage from "../helper/ErrorMessage";
import { selectPortfolioError } from "../features/portfolios/portfolioSlice";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const About = () => {
  const dispatch = useDispatch();
  const profiles = useSelector(selectProfile);
  const profileStatus = useSelector(selectProfileStatus);
  const profileErrorMessage = useSelector(selectPortfolioError); 

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
        <ErrorMessage message={profileErrorMessage || "Internal Server Error or Not Found!"}/>
      )}
    </motion.div>
  );
};

export default About;
