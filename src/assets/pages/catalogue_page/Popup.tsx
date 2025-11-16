import { X, MapPin, Clock, Phone, Star, Share2, AlertCircle, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

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

interface PopupProps {
  umkm: UMKM | null;
  onClose: () => void;
}

export default function Popup({ umkm, onClose }: PopupProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showImagePreview, setShowImagePreview] = useState(false);

  if (!umkm) return null;

  // Collect all images
  const images = [
    umkm.img_tumb,
    umkm.img1,
    umkm.img2,
    umkm.img3,
    umkm.img4,
    umkm.img5,
    umkm.img6,
    umkm.img7,
    umkm.img8,
    umkm.img9,
    umkm.img10,
    umkm.img11,
  ].filter(Boolean) as string[];

  // Dummy menu data
  const menuItems = [
    { name: 'Menu Spesial 1', price: '12.000' },
    { name: 'Menu Spesial 2', price: '15.000' },
    { name: 'Menu Spesial 3', price: '18.000' },
  ];

  // Dummy reviews
  const reviews = [
    {
      name: 'Satrieno Meyligh',
      username: '@satrienomeyligh',
      rating: 4,
      comment: 'Jujur nya pas kami tempat di sini karna tempat ini viral kali aja enak ternyata...',
      time: '1hrlg',
    },
    {
      name: 'Satrieno Meyligh',
      username: '@satrienomeyligh',
      rating: 4,
      comment: 'Jujur nya pas kami tempat di sini karna tempat ini viral kali aja enak ternyata...',
      time: '1hrlg',
    },
    {
      name: 'Satrieno Meyligh',
      username: '@satrienomeyligh',
      rating: 4,
      comment: 'Jujur nya pas kami tempat di sini karna tempat ini viral kali aja enak ternyata...',
      time: '1hrlg',
    },
  ];

  const ratingDistribution = [
    { stars: 5, percentage: 70 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 },
  ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Main Popup */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <div 
          className="bg-white w-full h-full sm:rounded-2xl sm:max-w-4xl sm:w-full sm:max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Close Button */}
          <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b shadow-sm">
            <h2 className="text-lg font-bold truncate sm:hidden">{umkm.nama_usaha}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-auto"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-4 sm:p-6">
            {/* Image Gallery */}
            <div className="mb-4 sm:mb-6">
              {/* Mobile: Single Image Carousel */}
              <div className="sm:hidden relative">
                <img
                  src={images[selectedImage] || 'https://via.placeholder.com/400x300'}
                  alt={umkm.nama_usaha}
                  className="w-full h-64 object-cover rounded-lg"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-lg hover:bg-opacity-100"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-lg hover:bg-opacity-100"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-xs">
                      {selectedImage + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Desktop: Grid Gallery */}
              <div className="hidden sm:grid grid-cols-4 gap-2 h-96">
                {/* Main Large Image - Takes 3 columns and full height */}
                <div className="col-span-3 row-span-2 relative h-full">
                  <img
                    src={images[0] || 'https://via.placeholder.com/400x300'}
                    alt={umkm.nama_usaha}
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                    onClick={() => {
                      setSelectedImage(0);
                      setShowImagePreview(true);
                    }}
                  />
                </div>

                {/* Right side - 2 stacked images */}
                <div className="col-span-1 row-span-1 relative h-48">
                  {images[1] ? (
                    <img
                      src={images[1]}
                      alt={`${umkm.nama_usaha} 2`}
                      className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => {
                        setSelectedImage(1);
                        setShowImagePreview(true);
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-lg" />
                  )}
                </div>

                <div className="col-span-1 row-span-1 relative h-48">
                  {images[2] ? (
                    <div className="relative w-full h-full">
                      <img
                        src={images[2]}
                        alt={`${umkm.nama_usaha} 3`}
                        className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => {
                          setSelectedImage(2);
                          setShowImagePreview(true);
                        }}
                      />
                      {images.length > 3 && (
                        <button
                          onClick={() => setShowImagePreview(true)}
                          className="absolute inset-0 bg-black bg-opacity-50 text-white rounded-lg flex items-center justify-center hover:bg-opacity-60 transition-all"
                        >
                          <span className="text-lg font-semibold">+{images.length - 3} foto lainnya</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-lg" />
                  )}
                </div>
              </div>

              {/* Thumbnail Dots for Mobile */}
              {images.length > 1 && (
                <div className="flex justify-center gap-1 mt-3 sm:hidden">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === selectedImage ? 'bg-red-600 w-6' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Title and Actions */}
            <div className="mb-4">
              <div className="flex flex-wrap items-start gap-2 mb-2">
                <h2 className="text-xl sm:text-2xl font-bold flex-grow">{umkm.nama_usaha}</h2>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Buka</span>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <AlertCircle size={18} className="text-gray-600" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Share2 size={18} className="text-gray-600" />
                </button>
              </div>
              <p className="text-gray-600 text-sm">{umkm.deskripsi}</p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              {/* Location */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="text-red-600 flex-shrink-0 mt-1" size={20} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 mb-1">Alamat</p>
                  <p className="text-sm break-words">{umkm.alamat}</p>
                  {(umkm.link_maps || umkm.link_google_maps) && (
                    <a
                      href={umkm.link_maps || umkm.link_google_maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                    >
                      Buka di Google Maps
                    </a>
                  )}
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Clock className="text-red-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Buka setiap hari</p>
                  <p className="text-sm font-medium">{umkm.jam_buka || 'Jam 09.00 - 21.00'}</p>
                  <p className="text-xs text-green-600 mt-1">Lihat Jadwal Selatan</p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="text-red-600 flex-shrink-0 mt-1" size={20} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 mb-1">Kontak</p>
                  <a href={`tel:${umkm.kontak}`} className="text-sm font-medium hover:text-red-600 break-all">
                    {umkm.kontak}
                  </a>
                </div>
              </div>

              {/* Owner Info */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {umkm.nama_usaha.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{umkm.username || 'Owner'}</p>
                  <p className="text-xs text-gray-500 truncate">{umkm.akun_strawhub || '@umkm'}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6">
              <button className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Hubungi Pemilik
              </button>
              <button className="flex-1 border-2 border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Heart size={20} />
                Tambah Favorite
              </button>
            </div>

            {/* Menu Section */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg font-bold mb-3 sm:mb-4">MENU</h3>
              <div className="bg-red-600 text-white rounded-lg overflow-hidden">
                {menuItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-red-500 last:border-0"
                  >
                    <span className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="font-semibold">{idx + 1}.</span>
                      <span className="truncate">{item.name}</span>
                    </span>
                    <span className="font-bold ml-2 flex-shrink-0">Rp {item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div>
              <h3 className="text-lg font-bold mb-3 sm:mb-4">Reviews</h3>

              {/* Rating Summary */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mb-4 sm:mb-6 p-4 bg-gray-50 rounded-lg">
                {/* Average Rating - Show first on mobile */}
                <div className="text-center order-1 sm:order-2">
                  <div className="text-4xl sm:text-5xl font-bold mb-2">4.8</div>
                  <div className="flex gap-1 mb-2 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={star <= 4 ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">(50 reviews)</p>
                </div>

                {/* Rating Bars */}
                <div className="flex-1 space-y-2 w-full sm:w-auto order-2 sm:order-1">
                  {ratingDistribution.map((item) => (
                    <div key={item.stars} className="flex items-center gap-2">
                      <span className="text-xs w-2">{item.stars}</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-400 rounded-full transition-all"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-10 text-right">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Star Filter */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="flex-shrink-0"
                  >
                    <Star
                      size={28}
                      className={star <= 3 ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}
                    />
                  </button>
                ))}
              </div>

              {/* Review Input */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tulis review anda"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 text-sm"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <span className="text-xl">▼</span>
                  </button>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {reviews.map((review, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                          S
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{review.name}</p>
                          <p className="text-xs text-gray-500 truncate">{review.username}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{review.time}</span>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className={
                            star <= review.rating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 break-words">{review.comment}</p>
                    <button className="mt-2 text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
                      <AlertCircle size={12} />
                      Laporkan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {showImagePreview && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-[60] flex items-center justify-center"
          onClick={() => setShowImagePreview(false)}
        >
          <button
            onClick={() => setShowImagePreview(false)}
            className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-colors z-10"
          >
            <X size={24} className="text-white" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center px-4 sm:px-16">
            {/* Main Image */}
            <img
              src={images[selectedImage]}
              alt={umkm.nama_usaha}
              className="max-w-full max-h-[80vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-colors"
                >
                  <ChevronLeft size={32} className="text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-colors"
                >
                  <ChevronRight size={32} className="text-white" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full text-sm">
              {selectedImage + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(idx);
                  }}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${
                    idx === selectedImage ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${umkm.nama_usaha} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}