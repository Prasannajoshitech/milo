import Login from "@pages/auth/Login";
import Signup from "@pages/auth/Signup";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PATH } from "./constants/paths";
import Layout from "./layout/Layout";
import PrivateRouteWrapper from "./layout/PrivateRouteWrapper";
import ProductPage from "./pages/product/Page";
import CartPage from "./pages/cart/Page";

function App() {
  return (
    <>
      <ToastContainer stacked />
      <BrowserRouter>
        <Routes>
          <Route path={PATH.login} element={<Login />} />

          <Route path={PATH.signup} element={<Signup />} />
          <Route element={<Layout />}>
            <Route element={<PrivateRouteWrapper />}>
              <Route path={PATH.product} element={<ProductPage />} />
              <Route path={PATH.cart} element={<CartPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
