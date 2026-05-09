import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AboutSkeleton = () => {
  return (
    <div
      className="w-full grid sm:grid-cols-2 gap-10 grid-cols-1 sm:my-10"
    >
      <div className="md:space-y-8 space-y-6 md:order-1 order-2">
        <div className="w-[80%]">
          <Skeleton 
            height={60}
            className="w-full"
            baseColor="#374151"
            />
        </div>
        {
          Array(3)
            .fill(0)
            .map((_, index) => (
            <div 
              key={index}
              >
              <div className="w-full">
                <Skeleton 
                  height={35}
                  className="w-full"
                  baseColor="#374151"
                  />
              </div>
            </div>
          ))
        }
        <div
          className="w-35"
        >
          <Skeleton 
          height={30}
          className="w-full"
          baseColor="#374151"
          />
        </div>
      </div>
      <div className="sm:mt-0 mt-20 md:order-2 order-1">
        <Skeleton 
          borderRadius={10}
          height={300}
          className="w-full"
          baseColor="#374151"
          />
      </div>
    </div>
  )
}

export default AboutSkeleton