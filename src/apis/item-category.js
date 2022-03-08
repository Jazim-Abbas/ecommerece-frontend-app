import api from ".";

export function getAllCategories(shopId) {
  return api.get("/item-category/" + shopId);
}
