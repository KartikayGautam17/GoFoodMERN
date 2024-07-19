import { useEffect, useState } from "react";

function Carousel({ Autoslide, Search, SetSearch }: any) {
  const sample1 =
    "https://i.pinimg.com/originals/e8/79/ec/e879ecc33bbcb3fe9a50bf54285af32e.jpg";
  const sample2 =
    "https://wallpapersmug.com/download/1280x720/df0d34/mountains-iceland-nature.jpg";
  const sample3 =
    "https://wallpapersmug.com/download/1280x720/0d0416/mountains-adorable-lake-nature.jpg";
  const sample4 =
    "https://images.wallpaperscraft.com/image/single/mountains_clouds_dusk_154131_1280x720.jpg";
  const sample5 =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHQ1tXG7w2RY7IeHvuBnUsorkOz29XcGHKvw&s";
  const Slides: any = [sample1, sample2, sample3, sample4].map(
    (val: any, i: any) => {
      return <img key={i} src={val} className="w-full h-full object-cover" />;
    }
  );

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
    }, 3000);

    return () => {
      clearInterval(Interval);
    };
  }, [Current]);
  return (
    <div className="overflow-hidden relative w-[1280px] h-[720px] mx-auto my-5">
      <div
        className="flex transition-transform duration-500 ease-in-out"
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
            <div className="form-control rounded-[40px]">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto rounded-[40px] mr-1"
                value={Search}
                onChange={(e) => {
                  SetSearch(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* DaisyUI Search Bar End */}
    </div>
  );
}

export default Carousel;
