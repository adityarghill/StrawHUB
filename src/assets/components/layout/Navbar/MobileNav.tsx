import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, ShoppingBag, MessageCircle, Heart, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../../images/icon.svg";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const links = [
    { icon: <User size={22} />, label: "Profile", path: "/profile" },
    { icon: <ShoppingBag size={22} />, label: "Catalogue", path: "/catalogue" },
    { icon: <MessageCircle size={22} />, label: "Chat", path: "/chat" },
    { icon: <Heart size={22} />, label: "Favorites", path: "/favorites" },
    { icon: <Settings size={22} />, label: "Settings", path: "/settings" },
  ];

  // ✅ Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed top-4 left-4 z-50 lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-[#AA0202] text-white shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Slide-in Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={drawerRef}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="fixed top-0 left-0 h-full w-64 bg-[#AA0202] text-white shadow-2xl flex flex-col items-center py-8"
          >
            {/* 🔹 LogoNav inside mobile drawer */}
            <div
              onClick={() => {
                navigate("/");
                setIsOpen(false);
              }}
              className="flex flex-col items-center mb-8 cursor-pointer"
            >
              <div className="bg-[#EAEEEF] rounded-full p-4 mb-3 shadow-md">
                <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
              </div>
              <p className="text-sm font-semibold text-white">StrawHUB</p>
            </div>

            {/* Navigation Links */}
            <ul className="w-full flex flex-col gap-5 px-6">
              {links.map((link) => (
                <li
                  key={link.path}
                  onClick={() => {
                    navigate(link.path);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 text-lg font-medium hover:bg-white hover:text-[#AA0202] transition-all px-4 py-2 rounded-xl cursor-pointer"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
