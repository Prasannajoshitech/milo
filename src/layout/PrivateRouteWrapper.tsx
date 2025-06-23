import { PATH } from "@/constants/paths";
import { LOCALSTRAGE_CONFIG } from "@/utils/storage";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteWrapper: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const isLoggedin = localStorage.getItem(LOCALSTRAGE_CONFIG.isLoggedIn);
  if (isLoggedin !== "true") {
    return <Navigate to={PATH.login} />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRouteWrapper;
