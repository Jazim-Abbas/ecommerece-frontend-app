import { CartProvider } from "./contexts/cart-context";
import { FavProvider } from "./contexts/fav-context";
import { SearchProvider } from "./contexts/search-context";
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <FavProvider>
        <CartProvider>
          <SearchProvider>
            <AppRoutes />
          </SearchProvider>
        </CartProvider>
      </FavProvider>
    </>
  );
}

export default App;
