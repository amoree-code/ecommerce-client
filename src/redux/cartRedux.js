import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return {
        products: [],
        quantity: 0,
        total: 0,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      products: [],
      quantity: 0,
      total: 0,
    };
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    // Handle write errors
    console.log("Error saving state to localStorage:", err);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadState(),
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
      saveState(state);
    },
    updateQuantity: (state, action) => {
      const { id, type } = action.payload;
      const product = state.products.find((item) => item._id === id);
      if (product) {
        if (type === "inc") {
          product.quantity += 1;
          state.total += product.price;
        } else if (type === "dec" && product.quantity > 1) {
          product.quantity -= 1;
          state.total -= product.price;
        }
        saveState(state);
      }
    },
    removeProduct: (state, action) => {
      const product = state.products.find(
        (item) => item._id === action.payload
      );
      if (product) {
        state.total -= product.price * product.quantity;
        state.quantity -= 1;
        state.products = state.products.filter(
          (item) => item._id !== action.payload
        );
        saveState(state);
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const { addProduct, updateQuantity, removeProduct, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
