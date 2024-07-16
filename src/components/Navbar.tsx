import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div
      id="navbar-main"
      className="bg-green-500 w-full h-[120px] flex items-center justify-start gap-[50px] px-[75px]"
    >
      <div id="playwrite-it-moderna-uniquifier" className="[font-size:30px]">
        GoFood
      </div>
      <Link to={"/home"}>
        <div className="font-bold">Home</div>
      </Link>
      <Link to={"/login"}>
        <div className="font-bold">Login</div>
      </Link>
      <Link to={"/signup"}>
        <div className="font-bold">Signup</div>
      </Link>
    </div>
  );
}

export default Navbar;
