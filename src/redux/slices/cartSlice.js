import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 totalPrice: 0,
  items: []
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addItem(state, action) {
    //   state.items.push(action.payload);
    //   state.totalPrice = state.items.reduce((sum,obj) => {
    //     return obj.price + sum
    //   }, 0);
    // },

    // Добавление элемента в корзину
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    // count минус
    mimusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    // удаление элемента из корзины корзину
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },

    // очистка корзины корзины
    clearItem(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart
export const selectCartitemById = (id) => (state) => state => state.cart.items.find(obj => obj.id === id)

export const { addItem, removeItem, mimusItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
