import { motion, AnimatePresence } from "framer-motion";
import { Camera, FileText } from "lucide-react";

interface PopupChangeProfileProps {
  open: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onChooseFile: () => void;
}

export default function PopupChangeProfile({
  open,
  onClose,
  onTakePhoto,
  onChooseFile,
}: PopupChangeProfileProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Slide-up panel */}
          <motion.div
            className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg z-[9999] p-6"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 150, damping: 18 }}
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
              Ganti Foto Profil
            </h3>

            <div className="flex flex-col gap-4">
              {/* Take Image */}
              <button
                onClick={onTakePhoto}
                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-100 transition"
              >
                <Camera size={28} className="text-red-600" />
                <span className="font-semibold text-gray-700">Ambil Foto</span>
              </button>

              {/* Choose from File */}
              <button
                onClick={onChooseFile}
                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-100 transition"
              >
                <FileText size={28} className="text-red-600" />
                <span className="font-semibold text-gray-700">Pilih dari File</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full py-2 rounded-full text-gray-700 font-medium hover:bg-gray-200 transition"
            >
              Batal
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
