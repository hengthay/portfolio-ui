import React from "react";

const AboutCard = ({ profile }) => {
  return (
    <div
      className="w-full grid sm:grid-cols-2 gap-10 grid-cols-1"
      key={profile.id}
    >
      <div className="space-y-14 md:order-1 order-2">
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
          className="bg-black shadow-md shadow-gray-800 py-2 px-4 font-semibold rounded-lg hover:bg-transparent border border-transparent hover:border-gray-400 transition-all ease-in-out duration-300"
        >
          Download My Resume
        </a>
      </div>
      <div className="sm:mt-0 mt-20 md:order-2 order-1 flex justify-start items-start">
        <img
          src={`${import.meta.env.VITE_API_URL}/storage/${profile.avatar_url}`}
          alt={profile.name}
          className="sm:w-125 sm:h-auto w-75 h-auto rounded-2xl"
        />
      </div>
    </div>
  );
};

export default AboutCard;
