import { useReducer, createContext, useContext, useEffect } from "react";

const CartStateContext = createContext<any>(null);
const CartDispatchContext = createContext<any>(null);

interface ORDER_DETAILS {
  type: string;
  OrderQuantity: {
    Amount: number;
    Size: string;
    Tprice: number;
  };
  OrderItem: {
    name: string;
    img: string;
    description: string;
  };
}

const CartReducer = (state: any, action: any) => {
  switch (action.type) {
    default:
      return "Error Loading cart";
    case "ADD":
      const UpdatedState = [
        ...state,
        { Quantity: action.OrderQuantity, Item: action.OrderItem },
      ];
      console.log(UpdatedState);
      return UpdatedState;
  }
};

export const CartContext = ({ children }: { children: JSX.Element }) => {
  const [CartItems, CartItemsDispatch] = useReducer<any>(CartReducer, []);
  return (
    <CartDispatchContext.Provider value={CartItemsDispatch}>
      <CartStateContext.Provider value={CartItems}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
