import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, { type, payload }) => {
  if (type === 'ADD') {
    let updatedItems;
    const updatedTotalAmount =
      state.totalAmount + payload.price * payload.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === payload.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    // console.log(existingCartItem);

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + payload.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(payload);
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (type === 'REMOVE') {
    const updatedTotalAmount = state.totalAmount - payload.price;
    let updatedItems;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === payload.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== payload.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, defaultCartState);

  const addItemHandler = (item) => {
    cartDispatch({ type: 'ADD', payload: item });
  };

  const removeItemHandler = (item) => {
    cartDispatch({ type: 'REMOVE', payload: item });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
