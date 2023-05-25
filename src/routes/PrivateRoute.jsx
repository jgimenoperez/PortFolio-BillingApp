import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

export const PrivateRoute = ({children}) => {
  const { logged } = useSelector((state) => state.user);
  if (!logged) {
    return <Navigate to="/login" state={{ from: history.location }} />  
  }
  return children;

}

