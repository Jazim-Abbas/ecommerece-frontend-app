import BaseLayout from "../layouts/base";

export default function ShopNameScreen() {
  const shopAvailable = () => {
    return (
      <div className="mt-2">
        <p className="badge bg-success">Available</p>
      </div>
    );
  };

  return (
    <BaseLayout>
      <div className="text-center">
        <h3>Name your Shop</h3>
        <p>Choose a memorable name that reflects your style</p>
        <hr />
      </div>
      <div className="mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Shop name ..."
        />
        {shopAvailable()}
        <button className="btn btn-light">Check Availablity</button>
      </div>
    </BaseLayout>
  );
}
