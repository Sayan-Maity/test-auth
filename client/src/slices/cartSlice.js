import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cartItem")
  ? JSON.parse(localStorage.getItem("cartItem"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === newItem.id);

      // in react we cannot directly mutate the state
      // so we have to create a new array and update the state
      if (existingItem) {
        state.cartItems = state.cartItems.map((i) =>
          i.id === existingItem.id ? newItem : i
        );
      } else {
        state.cartItems = [...state.cartItems, newItem];
      }
      // initial value of item will be passed as 0
      state.itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;
      // toFixed will convert the number to string
      // so we have to convert it back to number and percentage is 15% so 0.15
      state.taxPrice = Number((state.itemsPrice * 0.15).toFixed(2));
      state.totalPrice = Number(
        (state.itemsPrice + state.shippingPrice + state.taxPrice).toFixed(2)
      );

      localStorage.setItem("cartItem", JSON.stringify(state));
    },
  },
});

export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;
