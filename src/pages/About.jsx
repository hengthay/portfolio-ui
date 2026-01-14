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
                className="sm:w-[500px] sm:h-auto w-[300px] h-auto"
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default About;
