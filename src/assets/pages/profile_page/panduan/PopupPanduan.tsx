import { motion, AnimatePresence } from "framer-motion";
import Card from "./card";

interface PopupPanduanProps {
  open: boolean;
  onClose: () => void;
}

export default function PopupPanduan({ open, onClose }: PopupPanduanProps) {
  const cards = [
    { id: "3", title: "Tentang Keamanan" },
    { id: "2", title: "Saran Penggunaan" },
    { id: "1", title: "Cara Mendaftarkan Bisnis" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-none flex justify-center items-end md:items-center z-[9999]"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 80, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 80, scale: 0.9, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12,
              mass: 0.5,
            }}
            className="bg-white w-full md:w-[90%] max-w-lg rounded-t-2xl md:rounded-2xl p-6 shadow-xl relative"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Drag dan Buka Informasi
            </h2>

            <div className="relative w-full h-[350px] flex justify-center items-center overflow-visible">
              {cards.map((card, index) => (
                <Card
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  initialRotation={[-8, 0, 8][index]}
                />
              ))}
            </div>

            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-gray-700 hover:text-black text-xl"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
