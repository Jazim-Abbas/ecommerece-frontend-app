import api from ".";

export function isShopExists() {
  return api.get("/shop/is-shop-exists");
}

export function checkAvailablity() {
  return api.post("/shop/check-availablity");
}
