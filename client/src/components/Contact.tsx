import { FaFacebookF, FaWhatsapp, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-6 text-center flex justify-between ">
      <div className="flex justify-center gap-12 w-1/3">
        <a href="https://facebook.com/yourhandle" target="_blank" rel="noopener noreferrer" className="text-white text-3xl hover:text-blue-600">
          <FaFacebookF />
        </a>
        <a href="https://wa.me/yourwhatsappnumber" target="_blank" rel="noopener noreferrer" className="text-white text-3xl hover:text-green-500">
          <FaWhatsapp />
        </a>
        <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer" className="text-white text-3xl hover:text-violet-500">
          <FaInstagram />
        </a>
        <a href="https://youtube.com/yourchannel" target="_blank" rel="noopener noreferrer" className="text-white text-3xl hover:text-red-600">
          <FaYoutube />
        </a>
        <a href="https://linkedin.com/in/yourhandle" target="_blank" rel="noopener noreferrer" className="text-white text-3xl hover:text-blue-700">
          <FaLinkedinIn />
        </a>
      </div>
      <img src={Logo} alt="logo" className="w-12" />
      <p className="text-xl w-1/3 text-left">
        &copy; {new Date().getFullYear()} Vaibhav Bajoriya. MIT License 2.0
      </p>
    </footer>
  );
};

export default Footer;
