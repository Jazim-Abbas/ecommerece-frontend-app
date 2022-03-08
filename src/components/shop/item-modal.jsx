import { Modal } from "react-bootstrap";

export default function ItemModal(props) {
  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="item-modal">Create or Update Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="item_image">Item Image</label>
            <input type="file" className="form-control" id="item_image" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="item_name">Item Name</label>
            <input type="text" className="form-control" id="item_name" />
          </div>
          <div class="form-group mt-3">
            <label for="category">Select Category</label>
            <select class="form-control" id="category">
              <option value="ind">Clothing</option>
              <option value="usa">Entertainment</option>
              <option value="can">ArtI</option>
            </select>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="description">Description</label>
            <input type="text" className="form-control" id="description" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="price">Price</label>
            <input type="number" className="form-control" id="price" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="stock_qty">Stock Quantity</label>
            <input type="number" className="form-control" id="stock_qty" />
          </div>
          <button className="btn btn-success mt-3">Save Changes</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
