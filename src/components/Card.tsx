import { useEffect, useState } from "react";

interface Props {
  img: string;
  name: string;
  description: string;
  options: {
    regular: string;
    medium: string;
    large: string;
  };
}

interface _options {
  options: {
    regular: string;
    medium: string;
    large: string;
    [key: string]: string;
  };
}

function CardFooter({ options }: _options) {
  const keys = Object.keys(options);
  const PizzaSize: string[] = [];
  keys.map((val) => {
    PizzaSize.push(val);
  });
  const PizzaAmount: number[] = [1, 2, 3, 4, 5, 6];
  const [Amount, SetAmount] = useState<number>(1);
  const [Size, SetSize] = useState<string>(PizzaSize[0]); // Amount of Pizzas to be ordered
  const _default_price = Amount * +options[`${Size}`];
  const [Tprice, SetTprice] = useState<number>(_default_price); // Tprice = Total Price for abberiviation
  useEffect(() => {
    SetTprice(Amount * +options[`${Size}`]);
  }, [Size, Amount]);
  return (
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
  );
}

function Card({ img, name, description, options }: Props) {
  return (
    <div
      id="card-container"
      className="text-[16px] w-[300px] h-[450px] border-2 border-solid border-gray-300 rounded-[15px] overflow-hidden m-5"
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
        <CardFooter options={options} />
      </div>
    </div>
  );
}

export default Card;
