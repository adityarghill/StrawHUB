import { Outlet, useNavigation, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LogoNav from "../layout/Navbar/LogoNav";
import FuturisticNav from "../layout/Navbar/Nav2";
import MobileNav from "../layout/Navbar/MobileNav";
import SearchBarTop from "../layout/SearchBar";
import Loader from "./loader";

export default function AppLayout() {
  const navigation = useNavigation();
  const location = useLocation();

  const [showLoader, setShowLoader] = useState(true);

  // Loader muncul setiap ganti URL
  useEffect(() => {
    setShowLoader(true);
    const timer = setTimeout(() => setShowLoader(false), 800); // lama animasi
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Jika navigate sedang loading, tampilkan juga
  const isNavigating = navigation.state === "loading";

  return (
    <div className="flex min-h-screen bg-white">
      {/* Desktop Nav */}
      <div className="hidden lg:block">
        <LogoNav />
      </div>
      <div className="hidden lg:block">
        <FuturisticNav />
      </div>
      <div className="hidden lg:block">
        <SearchBarTop />
      </div>

      {/* Content */}
      <div className="flex-1 ml-0 lg:ml-[120px] relative">
        {(showLoader || isNavigating) && <Loader />}
        <Outlet />
      </div>

      {/* Mobile Nav */}
      <div className="lg:hidden">
        <MobileNav />
      </div>
    </div>
  );
}
