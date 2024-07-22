import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { CartContext } from "../components/ContextReducer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import { useEffect, useState } from "react";

interface FoodResponse {
  Dishes: _dishes_obj[];
  Dish_Types: _dish_type_obj[];
}

interface _dish_type_obj {
  CategoryName: string;
  _id: string;
}

interface _dishes_obj {
  CategoryName: string;
  _id: string;
  name: string;
  img: string;
  description: string;
  options: Array<{
    regular: string;
    medium: string;
    large: string;
  }>;
}

function Home() {
  const [FoodCategories, setFoodCategories] = useState<_dish_type_obj[]>([]);
  const [FoodItems, setFoodItems] = useState<_dishes_obj[]>([]);
  const [Search, SetSearch] = useState<string>("");
  const LoadData = async () => {
    const response: any = await fetch("http://localhost:5000/Dishes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const FoodData: FoodResponse = await response.json();
    setFoodCategories(FoodData.Dish_Types);
    setFoodItems(FoodData.Dishes);
  };
  useEffect(() => {
    LoadData();
  }, []);
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel Search={Search} SetSearch={SetSearch} />
      </div>
      <div className="p-10 pt-2 m-3 mt-0 text-2xl w-[95%] ml-5 flex justify-start gap-10 flex-col">
        {FoodCategories.length !== 0 ? (
          FoodCategories.map((food_category: _dish_type_obj) => {
            return (
              <>
                <div className="ml-8 my-5" key={food_category._id}>
                  {food_category.CategoryName}
                </div>
                <div className="grid lg:grid-cols-4 gap-5  md:grid-cols-2 sm:grid-cols-1">
                  {FoodItems.length !== 0 ? (
                    FoodItems.filter(
                      (food_item: _dishes_obj) =>
                        food_item.CategoryName === food_category.CategoryName &&
                        (Search.length === 0
                          ? true
                          : food_item.name
                              .toLowerCase()
                              .includes(Search.toLowerCase()))
                    ).map((FilteredItems) => {
                      return (
                        <div key={FilteredItems._id}>
                          <Card
                            name={FilteredItems.name}
                            description={FilteredItems.description}
                            options={FilteredItems.options[0]}
                            img={FilteredItems.img}
                            key={FilteredItems._id}
                          ></Card>
                        </div>
                      );
                    })
                  ) : (
                    <div>No Food Items Found</div>
                  )}
                </div>
              </>
            );
          })
        ) : (
          <div>No Categories Found</div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Home;
