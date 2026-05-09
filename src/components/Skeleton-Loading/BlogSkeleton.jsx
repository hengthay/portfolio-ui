import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlogSkeleton = () => {
  return (
    <div className="w-full mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <div
            className="group rounded-2xl overflow-hidden bg-[#0f172a] border border-white/10 hover:border-cyan-500/50 transition-colors duration-300"
            key={index}
          >
            
            {/* Image */}
            <Skeleton
              borderRadius={6}
              height={192}
              className="w-full"
              baseColor="#374151"
            />

            <div className="p-6 space-y-4">
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

              <div className="md:w-50 w-40">
                <Skeleton
                  height={20}
                  className="w-full"
                  baseColor="#374151"
                />
              </div>

              <div className="space-y-1">
                <Skeleton height={14} baseColor="#374151"/>
                <Skeleton height={14} baseColor="#374151"/>
                <Skeleton height={14} width="70%" baseColor="#374151"/>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-sm text-gray-500">
                <div className="w-15">
                  <Skeleton height={14} baseColor="#374151" className="w-full"/>
                </div>
                <div className="w-15">
                  <Skeleton height={14} baseColor="#374151" className="w-full"/>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default BlogSkeleton