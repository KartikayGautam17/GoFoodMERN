import { useReducer, createContext, useContext, useRef } from "react";

const CartStateContext = createContext<any>(null);
const CartDispatchContext = createContext<any>(null);
const UidStateContext = createContext<any>(null);
interface ORDER_DETAILS {
  id: string;
  uid: number;
  type: string;
  OrderQuantity: {
    Amount: number;
    Size: string;
    PriceEach: number;
    Tprice: number;
  };
  OrderItem: {
    name: string;
    img: string;
    description: string;
  };
}

const CartReducer = (state: ORDER_DETAILS[], action: ORDER_DETAILS) => {
  switch (action.type) {
    default:
      return "Error Loading cart";
    case "ADD":
      const UpdatedState = [
        ...state,
        {
          id: action.id,
          OrderQuantity: action.OrderQuantity,
          OrderItem: action.OrderItem,
          uid: action.uid,
        },
      ];
      return UpdatedState;
    case "REMOVE":
      return state.filter((value) => {
        return value.uid !== action.uid;
      });
    case "UPDATE":
      const temp = [...state];
      for (const iterator of temp) {
        if (iterator.id === action.id) {
          iterator.OrderQuantity.Amount += action.OrderQuantity.Amount;
          iterator.OrderQuantity.Tprice += action.OrderQuantity.Tprice;

          break;
        }
      }
      return temp;
  }
};

export const CartContext = ({ children }: { children: JSX.Element }) => {
  const [CartItems, CartItemsDispatch] = useReducer<any>(CartReducer, []);
  const UID = useRef(1);
  return (
    <CartDispatchContext.Provider value={CartItemsDispatch}>
      <CartStateContext.Provider value={CartItems}>
        <UidStateContext.Provider value={UID}>
          {children}
        </UidStateContext.Provider>
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
export const useUID = () => useContext(UidStateContext);
