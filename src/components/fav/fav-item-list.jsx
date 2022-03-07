import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default function FavItems() {
  const items = [1, 2, 3, 4];

  return items.map((_, i) => (
    <div className="col-md-3">
      <FavItem />
    </div>
  ));
}

function FavItem() {
  const imageURL =
    "https://images.unsplash.com/photo-1645917864901-1fa7731b9af6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";
  const history = useHistory();

  const handleViewItem = () => {
    history.push("/item/1");
  };

  return (
    <Link className="view-link" to="/item/1">
      <Card>
        <Card.Img variant="top" src={imageURL} />
        <Card.Body>
          <Card.Title>Item Name</Card.Title>
          <Card.Text>Price: $32</Card.Text>
          <Card.Text>
            <i class="fa fa-heart float-left pointer" aria-hidden="true" />
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
