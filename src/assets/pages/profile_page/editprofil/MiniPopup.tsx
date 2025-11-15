import { motion, AnimatePresence } from "framer-motion";

interface MiniProfileProps {
  open: boolean;
  onClose: () => void;
  name: string;
  username: string;
}

export default function MiniProfilePopup({ open, onClose, name, username }: MiniProfileProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 20, scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="bg-white rounded-xl w-full max-w-xs p-4 border border-gray-200 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold mx-auto mb-2">
              {name[0]?.toUpperCase()}
            </div>

            <p className="text-gray-800 font-semibold">{name}</p>
            <p className="text-gray-500 text-sm">@{username}</p>

            <div className="flex justify-center mt-3 gap-2">
              <button className="px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-50 transition">
                Follow
              </button>
              <button
                onClick={onClose}
                className="px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
