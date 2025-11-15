import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import MiniProfilePopup from "./MiniPopup";

interface Follower {
  name: string;
  username: string;
}

interface PopupProps {
  open: boolean;
  onClose: () => void;
  title: string;
  list: Follower[];
}

export default function PopupFollowers({ open, onClose, title, list }: PopupProps) {
  const [selectedUser, setSelectedUser] = useState<Follower | null>(null);

  return (
    <>
      {/* Followers List Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 30, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 30, scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white rounded-xl w-full max-w-sm p-4 border border-gray-200"
            >
              <h3 className="text-lg font-bold mb-4 text-center">{title}</h3>

              <ul className="space-y-2 max-h-64 overflow-auto">
                {list.map((user, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-50 rounded transition"
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                      {user.name[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">{user.name}</p>
                      <p className="text-gray-500 text-sm">@{user.username}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex justify-end mt-3">
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

      {/* Mini Profile Popup */}
      <MiniProfilePopup
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        name={selectedUser?.name || ""}
        username={selectedUser?.username || ""}
      />
    </>
  );
}
