import { useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../context/AppContext";



export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { auth } = useContext(AppContext)


  if (!auth) {
    return <Navigate to="/login" state={{ from: location }}></Navigate>
  }

  return children;
}
