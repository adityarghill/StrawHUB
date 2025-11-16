import { FaRegHeart, FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { User } from "lucide-react";
import MiniMap from "./MiniMap";
import { useNavigate } from "react-router-dom";
import umkm from "../../umkm.json";

export default function Category() {
  // Fungsi untuk menghasilkan jarak dan waktu acak
  const getRandomDistanceAndTime = () => {
    const distance = Math.floor(Math.random() * 20) + 1; // Jarak acak antara 1-20 km
    const time = Math.floor(Math.random() * 30) + 5; // Waktu acak antara 5-30 menit
    return { distance, time };
  };
  const navigate = useNavigate();

  return (
    <div className="flex justify-center bg-white w-full min-h-screen p-4">
      <div className="flex flex-col gap-4 w-full max-w-[1240px]">
        <div className="flex gap-4 w-full">
          {/* Rekomendasi */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-10 drop-shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold border-b-4 text-red-700 border-red-700 inline-block">
                  Rekomendasi
                </h2>
                <button
                  onClick={() => navigate("/catalogue")}
                  className="bg-red-600 text-white px-5 py-2 rounded-full text-xl font-semibold flex items-center gap-2 hover:bg-red-700 hover:ring-4 hover:ring-white hover:ring-opacity-60 hover:shadow-2xl hover:shadow-white transition-all duration-300 transform hover:scale-105"
                >
                  Selengkapnya
                  <HiOutlineArrowCircleRight className="text-2xl" />
                </button>
              </div>

              {/* Menampilkan data dari JSON */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {umkm
                  .sort(() => Math.random() - 0.5) // Acak urutan data
                  .slice(0, 4) // Ambil 4 item pertama
                  .map((item) => {
                    const { distance, time } = getRandomDistanceAndTime();
                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        {/* Image */}
                        <div className="relative h-40 bg-gray-100">
                          <img
                            className="w-full h-full object-cover"
                            src={item.img_tumb}
                            alt={item.nama_usaha}
                          />

                          {/* Badge Buka */}
                          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded">
                            Buka
                          </div>
                          {/* Favorite Button */}
                          <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                            <FaRegHeart className="text-xl hover:text-red-500 transition-colors duration-200" />
                          </button>
                        </div>

                        {/* Content */}
                        <div className="p-3">
                          {/* Title */}
                          <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">
                            {item.nama_usaha}
                          </h3>

                          {/* Description */}
                          <p className="text-xs text-gray-500 mb-2 line-clamp-2 h-8">
                            {item.deskripsi}
                          </p>

                          {/* Address */}
                          <div className="flex items-start gap-1 mb-2">
                            <FaMapMarkerAlt className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-gray-500 line-clamp-1">
                              {item.alamat}
                            </span>
                          </div>

                          {/* Rating */}
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-yellow-400 text-sm">★</span>
                            <span className="text-xs font-semibold text-gray-700">
                              4.8
                            </span>
                            {/* Jarak dan Waktu */}
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <FaMapMarkerAlt className="text-red-600 text-sm" />
                              <span>{distance} km</span>
                              <span>•</span>
                              <span>{time} menit</span>
                            </div>
                          </div>

                          {/* Button Lihat */}
                          <button className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2 rounded-full transition-colors">
                            Lihat
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Terdekat dari Kamu */}
          <div className="w-[480px] flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-5 drop-shadow-2xl">
              <h2 className="text-3xl font-bold border-b-4 text-red-700 border-red-700 pt-1 mb-4 inline-block">
                Terdekat dari Kamu
              </h2>
              <div className="w-full h-56 bg-gray-200 rounded-xl mb-4 relative overflow-hidden">
                <MiniMap />
              </div>

              {umkm
                .sort(() => Math.random())
                .slice(0, 2)
                .map((item) => {
                  const { distance, time } = getRandomDistanceAndTime();
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 mb-3 p-3 bg-gray-100 rounded-lg"
                    >
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                        <User size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">
                          {item.nama_usaha}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                          <FaMapMarkerAlt className="text-red-600 text-sm" />
                          <span>{distance} km</span>
                          <span>•</span>
                          <span>{time} menit</span>
                        </div>
                      </div>
                      <button className="text-gray-700 text-xl"></button>
                    </div>
                  );
                })}
            </div>

            {/* Following Section */}
            <div className="bg-white rounded-2xl p-5 drop-shadow-2xl">
              <h1 className="text-2xl font-bold text-red-700 border-red-700 inline-block">
                Apa Kata Mereka
              </h1>
              <h2 className="text-md font-bold text-red-700 border-red-700 pt-1 mb-4 inline-block">
                bagaimana StrawHUB membantu keseharian mereka
              </h2>

              {/* Comment */}
              <div className="flex gap-3 mb-3 p-3 items-center bg-gray-100 rounded-lg">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <User size={24} className="text-white" />
                </div>

                <div className="flex-1">
                  <h2 className="font-bold text-sm">Yulianti</h2>

                  <div className="text-yellow-500 text-xs mb-2">
                    <span>⭐</span>
                    <span>⭐</span>
                    <span>⭐</span>
                    <span>⭐</span>
                    <span>⭐</span>
                  </div>

                  <h3 className="text-gray-700 font-semibold text-xs">
                    Semenjak ada StrawHub orang orang jadi tau tempat jualanku.
                  </h3>
                </div>
              </div>

              {/* Comment kedua */}
              <div className="flex items-center gap-3 mb-3 p-3 bg-gray-100 rounded-lg">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <User size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-sm">Aditya</h2>

                  <div className="text-yellow-500 text-xs mb-2">
                    <span>⭐</span>
                    <span>⭐</span>
                    <span>⭐</span>
                    <span>⭐</span>
                    <span>⭐</span>
                  </div>

                  <h3 className="text-gray-700 font-semibold text-xs">
                    StrawHub membantu mempromosikan tempat jualan saya.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
