import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface CardProps {
  id: string;
  title: string;
  image?: string;
  initialRotation?: number;
  link?: string; // you can set where it navigates
}

export default function Card({
  id,
  title,
  image = "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZmUwamtvNmVkMGk0eWhjdjFwczk1Y2ExNGZmY2ZjazE5MDJwOHd0cCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/3oz8xN85xs9NzrSTYY/giphy.gif",
  initialRotation = 0,
  link = "/detail", // default destination
}: CardProps) {
  const navigate = useNavigate();

  const [zIndex, setZIndex] = useState(1);
  const [focused, setFocused] = useState(false);

  const focusCard = () => {
    setZIndex(999);
    setFocused(true);
  };

  return (
    <motion.div
      drag
      dragElastic={0.15}
      dragMomentum={false}
      onMouseDown={focusCard}
      onTouchStart={focusCard}
      whileDrag={{ scale: 1.05 }}
      animate={{
        rotate: focused ? 0 : initialRotation,
        scale: focused ? 1.05 : 1,
        zIndex,
        boxShadow: focused
          ? "0px 15px 35px rgba(0,0,0,0.30)"
          : "0px 6px 15px rgba(0,0,0,0.15)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="
        absolute
        w-[240px] h-[160px]
        rounded-2xl
        overflow-hidden
        cursor-grab active:cursor-grabbing
        select-none
        bg-white
        flex flex-col justify-between
        border border-gray-200
      "
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Title Header */}
      <div className="bg-white/75 backdrop-blur-sm px-3 py-2 text-sm font-semibold">
        {title}
      </div>

      {/* Open Button */}
      <button
        onClick={() => navigate(`${link}/${id}`)} 
        className="
          bg-red-600 text-white text-xs px-4 py-1 
          rounded-lg m-3 self-end
          hover:bg-red-700 transition
        "
      >
        Open
      </button>
    </motion.div>
  );
}
