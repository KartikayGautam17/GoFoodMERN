import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TokenAuthentication from "./AuthenticateToken";
function Navbar() {
  const navigate = useNavigate();
  const HandleLogout = () => {
    localStorage.removeItem("AuthToken");
    navigate("/");
  };

  return (
    <div
      id="navbar-main"
      className="bg-green-500 w-full h-[100px] flex items-center justify-start gap-[50px] px-[75px]"
    >
      <div id="playwrite-it-moderna-uniquifier" className="[font-size:30px]">
        GoFood
      </div>

      <div className="flex justify-between items-center w-full">
        <Link to={"/"}>
          <div className="font-bold">Home</div>
        </Link>
        {!TokenAuthentication() ? (
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
        ) : (
          <div className="flex justify-between items-center gap-5">
            <Link to={"/login"}>
              <div className="font-bold p-3 rounded-sm">My Orders</div>
            </Link>
            <Link to={"/"}>
              <div
                onClick={HandleLogout}
                className="font-bold bg-white text-green-500 p-3 rounded-sm"
              >
                Logout
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
