import { useEffect, useReducer, useRef, useState } from "react";
import {
  useCart,
  useCartDispatch,
  useUserInfoState,
} from "../components/ContextReducer";

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

type user_details = {
  iat: number;
  id: string;
  email: string;
  name: string;
  location: string;
};
type info_obj = {
  code: number;
  login: boolean;
  user_details: user_details;
};

type remove_callback = (action: { type: string; uid: string }) => void;

function UserCart() {
  const [CheckoutFlag, SetCheckoutFlag] = useState(false);
  const UserInfo: info_obj = useUserInfoState();

  const HandleCheckout = async () => {
    SetCheckoutFlag(true);
    const response = await fetch("http://localhost:5000/Store_Order/", {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify({
        OrderData: CartDetails,

        email: UserInfo.user_details.email,
      }),
    });

    CartDispatch({ type: "CLEAR", uid: "0" });
  };

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
        <div className="m-10 text-2xl p-5">
          {CheckoutFlag ? "Checkout Successful" : "Cart is Empty"}
        </div>
      </>
    );
  const TotalAmount = CartDetails.reduce(
    (prev: any, current: any) => prev + current
  );
  return (
    <>
      <div className="p-5 h-[375px] overflow-y-scroll relative">
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
        <button
          className="bg-green-500 w-28 h-12 text-xl rounded-sm mt-2 ml-5 inline-block"
          onClick={HandleCheckout}
        >
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
