import { LOCALSTRAGE_CONFIG } from "@/utils/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  name: string | null;
  email: string | null;
}

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const initialState: AuthState = {
  name: null,
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<FormValues>) => {
      const { name, email } = action.payload;
      state.name = name;
      state.email = email;
    },
    login: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      localStorage.setItem(LOCALSTRAGE_CONFIG.isLoggedIn, "true");
    },
    logout: (state) => {
      state.name = null;
      state.email = null;
      localStorage.removeItem(LOCALSTRAGE_CONFIG.isLoggedIn);
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
