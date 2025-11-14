import { useState } from "react";
import { motion } from "framer-motion";
import { User, ShoppingBag, MessageCircle, Heart, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FuturisticNav() {
  const [active, setActive] = useState<number | null>(null);
  const navigate = useNavigate();

  const icons = [
    { id: 1, icon: <User size={24} />, label: "Profile", path: "/profile" },
    { id: 2, icon: <ShoppingBag size={24} />, label: "Catalogue", path: "/catalogue" },
    { id: 3, icon: <MessageCircle size={24} />, label: "Chat", path: "/chat" },
    { id: 4, icon: <Heart size={24} />, label: "Favorites", path: "/favorites" },
    { id: 5, icon: <Settings size={24} />, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="fixed left-6 top-1/2 bottom-1 -translate-y-1/2 z-40">
      <div className="relative flex flex-col items-center justify-around h-[380px] w-[80px] bg-[#AA0202] rounded-[2rem] py-4 px-2 shadow-[0_0_10px_rgba(0,0,0,0.6)] backdrop-blur-lg">
        {icons.map((item, index) => (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
            onClick={() => navigate(item.path)}
          >
            {active === index && (
              <motion.div
                layoutId="liquid"
                className="absolute inset-0 bg-white rounded-full blur-md opacity-40"
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            )}

            <motion.div
              animate={{
                scale: active === index ? 1.3 : 1,
                y: active === index ? -3 : 0, // subtle upward motion (more natural than x)
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative z-10 text-white p-3 cursor-pointer"
            >
              {item.icon}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
