import React from "react";

const CertificateCard = ({ certificate }) => {
  return (
    <div
      className="group w-65 shrink-0 rounded-2xl border border-white/10 bg-[#0f172a] overflow-hidden"
      key={certificate.id}
    >
      <div className="overflow-hidden">
        <img
          src={`${import.meta.env.VITE_API_URL}/storage/${certificate.image}`}
          alt={certificate.title}
          className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-4 space-y-1">
        <h3 className="text-white font-semibold">{certificate.title}</h3>
        <p className="text-sm text-gray-400">Issued by {certificate.issuer}</p>
      </div>
    </div>
  );
};

export default CertificateCard;
