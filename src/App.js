import { FavProvider } from "./contexts/fav-context";
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <FavProvider>
        <AppRoutes />
      </FavProvider>
    </>
  );
}

export default App;
