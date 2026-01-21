import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
    { id: 2, name: 'Phone', price: 599, category: 'Electronics' },
    { id: 3, name: 'Book', price: 19, category: 'Books' },
    { id: 4, name: 'Headphones', price: 149, category: 'Electronics' },
  ],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        id: Math.max(...state.products.map(p => p.id), 0) + 1,
        ...action.payload,
      };
      state.products.push(newProduct);
    },
    updateProduct: (state, action) => {
      const { id, ...updates } = action.payload;
      const product = state.products.find(p => p.id === id);
      if (product) {
        Object.assign(product, updates);
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
  },
});

export const { addProduct, updateProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;
