export default function UpdateShop() {
  return (
    <form className="mt-4">
      <div className="form-group">
        <label htmlFor="shop_image">Shop Picture</label>
        <input type="file" className="form-control" id="shop_image" />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="shop_name">Shop Name</label>
        <input type="text" className="form-control" id="shop_name" />
      </div>
      <button className="btn btn-success mt-3">Save Changes</button>
    </form>
  );
}
