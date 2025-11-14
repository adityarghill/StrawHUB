import { useState, useEffect } from "react";
import { Search, Menu, X, User, ShoppingBag, MessageCircle, Heart, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../../../images/icon.svg";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const texts = ["Makanan", "Minuman", "Jasa", "Temukan semuanya di StrawHUB"];
  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");

  // 🔄 Placeholder cycle
  useEffect(() => {
    if (inputValue.trim() !== "") return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [inputValue]);

  const links = [
    { icon: <User size={22} />, label: "Profile", path: "/profile" },
    { icon: <ShoppingBag size={22} />, label: "Catalogue", path: "/catalogue" },
    { icon: <MessageCircle size={22} />, label: "Chat", path: "/chat" },
    { icon: <Heart size={22} />, label: "Favorites", path: "/favorites" },
    { icon: <Settings size={22} />, label: "Settings", path: "/settings" },
  ];

  // 🛠 FIX: Close only if clicking outside drawer + hamburger
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isDrawer = target.closest("[data-drawer]");
      const isButton = target.closest("[data-hamburger]");

      if (!isDrawer && !isButton) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="fixed top-4 left-0 w-full flex items-center gap-3 px-4 z-50 lg:hidden">

      {/* 🔹 Hamburger Button */}
      <button
        data-hamburger
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-3 rounded-lg bg-[#AA0202] text-white shadow-md flex-shrink-0"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* 🔹 Search Bar */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="searchbar"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="flex items-center bg-white rounded-full px-5 py-3 shadow-md flex-1"
          >
            <Search className="text-gray-400 mr-3" size={20} />

            <div className="relative flex-1">
              {inputValue === "" && (
                <div className="absolute inset-0 flex items-center pointer-events-none">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={texts[index]}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="text-gray-400 italic text-sm"
                    >
                      {texts[index]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              )}

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-gray-800 text-sm"
              />
            </div>

            <button className="bg-red-600 text-white px-4 py-1 rounded-full text-md font-semibold hover:bg-red-700 transition-all">
              Cari
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Drawer Menu (fixed version) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-drawer="true"
            key="drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="fixed top-0 left-0 h-full w-64 bg-[#AA0202] text-white shadow-2xl flex flex-col items-center py-8"
          >
            <div
              onClick={() => {
                navigate("/");
                setIsOpen(false);
              }}
              className="flex flex-col items-center mb-8 cursor-pointer"
            >
              <div className="bg-[#EAEEEF] rounded-full p-4 mb-3 shadow-md">
                <img src={logo} alt="Logo" className="w-12 h-12" />
              </div>
              <p className="text-sm font-semibold text-white">StrawHUB</p>
            </div>

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
