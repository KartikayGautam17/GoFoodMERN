import { useReducer, useRef } from "react";
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

const PriceStateReducer = (state: any, action: any) => {
  switch (action.type) {
    default:
      return "Some error";
    case "init":
      return action.value;
    case "add":
      return (state += action.value);
    case "remove":
      return (state -= action.value);
  }
};

function UserCart() {
  const CartPrice = useReducer(PriceStateReducer, { type: "init", value: 0 });

  const CalculateTotalPrice = () => {
    const CheckoutPrice = { current: 0 };
    CartDetails.map((val) => {
      CheckoutPrice.current += val.OrderQuantity.Tprice;
    });
    return CheckoutPrice.current;
  };

  const CartDetails: cart_item_details[] = useCart();
  const CartDispatch: remove_callback = useCartDispatch();
  if (CartDetails.length === 0)
    return (
      <>
        <div className="m-10 text-2xl p-5">Cart is empty</div>
      </>
    );
  const TotalAmount = CartDetails.reduce(
    (prev: any, current: any) => prev + current
  );
  return (
    <>
      <div className="p-5 h-[375px] overflow-y-scroll">
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
      <div>
        <button className="bg-green-500 w-28 h-12 text-xl rounded-sm mt-2 ml-5 inline-block">
          Checkout
        </button>
        <div className="inline-block mx-5 text-2xl">
          ₹{CalculateTotalPrice()}
        </div>
      </div>
    </>
  );
}

export default UserCart;
