import api from ".";

export function isShopExists() {
  return api.get("/shop/is-shop-exists");
}
