import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const texts = ["Makanan", "Minuman", "Jasa", "Temukan semuanya di StrawHUB"];
  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");

  // Cycle placeholder text every 2.5s only when input is empty
  useEffect(() => {
    if (inputValue.trim() !== "") return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [inputValue]);

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <div className="flex items-center bg-white rounded-full px-5 py-3 shadow-md">
        <Search className="text-gray-400 mr-3" size={20} />

        {/* Input wrapper */}
        <div className="relative flex-1">
          {/* Animated placeholder */}
          {inputValue === "" && (
            <div className="absolute inset-0 flex items-center pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.span
                  key={texts[index]}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="text-gray-400 italic"
                >
                  {texts[index]}
                </motion.span>
              </AnimatePresence>
            </div>
          )}

          {/* Real input field */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-gray-800"
            placeholder=""
          />
        </div>

        <button className="bg-red-600 text-white px-5 py-1.5 rounded-full text-sm font-semibold hover:bg-red-700 transition-all">
          Cari
        </button>
      </div>
    </div>
  );
}
