import { useHistory } from "react-router-dom";
import BaseLayout from "../layouts/base";
import FavItems from "../components/fav/fav-item-list";

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

function UserProfile() {
  const history = useHistory();

  const navigateToProfile = () => {
    history.push("/profile");
  };

  return (
    <div className="mb-4">
      <h3 className="d-inline">John Smith</h3>
      <i className="fa fa-pencil mx-3 pointer" onClick={navigateToProfile} />
      <hr />
    </div>
  );
}
