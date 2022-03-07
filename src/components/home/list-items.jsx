import { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import * as itemApi from "../../apis/item";
import useApi from "../../hooks/use-api";
import AppLoading from "../loading";
import { getImageURL } from "../../utils/app";
import { useFavContext } from "../../contexts/fav-context";

export default function ListItems() {
  const favCtx = useFavContext();
  const item = useApi(itemApi.getAllItems, { keyExtractor: "items" });

  useEffect(() => {
    item.request();
  }, []);

  if (item.isLoading || favCtx.isLoading) return <AppLoading />;

  if (!item.data) return <></>;

  if (item.data) {
    return item.data.map((_item, i) => (
      <div className="col-md-3">
        <Item key={i} item={_item} favItems={favCtx.fav} />
      </div>
    ));
  }
}

function Item({ item, favItems }) {
  const imageURL =
    "https://images.unsplash.com/photo-1645917864901-1fa7731b9af6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";

  const favIconClassname = () => {
    let icon = "fa fa-heart";
    if (!favItems[item.id]) {
      icon += "-o";
    }
    return icon;
  };

  return (
    <Link className="view-link" to="item/1">
      <Card>
        <Card.Img
          variant="top"
          src={item.featuredImage ? getImageURL(item.featuredImage) : imageURL}
        />
        <Card.Body>
          <Card.Title>Item Name: {item.name}</Card.Title>
          <Card.Text>Price: ${item.price}</Card.Text>
          <Card.Text>
            <i
              class={`${favIconClassname()} float-left pointer`}
              aria-hidden="true"
            />
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
