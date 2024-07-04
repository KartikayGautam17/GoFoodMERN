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
      <div className="font-bold">Home</div>
      <div className="opacity-75">Login</div>
    </div>
  );
}

export default Navbar;
