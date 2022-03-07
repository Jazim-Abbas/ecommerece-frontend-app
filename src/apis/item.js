import api from ".";

export function getAllItems() {
  return api.get("/item");
}
