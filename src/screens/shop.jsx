import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import BaseLayout from "../layouts/base";

export default function ShopScreen() {
  return (
    <BaseLayout hasSearch={false}>
      <h3 className="text-center">Shop</h3>
      <form className="mt-5">
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
      <hr />

      <div className="mt-5">
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search items .."
            />
          </div>
          <div className="col-md-6">
            <button className="btn btn-primary">Add New Item</button>
            <button className="btn btn-info mx-3">
              Add New Category for this shop
            </button>
          </div>
        </div>
        <div className="row g-3 mt-2">
          <ShopItems />
        </div>
      </div>
    </BaseLayout>
  );
}

function ShopItems() {
  const items = [1, 2, 3, 4, 5];

  return items.map((_, i) => (
    <div className="col-md-3">
      <ShopItem key={i} />
    </div>
  ));
}

function ShopItem() {
  const imageURL =
    "https://images.unsplash.com/photo-1645917864901-1fa7731b9af6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";

  return (
    <Card>
      <Card.Img variant="top" src={imageURL} />
      <Card.Body>
        <Card.Title>Item Name</Card.Title>
        <Card.Text>Price: $32</Card.Text>
        <Card.Text>Category</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <p>Description</p>
        </ListGroupItem>
        <ListGroupItem>
          <Button size="sm" variant="primary">
            View
          </Button>
          <i class="fa fa-heart float-left mx-4 pointer" aria-hidden="true" />
          <i>Available</i>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}
