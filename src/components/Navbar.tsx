import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TokenAuthentication from "./AuthenticateToken";
import { useEffect, useState } from "react";
import CartModal from "./CartModal";
import UserCart from "../screens/Cart";
import { useUserInfoDispatch, useUserInfoState } from "./ContextReducer";

type assign_info = (action: { type: string; user_details: Object }) => void;
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
function Navbar() {
  const navigate = useNavigate();
  const [CartView, SetCartView] = useState(false);
  const UserInfo: info_obj = useUserInfoState();
  const [Auth, SetAuth] = useState(false);
  const UserInfoDispatch: assign_info = useUserInfoDispatch();

  const HandleLogout = () => {
    localStorage.removeItem("AuthToken");
    UserInfoDispatch({ type: "LOGOUT", user_details: {} });

    navigate("/");
  };
  useEffect(() => {
    TokenAuthentication().then((response: info_obj) => {
      if (response.code === 200) {
        UserInfoDispatch({
          type: "LOGIN",
          user_details: response.user_details,
        });
      }
    });
  }, []);

  return (
    <div
      id="navbar-main"
      className="bg-green-500 w-full h-[100px] flex items-center justify-between gap-[50px] px-[75px] fixed top-0 z-20"
    >
      <div id="playwrite-it-moderna-uniquifier" className="[font-size:30px]">
        GoFood
      </div>

      {!UserInfo.login ? (
        <>
          <div className="flex justify-between items-center gap-5">
            <div className="flex justify-around gap-5">
              <Link to={"/login"}>
                <div className="font-bold bg-white text-green-500 p-3 rounded-sm">
                  Login
                </div>
              </Link>
              <Link to={"/signup"}>
                <div className="font-bold bg-white text-green-500 p-3 rounded-sm">
                  SignUp
                </div>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="inline-flex justify-start gap-5 items-center w-full">
            <div className="font-bold">
              Welcome {UserInfo.user_details.name}
            </div>
          </div>
          <div className="inline-flex justify-end w-full items-center gap-5">
            <Link to={"/MyOrders"}>
              <button className="font-bold p-3 bg-white text-green-500 rounded-sm">
                My Orders
              </button>
            </Link>
            <button
              onClick={() => {
                SetCartView(true);
              }}
            >
              <div className="font-bold p-3 bg-white text-green-500 rounded-sm">
                My Cart
              </div>
            </button>
            {CartView ? (
              <CartModal
                onClose={() => {
                  SetCartView(false);
                }}
              >
                {<UserCart />}
              </CartModal>
            ) : (
              ""
            )}
            <Link to={"/"}>
              <div
                onClick={HandleLogout}
                className="font-bold bg-red-500 text-white p-3 rounded-sm"
              >
                Logout
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
