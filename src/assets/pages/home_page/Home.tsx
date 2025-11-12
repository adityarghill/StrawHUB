import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex justify-center items-start w-full bg-white p-6">
      <div className="flex w-full max-w-[1240px] bg-white rounded-2xl shadow-md overflow-hidden p-5">

        {/* Hero section Kiri*/}
        <div className="relative w-3/5 rounded-2xl overflow-hidden bg-black">
          <img
            src="src/assets/images/hero.jpg"
            alt="hero section UMKM"
            className="w-full h-full object-cover"
          />

          {/* Overlay konten */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">
              Berbagai UMKM di Seluruh Indonesia
            </h2>
            <hr className="border-t-2 border-white-400 w-full" />
            <p className="text-sm mb-4">
              Lebih dari 1000+ UMKM lokal Indonesia terdaftar dan aktif di
              StrawHUB
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full w-fit transition">
              More
            </button>
          </div>

          {/* Tombol navigasi kiri-kanan */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white p-2 rounded-full shadow">
            <FaChevronLeft className="text-black/70" />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white p-2 rounded-full shadow">
            <FaChevronRight className="text-black/70" />
          </button>

          {/* Crousel konten */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
            <span className="w-3 h-3 bg-white rounded-full opacity-80"></span>
            <span className="w-3 h-3 bg-gray-400 rounded-full opacity-50"></span>
            <span className="w-3 h-3 bg-gray-400 rounded-full opacity-50"></span>
          </div>
        </div>

        {/* Hero section kanan */}
        <div className="w-1/2 flex flex-col p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-red-700 mb-3">Terbaru</h3>
            <div className="flex space-x-6 mb-3">
              <img
                src="src/assets/images/hero.jpg"
                className="w-24 h-24 bg-gray-200 rounded-lg object-cover"
              />
              <img
                src="src/assets/images/hero.jpg"
                className="w-24 h-24 bg-gray-200 rounded-lg object-cover"
              />
              <img
                src="src/assets/images/hero.jpg"
                className="w-24 h-24 bg-gray-200 rounded-lg object-cover"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white rounded-full p-2">
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-red-700 mb-3">Temukan</h3>
            <div className="relative w-full h-48 bg-gray-200 rounded-lg mb-2">
              <img
                src="src/assets/images/hero.jpg"
                className="w-full h-full bg-gray-200 rounded-lg object-cover"
              />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
                <span className="w-2 h-2 bg-white rounded-full opacity-80"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full opacity-50"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full opacity-50"></span>
              </div>

              {/* Tombol navigasi kiri-kanan */}
              <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white p-2 rounded-full shadow">
                <FaChevronLeft className="text-black/70" />
              </button>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white p-2 rounded-full shadow">
                <FaChevronRight className="text-black/70" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
