import LoginScreen from "../screens/login";
import RegisterScreen from "../screens/register";

const PUBLIC_ROUTES = [
  { path: "/login", Component: LoginScreen },
  { path: "/register", Component: RegisterScreen },
];

export { PUBLIC_ROUTES };
