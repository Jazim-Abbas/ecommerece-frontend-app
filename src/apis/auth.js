import api from ".";

export function register(user) {
  return api.post("/auth/register", user);
}
