import { Outlet, useNavigation } from "react-router-dom";
import LogoNav from "./assets/components/layout/Navbar/LogoNav";
import FuturisticNav from "./assets/components/layout/Navbar/Nav2";
import MobileNav from "./assets/components/layout/Navbar/MobileNav";
import SearchBarTop from "./assets/components/layout/SearchBar";
import Loader from "./assets/components/layout/loader";

export default function Layout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

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

      {/* Main Content */}
      <div className="flex-1 ml-0 lg:ml-[120px] relative">
        {isLoading && <Loader />}
        <Outlet />
      </div>

      {/* Mobile Nav */}
      <div className="lg:hidden">
        <MobileNav />
      </div>
    </div>
  );
}
