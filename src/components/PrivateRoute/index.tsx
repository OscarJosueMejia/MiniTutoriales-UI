import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectAuth } from "@store/Slices/securitySlice";
import { PropsWithChildren } from "react";
import { PageNotFound } from '@components/Misc';


const PrivateRoute = ({ children, allowedRoles = [] }: PropsWithChildren<{ allowedRoles?: Array<string> }>) => {
  const user = useSelector(selectAuth);
  if (user) {
    try {
      const { token } = user;
      if (!token) {
        return <Navigate to="/auth" replace />;
      }
    } catch (ex) {
      return <Navigate to="/auth" replace />;
    }
  } else {
    return <Navigate to="/auth" replace />;
  }

  const { rol } = user;

  if (allowedRoles.includes(rol)) {
    return children ? <>{children}</> : <Outlet />;
  }
  return children ? <PageNotFound/> : <Outlet />;
};

export default PrivateRoute;
