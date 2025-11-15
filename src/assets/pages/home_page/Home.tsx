import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { User } from "lucide-react";
import umkm from "../../../data/umkm.json";
import React, { useState, useEffect } from "react";

export default function Home() {
  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexIkuti, setCurrentIndexIkuti] = useState(0);

  const nextSlide = (
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    length: number
  ) => {
    setIndex((prevIndex) => (prevIndex + 1) % length);
  };

  const prevSlide = (
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    length: number
  ) => {
    setIndex((prevIndex) => (prevIndex - 1 + length) % length);
  };

  // Auto slide untuk carousel hero
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide(setCurrentIndex, 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto slide untuk carousel temukan
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide(setCurrentIndexIkuti, 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-start w-full bg-white p-4 mt-12 sm:p-6">
      <div className="flex flex-col lg:flex-row w-full max-w-[1240px] bg-gradient-to-t from-black to-white bg-opacity-30 backdrop-blur-3xl rounded-2xl shadow-2xl overflow-hidden p-4 sm:p-5 space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Hero section Kiri */}
        <div className="relative w-2/3 rounded-2xl overflow-hidden">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight px-5">
            Halo,
          </h2>

          {/* Carousel kiri*/}
          {umkm
            .slice(currentIndex, currentIndex + 1) // Menampilkan gambar sesuai urutan index
            .map((item) => (
              <img
                key={item.id}
                // src={item.image || "src/assets/images/hero.jpg"} // Pastikan src ada untuk gambar
                alt={item.username || "hero section UMKM"}
                className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-full object-cover rounded-t-2xl"
              />
            ))}

          {/* Overlay konten */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4 sm:p-8 text-white rounded-t-2xl">
            <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-2 leading-tight">
              Berbagai UMKM di Seluruh Indonesia
            </h2>
            <hr className="border-t-2 border-white/70 w-full mb-2" />
            <p className="text-xs sm:text-sm mb-4">
              Lebih dari 1000+ UMKM lokal Indonesia terdaftar dan aktif di
              StrawHUB
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 sm:px-6 py-2 rounded-full w-fit transition">
              More
            </button>
          </div>

          <button
            onClick={() => prevSlide(setCurrentIndex, 3)}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white p-1 sm:p-2 rounded-full shadow"
          >
            <FaChevronLeft className="text-black/70 text-xs sm:" />
          </button>
          <button
            onClick={() => nextSlide(setCurrentIndex, 3)}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white p-1 sm:p-2 rounded-full shadow"
          >
            <FaChevronRight className="text-black/70 text-xs sm:" />
          </button>

          {/* Carousel dots*/}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
            {umkm
              .slice(0, 3) // Sesuaikan dengan jumlah item yang ingin ditampilkan
              .map((_, index) => (
                <span
                  key={index}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-white opacity-100"
                      : "bg-gray-400 opacity-50"
                  }`}
                />
              ))}
          </div>
        </div>

        {/* Hero section kanan */}
        <div className="w-1/3 flex flex-col min-w-0">
          <h2 className="text-2xl font-bold text-red-700 mb-3">Ikuti +</h2>
          <div className="bg-green-500 p-2 rounded-2xl">
            {umkm
              .sort(() => Math.random()) // Pengacakan hanya di bagian Ikuti
              .slice(0, 3)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-red-600 p-4 m-2 rounded-3xl"
                >
                  <div className="w-10 h-10 bg-white rounded-full fixed mr-4 flex items-center justify-center">
                    <User size={24} />
                  </div>
                  <div className="ml-14 flex-grow min-w-0">
                    <p className="text-white font-semibold truncate">
                      {item.username}
                    </p>
                    <p className="text-gray-300 truncate text-sm">
                      {item.akun_strawhub}
                    </p>
                  </div>
                  <button className="bg-white text-red-600 py-2 px-4 rounded-full">
                    Ikuti
                  </button>
                </div>
              ))}
          </div>

          {/* Bagian Temukan */}
          <div className="pt-4">
            <h3 className="text-2xl font-bold text-red-700 mb-3">Temukan</h3>
            <div className="bg-green-500 p-2 rounded-2xl">
              <div className="relative w-full h-24 sm:h-32 md:h-36 lg:h-40 bg-gray-200 rounded-lg mb-2 overflow-hidden">
                {/* Mengatur gambar agar lebih gepeng (horizontal) */}
                {umkm
                  .slice(0, 5) // Tidak ada pengacakan di sini
                  .slice(currentIndexIkuti, currentIndexIkuti + 1)
                  .map((item) => (
                    <img
                      key={item.id}
                      alt={item.username || "UMKM"}
                      className="w-full h-full object-cover"
                    />
                  ))}

                {/* Carousel dots - dinamis sesuai jumlah data */}
                <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-2">
                  {umkm
                    .slice(0, 3) // Tidak ada pengacakan di sini
                    .map((_, index) => (
                      <span
                        key={index}
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                          index === currentIndexIkuti
                            ? "bg-white opacity-100"
                            : "bg-gray-400 opacity-50"
                        }`}
                      />
                    ))}
                </div>

                {/* Tombol navigasi kiri-kanan */}
                <button
                  onClick={() => prevSlide(setCurrentIndexIkuti, 3)}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white p-1 sm:p-2 rounded-full shadow"
                >
                  <FaChevronLeft className="text-black/70 text-xs" />
                </button>
                <button
                  onClick={() => nextSlide(setCurrentIndexIkuti, 3)}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white p-1 sm:p-2 rounded-full shadow"
                >
                  <FaChevronRight className="text-black/70 text-xs" />
                </button>
              </div>
              <div className="p-2">
                <h3 className="font-bold text-base mb-1">Halo</h3>
                <div className="flex items-center text-xs mb-3">
                  <span className="text-yellow-500 mr-1">⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
