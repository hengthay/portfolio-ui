import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CertificateSkeleton = () => {
  return (
    <div className="relative w-full overflow-hidden mt-14">
      <div className="w-max flex animate-scrollX shrink-0">
        {
          Array(6)
            .fill(0)
            .map((_, index) => (
              <div
                className="group w-65 shrink-0 rounded-2xl border border-white/10 bg-[#0f172a] overflow-hidden"
                key={index}
              >
                {/* Image */}
                <Skeleton
                  borderRadius={6}
                  height={140}
                  className="w-full"
                  baseColor="#374151"
                />

                <div className="p-4 space-y-1">
                  <div className="w-25">
                    <Skeleton height={14} baseColor="#374151" className="w-full"/>
                  </div>
                  <div className="w-40">
                    <Skeleton height={14} baseColor="#374151" className="w-full"/>
                  </div>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  )
}

export default CertificateSkeleton