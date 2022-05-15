import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import * as itemApi from "../../apis/item";
import useApi from "../../hooks/use-api";
import AppLoading from "../loading";
import { getImageURL } from "../../utils/app";
import { useFavContext } from "../../contexts/fav-context";
import { useDispatch, useSelector } from "react-redux";
import { onToggleFavorite } from "../../store/fav";
import useGraphqlQuery from "../../hooks/use-graphql-query";
import { allItemsQuery } from "../../graphql/item";

export default function ListItems() {
  const favState = useSelector((state) => state.favorite);
  const favCtx = useFavContext();
  const allItems = useGraphqlQuery({
    query: allItemsQuery,
    keyExtractor: "allItems",
  });

  if (allItems.isLoading) return <></>;

  if (!allItems.data) return <></>;

  if (allItems.data.length === 0) {
    return <p className="alert alert-info">No Items yet</p>;
  }

  if (allItems.data) {
    return allItems.data.map((_item, i) => (
      <div className="col-md-3">
        <Item
          key={i}
          item={_item}
          favItems={favState.fav}
          onToggleFav={onToggleFavorite}
        />
      </div>
    ));
  }
}

function Item({ item, favItems, onToggleFav, toggleLoading }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const isFav = favItems[item._id];
  const imageURL =
    "https://images.unsplash.com/photo-1645917864901-1fa7731b9af6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";

  const favIconClassname = () => {
    let icon = "fa fa-heart";
    if (!isFav) {
      icon += "-o";
    }
    return icon;
  };

  const handleToggleFavItem = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(
      onToggleFav(item, isFav, () => {
        setIsLoading(false);
      })
    );
  };

  return (
    <Link className="view-link" to={`item/${item._id}`}>
      <Card>
        <Card.Img
          variant="top"
          src={item.featuredImage ? item.featuredImage : imageURL}
        />
        <Card.Body>
          <Card.Title>Item Name: {item.name}</Card.Title>
          <Card.Text>Price: ${item.price}</Card.Text>
          <Card.Text>
            {/* {isLoading && <AppLoading />} */}
            {!isLoading && (
              <i
                class={`${favIconClassname()} float-left pointer`}
                aria-hidden="true"
                onClick={handleToggleFavItem}
              />
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
