import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkillSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="w-full md:space-y-4 space-y-3">
        {
          Array(8)
            .fill(0)
            .map((_, index) => (
              <div 
                key={index}
                className="flex flex-col leading-4">
                <div 
                  className="flex justify-between">
                  <span className="w-14">
                    <Skeleton 
                      className="w-full"
                      height={11}
                      baseColor="#374151"
                    />
                  </span>
                  <span className="w-6">
                    <Skeleton 
                      className="w-full"
                      height={11}
                      baseColor="#374151"
                    />
                  </span>
                </div>

                {/* Ruler line */}
                <div
                  className="w-full"
                >
                  <Skeleton 
                    className="w-full"
                    height={6}
                    baseColor="#374151"
                  />
                </div>
              </div>
            ))
        }
      </div>
    </div>
  )
}

export default SkillSkeleton