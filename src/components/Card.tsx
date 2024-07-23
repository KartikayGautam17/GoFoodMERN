import { useEffect, useState, useRef } from "react";
import { useCartDispatch, useCart, useUID } from "./ContextReducer";
interface Props {
  logged_in?: boolean;
  id: string;
  img: string;
  name: string;
  description: string;
  options: {
    regular: string;
    medium: string;
    large: string;
    [key: string]: string;
  };
}

function CardFooter({ Details }: { Details: Props }) {
  const [bg_color, Set_bg_color] = useState<string>("bg-yellow-500/90");
  const { name, img, description, options, id, logged_in } = Details;

  const keys = Object.keys(options);
  const PizzaSize: string[] = [];
  keys.map((val) => {
    PizzaSize.push(val);
  });
  const PizzaAmount: number[] = [1, 2, 3, 4, 5, 6];
  const [Amount, SetAmount] = useState<number>(1);
  const [Size, SetSize] = useState<string>(PizzaSize[0]); // Amount of Pizzas to be ordered
  const _price = Amount * +options[`${Size}`];
  const PriceEach = +options[`${Size}`];
  const [Tprice, SetTprice] = useState<number>(_price); // Tprice = Total Price for abberiviation
  let uid = useUID();
  const CartDispatch = useCartDispatch();
  const CartState = useCart();
  const HandleAddToCart = async () => {
    for (const iterator of CartState) {
      if (iterator.id === id && iterator.OrderQuantity.Size === Size) {
        await CartDispatch({
          type: "UPDATE",
          id: id,
          OrderQuantity: { Amount, Size, Tprice, PriceEach },
        });
        return;
      }
    }

    uid.current += 1;
    await CartDispatch({
      id: id,
      uid: uid.current,
      type: "ADD",
      OrderQuantity: { Amount, Size, Tprice, PriceEach },
      OrderItem: { name, img, description },
    });
  };

  useEffect(() => {
    SetTprice(Amount * +options[`${Size}`]);
  }, [Size, Amount]);
  return (
    <div>
      <div
        id="card-footer"
        className="text-[16px] w-[250px] h-[30px] flex justify-between items-center my-5 mx-auto"
      >
        <select
          onChange={(e) => {
            SetAmount(+e.target.value);
          }}
          id="pizza-amount-dropdown"
          className="w-[35px] h-full  border-2 border-solid border-gray-300 bg-black rounded-md"
        >
          {Array.from(PizzaAmount, (val, i) => {
            return <option key={i}>{val}</option>;
          })}
        </select>
        <select
          onChange={(e) => {
            SetSize(e.target.value);
          }}
          id="pizza-size-dropdown"
          className="w-[85px] h-full border-2 border-solid border-gray-300 bg-black rounded-md"
        >
          {Array.from(PizzaSize, (val, i) => {
            return <option key={i}>{val}</option>;
          })}
        </select>
        <div
          id="price"
          className="w-[75px] h-[20px] flex items-center justify-between"
        >
          {"₹" + Tprice}
        </div>
      </div>
      {logged_in ? (
        <button
          onClick={async () => {
            await HandleAddToCart();
            Set_bg_color("bg-yellow-500/20");
            setTimeout(() => {
              Set_bg_color("bg-yellow-500/90");
            }, 200);
          }}
          className={`w-full font-medium rounded-full ${bg_color}`}
        >
          <div className="flex justify-center items-center">
            <p>Add to Cart</p>
            <img src="./cart-plus.svg" className="m-2"></img>
          </div>
        </button>
      ) : (
        <div>Log in to add to cart</div>
      )}
    </div>
  );
}

function Card({ img, name, description, options, id, logged_in }: Props) {
  return (
    <div
      id="card-container"
      className="text-[16px] w-[300px] h-[500px] border-2 border-solid border-gray-300 rounded-[15px] overflow-hidden m-5"
    >
      <img
        id="card-image"
        className="w-[300px] h-[200px] object-fit"
        alt="Delicious"
        src={img}
      ></img>
      <div id="card-body" className="w-[300px] h-[200px] p-5">
        <h3 id="card-title" className="font-semibold my-2">
          {name}
        </h3>
        <p id="card-text" className="font-extralight my-2">
          {description}
        </p>
        <CardFooter
          Details={{ name, img, description, options, id, logged_in }}
        />
      </div>
    </div>
  );
}

export default Card;
