import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import BaseLayout from "../layouts/base";
import * as purchaseApi from "../apis/purchase";
import useApi from "../hooks/use-api";
import { useEffect } from "react";
import { AppLoading } from "../components";
import { getImageURL } from "../utils/app";

export default function PurchasesScreen() {
  return (
    <BaseLayout hasSearch={false}>
      <h3 className="text-center">Your Purchases</h3>
      <hr />
      <div className="mt-4">
        <PurchaseItems />
      </div>
    </BaseLayout>
  );
}

function PurchaseItems() {
  const allPurchasesApi = useApi(purchaseApi.getAllPurchases, {
    keyExtractor: "purchases",
  });
  const items = [1, 2, 3, 4, 5];

  useEffect(() => {
    allPurchasesApi.request();
  }, []);

  if (allPurchasesApi.isLoading) return <></>;

  if (!allPurchasesApi.data) return <></>;

  if (allPurchasesApi.data.length === 0) {
    return <div className="alert alert-info">No Purchases Yet</div>;
  }

  return (
    <div className="row g-3">
      {allPurchasesApi.data.map((purchaseItem, i) => (
        <div className="col-md-4">
          <PurchaseItem key={i} item={purchaseItem} />
        </div>
      ))}
    </div>
  );
}

function PurchaseItem({ item }) {
  const imageURL =
    "https://media.istockphoto.com/photos/bakery-chef-prepare-pizza-picture-id1291299956?b=1&k=20&m=1291299956&s=170667a&w=0&h=Ys_FLtdY0Uzc7yTQl6JzvCHTQ3eRAuqNNU4x8EX1FB8=";

  return (
    <Card>
      <Card.Img variant="top" src={item.itemImage} />
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <p>
            <span className="fw-bold">Order ID:</span>
            <span className="mx-2">{item.orderId}</span>
          </p>
          <p>
            <span className="fw-bold">Item Name:</span>
            <span className="mx-2">{item.itemName}</span>
          </p>
        </ListGroupItem>
        <ListGroupItem>
          <p>
            <span className="fw-bold">Item Price:</span>
            <span className="mx-2">${item.itemPrice}</span>
          </p>
        </ListGroupItem>
        <ListGroupItem>
          <p>
            <span className="fw-bold">Shop Name:</span>
            <span className="mx-2">
              <Link to={`/shop/${item.Shop._id}`}>{item.Shop.name}</Link>
            </span>
          </p>
        </ListGroupItem>
        <ListGroupItem>
          <p>
            <span className="fw-bold">Qauntity:</span>
            <span className="mx-2">{item.itemQuantity}</span>
          </p>
        </ListGroupItem>
        <ListGroupItem>
          <p>
            <span className="fw-bold">Date of Purchased:</span>
            <span className="mx-2">
              {moment(item.purchasedDate).format("MMMM Do YYYY")}
            </span>
          </p>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}
