import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogoNav from "./assets/components/layout/Navbar/LogoNav";
import FuturisticNav from "./assets/components/layout/Navbar/Nav2";
import MobileNav from "./assets/components/layout/Navbar/MobileNav"; // ✅ NEW
import Home from "./assets/pages/home_page/Home";
import Profile from "./assets/pages/profile_page/Profile";
import Catalogue from "./assets/pages/catalogue_page/Catalogue";
import Chat from "./assets/pages/chat_page/Chat";
import Favorites from "./assets/pages/favorite_page/Favorites";
import Settings from "./assets/pages/settings_page/Settings";

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-white">
        {/* Desktop Nav */}
        <div className="hidden lg:block">
          <LogoNav />
        </div>
        <div className="hidden lg:block">
          <FuturisticNav />
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-0 lg:ml-[120px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </Router>
  );
}
