import { useState, useEffect } from 'react';
import { Heart, MapPin } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import umkmData from '../../../data/umkm.json';
import Popup from './Popup';

interface UMKM {
  id?: number;
  Id?: number;
  nama_usaha: string;
  pemilik?: string;
  alamat: string;
  link_maps?: string;
  link_google_maps?: string;
  kategori: string;
  deskripsi: string;
  kontak: string;
  jam_buka?: string;
  akun_strawhub?: string;
  username?: string;
  img_tumb?: string;
  img1?: string;
  img2?: string;
  img3?: string;
  img4?: string;
  img5?: string;
  img6?: string;
  img7?: string;
  img8?: string;
  img9?: string;
  img10?: string;
  img11?: string;
}

export default function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [umkm, setUmkm] = useState<UMKM[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedUmkm, setSelectedUmkm] = useState<UMKM | null>(null);

  // Load UMKM data
  useEffect(() => {
    try {
      console.log('Data loaded:', umkmData);
      setUmkm(umkmData as UMKM[]);
      setLoading(false);
    } catch (error) {
      console.error('Error loading UMKM data:', error);
      alert('Gagal memuat data UMKM.');
      setLoading(false);
    }
  }, []);

  // Baca URL parameter
  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      const decodedQuery = decodeURIComponent(searchFromUrl);
      console.log('Search query from URL:', decodedQuery);
      setSearchQuery(decodedQuery);
    }
  }, [searchParams]);

  const categories = ['Semua', 'Makanan', 'Minuman', 'Jasa'];

  const filteredData = umkm.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.kategori === selectedCategory || 
      (selectedCategory === 'Minuman' && item.kategori === 'Minuman Tradisional (Cendol)');
    const matchesSearch =
      item.nama_usaha.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.alamat.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (id: number | undefined) => {
    if (!id) return;
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const getItemId = (item: UMKM, index: number): number => {
    return item.id || item.Id || index + 1;
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const handleOpenPopup = (item: UMKM) => {
    setSelectedUmkm(item);
    document.body.style.overflow = 'hidden'; // Disable scrolling
  };

  const handleClosePopup = () => {
    setSelectedUmkm(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white pt-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 mt-16">
          <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold text-red-700 mb-4">
            Katalog
          </h1>
         
          {/* Hero Image */}
          <div className="mb-6 sm:mb-8">
            <div className="w-full h-32 sm:h-40 md:h-44 bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl sm:rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=400&fit=crop"
                alt="Hero"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Category Section */}
          <div className="mb-6">
            <h2 className="text-md sm:text-base font-semibold text-gray-800 mb-3">
              Temukan UMKM berdasarkan kategori
            </h2>

            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex-shrink-0 ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid - Responsive columns */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {filteredData.map((item, index) => {
              const itemId = getItemId(item, index);
              return (
                <div
                  key={itemId}
                  className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Image */}
                  <div className="relative h-32 sm:h-36 md:h-40 bg-gray-100">
                    <img
                      src={
                        item.img_tumb ||
                        `https://images.unsplash.com/photo-${
                          item.kategori === 'Makanan'
                            ? '1546069901-ba9599a7e63c'
                            : item.kategori === 'Minuman' || item.kategori === 'Minuman Tradisional (Cendol)'
                            ? '1495474472287-4d71bcdd2085'
                            : '1556740758-90de374c12ad'
                        }?w=400&h=300&fit=crop`
                      }
                      alt={item.nama_usaha}
                      className="w-full h-full object-cover"
                    />
                    {/* Badge Buka */}
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 sm:px-2.5 py-1 rounded">
                      Buka
                    </div>
                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(itemId)}
                      className="absolute top-2 right-2 w-7 sm:w-8 h-7 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                    >
                      <Heart
                        className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${
                          favorites.has(itemId) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-2.5 sm:p-3">
                    {/* Title */}
                    <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1 line-clamp-1">{item.nama_usaha}</h3>

                    {/* Description */}
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2 h-8">{item.deskripsi}</p>

                    {/* Address */}
                    <div className="flex items-start gap-1 mb-2">
                      <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-500 line-clamp-1">{item.alamat}</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="text-xs font-semibold text-gray-700">4.8</span>
                    </div>

                    {/* Button Lihat */}
                    <button 
                      onClick={() => handleOpenPopup(item)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-1.5 sm:py-2 rounded-full transition-colors"
                    >
                      Lihat
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredData.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <div className="mb-4">
                <p className="text-gray-500 text-base sm:text-lg mb-2">Tidak ada UMKM yang ditemukan</p>
                {searchQuery && (
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Tidak ada hasil untuk pencarian "<span className="font-semibold">{searchQuery}</span>"
                  </p>
                )}
              </div>
              {searchQuery && (
                <button 
                  onClick={handleClearSearch}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors"
                >
                  Hapus filter pencarian
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Popup Component */}
      {selectedUmkm && (
        <Popup umkm={selectedUmkm} onClose={handleClosePopup} />
      )}
    </>
  );
}
