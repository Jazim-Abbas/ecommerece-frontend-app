import { useHistory } from "react-router-dom";
import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import BaseLayout from "../layouts/base";

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
        <div className="col-md-3">
          <FavItems />
        </div>
        <div className="col-md-3">
          <FavItems />
        </div>
        <div className="col-md-3">
          <FavItems />
        </div>
        <div className="col-md-3">
          <FavItems />
        </div>
        <div className="col-md-3">
          <FavItems />
        </div>
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

function FavItems() {
  return <FavItem />;
}

function FavItem() {
  const imageURL =
    "https://images.unsplash.com/photo-1645917864901-1fa7731b9af6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";
  const history = useHistory();

  const handleViewItem = () => {
    history.push("/item/1");
  };

  return (
    <Card>
      <Card.Img variant="top" src={imageURL} />
      <Card.Body>
        <Card.Title>Item Name</Card.Title>
        <Card.Text>Price: $32</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <Button size="sm" variant="primary" onClick={handleViewItem}>
            View
          </Button>
          <i class="fa fa-heart float-left mx-4 pointer" aria-hidden="true" />
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}
