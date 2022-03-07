import api from ".";

export function getFavItems() {
  return api.get("/fav");
}
