import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ListGroup, Button } from "react-bootstrap";
import { useCartContext } from "../contexts/cart-context";
import BaseLayout from "../layouts/base";
import * as checkoutApi from "../apis/checkout";
import useApi from "../hooks/use-api";
import { ServerError } from "../components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { onAddToCart, onRemoveFromCart, onResetCart } from "../store/cart";
import { useState } from "react";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const history = useHistory();
  const [isGift, setIsGift] = useState(true);
  const [description, setDescription] = useState("");
  const checkout = useApi(checkoutApi.checkout, { hasCatchError: true });

  const navigateToPurchases = async () => {
    try {
      const checkoutItems = Object.values(cartState.cart).map((item) => {
        return {
          itemId: item._id,
          quantity: item.cartQuantity,
        };
      });
      await checkout.request({ items: checkoutItems, isGift, description });
      console.log("checkout items: ", checkoutItems);
      dispatch(onResetCart());
      history.push("/purchases");
    } catch (_) {}
  };

  return (
    <BaseLayout hasSearch={false}>
      <h3 className="text-center">Your Cart</h3>
      <hr />
      <div className="mt-5">
        <div className="my-3">
          <ServerError error={checkout.error} />
        </div>
        <CartItems cart={cartState.cart} />
        <div className="form-check">
          <label className="form-check-label">
            <input
              type="checkbox"
              className="form-check-input"
              value=""
              checked={isGift}
              onChange={(e) => setIsGift(e.target.checked)}
            />
            Do you want to proceed as Gift?
          </label>
        </div>
        <div className="form-group my-3">
          <label htmlFor="comment">Description:</label>
          <textarea
            className="form-control"
            rows={3}
            id="comment"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          {/* {checkout.isLoading && <AppLoading />} */}
          {!checkout.isLoading && (
            <button
              className="btn btn-success mb-5"
              onClick={navigateToPurchases}
              disabled={Object.keys(cartState.cart).length === 0}
            >
              Checkout
            </button>
          )}
        </div>
      </div>
    </BaseLayout>
  );
}

function CartItems({ cart }) {
  const dispatch = useDispatch();

  const calculateTotalPrice = () => {
    let total = 0;
    Object.values(cart).forEach((item) => {
      const price = item.price * item.cartQuantity;
      total += price;
    });
    return total;
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(onRemoveFromCart(itemId));
  };

  return (
    <table className="table table-bordered">
      <caption className="text-center">
        Total Price: ${calculateTotalPrice()}
      </caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Cart</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(cart).map((item) => (
          <tr key={item._id}>
            <td>
              <Link to={`/item/${item._id}`}>{item.name}</Link>
            </td>
            <td>{item.quantity}</td>
            <td>${item.price}</td>
            <td>
              <Cart item={item} />
            </td>
            <td>
              <i
                class="fa fa-times pointer"
                aria-hidden="true"
                onClick={() => handleRemoveFromCart(item._id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Cart({ item }) {
  const cart = useSelector((state) => state.cart.cart);
  console.log("cart___: ", cart);
  console.log("item_quantity: ___", item);
  const dispatch = useDispatch();
  const [cartValue, setCartValue] = useState(cart[item._id]?.cartQuantity ?? 1);

  const handleIncrement = () => {
    dispatch(onAddToCart(item, 1));
    setCartValue((prev) => prev + 1);
  };

  const handleDecrement = () => {
    dispatch(onAddToCart(item, -1));
    setCartValue((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    dispatch(onAddToCart(item, cartValue));
  };

  return (
    <>
      {item.quantity > 0 && (
        <ListGroup.Item>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleDecrement}
            disabled={cartValue === 1}
          >
            <i class="fa fa-minus" aria-hidden="true" />
          </button>
          <span className="mx-5">{cartValue}</span>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleIncrement}
            disabled={cartValue >= item.quantity}
          >
            <i class="fa fa-plus" aria-hidden="true" />
          </button>
        </ListGroup.Item>
      )}
    </>
  );
}
