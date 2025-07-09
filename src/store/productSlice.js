import {createSlice} from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    favorite: [],
  },
  reducers: {
    addProduct: (state, action) => {
      console.log('state', state);
      console.log('action', action);
      state.products = [...state.products, action.payload];
    },
    increaseQty: (state, action) => {
      console.log('state', state);
      console.log('action', action.payload); // = id
      const newProductList = state.products.map(el => {
        if (el.id === action.payload) {
          return {...el, quantity: el.quantity + 1};
        } else {
          return el;
        }
      });
      state.products = newProductList;
    },
    decreaseQty: (state, action) => {
      console.log('state', state);
      console.log('action', action);
      const newProductList = state.products.map(el => {
        if (el.id === action.payload) {
          return {...el, quantity: el.quantity > 1 ? el.quantity - 1 : 0};
        } else {
          return el;
        }
      });
      state.products = newProductList;
    },
    removeItem: (state, action) => {
      console.log('state', state);
      console.log('action', action);
      state.products = state.products.filter(el => el.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {addProduct, increaseQty, decreaseQty, removeItem} = productSlice.actions;

export default productSlice.reducer;
