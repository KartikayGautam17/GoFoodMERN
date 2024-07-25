import { useEffect, useState } from "react";
import { useUserInfoState } from "./ContextReducer";
import TokenAuthentication from "./AuthenticateToken";
import { useUserInfoDispatch } from "./ContextReducer";
import { Link } from "react-router-dom";

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

interface food_obj {
  id: string;
  uid: number;
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

function MyOrders() {
  const get_user_details: info_obj = useUserInfoState();
  const [UserOrders, SetUserOrders] = useState<[]>([]);
  const UserInfoDispatch = useUserInfoDispatch();
  const GetOrders = async () => {
    const fetch_response = await fetch("http://localhost:5000/Display_Orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: get_user_details?.user_details?.email }),
    });
    const order_list = await fetch_response.json();

    if (order_list.orders.length === 0) return [];
    SetUserOrders(order_list.orders);
  };
  useEffect(() => {
    TokenAuthentication().then(async (response: info_obj) => {
      if (response.code === 200) {
        //else the code would be 0

        UserInfoDispatch({
          type: "LOGIN",
          user_details: response.user_details,
        });
      }
    });
  }, []);
  useEffect(() => {
    if (get_user_details.login) GetOrders();
  }, [get_user_details.login]);
  return (
    <div>
      {!UserOrders.length ? (
        <>
          <div className="text-2xl">No Orders Found</div>
          <Link to={"/"}>
            <div className="bg-green-500 text-white text-xl w-24 h-16 rounded-md p-2 flex items-center justify-center ">
              Go back
            </div>
          </Link>
        </>
      ) : (
        <>
          <div className="text-2xl ml-5">Your Orders</div>
          <div className="p-5">
            <table className="table table-auto">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Food Item</th>
                  <th>Quantity</th>
                  <th>Size</th>
                  <th>Price per each</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {UserOrders.map((food_arr: food_obj[], food_arr_index) => {
                  return (
                    <>
                      {food_arr.map((food_object: food_obj, i) => {
                        return (
                          <tr>
                            <td>{food_arr_index + 1}</td>
                            <td>{food_object.OrderItem.name}</td>
                            <td>{food_object.OrderQuantity.Amount}</td>
                            <td>{food_object.OrderQuantity.Size}</td>
                            <td>{food_object.OrderQuantity.PriceEach}</td>
                            <td>{food_object.OrderQuantity.Tprice}</td>
                          </tr>
                        );
                      })}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div></div>
        </>
      )}
    </div>
  );
}

export default MyOrders;
