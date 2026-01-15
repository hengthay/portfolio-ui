import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfiles,
  selectProfile,
  selectProfileStatus,
} from "../features/profiles/profileSlice";
import AboutCard from "../components/About/AboutCard";

const About = () => {
  const dispatch = useDispatch();
  const profiles = useSelector(selectProfile);
  const profileStatus = useSelector(selectProfileStatus);

  useEffect(() => {
    if (profileStatus === "idle") dispatch(fetchProfiles());
  }, [profileStatus, dispatch]);

  return (
    <div className="md:p-20 p-6 w-full mx-auto flex flex-col max-w-7xl max-sm:w-100">
      {profiles.length > 0 &&
        profiles.map((profile) => (
          <AboutCard profile={profile}/>
        ))}

        {profileStatus === "loading" && (
          <div className="flex gap-x-2 justify-start items-center mt-20">
            <p className="text-gray-300 font-medium md:text-base text-sm">
              Loading
            </p>
            <p className="w-8 h-8 rounded-full border-2 border-t-transparent border-gray-400 animate-spin"></p>
          </div>
        )}
        {profileStatus === "failed" && (
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
  );
};

export default About;
