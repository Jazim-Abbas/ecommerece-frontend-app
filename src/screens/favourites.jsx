import BaseLayout from "../layouts/base";
import FavItems from "../components/fav/fav-item-list";
import UserProfile from "../components/fav/user-profile";

export default function FavouritesScreen() {
  return (
    <BaseLayout hasSearch={false}>
      <UserProfile />
      <input
        type="text"
        className="form-control"
        placeholder="Search your favourites ..."
      />
      <div className="my-3 row g-3">
        <FavItems />
      </div>
    </BaseLayout>
  );
}
