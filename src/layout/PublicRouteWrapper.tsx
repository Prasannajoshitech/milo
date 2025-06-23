import { Outlet, Navigate } from "react-router-dom";
import { PATH } from "@/constants/paths";

interface PublicRouteWrapperProps {
  isLoggedIn: boolean;
}

const PublicRouteWrapper: React.FC<PublicRouteWrapperProps> = ({
  isLoggedIn,
}) => {
  return !isLoggedIn ? <Outlet /> : <Navigate to={PATH.login} />;
};

export default PublicRouteWrapper;
