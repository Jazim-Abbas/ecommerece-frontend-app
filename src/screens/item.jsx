import { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import BaseLayout from "../layouts/base";

const imageURL =
  "https://images.unsplash.com/photo-1645917864901-1fa7731b9af6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";

export default function ItemScreen() {
  return (
    <BaseLayout>
      <div className="row">
        <div className="col-md-6">
          <img src={imageURL} alt="Single Item Image" />
        </div>
        <div className="col-md-6">
          <ListGroup>
            <ListGroup.Item>
              <h4>Item Name: Pizza</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <span className="fw-bold">Shop Name:</span>
                <a href="" className="mx-2">
                  DollarSmart
                </a>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <span className="fw-bold">Sales Count</span>: $200
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <span className="fw-bold">Price</span>: $20
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <span className="fw-bold">Description</span>: Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Eaque vitae laborum
                consequatur culpa ipsum, suscipit voluptatibus quos ullam
                inventore nobis cumque, deleniti magnam quae. Sed eius
                repudiandae vel adipisci magni!
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <span className="fw-bold">Available Stock Quantity</span>: 35
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <span className="fw-bold">Add to Favourite</span>:{" "}
                <i class="fa fa-heart-o mx-2 pointer" aria-hidden="true" />
              </p>
            </ListGroup.Item>
            <CartOption />
            <ListGroup.Item>
             <div className="d-grid">
             <Button variant="light" size="lg">
                Add to Cart
              </Button>
             </div>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    </BaseLayout>
  );
}

function CartOption() {
  const [cartValue, setCartValue] = useState(1);

  const handleIncrement = () => {
    setCartValue((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCartValue((prev) => prev - 1);
  };

  return (
    <ListGroup.Item>
      <button
        className="btn btn-light btn-sm"
        onClick={handleDecrement}
        disabled={cartValue === 1}
      >
        <i class="fa fa-minus" aria-hidden="true" />
      </button>
      <span className="mx-5">{cartValue}</span>
      <button className="btn btn-light btn-sm" onClick={handleIncrement}>
        <i class="fa fa-plus" aria-hidden="true" />
      </button>
    </ListGroup.Item>
  );
}
