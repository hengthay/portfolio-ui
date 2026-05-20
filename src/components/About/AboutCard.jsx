import React from "react";
import { LuDownload } from "react-icons/lu";

const AboutCard = ({ profile }) => {
  return (
    <div
      className="w-full grid sm:grid-cols-2 gap-10 grid-cols-1 md:my-16"
      key={profile.id}
    >
      <div className="space-y-6 md:space-y-8 order-2 md:order-1">
        <h2 className="md:text-5xl text-3xl lg:text-6xl font-bold tracking-wide max-w-xl">
          I'm {profile.name}, {profile.introduce}
        </h2>
        {profile.hobbies.map((hobbie, index) => (
          <div key={index}>
            <p className="max-w-xl text-lg text-gray-400 tracking-wide leading-relaxed">
              {hobbie}
            </p>
          </div>
        ))}
        <a
          href={`${import.meta.env.VITE_API_URL}/storage/${profile.resume_url}`}
          download="Hengthay.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex md:gap-2 gap-1.5 text-nowrap bg-black shadow-md shadow-gray-800 py-2 px-4 font-semibold rounded-lg hover:bg-transparent border border-transparent hover:border-gray-400 transition-all ease-in-out duration-300"
        >
          <span>Download CV</span>
          <LuDownload size={20}/>
        </a>
      </div>
      <div className="order-1 md:order-2 flex justify-center md:justify-end md:my-0 mt-15">
        <img
          src={`${import.meta.env.VITE_API_URL}/storage/${profile.avatar_url}`}
          alt={profile.name}
          className="w-full max-w-md h-auto rounded-2xl object-cover shadow-2xl border border-white/5"
        />
      </div>
    </div>
  );
};

export default AboutCard;
