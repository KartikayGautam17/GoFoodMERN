import { useEffect, useState } from "react";

function Carousel({ Autoslide, Search, SetSearch }: any) {
  const sample1 = "./Food (1).jpg";
  const sample2 = "./Food (2).jpg";
  const sample3 = "./Food (3).jpg";
  const sample4 = "./Food (4).jpg";

  const Slides = [sample1, sample2, sample3, sample4];
  const [Current, SetCurrent] = useState<number>(0);
  const NextSlide = () => {
    if (Current === Slides.length - 1) {
      SetCurrent(0);
    } else SetCurrent(Current + 1);
  };
  const PrevSlide = () => {
    if (Current === 0) {
      SetCurrent(Slides.length - 1);
    } else SetCurrent(Current - 1);
  };
  useEffect(() => {
    if (Autoslide === false) {
      return;
    }
    const Interval = setInterval(() => {
      NextSlide();
    }, 3000);
    return () => {
      clearInterval(Interval);
    };
  }, [Current]);
  return (
    <div className="max-w-[1920px] h-[720px] w-full relative group select-none">
      <img
        className="w-full h-full duration-500"
        src={`${Slides[Current]}`}
      ></img>
      <div
        onClick={PrevSlide}
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
      >
        <img src="arrow-left-short.svg"></img>
      </div>
      <div
        onClick={NextSlide}
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
      >
        <img src="arrow-right-short.svg"></img>
      </div>

      {/*Daisy UI Search Bar Start*/}

      <div className="absolute bottom-[150px] w-[75%] left-[12.5%] right-[12.5%]">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full  rounded-full"
          value={Search}
          onChange={(e) => {
            SetSearch(e.target.value);
          }}
        />
      </div>

      {/*Daisy UI Search Bar End*/}
    </div>
  );
}

export default Carousel;
