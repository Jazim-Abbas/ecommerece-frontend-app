import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useFavContext } from "../../contexts/fav-context";
import { getImageURL } from "../../utils/app";

export default function FavItems() {
  const items = [1, 2, 3, 4];
  const favCtx = useFavContext();

  return Object.values(favCtx.fav).map((fav) => (
    <div className="col-md-3" key={fav.Item.id}>
      <FavItem item={fav.Item} />
    </div>
  ));
}

function FavItem({ item }) {
  const imageURL =
    "https://images.unsplash.com/photo-1645917864901-1fa7731b9af6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";
  const history = useHistory();

  const handleViewItem = () => {
    history.push("/item/1");
  };

  return (
    <Link className="view-link" to="/item/1">
      <Card>
        <Card.Img
          variant="top"
          src={item.featuredImage ? getImageURL(item.featuredImage) : imageURL}
        />
        <Card.Body>
          <Card.Title>Item Name: {item.name}</Card.Title>
          <Card.Text>Price: ${item.price}</Card.Text>
          <Card.Text>
            <i class="fa fa-heart float-left pointer" aria-hidden="true" />
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
