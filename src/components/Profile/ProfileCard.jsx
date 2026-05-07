import { motion } from "framer-motion";

const ProfileCard = ({ profile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
      key={profile.id}
      className="mt-8 md:space-y-14 space-y-10"
    >
      <div className="flex gap-x-2 items-center">
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
    </motion.div>
  );
};

export default ProfileCard;
