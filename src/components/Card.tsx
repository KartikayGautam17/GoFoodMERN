function CardFooter() {
  const PizzaSize = ["Quarter", "Half", "Full"];
  const PizzaAmount = [1, 2, 3, 4, 5, 6];
  return (
    <div
      id="card-footer"
      className="w-[250px] h-[30px] flex justify-between items-center my-5 mx-auto"
    >
      <select
        id="pizza-amount-dropdown"
        className="w-[35px] h-full  border-2 border-solid border-gray-300 bg-black rounded-md"
      >
        {Array.from(PizzaAmount, (val, i) => {
          return <option key={i}>{val}</option>;
        })}
      </select>
      <select
        id="pizza-size-dropdown"
        className="w-[85px] h-full border-2 border-solid border-gray-300 bg-black rounded-md"
      >
        {Array.from(PizzaSize, (val, i) => {
          return <option key={i}>{val}</option>;
        })}
      </select>
      <div id="price" className="w-[75px] h-[25px] text-center">
        ₹899
      </div>
    </div>
  );
}

function Card() {
  return (
    <div
      id="card-container"
      className="w-[300px] border-2 border-solid border-gray-300 rounded-[15px] overflow-hidden m-5"
    >
      <img
        id="card-image"
        className="w-[300px] h-[200px] object-contain"
        alt="Delicious"
        src="https://media.istockphoto.com/id/1186759790/photo/paneer-tikka-at-skewers-in-black-bowl-at-dark-slate-background-paneer-tikka-is-an-indian.jpg?s=612x612&w=0&k=20&c=cITToqM1KEnrixXjoLhEciqP24SxdKtW3QXykq-W5OE="
      ></img>
      <div id="card-body" className="w-[300px] h-[200px] p-5">
        <h3 id="card-title" className="font-semibold my-2">
          Paneer Tikka
        </h3>
        <p id="card-text" className="font-extralight my-2">
          Taste this mouth watering paneer tikka so yummy yummy
        </p>
        <CardFooter />
      </div>
    </div>
  );
}

export default Card;
