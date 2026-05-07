import { Link, useLocation } from "react-router-dom";
import { FaGithubSquare } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaFacebookF, FaLinkedinIn  } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const Footer = () => {
  const menu = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "About", path: "/about" },
    { id: 3, name: "Portfolios", path: "/portfolio" },
    { id: 4, name: "Blogs", path: "/blog" },
    { id: 5, name: "Contact", path: "/contact" },
  ];

  const foot = [
    { id: 1, Icon: FaGithubSquare, url: "https://github.com/hengthay" },
    { id: 2, Icon: FaTelegramPlane, url: "https://t.me/pachiees" },
    { id: 3, Icon: FaFacebookF, url: "https://web.facebook.com/kim.thai.55501" },
    { id: 4, Icon: FaLinkedinIn, url: "https://www.linkedin.com/in/laov-kimhengthay-047a232b1/" },
    { id: 5, Icon: MdOutlineEmail, url: "mailto:laovkimhengthay@gmail.com" },
  ];

  const location = useLocation();

  const year = new Date().getFullYear();

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

export default Footer;
