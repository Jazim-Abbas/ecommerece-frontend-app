import api from ".";

export function updateProfile(user) {
  return api.patch("/user/profile", user);
}
