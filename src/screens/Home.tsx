import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import Card from "../components/Card";
import Carousel from "../components/Carousel";

function Home() {
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

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel Slides={Slides} Autoslide={true} />
      </div>
      <div className="p-10 grid grid-rows-2 grid-cols-4">
        {Array(6).fill(<Card />)}
      </div>
      <Footer />
    </>
  );
}

export default Home;
