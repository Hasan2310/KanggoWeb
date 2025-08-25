import React from 'react';
import { FaInstagram, FaWhatsapp, FaTiktok, FaYoutube, FaFacebook, FaXTwitter, FaLinkedin } from 'react-icons/fa6';

const iconList = {
  Instagram: <FaInstagram />,
  WhatsApp: <FaWhatsapp />,
  TikTok: <FaTiktok />,
  YouTube: <FaYoutube />,
  Facebook: <FaFacebook />,
  Twitter: <FaXTwitter />,
  LinkedIn: <FaLinkedin />,
};

const Medsos = ({ name, link }) => {
  const Icon = iconList[name];
  if (!Icon) return null;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 flex justify-center items-center rounded-full bg-[#374A33] text-white text-md hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
      title={name}
    >
      {Icon}
    </a>
  );
};

export default Medsos;
