import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileCardSkeleton = () => {
  return (
    <div className="mt-8 md:space-y-14 space-y-10 animate-pulse">
      {/* Title */}
      <div className="lg:w-140 md:w-100 w-70">
        <Skeleton
          className="w-full"
          height={50}
          baseColor="#374151"
        />
      </div>

      <div className="md:space-y-6 space-y-8 lg:w-80 md:w-70 w-60">
        <Skeleton
          className="w-full"
          height={32}
          baseColor="#374151"
        />

        <div className="md:space-y-1.5 space-y-1 mt-6">
          <p className="md:w-125 w-80">
            <Skeleton
              className="w-full"
              height={18}
              baseColor="#374151"
            />
          </p>
          <p className="md:w-130 w-80">
            <Skeleton
              className="w-full"
              height={18}
              baseColor="#374151"
            />
          </p>
          <p className="w-80">
            <Skeleton
              className="w-full"
              height={18}
              baseColor="#374151"
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardSkeleton;