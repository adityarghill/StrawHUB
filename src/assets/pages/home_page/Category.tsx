import { FaRegHeart } from "react-icons/fa";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { FaChevronRight } from "react-icons/fa";
import MiniMap from "../home_page/MiniMap";

export default function Category() {
  return (
    <div className="flex justify-center bg-gray-100 w-full min-h-screen p-4">
      <div className="flex flex-col gap-4 w-full max-w-[1240px]">
        <div className="flex w-full relative gap-4">
          {/* Kategori Section */}
          <div className="w-[35%] bg-white rounded-2xl p-4 drop-shadow-md relative">
            <h1 className="text-3xl font-bold text-red-700 border-b-4 border-red-700 pt-1 mb-4 inline-block">
              Cari Berdasarkan Kategori
            </h1>
            <div className="flex gap-6 mt-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center text-2xl"></div>
                <span className="text-sm font-medium"></span>
              </div>
            </div>
          </div>

          {/* Carousel Banner */}
          <div className="w-[65%] bg-red-600 rounded-2xl drop-shadow-md flex items-center justify-between px-6 h-[250px]">
            <button className="text-white text-3xl hover:scale-110 transition">
              ❮
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
              <span className="w-3 h-3 bg-white rounded-full opacity-80"></span>
              <span className="w-3 h-3 bg-gray-400 rounded-full opacity-50"></span>
              <span className="w-3 h-3 bg-gray-400 rounded-full opacity-50"></span>
            </div>
            <button className="text-white text-3xl hover:scale-110 transition">
              ❯
            </button>
          </div>
        </div>

        <div className="flex gap-4 w-full">
          {/* Rekomendasi */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-4 drop-shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold border-b-4 text-red-700 border-red-700 pt-1 inline-block">
                  Rekomendasi
                </h2>
                <button className="bg-red-600 text-white px-5 py-2 rounded-xl text-2xl font-semibold flex items-center gap-2 hover:text-gray-400 transition-colors duration-200">
                  Lainnya <HiOutlineArrowCircleRight className="text-3xl" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="border rounded-xl overflow-hidden relative bg-white drop-shadow-md">
                  <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-md text-xs font-bold z-10"></span>
                  <button className="absolute top-3 right-3 bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-md z-10">
                    <FaRegHeart className="text-2xl hover:text-red-500 transition-colors duration-200" />
                  </button>
                  <img src="" alt="" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-base mb-1"></h3>
                    <p className="text-xs text-gray-600 mb-3"></p>
                    <div className="flex items-center text-xs mb-3">
                      <span className="text-yellow-500 mr-1"></span>
                      <span className="font-semibold"></span>
                      <span className="text-gray-500 ml-1">( reviews)</span>
                      <span className="mx-2">•</span>
                      <span></span>
                    </div>
                    <div className="flex gap-3 text-gray-500">
                      <button className="hover:text-gray-700"></button>
                      <button className="hover:text-gray-700"></button>
                      <button className="hover:text-gray-700"></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[480px] flex flex-col gap-4">
            {/* Map Section */}
            <div className="bg-white rounded-2xl p-5 drop-shadow-md">
              <h2 className="text-3xl font-bold border-b-4 text-red-700 border-red-700 pt-1 mb-4 inline-block">
                Terdekat dari Kamu
              </h2>
              <div className="w-full h-56 bg-gray-200 rounded-xl mb-4 relative overflow-hidden">
                <MiniMap />
              </div>

              <div className="flex items-center gap-3 mb-3 p-3 bg-gray-100 rounded-lg">
                <div className="w-12 h-12 bg-gray-400 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm"></h3>
                </div>
                <button className="text-gray-700 text-xl"></button>
              </div>
            </div>

            {/* Following Section */}
            <div className="bg-white rounded-2xl p-5 drop-shadow-md">
              <h2 className="text-xl font-bold border-b-4 text-red-700 border-red-700 pt-1 mb-4 inline-block">
                Ikuti
              </h2>

              <div className="flex items-center gap-3 mb-4 relative">
                <span className="absolute -top-2 left-10 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold z-10">
                  ikutin
                </span>

                <div className="w-14 h-14 bg-gray-400 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1"></h3>
                  <p className="text-xs text-gray-600"></p>
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-2 py-5 ">
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
