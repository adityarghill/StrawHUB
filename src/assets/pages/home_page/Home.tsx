import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex justify-center items-start w-full bg-white p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row w-full max-w-[1240px] bg-white rounded-2xl shadow-md overflow-hidden p-4 sm:p-5 space-y-6 lg:space-y-0 lg:space-x-6">

        {/* Hero section Kiri */}
        <div className="relative w-full lg:w-3/5 rounded-2xl overflow-hidden bg-black">
          <img
            src="src/assets/images/hero.jpg"
            alt="hero section UMKM"
            className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-full object-cover"
          />

          {/* Overlay konten */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4 sm:p-8 text-white">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 leading-tight">
              Berbagai UMKM di Seluruh Indonesia
            </h2>
            <hr className="border-t-2 border-white/70 w-full mb-2" />
            <p className="text-xs sm:text-sm mb-4">
              Lebih dari 1000+ UMKM lokal Indonesia terdaftar dan aktif di StrawHUB
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 sm:px-6 py-2 rounded-full w-fit transition">
              More
            </button>
          </div>

          {/* Tombol navigasi kiri-kanan */}
          <button className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white p-1 sm:p-2 rounded-full shadow">
            <FaChevronLeft className="text-black/70 text-xs sm:text-base" />
          </button>
          <button className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white p-1 sm:p-2 rounded-full shadow">
            <FaChevronRight className="text-black/70 text-xs sm:text-base" />
          </button>

          {/* Carousel dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full opacity-80"></span>
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-400 rounded-full opacity-50"></span>
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-400 rounded-full opacity-50"></span>
          </div>
        </div>

        {/* Hero section kanan */}
        <div className="w-full lg:w-1/2 flex flex-col p-3 sm:p-6 space-y-6">
          {/* Bagian Terbaru */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-red-700 mb-3">
              Terbaru
            </h3>
            <div className="flex space-x-3 sm:space-x-6 mb-3 overflow-x-auto scrollbar-hide">
              <img
                src="src/assets/images/hero.jpg"
                className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-lg object-cover flex-shrink-0"
              />
              <img
                src="src/assets/images/hero.jpg"
                className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-lg object-cover flex-shrink-0"
              />
              <img
                src="src/assets/images/hero.jpg"
                className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-lg object-cover flex-shrink-0"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white rounded-full p-2 flex-shrink-0">
                <FaChevronRight />
              </button>
            </div>
          </div>

          {/* Bagian Temukan */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-red-700 mb-3">
              Temukan
            </h3>
            <div className="relative w-full h-36 sm:h-48 bg-gray-200 rounded-lg mb-2">
              <img
                src="src/assets/images/hero.jpg"
                className="w-full h-full bg-gray-200 rounded-lg object-cover"
              />

              {/* Carousel dots */}
              <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-2">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full opacity-80"></span>
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full opacity-50"></span>
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full opacity-50"></span>
              </div>

              {/* Tombol navigasi kiri-kanan */}
              <button className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white p-1 sm:p-2 rounded-full shadow">
                <FaChevronLeft className="text-black/70 text-xs sm:text-base" />
              </button>
              <button className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white p-1 sm:p-2 rounded-full shadow">
                <FaChevronRight className="text-black/70 text-xs sm:text-base" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
