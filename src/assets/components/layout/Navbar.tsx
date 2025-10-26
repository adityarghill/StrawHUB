import { FaSearch, FaRegBell, FaRegHeart } from "react-icons/fa";

export default function Navigation() {
  return (
    <nav className="w-full h-20 shadow-md bg-primary-gradient sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-[1240px] mx-auto flex justify-between items-center h-full px-6">
        {/* Logo */}
        <img className="pt-2" src="src/assets/images/logo1.svg" />

        {/* Search Bar */}
        <div className="flex-1 mx-16 hidden md:flex justify-start">
          <div className="relative w-full max-w-lg">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-black text-lg" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-10 py-2 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div className="flex px-16 py-2 space-x-6 text-white text-2xl cursor-pointer">
            <FaRegBell className="hover:text-yellow-500 transition-colors duration-200" />
            <FaRegHeart className="hover:text-red-500 transition-colors duration-200" />
          </div>
        </div>

        {/* Tombol sign in */}
        <button className="hidden md:block bg-black text-white px-5 py-2 rounded-lg hover:bg-black transition-colors duration-200">
          Sign In
        </button>
      </div>
    </nav>
  );
}
