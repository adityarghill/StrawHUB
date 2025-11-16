import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { User } from "lucide-react";
import umkm from "../../../data/umkm.json";
import React, { useState, useEffect } from "react";

export default function Home() {
  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexIkuti, setCurrentIndexIkuti] = useState(0);

  // Fungsi untuk menghasilkan jarak dan waktu acak
  const getRandomDistanceAndTime = () => {
    const distance = Math.floor(Math.random() * 20) + 1;
    const time = Math.floor(Math.random() * 30) + 5;
    return { distance, time };
  };

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
      <div
        className="flex flex-col lg:flex-row w-full max-w-[1240px] rounded-2xl shadow-2xl overflow-hidden p-4 sm:p-5 space-y-6 lg:space-y-0 lg:space-x-6"
        style={{
          backgroundImage: "url('/src/assets/images/background.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Hero section Kiri */}
        <div className="relative w-2/3 rounded-2xl overflow-hidden">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight px-5">
            Selamat Datang Di StrawHUB
          </h2>

          {/* Carousel kiri */}
          {umkm.slice(currentIndex, currentIndex + 1).map(() => (
            <img
              className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-full object-cover rounded-t-2xl"
              src={"src/assets/images/hero.jpg"}
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

          {/* Carousel dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
            {umkm.slice(0, 3).map((_, index) => (
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
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ikuti</h2>
          <div className="bg-white p-2 rounded-2xl shadow-2xl">
            {umkm
              .sort(() => Math.random())
              .slice(0, 3)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-red-600 p-4 m-2 rounded-3xl"
                >
                  <div className="w-10 h-10 sticky bg-white rounded-full mr-4 flex items-center justify-center">
                    <User size={24} />
                  </div>
                  <div className=" flex-grow min-w-0">
                    <p className="text-white font-semibold truncate">
                      {item.username}
                    </p>
                    <p className="text-white truncate text-sm">
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
            <h3 className="text-2xl md:text-3xlfont-bold mb-3">Temukan</h3>
            <div className="bg-white p-2 rounded-2xl shadow-2xl">
              <div className="relative w-full h-24 sm:h-32 md:h-36 lg:h-40 bg-gray-200 rounded-lg mb-2 overflow-hidden">
                {/* Menampilkan 1 gambar sesuai currentIndexIkuti */}
                {umkm
                  .slice(currentIndexIkuti, currentIndexIkuti + 1)
                  .map((item) => (
                    <img
                      key={item.id}
                      alt={item.username || "UMKM"}
                      className="w-full h-full object-cover"
                      src={item.img_tumb}
                    />
                  ))}

                {/* Carousel dots */}
                <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-2">
                  {umkm.slice(0, 3).map((_, index) => (
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

              {/* Informasi Usaha */}
              {umkm
                .slice(currentIndexIkuti, currentIndexIkuti + 1) // Menampilkan hanya 1 item
                .map((item) => {
                  // Ambil jarak dan waktu acak untuk setiap item
                  const { distance, time } = getRandomDistanceAndTime();

                  return (
                    <div
                      key={item.id}
                      className="flex flex-col items-start gap-1 text-xs text-Black"
                    >
                      <h3 className="font-bold text-gray-900 text-lg">
                        {item.nama_usaha}
                      </h3>
                      {/* Rating */}
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-yellow-400 text-sm">★</span>
                        <span className="text-md font-semibold text-gray-800">
                          4.8
                        </span>
                        {/* Jarak dan Waktu */}
                        <div className="flex items-center gap-2 text-xs text-gray-800">
                          <span>{distance} km</span> <span>•</span>
                          <span>{time} menit</span>
                        </div>
                      </div>
                      <button className="w-1/4 bg-red-600 hover:bg-red-700 text-white text-md font-bold py-2 rounded-full transition-colors">
                        Lihat
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}