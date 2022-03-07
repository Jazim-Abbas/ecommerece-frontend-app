import { useHistory } from "react-router-dom";
import { useCartContext } from "../contexts/cart-context";
import BaseLayout from "../layouts/base";

export default function CartPage() {
  const cartCtx = useCartContext();
  const history = useHistory();

  const navigateToPurchases = () => {
    history.push("/purchases");
  };

  return (
    <BaseLayout>
      <h3 className="text-center">Your Cart</h3>
      <hr />
      <div className="mt-5">
        <CartItems cartCtx={cartCtx} />
        <div className="float-end">
          <button className="btn btn-success" onClick={navigateToPurchases}>
            Checkout
          </button>
        </div>
      </div>
    </BaseLayout>
  );
}

function CartItems({ cartCtx }) {
  const cart = cartCtx.cart;

  console.log("cart: ", cart);

  return (
    <table className="table table-bordered table-hover">
      <caption className="text-center">Total Price: $500</caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(cart).map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>${item.price}</td>
            <td>
              <i class="fa fa-times pointer" aria-hidden="true" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
