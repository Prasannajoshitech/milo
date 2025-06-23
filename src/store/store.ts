import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import productSlice from "./slice/productSlice";
import cartSlice from "./slice/cartSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected
) => {
  return selector(store.getState());
};
