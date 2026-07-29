import { createSlice } from "@reduxjs/toolkit";


const loadCartFromStorage = () => {

  
  try{
    const saved = localStorage.getItem("cart");
    if (saved) {
      return JSON.parse(saved);
    }
  }
  catch(e) {

  }
  return [];
};



const saveCartToStorage = (cartItems) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  } catch (e) {
   
  }
};



const initialState = {
  cartItems: loadCartFromStorage(),
};



const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.cartItems.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartItems.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        });
      }
      saveCartToStorage(state.cartItems);
    },

    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      saveCartToStorage(state.cartItems);
    },

    increaseQuantity(state, action) {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      saveCartToStorage(state.cartItems);
    },

    decreaseQuantity(state, action) {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.cartItems = state.cartItems.filter(
            (i) => i.id !== action.payload
          );
        }
      }
      saveCartToStorage(state.cartItems);
    },

    clearCart(state) {
      state.cartItems = [];
      saveCartToStorage(state.cartItems);
    },
  },
});


export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotalPrice = (state) =>
  state.cart.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );



export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
