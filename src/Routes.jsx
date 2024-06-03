import { FavouriteCards } from "./components";
import { Home } from "./pages";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/favourites",
    element: <FavouriteCards />,
  },
];

export default routes;
