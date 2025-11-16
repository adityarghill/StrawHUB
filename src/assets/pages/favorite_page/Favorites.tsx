import { useState, useEffect } from "react";
import { Search, Heart } from "lucide-react";
import businessesData from "../../umkm.json";

interface Business {
  Id?: number;
  id?: number;
  nama_usaha: string;
  pemilik?: string;
  alamat?: string;
  link_maps?: string;
  kategori?: string;
  deskripsi?: string;
  kontak?: string;
  jam_buka?: string;
  akun_strawhub: string;
  username: string;
  img_tumb: string;
  img1?: string;
  img2?: string;
  img3?: string;
}

export default function Favorites() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    // Load businesses from JSON
    setBusinesses(businessesData as Business[]);
    // Initialize all as favorites
    setFavorites(businessesData.map((b: any) => b.Id || b.id || 0));
  }, []);

  const categories = ["All", "Makanan", "Minuman", "Jasa"];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.filter(fav => fav !== id));
  };

  const filteredBusinesses = businesses.filter((business) => {
    const businessId = business.Id || business.id || 0;
    const isFavorited = favorites.includes(businessId);
    const matchesSearch = business.nama_usaha.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (business.deskripsi || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || business.kategori === selectedCategory;
    return isFavorited && matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 mt-24">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-white shadow-sm">
        <div className="w-full px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Ide Tersimpan</h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                  {filteredBusinesses.length} bisnis favorit
                </p>
              </div>
            </div>
            
            <div className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari bisnis..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mt-3 sm:mt-4 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-red-900 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="w-full px-2 sm:px-4 py-4 sm:py-8">
        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 sm:gap-4 space-y-2 sm:space-y-4">
          {filteredBusinesses.map((business) => {
            const businessId = business.Id || business.id;
            return (
              <div 
                key={businessId} 
                className="break-inside-avoid mb-2 sm:mb-4 group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 isolate">
                  {/* Image */}
                  <img
                    src={business.img_tumb}
                    alt={business.nama_usaha}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    style={{ aspectRatio: 'auto' }}
                  />
                  
                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Heart button - center (larger on mobile) */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(businessId!);
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 sm:p-4 bg-white/95 backdrop-blur-sm rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white z-20 active:scale-95"
                  >
                    <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-red-900 fill-red-900" />
                  </button>

                  {/* Visit link overlay */}
                  <a
                    href={`https://strawhub.com/${business.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                    aria-label={`Visit ${business.nama_usaha}`}
                  />

                  {/* Bottom info bar - shows on hover */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                    <h3 className="font-bold text-white text-xs sm:text-sm line-clamp-1 mb-0.5">
                      {business.nama_usaha}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-white/80">{business.akun_strawhub}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredBusinesses.length === 0 && (
          <div className="text-center py-12 px-4">
            <p className="text-gray-500 text-sm sm:text-base">Tidak ada bisnis yang ditemukan</p>
          </div>
        )}
      </main>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}