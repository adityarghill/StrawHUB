import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogoNav from "./assets/components/layout/LogoNav";
import FuturisticNav from "./assets/components/layout/Nav2";
import Home from "./assets/pages/home_page/Home";
import Profile from "./assets/pages//second_nav/Profile";
import Catalogue from "./assets/pages/second_nav/Catalogue";
import Chat from "./assets/pages/second_nav/Chat";
import Favorites from "./assets/pages/second_nav/Favorites";
import Settings from "./assets/pages/second_nav/Settings";

export default function App() {
  return (
    <Router>
      <div className="flex">
        <LogoNav />
        <FuturisticNav />
        <div className="ml-[120px] flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
