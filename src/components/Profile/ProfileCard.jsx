import React from "react";

const ProfileCard = ({ profile }) => {
  return (
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
        <p className="max-w-xl text-base text-gray-400">{profile.bio}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
