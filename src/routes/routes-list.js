import FavouritesScreen from "../screens/favourites";
import LoginScreen from "../screens/login";
import ProfileScreen from "../screens/profile";
import RegisterScreen from "../screens/register";
import ShopNameScreen from "../screens/shop-name";

const PUBLIC_ROUTES = [
  { path: "/login", Component: LoginScreen },
  { path: "/register", Component: RegisterScreen },
];

const PRIVATE_ROUTES = [
  { path: "/favs", Component: FavouritesScreen },
  { path: "/profile", Component: ProfileScreen },
  { path: "/init-shop", Component: ShopNameScreen },
];

export { PUBLIC_ROUTES, PRIVATE_ROUTES };
