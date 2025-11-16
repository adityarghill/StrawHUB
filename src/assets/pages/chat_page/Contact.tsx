import { User } from "lucide-react";

interface ContactItemProps {
  contact: any;
  isSelected: boolean;
  onSelect: () => void;
}

export default function ContactItem({
  contact,
  isSelected,
  onSelect,
}: ContactItemProps) {

  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center gap-3 p-3 rounded-md text-left transition-colors ${
        isSelected
          ? "bg-red-900 text-white"
          : "bg-white hover:bg-red-50 border border-gray-200"
      }`}
    >
      {/* PFP */}
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
        {contact.img_tumb ? (
          <img
            src={contact.img_tumb}
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        ) : (
          <User size={20} className={isSelected ? "text-red-100" : "text-gray-400"} />
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className={`font-semibold text-sm truncate ${
            isSelected ? "text-white" : "text-gray-900"
          }`}
        >
          {contact.username || "Unknown"}
        </p>
        <p
          className={`text-xs truncate ${
            isSelected ? "text-red-100" : "text-gray-600"
          }`}
        >
          {contact.nama_usaha}
        </p>
      </div>
    </button>
  );
}
