import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ResumeSkeleton = () => {
  return (
    <ul className="mt-10 space-y-10 relative">
      {Array(2)
        .fill(0)
        .map((_, index) => (
          <li key={index} className="relative pl-12 space-y-1.5">
            <span className="absolute left-4 top-1 w-3 h-3 rounded-full bg-gray-600"></span>

            <div className="w-40">
              <Skeleton className="w-full" height={16} baseColor="#374151" />
            </div>

            <div className="w-60">
              <Skeleton className="w-full" height={12} baseColor="#374151" />
            </div>

            <div className="w-40">
              <Skeleton className="w-full" height={12} baseColor="#374151" />
            </div>

            <div className="w-25">
              <Skeleton className="w-full" height={12} baseColor="#374151" />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default ResumeSkeleton;
