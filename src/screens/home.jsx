import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import BaseLayout from "../layouts/base";

export default function HomeScreen() {
  return (
    <BaseLayout>
      <SearchResults />
      <div className="row g-3">
        <Items />
      </div>
    </BaseLayout>
  );
}

function SearchResults() {
  const itemsCount = [1, 2, 3, 4];
  const imageURL =
    "https://images.unsplash.com/photo-1645917864901-1fa7731b9af6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";

  const item = () => {
    return (
      <Card>
        <Card.Img variant="top" src={imageURL} />
        <Card.Body>
          <Card.Title>Item Name</Card.Title>
          <Card.Text>Price: $32</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <Button size="sm" variant="primary">
              View
            </Button>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  };

  return (
    <div>
      <h3 className="text-center">Search Results: abc</h3>
      <div className="row">
        {itemsCount.map((_, i) => (
          <div className="col-md-2" key={i}>
            {item()}
          </div>
        ))}
        <hr className="mt-3" />
      </div>
    </div>
  );
}

function Items() {
  const items = [1, 2, 3, 4, 5];

  return items.map((_, i) => (
    <div className="col-md-3">
      <Item key={i} />
    </div>
  ));
}

function Item() {
  const imageURL =
    "https://images.unsplash.com/photo-1645917864901-1fa7731b9af6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";

  return (
    <Card>
      <Card.Img variant="top" src={imageURL} />
      <Card.Body>
        <Card.Title>Item Name</Card.Title>
        <Card.Text>Price: $32</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <Button size="sm" variant="primary">
            View
          </Button>
          <i class="fa fa-heart float-left mx-4 pointer" aria-hidden="true" />
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}
