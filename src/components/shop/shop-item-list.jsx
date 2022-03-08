import { Link } from "react-router-dom";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as shopApi from "../../apis/shop";
import useApi from "../../hooks/use-api";
import AppLoading from "../loading";

export default function ShopItems({ shop }) {
  const shopItems = useApi(shopApi.getShopItems, { keyExtractor: "items" });
  //   const [shopItems, setShopItems] = useState([]);

  useEffect(() => {
    if (shop) {
      shopItems.request(shop.id);
    }
  }, [shop]);

  if (!shop) return <></>;

  if (shopItems.isLoading) return <AppLoading />;

  if (!shopItems.data) return <></>;

  const getShopItems = () => {
    return shopItems.data;
  };

  return getShopItems().map((_, i) => (
    <div className="col-md-3">
      <ShopItem key={i} />
    </div>
  ));
}

function ShopItem() {
  const imageURL =
    "https://images.unsplash.com/photo-1645917864901-1fa7731b9af6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";

  return (
    <Link className="view-link" to="/item/1">
      <Card>
        <Card.Img variant="top" src={imageURL} />
        <Card.Body>
          <Card.Title>Item Name</Card.Title>
          <Card.Text>Price: $32</Card.Text>
          <Card.Text>Category</Card.Text>
          <Card.Text>Total Sales: $20</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <p>Description</p>
          </ListGroupItem>
          <ListGroupItem>
            <i class="fa fa-heart float-left pointer" aria-hidden="true" />
            <i className="mx-3">Available</i>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </Link>
  );
}
