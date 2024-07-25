import { useReducer, createContext, useContext, useRef } from "react";
import TokenAuthentication from "./AuthenticateToken";
const UserDetailsState = createContext<any>(null);
const UserDetailsDispatch = createContext<any>(null);
const CartStateContext = createContext<any>(null);
const CartDispatchContext = createContext<any>(null);
const UidStateContext = createContext<any>(null);

interface ORDER_DETAILS {
  id: string;
  uid: number;
  type?: string;
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

type user_details = {
  iat: number;
  id: string;
  email: string;
  name: string;
  location: string;
};
type info_obj = {
  code: number;
  login: boolean;
  user_details: user_details;
};

const CartReducer = (state: ORDER_DETAILS[], action: ORDER_DETAILS) => {
  switch (action.type) {
    default:
      return "Error Loading cart";

    case "ADD":
      const UpdatedAddState: ORDER_DETAILS[] = [
        ...state,
        {
          id: action.id,
          OrderQuantity: action.OrderQuantity,
          OrderItem: action.OrderItem,
          uid: action.uid,
        },
      ];

      return UpdatedAddState;
    case "REMOVE":
      const UpdatedRemoveState = state.filter((value) => {
        return value.uid !== action.uid;
      });

      return UpdatedRemoveState;
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
    case "CLEAR":
      return [];
  }
};

const UserInfoReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return { user_details: action.user_details, login: true, code: 200 };
    case "LOGOUT":
      return { login: false, user_details: {}, code: 0 };
  }
};

export const CartContext = ({ children }: { children: JSX.Element }) => {
  const [CartItems, CartItemsDispatch] = useReducer<any>(CartReducer, []);
  const [UserInfoState, UserInfoDispatch] = useReducer<any>(UserInfoReducer, {
    login: false,
  });
  const UID = useRef(1);
  return (
    <UserDetailsDispatch.Provider value={UserInfoDispatch}>
      <UserDetailsState.Provider value={UserInfoState}>
        <CartDispatchContext.Provider value={CartItemsDispatch}>
          <CartStateContext.Provider value={CartItems}>
            <UidStateContext.Provider value={UID}>
              {children}
            </UidStateContext.Provider>
          </CartStateContext.Provider>
        </CartDispatchContext.Provider>
      </UserDetailsState.Provider>
    </UserDetailsDispatch.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
export const useUID = () => useContext(UidStateContext);
export const useUserInfoState = () => useContext(UserDetailsState);
export const useUserInfoDispatch = () => useContext(UserDetailsDispatch);
