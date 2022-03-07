import api from ".";

export function getAllItems() {
  return api.get("/item");
}

export function getItem(id) {
  return api.get("/item/" + id);
}
