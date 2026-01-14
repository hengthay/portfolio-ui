import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfiles,
  selectProfile,
  selectProfileStatus,
} from "../features/profiles/profileSlice";

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
          <div className="w-full grid sm:grid-cols-2 gap-10 grid-cols-1" key={profile.id}>
            <div className="space-y-14 md:order-1 order-2">
              <h2 className="md:text-5xl text-3xl lg:text-6xl font-bold tracking-wide max-w-xl">
                I'm {profile.name}, {profile.introduce}
              </h2>
              {
                profile.hobbies.map((hobbie, index) => (
                  <div key={index}>
                    <p className="max-w-xl text-lg text-gray-400 tracking-wide leading-relaxed">
                      {hobbie}
                    </p>
                  </div>
                ))
              }
              <a
                href={`${import.meta.env.VITE_API_URL}/storage/${profile.resume_url}`}
                download="Corey_Chiu_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black shadow-md shadow-gray-800 py-2 px-4 font-semibold rounded-lg hover:bg-transparent border border-transparent hover:border-gray-400 transition-all ease-in-out duration-300"
              >
                Download My Resume
              </a>
            </div>
            <div className="sm:mt-0 mt-20 md:order-2 order-1 flex justify-start items-start">
              <img
                src={`${import.meta.env.VITE_API_URL}/storage/${profile.avatar_url}`}
                alt=""
                className="sm:w-125 sm:h-auto w-75 h-auto"
              />
            </div>
          </div>
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
