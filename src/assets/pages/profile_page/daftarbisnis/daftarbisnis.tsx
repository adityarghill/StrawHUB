import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Camera, Check, X, AlertCircle } from "lucide-react";

interface PopupDaftarkanBisnisProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function PopupDaftarkanBisnis({ open, onClose, onSubmit }: PopupDaftarkanBisnisProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    address: "",
    mapsLink: "",
    contact: "",
    hours: "",
    photos: [] as File[],
    logo: null as File | null,
    agree: false,
  });
  const [finished, setFinished] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = "Nama bisnis wajib diisi";
      if (!formData.type) newErrors.type = "Jenis usaha wajib dipilih";
      if (!formData.description.trim()) newErrors.description = "Deskripsi wajib diisi";
    } else if (currentStep === 2) {
      if (!formData.address.trim()) newErrors.address = "Alamat wajib diisi";
      if (formData.mapsLink && !formData.mapsLink.includes('maps')) {
        newErrors.mapsLink = "Link Google Maps tidak valid";
      }
    } else if (currentStep === 3) {
      if (!formData.contact.trim()) newErrors.contact = "Kontak wajib diisi";
      if (!formData.hours.trim()) newErrors.hours = "Jam operasional wajib diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 5));
      setErrors({});
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validFiles = newFiles.filter(file => {
        const isValidType = file.type.startsWith('image/');
        const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
        return isValidType && isValidSize;
      });
      
      if (validFiles.length !== newFiles.length) {
        alert('Beberapa file tidak valid. Hanya file gambar maksimal 5MB yang diterima.');
      }
      
      handleChange("photos", [...formData.photos, ...validFiles].slice(0, 5));
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    handleChange("photos", newPhotos);
  };

  const handleFinish = () => {
    if (!formData.agree) {
      setErrors({ agree: "Anda harus menyetujui syarat & ketentuan" });
      return;
    }
    
    setFinished(true);
    setTimeout(() => {
      onSubmit(formData);
      setFinished(false);
      onClose();
      setStep(1);
      setFormData({
        name: "",
        type: "",
        description: "",
        address: "",
        mapsLink: "",
        contact: "",
        hours: "",
        photos: [],
        logo: null,
        agree: false,
      });
      setErrors({});
    }, 1500);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative"
            initial={{ y: 100, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            {finished && (
              <motion.div 
                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-green-500 bg-opacity-95 text-white rounded-3xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <Check size={72} strokeWidth={2} />
                <p className="mt-4 text-2xl font-bold">Bisnis Berhasil Didaftarkan!</p>
                <p className="mt-2 text-sm opacity-90">Terima kasih telah mendaftarkan bisnis Anda</p>
              </motion.div>
            )}

            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10 p-2"
              onClick={onClose}
              aria-label="Tutup"
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div className="mb-6 pr-8">
              <h1 className="text-2xl font-bold text-gray-800">Daftarkan Bisnis Anda</h1>
              <p className="text-sm text-gray-500 mt-1">Lengkapi informasi bisnis Anda dalam 5 langkah mudah</p>
            </div>

            {/* Step Indicator */}
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    s === step 
                      ? "w-12 bg-red-600" 
                      : s < step 
                      ? "w-8 bg-green-500" 
                      : "w-8 bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {step === 1 && (
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Identitas Bisnis</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Bisnis <span className="text-red-500">*</span>
                      </label>
                      <input
                        className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all`}
                        placeholder="Contoh: Warung Makan Sederhana"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                      />
                      {errors.name && (
                        <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                          <AlertCircle size={12} />
                          <span>{errors.name}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Jenis Usaha <span className="text-red-500">*</span>
                      </label>
                      <select
                        className={`w-full border ${errors.type ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all`}
                        value={formData.type}
                        onChange={(e) => handleChange("type", e.target.value)}
                      >
                        <option value="">Pilih Jenis Usaha</option>
                        <option value="Makanan">Makanan</option>
                        <option value="Minuman">Minuman</option>
                        <option value="Makanan & Minuman">Makanan & Minuman</option>
                        <option value="Jasa">Jasa</option>
                        <option value="Retail">Retail</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                      {errors.type && (
                        <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                          <AlertCircle size={12} />
                          <span>{errors.type}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Deskripsi Singkat <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        className={`w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all min-h-24`}
                        placeholder="Ceritakan tentang bisnis Anda..."
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        maxLength={500}
                      />
                      <div className="flex justify-between items-center mt-1">
                        <div className="flex items-center gap-1 text-xs">
                          {errors.description && (
                            <>
                              <AlertCircle size={12} className="text-red-500" />
                              <span className="text-red-500">{errors.description}</span>
                            </>
                          )}
                        </div>
                        <span className="text-xs text-gray-400">{formData.description.length}/500</span>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Lokasi & Peta</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Alamat Lengkap <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        className={`w-full border ${errors.address ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all min-h-24`}
                        placeholder="Jl. Contoh No. 123, Kelurahan, Kecamatan, Kota"
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                      />
                      {errors.address && (
                        <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                          <AlertCircle size={12} />
                          <span>{errors.address}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Link Google Maps (Opsional)
                      </label>
                      <input
                        className={`w-full border ${errors.mapsLink ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all`}
                        placeholder="https://maps.google.com/..."
                        value={formData.mapsLink}
                        onChange={(e) => handleChange("mapsLink", e.target.value)}
                      />
                      {errors.mapsLink && (
                        <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                          <AlertCircle size={12} />
                          <span>{errors.mapsLink}</span>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Tips: Buka Google Maps, temukan lokasi Anda, lalu salin linknya
                      </p>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Kontak & Jam Operasional</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kontak (WhatsApp/Telepon) <span className="text-red-500">*</span>
                      </label>
                      <input
                        className={`w-full border ${errors.contact ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all`}
                        placeholder="08123456789"
                        value={formData.contact}
                        onChange={(e) => handleChange("contact", e.target.value)}
                      />
                      {errors.contact && (
                        <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                          <AlertCircle size={12} />
                          <span>{errors.contact}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Jam Operasional <span className="text-red-500">*</span>
                      </label>
                      <input
                        className={`w-full border ${errors.hours ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all`}
                        placeholder="Contoh: Senin-Jumat 08:00-17:00, Sabtu 09:00-15:00"
                        value={formData.hours}
                        onChange={(e) => handleChange("hours", e.target.value)}
                      />
                      {errors.hours && (
                        <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                          <AlertCircle size={12} />
                          <span>{errors.hours}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Media (Opsional)</h2>
                    <p className="text-sm text-gray-500 -mt-2">Upload foto bisnis dan logo Anda</p>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Foto Bisnis (Maksimal 5 foto)
                      </label>
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {formData.photos.map((file, i) => (
                          <div key={i} className="relative flex-none w-32 aspect-[3/4] rounded-lg overflow-hidden border-2 border-gray-200 group">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Foto ${i + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() => removePhoto(i)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                        
                        {formData.photos.length < 5 && (
                          <label className="flex-none w-32 aspect-[3/4] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-red-500 hover:bg-red-50 transition-all">
                            <Camera size={28} className="text-gray-400" />
                            <span className="text-xs text-gray-500 text-center px-2">
                              {formData.photos.length === 0 ? 'Upload Foto' : 'Tambah Foto'}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={handlePhotoUpload}
                            />
                          </label>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Maksimal 5MB per file. Format: JPG, PNG, WEBP</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Logo Bisnis</label>
                      <div className="flex gap-3">
                        {formData.logo ? (
                          <div className="relative w-32 aspect-square rounded-lg overflow-hidden border-2 border-gray-200 group">
                            <img
                              src={URL.createObjectURL(formData.logo)}
                              alt="Logo"
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() => handleChange("logo", null)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <label className="w-32 aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-red-500 hover:bg-red-50 transition-all">
                            <Camera size={28} className="text-gray-400" />
                            <span className="text-xs text-gray-500 text-center">Upload Logo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleChange("logo", e.target.files ? e.target.files[0] : null)
                              }
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="flex flex-col gap-6">
                    <h2 className="text-xl font-bold text-gray-800 text-center">Review & Publikasi</h2>

                    {/* Media Preview */}
                    {(formData.photos.length > 0 || formData.logo) && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Media</h3>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {formData.photos.map((file, i) => (
                            <div key={i} className="flex-none w-24 aspect-[3/4] rounded-lg border bg-gray-100 overflow-hidden">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Foto ${i + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          {formData.logo && (
                            <div className="flex-none w-24 aspect-square rounded-lg border bg-gray-100 overflow-hidden">
                              <img
                                src={URL.createObjectURL(formData.logo)}
                                alt="Logo"
                                className="w-full h-full object-contain p-2"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Summary */}
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm text-gray-500">Nama Bisnis:</span>
                        <span className="col-span-2 text-sm font-medium">{formData.name}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm text-gray-500">Jenis Usaha:</span>
                        <span className="col-span-2 text-sm font-medium">{formData.type}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm text-gray-500">Deskripsi:</span>
                        <span className="col-span-2 text-sm">{formData.description}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm text-gray-500">Alamat:</span>
                        <span className="col-span-2 text-sm">{formData.address}</span>
                      </div>
                      {formData.mapsLink && (
                        <div className="grid grid-cols-3 gap-2">
                          <span className="text-sm text-gray-500">Maps Link:</span>
                          <a href={formData.mapsLink} target="_blank" rel="noopener noreferrer" className="col-span-2 text-sm text-blue-600 hover:underline truncate">
                            {formData.mapsLink}
                          </a>
                        </div>
                      )}
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm text-gray-500">Kontak:</span>
                        <span className="col-span-2 text-sm font-medium">{formData.contact}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm text-gray-500">Jam Buka:</span>
                        <span className="col-span-2 text-sm">{formData.hours}</span>
                      </div>
                    </div>

                    {/* Agreement */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="agree"
                          checked={formData.agree}
                          onChange={(e) => handleChange("agree", e.target.checked)}
                          className="mt-1 w-4 h-4 accent-red-600"
                        />
                        <label htmlFor="agree" className="text-sm text-gray-700 cursor-pointer">
                          Saya menyatakan bahwa informasi yang saya berikan adalah benar dan akurat. Saya setuju dengan syarat & ketentuan yang berlaku.
                        </label>
                      </div>
                      {errors.agree && (
                        <div className="flex items-center gap-1 mt-2 text-red-500 text-xs ml-7">
                          <AlertCircle size={12} />
                          <span>{errors.agree}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {!finished && (
              <div className="flex gap-3 mt-8">
                {step > 1 && (
                  <button
                    onClick={prevStep}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    ← Kembali
                  </button>
                )}

                {step < 5 ? (
                  <button
                    onClick={nextStep}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Lanjut →
                  </button>
                ) : (
                  <button
                    onClick={handleFinish}
                    disabled={!formData.agree}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Check size={20} />
                    Publikasikan Bisnis
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}