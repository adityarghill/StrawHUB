import { TrendingUp, BookOpen, Camera } from "lucide-react";
import { useState } from "react";
import PopupPanduan from "./panduan/PopupPanduan";
import PopupAnalitik from "./analitik/analitik";
import PopupEditProfile from "./editprofil/EditProfil"; 
import PopupFollowers from "./editprofil/Follower";
import PopupChangeProfile from "./profilimage/ChangeImage";
import PopupDaftarkanBisnis from "./daftarbisnis/daftarbisnis";



export default function Profile() {
  
  const [daftarkanOpen, setDaftarkanOpen] = useState(false);

  const [openPanduan, setOpenPanduan] = useState(false);
  const [openAnalitik, setOpenAnalitik] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [name, setName] = useState("Sabrina Kefazi");
  const [username, setUsername] = useState("@sbbrna");

  const [followerOpen, setFollowerOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);

  // example lists (replace with real data later)
    const followers = [
      { name: "Nasi Goreng Cihuy", username: "nssgrng" },
      { name: "Filet Ayam Gul", username: "fillt" },
      { name: "Roti Bakar Malam", username: "rotibakar_malam" },
      { name: "Soto Betawi Haji Mamat", username: "soto_mamat" },
      { name: "Kedai Kopi Senja", username: "kopi_senja" },
      { name: "Toko Buku Pelita", username: "pelita_books" },
      { name: "Barbershop Ganteng", username: "ganteng_cut" },
    ];

  const following = [

    { name: "Nyaktuprit", username: "nyaktuprit" },
    { name: "Nasi Uduk Jajang", username: "bobj" },
    { name: "Warung Kopi Bu Tini", username: "warkop_tini" },
    { name: "Bakso Mang Ujang", username: "bakso_ujang" },
    { name: "Ayam Geprek Lestari", username: "geprek_lestari" },
    { name: "Sate Padang Pak Kumis", username: "sate_kumis" },
    { name: "Martabak Manis Bang Jali", username: "martabak_jali" },
    { name: "Es Teh Jumbo", username: "esteh_jumbo" },
    { name: "Toko Kelontong Sari", username: "kelontong_sari" },
    { name: "Laundry Bersih Kilat", username: "laundry_kilat" },

  ];

  const [changePhotoOpen, setChangePhotoOpen] = useState(false);



  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-7xl mx-auto mt-12">
        <h1 className="text-xl font-bold text-red-700 mb-4">
          Selamat Datang di Dashboard anda!
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
          {/* LEFT PROFILE CARD */}
          <div className="lg:col-span-3 bg-red-700 rounded-3xl shadow-lg p-6 flex flex-col items-center justify-center border-2 border-black">
          <div
            className="relative group w-32 h-32 rounded-full overflow-hidden border-4 border-white cursor-pointer transition-all"
            onClick={() => setChangePhotoOpen(true)}
          >
            {/* Profile Image */}
            <img
              src="https://plus.unsplash.com/premium_photo-1748936352223-8cf9a3358ac8?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Profile"
              className="w-full h-full object-cover group-hover:opacity-40 transition-opacity duration-300"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
              <Camera size={24} className="text-white mb-1" />
              <span className="text-white text-xs font-medium">Ganti Foto</span>
            </div>
          </div>

          </div>

          {/* MIDDLE STATS CARD */}
<div className="lg:col-span-4 bg-white rounded-3xl shadow-lg p-6 border-2 border-black">
  {/* Name, Username, Edit Button */}
  <div className="mb-4 flex items-center justify-between">
    <div>
      <h2 className="text-lg font-bold text-gray-800">{name}</h2>
      <p className="text-sm text-gray-600">{username}</p>
    </div>
    <button
      onClick={() => setEditOpen(true)}
      className="bg-red-600 text-white text-xs px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition-all"
    >
      Edit
    </button>
  </div>

  {/* Followers / Following */}
  <div className="grid grid-cols-2 gap-4 mb-2">
    <div
      className="text-center cursor-pointer"
      onClick={() => setFollowerOpen(true)}
    >
      <p className="text-2xl font-bold text-gray-800">12</p>
      <p className="text-sm text-gray-600">Pengikut</p>
    </div>
    <div
      className="text-center cursor-pointer"
      onClick={() => setFollowingOpen(true)}
    >
      <p className="text-2xl font-bold text-gray-800">20</p>
      <p className="text-sm text-gray-600">Diikuti</p>
    </div>
  </div>
</div>


          {/* RIGHT ACTION BUTTONS */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div
              onClick={() => setOpenAnalitik(true)}
              className="bg-red-700 rounded-3xl shadow-lg p-6 flex flex-col items-center justify-center text-white hover:bg-red-800 transition-all cursor-pointer border-2 border-black"
            >
              <div className="bg-white bg-opacity-0 rounded-2xl p-4 mb-3">
                <TrendingUp size={36} strokeWidth={2.5} />
              </div>
              <p className="font-bold text-sm text-center">Analitik</p>
            </div>
            <div
              onClick={() => setOpenPanduan(true)}
              className="bg-red-700 rounded-3xl shadow-lg p-6 flex flex-col items-center justify-center text-white hover:bg-red-800 transition-all cursor-pointer border-2 border-black"
            >
              <div className="bg-white bg-opacity-0 rounded-2xl p-4 mb-3">
                <BookOpen size={36} strokeWidth={2.5} />
              </div>
              <p className="font-bold text-sm text-center">Panduan</p>
            </div>
          </div>
        </div>

        {/* BOTTOM BUSINESS STATUS CARD */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-black">
          <h2 className="text-left text-lg font-bold text-gray-800 mb-6">
            Kelola Bisnis Anda
          </h2>

          <div className="flex flex-col items-center justify-center text-center py-6">
            <div className="mb-4 flex justify-center">
              <img
                src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWxkMzMwMnlna3NucWZ3Mnc1ZzgxeHE0YjdreXh2MDlzendkaXBqMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5T0koP77SwdZO7B0Lr/giphy.gif"
                alt="Animated Mascot"
                className="w-[240px] h-[240px] object-contain"
              />
            </div>

            <p className="text-gray-700 font-semibold text-base mb-4">
              Anda Belum Mendaftarkan / Belum Memiliki Bisnis
            </p>

            <button
              onClick={() => setDaftarkanOpen(true)}
              className="bg-red-600 text-white px-8 py-2.5 rounded-full hover:bg-red-700 transition-all font-semibold text-sm shadow-md"
            >
              Daftarkan Bisnis
            </button>

          </div>
        </div>
      </div>

      {/* Popups */}

      <PopupDaftarkanBisnis
      open={daftarkanOpen}
        onClose={() => setDaftarkanOpen(false)}
        onSubmit={(data) => {
          console.log("Data bisnis dikirim:", data);
          setDaftarkanOpen(false);
        }}
      />

      {openAnalitik && (
        <PopupAnalitik open={openAnalitik} onClose={() => setOpenAnalitik(false)} />
      )}

      {openPanduan && (
        <PopupPanduan open={openPanduan} onClose={() => setOpenPanduan(false)} />
      )}

      {editOpen && (
        <PopupEditProfile
          open={editOpen}
          onClose={() => setEditOpen(false)}
          name={name}
          username={username}
          setName={setName}
          setUsername={setUsername}
        />
      )}

      {followerOpen && (
      <PopupFollowers
        open={followerOpen}
        onClose={() => setFollowerOpen(false)}
        title="Pengikut"
        list={followers}
      />
    )}

    {followingOpen && (
      <PopupFollowers
        open={followingOpen}
        onClose={() => setFollowingOpen(false)}
        title="Diikuti"
        list={following}
      />
    )}


    <PopupChangeProfile
      open={changePhotoOpen}
      onClose={() => setChangePhotoOpen(false)}
      onTakePhoto={() => {
        console.log("Take Photo clicked");
        setChangePhotoOpen(false);
      }}
      onChooseFile={() => {
        console.log("Choose File clicked");
        setChangePhotoOpen(false);
      }}
    />


    </div>
  );
}
