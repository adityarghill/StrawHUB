import { RouterProvider } from "react-router-dom";
import { router } from "./assets/components/preloader/router";

export default function App() {
  return <RouterProvider router={router} />;
}
