import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectAuth } from "@store/Slices/securitySlice";
import { PropsWithChildren } from "react";

const PrivateRoute = ({ children, allowedRoles = [] }: PropsWithChildren<{ allowedRoles?: Array<string> }>) => {
  const user = useSelector(selectAuth);
  console.log(selectAuth);
  if (user) {
    try {
      const { token } = user;
      if (!token) {
        return <Navigate to="/login" replace />;
      }
    } catch (ex) {
      return <Navigate to="/login" replace />;
    }
  } else {
    return <Navigate to="/login" replace />;
  }

  // const { userRol } = user;
  // if ( allowedRoles.includes(userRol) ) {
  //   return children ? <>{children}</> : <Outlet />;
  // }
  // return children ? <h3>NOT ALLOWED</h3> : <Outlet />;
  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
