import React from 'react'
import { motion } from 'framer-motion'
const ErrorMessage = ({ message }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-x-2 justify-start items-center mt-5 bg-slate-900 shadow py-2 px-2 rounded-md w-full"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <rect x="11" y="6" width="2" height="9" fill="red" />
        <circle cx="12" cy="18" r="1.3" fill="red" />
      </svg>
      <p className="text-red-400 font-medium md:text-base text-sm">{message}</p>
    </motion.div>
  )
}

export default ErrorMessage
