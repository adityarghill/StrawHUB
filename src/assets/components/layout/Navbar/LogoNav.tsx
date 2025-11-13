import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../../../images/icon.svg"; // your existing logo path

export default function LogoNav() {
  const navigate = useNavigate();

  return (
    <div className="fixed left-6 top-10 z-50">
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        onClick={() => navigate("/")}
        className="flex items-center justify-center w-[80px] h-[80px] bg-[#EAEEEF] rounded-full shadow-[0_0_25px_rgba(0,0,0,0.1)] cursor-pointer"
      >
        <img
          src={logo}
          alt="Logo"
          className="w-[50px] h-[50px] object-contain"
        />
      </motion.div>
    </div>
  );
}
