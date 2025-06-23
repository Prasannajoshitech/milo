import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface NewProductInput {
  name: string;
  price: number;
  description: string;
}

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<NewProductInput>) => {
      const newProduct: Product = {
        id: Date.now().toString(),
        ...action.payload,
      };
      state.products.push(newProduct);
    },
  },
});

export const { addProduct } = productSlice.actions;

export default productSlice.reducer;
