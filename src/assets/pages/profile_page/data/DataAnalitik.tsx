// types
export interface KeyValue { name: string; value: number; }
export interface TrendItem { label: string; value: number; }

// traffic & trend
export const trafficData = {
  totalVisitors: 12450,
  sources: [
    { name: "Pencarian", value: 60 },
    { name: "Media Sosial", value: 25 },
    { name: "Rekomendasi", value: 15 },
  ] as KeyValue[],
  trend: [
    { label: "Mon", value: 200 },
    { label: "Tue", value: 350 },
    { label: "Wed", value: 280 },
    { label: "Thu", value: 400 },
    { label: "Fri", value: 500 },
    { label: "Sat", value: 420 },
    { label: "Sun", value: 380 },
  ] as TrendItem[],
};

// interactions
export const interactionData = [
  { name: "Klik", value: 842 },
  { name: "Pesan", value: 112 },
  { name: "Simpan", value: 430 },
] as KeyValue[];

// sales
export const salesData = [
  { name: "Bisnis Aktif", value: 0 },
  { name: "Jumlah Pengikut Baru", value: 6 },
  { name: "Profile Views", value: 3 },
] as KeyValue[];

// product performance
export const productPerformance = [
  { name: "Reach", viewed: 900, bought: 120 },
  { name: "Interaction", viewed: 750, bought: 90 },
  { name: "Engagement", viewed: 600, bought: 60 },
];

// demographics
export const demographics = [
  { name: "Jakarta", value: 120 },
  { name: "Bandung", value: 90 },
  { name: "Surabaya", value: 60 },
];

// feedback
export const feedback = [
  { name: "Ulasan", value: 87 },
  { name: "Avg Rating", value: 4.6 },
];

// promo
export const promoData = [
  { name: "Diskon 10%", value: 40 },
  { name: "Cashback", value: 25 },
  { name: "Voucher", value: 15 },
];
