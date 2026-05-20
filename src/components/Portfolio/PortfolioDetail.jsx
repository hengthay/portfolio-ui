import { useDispatch, useSelector } from 'react-redux'
import { fetchPortfolioDetail, selectPortfolioDetail } from '../../features/portfolios/portfolioSlice'
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import formatDate from '../../helper/formatDate';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

const PortfolioDetail = () => {

  const portfolioDetail = useSelector(selectPortfolioDetail);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(fetchPortfolioDetail(id));
  }, [id]);

  // To force browser to display at very top view
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [id]);

  const imageSrc = portfolioDetail?.image_url ? `${import.meta.env.VITE_API_URL}/storage/${portfolioDetail?.image_url}` : "";

  return (
    <div className="md:p-10 lg:p-20 p-4 w-full mx-auto flex flex-col max-w-7xl overflow-x-hidden">
      <div className="w-full flex flex-col mt-10 md:mt-15 space-y-8 md:space-y-14 md:p-0 p-4">
        <div className='flex flex-wrap justify-between items-center gap-4'>
          <Link to={'/portfolio'} className='flex items-center gap-x-2'>
            <IoIosArrowRoundBack size={20}/>
            <span className='text-sm'>
              Back
            </span>
          </Link>
          <span className='text-xs px-3 py-1 rounded-full font-semibold bg-white/10 border border-cyan-400/50 text-gray-200'>
          {portfolioDetail?.category ?? "No Category"}
          </span>
        </div>
        <h2 className="md:text-4xl text-2xl lg:text-5xl font-bold tracking-wide max-w-3xl">Overview of Portfolio</h2>
        <p className="max-w-2xl text-base text-gray-400 tracking-wide leading-relaxed">This project overview outlines the goals, features, technologies, and challenges involved in building the application, highlighting key decisions and the value it delivers.</p>

        <div className='grid grid-cols-12 gap-6 lg:gap-10 items-start'>
          <div className='lg:col-span-6 col-span-12 bg-black/30 rounded-2xl shadow-sm p-2'>
            <div className='w-full md:h-100 h-auto'>
              {
                imageSrc ? (
                  <img 
                  src={`${import.meta.env.VITE_API_URL}/storage/${portfolioDetail?.image_url}`} 
                  alt={portfolioDetail?.title} 
                  className='object-cover w-full h-full rounded-2xl'
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center text-gray-400">No Image Available</div>
                )
              }
            </div>
            <div className="p-4 flex items-center justify-between text-sm text-gray-300">
              <span className="truncate">
                {portfolioDetail?.demo_url ? "Live preview available" : "No demo link"}
              </span>
              <span className="text-gray-500">
                ID: {portfolioDetail?.id ?? "-"}
              </span>
            </div>
          </div>
          <div className='lg:col-span-6 col-span-12'>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-8 space-y-6">
            <div className="flex flex-wrap gap-3">
                <a
                  href={portfolioDetail?.demo_url || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex-1 min-w-25 px-5 py-2.5 rounded-xl font-semibold text-sm transition
                    ${
                      portfolioDetail?.demo_url
                        ? "bg-white text-black hover:bg-gray-200"
                        : "bg-white/10 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  Live Demo
                </a>

                <a
                  href={portfolioDetail?.github_url || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex-1 min-w-25 px-5 py-2.5 rounded-xl font-semibold text-sm transition border
                    ${
                      portfolioDetail?.github_url
                        ? "border-white/15 bg-transparent hover:bg-white/10"
                        : "border-white/10 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  GitHub
                </a>

                <button
                  onClick={() => {
                    const url = window.location.href;
                    navigator.clipboard.writeText(url);
                  }}
                  className="px-5 py-2.5 rounded-xl font-semibold text-sm border border-white/15 bg-transparent hover:bg-white/10 transition"
                >
                  Copy Link
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-4 gap-2">
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs text-gray-400">Created</p>
                  <p className="mt-1 text-sm text-gray-200">
                    {portfolioDetail?.created_at
                      ? formatDate(portfolioDetail?.created_at)
                      : "-"}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs text-gray-400">Last updated</p>
                  <p className="mt-1 text-sm text-gray-200">
                    {portfolioDetail?.updated_at
                      ? formatDate(portfolioDetail?.updated_at)
                      : "-"}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {portfolioDetail?.technologies?.length ? (
                    portfolioDetail.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/10 text-gray-200"
                      >
                        {t}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">No technologies</span>
                  )}
                </div>
              </div>  
            </div>
          </div>
        </div>
        <div className='grid grid-cols-12 md:gap-10 gap-4 item-start w-full'>
          <div className='lg:col-span-8 col-span-12'>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h3 className="text-xl font-bold">About this project</h3>
              <p className="mt-3 text-gray-300 leading-relaxed">
                {portfolioDetail?.description ||
                  "Describe what the project does, your role, and the key value delivered."}
              </p>
              <div className="mt-6 rounded-2xl border border-white/10 bg-linear-to-r from-white/10 to-white/5 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h4 className="text-lg font-bold">Want to see more projects?</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    Browse my portfolio list for other work and case studies.
                  </p>
                </div>
                <Link
                  to="/portfolio"
                  className="inline-flex justify-center px-5 py-2.5 rounded-xl font-semibold text-sm bg-white text-black hover:bg-gray-200 transition"
                >
                  View all works
                </Link>
              </div>
            </div>
          </div>

          <div className='col-span-12 lg:col-span-4'>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-8 space-y-4">
              <h3 className="text-lg md:text-xl font-bold">Project info</h3>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tech count</span>
                <span className="text-gray-200">{portfolioDetail?.technologies?.length ?? 0}</span>
              </div>
              <div className="pt-5 border-t border-white/10 space-y-3">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Project Links
                </p>

                <div className="flex flex-col gap-3">
                  {portfolioDetail?.demo_url ? (
                    <a
                      href={portfolioDetail.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 w-full py-2.5 px-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-medium text-sm hover:bg-cyan-500/20 transition duration-200"
                    >
                      <FiExternalLink size={16} />
                      <span>Launch Live Demo</span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-2.5 w-full py-2.5 px-4 rounded-xl bg-slate-800/40 border border-white/5 text-slate-500 text-sm select-none">
                      <FiExternalLink size={16} className="opacity-50" />
                      <span>No Demo Available</span>
                    </div>
                  )}

                  {portfolioDetail?.github_url ? (
                    <a
                      href={portfolioDetail.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 w-full py-2.5 px-4 rounded-xl bg-slate-800 border border-white/10 text-slate-200 font-medium text-sm hover:bg-slate-700 hover:text-white transition duration-200"
                    >
                      <FiGithub size={16} />
                      <span>Lanuch Github Demo</span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-2.5 w-full py-2.5 px-4 rounded-xl bg-slate-800/40 border border-white/5 text-slate-500 text-sm select-none">
                      <FiGithub size={16} className="opacity-50" />
                      <span>No Github Available</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioDetail