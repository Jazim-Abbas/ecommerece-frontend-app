import api from ".";

export function isShopExists() {
  return api.get("/shop/is-shop-exists");
}

export function checkAvailablity(shop) {
  return api.post("/shop/check-availablity", shop);
}

export function createNewShop(shop) {
  return api.post("/shop", shop);
}

export function getShopDetail() {
  return api.get("/shop");
}
