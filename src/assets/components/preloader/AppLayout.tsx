import { Outlet, useNavigation, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DesktopNav from "../layout/Navbar/DesktopNav";
import MobileNav from "../layout/Navbar/MobileNav";
import SearchBarTop from "../layout/SearchBar";
import Loader from "./loader";

export default function AppLayout() {
  const navigation = useNavigation();
  const location = useLocation();

  const [showLoader, setShowLoader] = useState(true);

  // HIDE SEARCH BAR WHEN IN /chat
const hideSearchBar = location.pathname === "/chat" || location.pathname === "/settings" || location.pathname === "/favorites";
  

  // Loader muncul setiap ganti URL
  useEffect(() => {
    setShowLoader(true);
    const timer = setTimeout(() => setShowLoader(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const isNavigating = navigation.state === "loading";

  return (
    <div className="flex min-h-screen bg-white">
      {/* Desktop Nav */}
      <div className="hidden lg:block">
        <DesktopNav />
      </div>

      {/* Hide or show Search Bar */}
      {!hideSearchBar && (
        <div className="hidden lg:block">
          <SearchBarTop />
        </div>
      )}

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
