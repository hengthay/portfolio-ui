import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ContactIconSkeleton = () => {

  return (
    <footer className="w-full border-t border-slate-800 mt-20">
      <div className="w-full flex flex-col md:p-16 p-18 overflow-hidden">
        <ul className="w-full flex flex-wrap md:justify-start md:items-start justify-center items-center md:my-6 my-8">
          {menu.map((item) => (
            <li
              key={item.id}
              className={`p-1 text-base font-normal hover:text-cyan-600 transition-all ease-in-out duration-300 ${
                location.pathname === item.path
                  ? "text-cyan-500"
                  : "text-white"
              }`}
            >
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <div className="w-full text-white md:text-start text-center ">
          <div className="">
            <p className="text-sm text-gray-400">&copy; {year} <a href="https://github.com/hengthay" className="font-bold" target="_blank">LAOV Kim Heng Thay</a>. All rights reserved.</p>
          </div>
          <div className="w-full my-8">
            <ul className="flex justify-center items-center md:justify-start md:items-start md:gap-x-2 gap-x-2">
              {
                foot.map((item) => (
                <li key={item.id} className="text-white/80">
                  <a href={item.url} target="_blank" rel="noreferrer">
                    <item.Icon size={28} className="p-1 rounded-full transition-all hover:bg-gray-500 ease-in-out duration-300"/>
                  </a>
                </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactIconSkeleton;
