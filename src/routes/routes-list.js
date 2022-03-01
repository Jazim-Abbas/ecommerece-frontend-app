import FavouritesScreen from "../screens/favourites";
import LoginScreen from "../screens/login";
import RegisterScreen from "../screens/register";

const PUBLIC_ROUTES = [
  { path: "/login", Component: LoginScreen },
  { path: "/register", Component: RegisterScreen },
];

const PRIVATE_ROUTES = [
  { path: "/favs", Component: FavouritesScreen },
  // { path: "/login", Component: LoginScreen },
];

export { PUBLIC_ROUTES, PRIVATE_ROUTES };
