import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk("pizza/fetchPizzasStatus", async (params, thunkApi) => {
  const { sortBy, order, category, currentPage } = params;
  const{data} = await axios.get(
    `https://6298b336f2decf5bb749749e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
  );
  return data
});

const initialState = {
  items: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    // Добавление элемента в корзину
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const selectPizzaData = (state) => state.pizza;
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
