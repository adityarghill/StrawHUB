// router.tsx
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "../../../assets/pages/home_page/Home";
import Profile from "../../../assets/pages/profile_page/Profile";
import Catalogue from "../../../assets/pages/catalogue_page/Catalogue";
import Chat from "../../../assets/pages/chat_page/Chat";
import Favorites from "../../../assets/pages/favorite_page/Favorites";
import Settings from "../../../assets/pages/settings_page/Settings";
import PanduanDetailPage from "../../pages/profile_page/panduan/detail";
import Category from "../../pages/home_page/Category";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // wrapper yg mengandung loader + navbar + outlet
    children: [
      {
  index: true,
  element: (
    <>
      <Home />
      <Category />
    </>
  ),
},

      { path: "profile", element: <Profile /> },
      { path: "catalogue", element: <Catalogue /> },
      { path: "chat", element: <Chat /> },
      { path: "favorites", element: <Favorites /> },
      { path: "settings", element: <Settings /> },
      { path: "detail/:id", element: <PanduanDetailPage /> },
      
      
    ],
  },
]);

export default router;
