import { useEffect, useState } from "react";

function Carousel({ Slides, Autoslide }: any) {
  const [Current, SetCurrent] = useState(0);
  const HandleLeft = () => {
    SetCurrent(Current === 0 ? Slides.length - 1 : Current - 1);
  };
  const HandleRight = () => {
    SetCurrent(Current === Slides.length - 1 ? 0 : Current + 1);
  };
  useEffect(() => {
    if (!Autoslide) return;
    const Interval = setInterval(() => {
      HandleRight();
      console.log("R->()");
    }, 3000);

    return () => {
      clearInterval(Interval);
    };
  }, [Current]);
  return (
    <div className="overflow-hidden relative w-[1280px] h-[720px] mx-auto my-5">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${Current * 100}%)` }}
      >
        {Slides}
      </div>
      <div className="flex absolute inset-0 items-start top-[20%] justify-between p-5">
        <button onClick={HandleLeft}>
          <img
            src="arrow-left-circle-fill.svg"
            className="w-[48px] h-[48px]"
          ></img>
        </button>
        <button onClick={HandleRight}>
          <img
            src="arrow-right-circle-fill.svg"
            className="w-[48px] h-[48px]"
          ></img>
        </button>
      </div>

      {/* DaisyUI Search Bar Component Begin */}

      <div className="absolute flex justify-center bottom-[150px] w-full">
        <div className="navbar bg-base-100 w-[80%] rounded-[40px]">
          <div className="flex-1">
            <a
              className="btn btn-ghost text-xl"
              id="playwrite-it-moderna-uniquifier"
            >
              GoFood
            </a>
          </div>
          <div className="flex-none gap-2">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
              />
            </div>
            <div className="dropdown dropdown-end ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              ></div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* DaisyUI Search Bar End */}
    </div>
  );
}

export default Carousel;
