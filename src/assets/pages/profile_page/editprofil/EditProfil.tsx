import { motion, AnimatePresence } from "framer-motion";

interface PopupEditProfileProps {
  open: boolean;
  onClose: () => void;
  name: string;
  username: string;
  setName: (val: string) => void;
  setUsername: (val: string) => void;
}

export default function PopupEditProfile({
  open,
  onClose,
  name,
  username,
  setName,
  setUsername,
}: PopupEditProfileProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 120, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 120, scale: 0.9, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              mass: 0.5,
            }}
            className="bg-white rounded-t-2xl md:rounded-2xl w-full max-w-sm p-6 shadow-xl"
          >
            <h3 className="text-lg font-bold mb-4 text-center">Edit Profil</h3>

            {/* Inline modern inputs */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nama</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="Masukkan Nama"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  value={username.replace(/^@/, "")} // prettier username display
                  onChange={(e) => setUsername(`@${e.target.value}`)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  placeholder="Masukkan Username"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full border hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
