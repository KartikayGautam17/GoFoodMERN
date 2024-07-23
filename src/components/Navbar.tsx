import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TokenAuthentication from "./AuthenticateToken";
import { useEffect, useState } from "react";
import CartModal from "./CartModal";
import UserCart from "../screens/Cart";
function Navbar({ Auth, SetAuth }: any) {
  const navigate = useNavigate();
  const [CartView, SetCartView] = useState(false);
  const HandleLogout = () => {
    localStorage.removeItem("AuthToken");
    SetAuth(false);
    navigate("/");
  };

  useEffect(() => {
    TokenAuthentication().then((resolve) => {
      SetAuth(resolve);
    });
  }, []);
  return (
    <div
      id="navbar-main"
      className="bg-green-500 w-full h-[100px] flex items-center justify-start gap-[50px] px-[75px] fixed top-0 z-20"
    >
      <div id="playwrite-it-moderna-uniquifier" className="[font-size:30px]">
        GoFood
      </div>

      {!Auth ? (
        <>
          <div className="flex justify-between items-center w-full">
            <Link to={"/"}>
              <div className="font-bold">Home</div>
            </Link>
          </div>
          <div className="flex justify-around items-center gap-5">
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
        </>
      ) : (
        <>
          <div className="inline-flex justify-start gap-5 items-center w-full">
            <Link to={"/"}>
              <div className="font-bold">Home</div>
            </Link>
            <Link to={"/Orders"}>
              <div className="font-bold">My Orders</div>
            </Link>
          </div>
          <div className="inline-flex justify-end w-full items-center gap-5">
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
