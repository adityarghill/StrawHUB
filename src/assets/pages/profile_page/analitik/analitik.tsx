import { AnimatePresence, motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  trafficData,
  salesData,
  productPerformance,
} from "../data/DataAnalitik";

interface AnalyticsPopupProps {
  open: boolean;
  onClose: () => void;
}

const COLORS = ["#e8eb25ff", "#EF4444", "#0bf5d6ff", "#10B981"];

export default function AnalyticsPopup({ open, onClose }: AnalyticsPopupProps) {
  const conversionRate =
    Math.round(
      (productPerformance.reduce((sum, p) => sum + p.bought, 0) /
        (productPerformance.reduce((sum, p) => sum + p.viewed, 0) || 1)) *
        100
    );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 md:p-4 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
        <motion.div
          className="bg-white rounded-2xl w-full sm:w-[90%] md:w-[60%] max-w-3xl p-4 md:p-6 shadow-sm border overflow-y-auto"
          style={{ maxHeight: "90vh" }}
          initial={{ y: 50, scale: 0.95, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 50, scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 12, mass: 0.5 }}
          drag="y"
          dragConstraints={{ top: -50, bottom: 300 }}
          dragElastic={0.25}
          onDragEnd={(_e, info) => { if (info.point.y > 150) onClose(); }}
        >
          {/* Drag handle ball */}
          <div className="w-full flex justify-center mb-3">
            <div className="w-10 h-1.5 bg-gray-300 rounded-full cursor-grab active:bg-gray-400 transition"></div>
          </div>



            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="text-lg md:text-xl font-bold">Analitik Bisnis</h3>
                <p className="text-xs md:text-sm text-gray-600">Snapshot performa & insight singkat</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {salesData.map((s, i) => (
                <div key={i} className="bg-gray-50 p-3 rounded-xl shadow-sm border">
                  <p className="text-xs text-gray-500">{s.name}</p>
                  <p className="text-2xl md:text-3xl font-bold">
                    {typeof s.value === "number" && s.name.includes("Rp")
                      ? s.value.toLocaleString()
                      : s.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Line Trend */}
              <div className="bg-white rounded-xl p-3 border h-44 md:h-52">
                <p className="text-sm font-semibold mb-2">Tren Kunjungan Mingguan</p>
                <ResponsiveContainer width="100%" height="90%">
                  <LineChart data={trafficData.trend.map(t => ({ label: t.label, value: t.value }))}>
                    <XAxis dataKey="label" stroke="#9CA3AF" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#00fa15ff" strokeWidth={3} dot={{ r: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Sources */}
              <div className="bg-white rounded-xl p-3 border flex flex-col items-center h-44 md:h-52">
                <p className="text-sm font-semibold mb-2">Sumber Kunjungan</p>
                <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                    <Pie
                      data={trafficData.sources.map(s => ({ name: s.name, value: s.value }))}
                      dataKey="value"
                      innerRadius={36}
                      outerRadius={50}
                      paddingAngle={4}
                    >
                      {trafficData.sources.map((_s, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Product Performance */}
            <div className="mt-4 bg-white p-3 rounded-xl border">

              <p className="text-sm font-semibold mb-2">Performa Akun</p>
              <div className="space-y-2">
                {productPerformance.map((p, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="w-2/5 text-xs md:text-sm">{p.name}</span>
                    <div className="w-3/5">
                      <div className="w-full bg-gray-100 h-2 rounded overflow-hidden">
                        <div
                          className="h-2 bg-blue-600"
                          style={{
                            width: `${Math.min(100, Math.round((p.bought / (p.viewed || 1)) * 100))}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Total Keseluruhan: <span className="font-semibold">{conversionRate}%</span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm rounded-full border hover:bg-gray-50 transition"
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
