import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SearchBarTop() {
  const placeholderTexts = ["Makanan", "Minuman", "Jasa", "Temukan semuanya di StrawHUB"];
  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Animate placeholder rotation
  useEffect(() => {
    if (inputValue.trim() !== "") return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % placeholderTexts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [inputValue]);

  // Detect scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down
        setShowHeader(false);
      } else {
        // Scrolling up
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle search
  const handleSearch = () => {
    const query = inputValue.trim();
    if (!query) {
      navigate("/catalogue"); // Navigate to the main page when no search term
      setInputValue(""); // Clear input field
    } else {
      navigate(`/catalogue?search=${encodeURIComponent(query)}`); // Navigate with search query
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Ensure reset when inputValue is empty (redirect to main catalog page)
  useEffect(() => {
    if (inputValue.trim() === "") {
      // Only reset if the search input is cleared, not if the page was manually accessed.
      if (location.search.includes("search")) {
        navigate("/catalogue", { replace: true });
      }
    }
  }, [inputValue, navigate, location.search]);

  return (
    <AnimatePresence>
      {showHeader && (
        <motion.div
          key="search-header"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="hidden lg:block fixed top-0 left-0 right-0 z-40  py-3 shadow-sm"
        >
          <div className="max-w-3xl mx-auto flex items-center justify-center px-6">
            <div className="w-full bg-white rounded-full shadow-md flex items-center px-5 py-3 border border-gray-200">
              <Search className="text-gray-400 mr-3" size={20} />

              {/* Animated Placeholder */}
              <div className="relative flex-1">
                {inputValue === "" && (
                  <div className="absolute inset-0 flex items-center pointer-events-none">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={placeholderTexts[index]}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="text-gray-400 italic"
                      >
                        {placeholderTexts[index]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                )}
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-transparent focus:outline-none text-gray-800"
                  placeholder=""
                />
              </div>

              <button 
                onClick={handleSearch}
                className="bg-red-600 text-white px-5 py-1.5 rounded-full text-sm font-semibold hover:bg-red-700 transition-all"
              >
                Cari
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
