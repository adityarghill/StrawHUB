import { useState, useEffect } from 'react';
import { Heart, MapPin, Search } from 'lucide-react';
import umkmData from '../../../data/umkm.json';

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
}

export default function Catalogue() {
  const [umkm, setUmkm] = useState<UMKM[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      console.log('Data loaded:', umkmData);
      // JSON langsung berupa array, tidak perlu akses .umkm
      setUmkm(umkmData as UMKM[]);
      setLoading(false);
    } catch (error) {
      console.error('Error loading UMKM data:', error);
      alert('Gagal memuat data UMKM.');
      setLoading(false);
    }
  }, []);

  const categories = ['Semua', 'Makanan', 'Minuman', 'Jasa'];

  const filteredData = umkm.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.kategori === selectedCategory;
    const matchesSearch =
      item.nama_usaha.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
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

  // Helper function untuk mendapatkan id dari item
  const getItemId = (item: UMKM, index: number): number => {
    return item.id || item.Id || index + 1;
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
    <div className="min-h-screen bg-white pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Search Bar */}
        <div className="pt-6 pb-4">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari UMKM..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mb-8">
          <div className="w-full h-44 bg-gradient-to-r from-blue-100 to-green-100 rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=400&fit=crop"
              alt="Hero"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Category Section */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">
            Kategori <span className="text-gray-400 font-normal text-sm">temukan UMKM berdasarkan kategori</span>
          </h2>

          <div className="flex gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
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

        {/* Cards Grid - 4 columns */}
        <div className="grid grid-cols-4 gap-5">
          {filteredData.map((item, index) => {
            const itemId = getItemId(item, index);
            return (
              <div
                key={itemId}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <div className="relative h-40 bg-gray-100">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      item.kategori === 'Makanan'
                        ? '1546069901-ba9599a7e63c'
                        : item.kategori === 'Minuman' || item.kategori === 'Minuman Tradisional (Cendol)'
                        ? '1495474472287-4d71bcdd2085'
                        : '1556740758-90de374c12ad'
                    }?w=400&h=300&fit=crop`}
                    alt={item.nama_usaha}
                    className="w-full h-full object-cover"
                  />
                  {/* Badge Buka */}
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded">
                    Buka
                  </div>
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(itemId)}
                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.has(itemId) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-3">
                  {/* Title */}
                  <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">{item.nama_usaha}</h3>

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
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2 rounded-full transition-colors">
                    Lihat
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Tidak ada UMKM yang ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}