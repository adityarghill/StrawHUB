import { useParams} from "react-router-dom";
import { panduanData } from "../data/DataPanduan";

export default function PanduanDetailPage() {
  const { id } = useParams();

  const data = id ? panduanData[id as keyof typeof panduanData] : null;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Panduan tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER — merah solid */}
      <div className="w-full h-44 bg-red-600 relative flex items-end p-6 text-white">

        <h1 className="text-2xl md:text-3xl font-bold tracking-wide ml-12">
          {data.no}
        </h1>
      </div>

      {/* CONTENT */}
      <div className="w-full flex justify-center px-4 mt-12">
        <div className="
          bg-white rounded-2xl shadow-lg p-6 md:p-8 
          w-full max-w-6xl 
          -mt-10
        ">
          {/* Title */}
          <h2 className="text-xl font-bold mb-3">{data.title}</h2>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed mb-4">
            {data.description}
          </p>

          {/* Points */}
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
            {data.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>

          {/* Optional Illustration — bigger and responsive */}
          {data.image && (
            <div className="w-full h-48 md:h-64 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
