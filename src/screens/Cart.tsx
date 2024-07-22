import { useCart, useCartDispatch } from "../components/ContextReducer";
import { Link } from "react-router-dom";

interface cart_item_details {
  uid: string;
  type: string;
  OrderQuantity: {
    Amount: number;
    Size: string;
    PriceEach: number;
    Tprice: number;
  };
  OrderItem: {
    name: string;
    img: string;
    description: string;
  };
}

type remove_callback = (action: { type: string; uid: string }) => void;

function UserCart() {
  const CartDetails: cart_item_details[] = useCart();
  const CartDispatch: remove_callback = useCartDispatch();

  if (CartDetails.length === 0)
    return (
      <>
        <div>Cart is empty</div>
        <Link to={"/"}>
          <button className="bg-green-500 w-32 h-10 rounded-[20px]">
            Return back
          </button>
        </Link>
      </>
    );
  const TotalAmount = CartDetails.reduce(
    (prev: any, current: any) => prev + current
  );
  return (
    <>
      <div>
        <table className="table table-auto">
          <thead>
            <tr>
              <th>#</th>
              <th>Food Item</th>
              <th>Quantity</th>
              <th>Size</th>
              <th>Price per each</th>
              <th>Amount</th>
              <th>Delete?</th>
            </tr>
          </thead>
          <tbody>
            {CartDetails.map((val: cart_item_details, i: number) => {
              return (
                <tr>
                  <th>{i + 1}</th>
                  <th>{val.OrderItem.name}</th>
                  <th>{val.OrderQuantity.Amount}</th>
                  <th>{val.OrderQuantity.Size}</th>
                  <th>{val.OrderQuantity.PriceEach}</th>
                  <th>{val.OrderQuantity.Tprice}</th>
                  <th>
                    <button
                      onClick={(e) => {
                        CartDispatch({ type: "REMOVE", uid: val.uid });
                      }}
                    >
                      <img src="trash-fill.svg"></img>
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button className="bg-green-500">Checkout</button>
    </>
  );
}

export default UserCart;
