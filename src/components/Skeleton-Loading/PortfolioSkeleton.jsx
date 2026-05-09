import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PortfolioSkeleton = () => {
  return (
    <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-14 mt-6 animate-pulse">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-slate-900/40 shadow-md overflow-hidden"
          >
            {/* Image */}
            <Skeleton
              borderRadius={6}
              height={192}
              className="w-full"
              baseColor="#374151"
            />

            <div className="p-5 space-y-4">
              <div className="w-2/3">
                <Skeleton height={24} className="w-full" baseColor="#374151"/>
              </div>

              <div className="space-y-2">
                <Skeleton height={14} baseColor="#374151"/>
                <Skeleton height={14} baseColor="#374151"/>
                <Skeleton height={14} width="70%" baseColor="#374151"/>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton
                      baseColor="#374151"
                      key={i}
                      width={60}
                      height={20}
                      borderRadius={9999}
                    />
                  ))}
              </div>

              {/* Button */}
              <div className="flex justify-end">
                <Skeleton
                  width={90}
                  height={35}
                  borderRadius={12}
                  baseColor="#374151"
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PortfolioSkeleton;
